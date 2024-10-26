import { toast } from "react-toastify";
import api from "../api";

export const createPost = async function (formdata) {
  try {
    let createPostRes = await api.post("/posts/create", formdata, {
      withCredentials: true,
    });
    return createPostRes;
  } catch (error) {
    if (error.response && error.response.status === 400) {
      toast.error("Post image is required");
    } else {
      toast.error("Error in creating the post");
    }
  }
};

export const getAllPosts = async function () {
  try {
    let getAllPostsRes = await api.get("/posts/all-posts", {
      withCredentials: true,
    });
    return getAllPostsRes;
  } catch (error) {
    if (error.response && error.response.status === 500) {
      console.log("Error fetching posts");
    }
  }
};

export const deletePost = async function (id) {
  try {
    let deletePostRes = await api.delete(`/posts/post/delete/${id}`, {
      withCredentials: true,
    });
    return deletePostRes;
  } catch (error) {
    if (error.response && error.response.status === 500) {
      console.log("Error deleting post");
    }
  }
};

export const likePost = async function (id) {
  try {
    let likePostRes = await api.post(
      `/posts/post/like/${id}`,
      {},
      { withCredentials: true }
    );
    return likePostRes;
  } catch (error) {
    if (error.response && error.response.status === 500) {
      toast.error("Error in liking the post");
    }
  }
};

export const sendPostLink = async function (postLink, id) {
  try {
    let sendPostLinkRes = await api.post(
      `/posts/post/link/${id}`,
      { postLink },
      { withCredentials: true }
    );
    return sendPostLinkRes;
  } catch (error) {
    if(error.response && error.response.status === 500) {
      console.log("Error sending link to backend")
    }
  }
};
