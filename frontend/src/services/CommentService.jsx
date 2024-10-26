import { toast } from "react-toastify";
import api from "../api";

export const createComment = async function (postId, content) {
  try {
    let createCommentRes = await api.post(
      `/comments/comment/${postId}`,
      { content },
      { withCredentials: true }
    );
    return createCommentRes;
  } catch (error) {
    if (error.response && error.response.status === 500) {
      toast.error(error.response.data.message);
    } else if (error.response && error.response.status === 400) {
      toast.error("Content is required");
    }
  }
};

export const getPostComments = async function (postId) {
  try {
    let getPostCommentsRes = await api.get(
      `/comments/post/comments/${postId}`,
      {
        withCredentials: true,
      }
    );
    return getPostCommentsRes;
  } catch (error) {
    if (error.response && error.response.status === 500) {
      console.log("Error fetching posts");
    }
  }
};

export const deleteComment = async function (commentId, postId) {
  try {
    let deleteCommentRes = await api.delete(
        `/comments/delete/${postId}/comment/${commentId}`,
        { withCredentials: true }
      );
      return deleteCommentRes;
  } catch (error) {
    if(error.response && error.response.status === 500) {
        toast.error("Error deleting comment")
    }
  }
};
