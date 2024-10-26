import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { createComment, deleteComment, getPostComments } from "../services/CommentService";
import { toast } from "react-toastify";
import { setPostComments } from "../redux/reducers/CommentReducer";
import { formatDistanceToNow } from "date-fns";
import { IoClose } from "react-icons/io5";

const Comment = () => {
  let { postId } = useParams();
  let dispatch = useDispatch();

  let { currentUser } = useSelector(state => state.user)
  let { allPosts } = useSelector((state) => state.post);
  let { postComments } = useSelector((state) => state.comment);

  const [content, setcontent] = useState("");

  let post =
    allPosts &&
    allPosts.filter(
      (post) => post && post._id.toString() === postId.toString()
    )[0];

  useEffect(() => {
    async function fetchPostComments() {
      let fetchPostCommentsRes = await getPostComments(postId);
      if (fetchPostCommentsRes.status === 200) {
        dispatch(setPostComments(fetchPostCommentsRes.data));
      }
    }
    fetchPostComments();
  }, [postId,postComments]);

  async function handleCreateComment(e) {
    e.preventDefault();
    let createCommentRes = await createComment(postId, content);
    if (createCommentRes.status === 201) {
      setcontent("");
    }
  }

  async function handleDeleteComment(commentId) {
    let deleteCommentRes = await deleteComment(commentId,postId)
  }

  return (
    <div className="w-full h-screen bg-black text-white flex items-center justify-center">
        <Link to={'/home'} className="absolute top-4 text-3xl right-5">
            <IoClose />
        </Link>
      <div className="w-[60%] h-[80vh] border-2 flex border-zinc-600">
        <div className="w-[55%] h-full border-r-2 border-zinc-600">
          <img
            className="w-full h-full object-cover"
            src={post && post.postImage}
            alt=""
          />
        </div>
        <div className="w-[45%] h-full relative">
          <div className="w-full h-[70px] border-b-2 border-zinc-600 flex items-center gap-3 px-4">
            <div className="w-[45px] h-[45px] overflow-hidden border-2 border-zinc-600 rounded-full">
              {post &&
              post.user &&
              post.user.profilePicture &&
              post.user.profilePicture === "khaali.jpg" ? (
                <img
                  src="https://img.freepik.com/premium-vector/silver-membership-icon-default-avatar-profile-icon-membership-icon-social-media-user-image-vector-illustration_561158-4215.jpg"
                  alt=""
                />
              ) : (
                <img src={post.user && post.user.profilePicture} alt="" />
              )}
            </div>
            <h2>{post && post.user && post.user.username}</h2>
          </div>
          {postComments &&
            postComments.map((comment, index) => (
              <div className="px-4 py-5 flex w-full items-center justify-between" key={index}>
                <div>
                  <div className="flex gap-3">
                    <h2>{comment && comment.user && comment.user.username}</h2>
                    <h2>
                      {comment &&
                        comment.createdAt &&
                        formatDistanceToNow(new Date(comment.createdAt), {
                          addSuffix: true,
                        })}
                    </h2>
                  </div>
                  <p>{comment && comment.content}</p>
                </div>
                {
                    currentUser && currentUser._id === comment.user._id &&<span onClick={() => handleDeleteComment(comment && comment._id)} className="text-red-500 cursor-pointer">Delete</span>
                }
              </div>
            ))}
          <div className="w-full h-[70px] border-t-2 border-zinc-600 absolute bottom-0 p-4">
            <form onSubmit={handleCreateComment}>
              <input
                value={content}
                onChange={(e) => setcontent(e.target.value)}
                className="w-[70%] px-3 py-2 border-2 border-white outline-none bg-transparent"
                type="text"
                name="content"
                placeholder="Add a comment"
              />
              <input
                type="submit"
                value={"Add"}
                className="px-3 py-2 bg-blue-600 rounded-lg ml-4"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comment;
