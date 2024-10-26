import React, { useState } from "react";
import { useSelector } from "react-redux";
import { formatDistanceToNow } from "date-fns";
import { deletePost, likePost, sendPostLink } from "../services/PostService";
import { FaRegHeart } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa";
import { IoPaperPlane } from "react-icons/io5";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import { FaRegCopy } from "react-icons/fa";
import { sendNotification } from "../services/NotificationService";

const Feed = () => {
  let { currentUser } = useSelector((state) => state.user);
  let { allPosts } = useSelector((state) => state.post);

  const [isVisible, setisVisible] = useState(Array(allPosts && allPosts.length).fill(false))

  async function handleDeletePost(id) {
    let deletePostRes = await deletePost(id)
  }

  async function handleLike(id,receiver) {
    let likePostRes = await likePost(id)
    let sendNotificationRes = await sendNotification(receiver,id)
  }

  async function handleShare(index,id) {
    let newIsVisible = [...isVisible]
    newIsVisible[index] = true
    setisVisible(newIsVisible)
    const postLink = `http://localhost:5173/post/${id}`
    await sendPostLink(postLink,id)
  }

  function handleCloseShare(index) {
    let naya = [...isVisible]
    naya[index] = false
    setisVisible(naya)
  }

  return (
    <div className="w-[52%] ml-[16%] min-h-screen text-white border-r-2 border-zinc-700  px-40 py-20">
      {allPosts &&
        allPosts.map((post, index) => (
          <div key={index} className="w-[400px] h-fit mb-5 border-2 border-zinc-600">
            <div className="w-full h-[70px] flex items-center justify-between px-3 border-b-2 border-zinc-600">
              <div className="flex items-center gap-3">
                <div className="w-[45px] h-[45px] overflow-hidden rounded-full border-2 border-white">
                  {
                    post && post.user && post.user.profilePicture && post.user.profilePicture === "khaali.jpg" ? <img className="w-full h-full object-cover" src="https://img.freepik.com/premium-vector/silver-membership-icon-default-avatar-profile-icon-membership-icon-social-media-user-image-vector-illustration_561158-4215.jpg" alt="" /> : <img className="w-full h-full object-cover" src={post && post.user && post.user.profilePicture} alt="" />
                  }
                </div>
                <h2>{post && post.user && post.user.username}</h2>
                <h3>
                  {formatDistanceToNow(new Date(post && post.createdAt), {
                    addSuffix: true,
                  })}
                </h3>
              </div>
              {currentUser && post.user && currentUser._id === post.user._id ? (
                <span onClick={() => handleDeletePost(post._id)} className="text-red-600 cursor-pointer">Delete</span>
              ) : (
                ""
              )}
            </div>
            <div className="w-full h-[400px] border-b-2 border-zinc-600 overflow-hidden">
              <img
                className="w-full h-full object-cover"
                src={post && post.postImage}
                alt=""
              />
            </div>
            <div className="w-full h-[100px] px-3 py-2">
              <div className="flex gap-3">
              {
                post && post.likes.includes(currentUser && currentUser._id) ? <span onClick={() => handleLike(post && post._id, currentUser && currentUser._id)} className="text-2xl text-red-500"><FaHeart /></span> : <span onClick={() => handleLike(post && post._id, currentUser && currentUser._id)} className="text-2xl hover:text-zinc-600"><FaRegHeart/></span>
              }
              <Link to={`/comment/${post && post._id}`}><span className="text-2xl"><FaRegComment /></span></Link>
              <span onClick={() => handleShare(index,post && post._id)} className="text-2xl"><IoPaperPlane /></span>
              <div className={`${!isVisible[index] ? "hidden" : "block"} flex items-center gap-4`}>
              <span onClick={() => {
                window.navigator.clipboard.writeText(post && post.postLink)
                alert("Link Copied")
              }} className={`cursor-pointer `}>Copy Link</span>
              <span onClick={() => handleCloseShare(index)} className={`cursor-pointer text-xl ${isVisible[index] === false ? "hidden" : "block"}`}>
                <IoClose />
              </span>
              </div>
              </div>
              <h3>{post && post.likes && post.likes.length} likes</h3>
              <Link to={`/comment/${post && post._id}`} className="text-zinc-500">{post && post.comments && post.comments.length === 0 ? <span className="text-zinc-500">No Comments yet.</span> : `View all ${post && post.comments && post.comments.length} comments`}</Link>
            </div>
            
          </div>
        ))}
    </div>
  );
};

export default Feed;
