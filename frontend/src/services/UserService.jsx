import { toast } from "react-toastify";
import api from "../api";

export const registerUser = async function (register) {
  try {
    let registerUserRes = await api.post("/users/register", register, {
      withCredentials: true,
    });
    return registerUserRes;
  } catch (error) {
    if (error.response && error.response.status === 400) {
      toast.error(error.response.data.message);
    } else if (error.response && error.response.status === 409) {
      toast.error("You are already registered");
    } else {
      toast.error("Something went wrong");
    }
  }
};

export const loginUser = async function (login) {
  try {
    let loginUserRes = await api.post("/users/login", login, {
      withCredentials: true,
    });
    return loginUserRes;
  } catch (error) {
    if (error.response && error.response.status === 400) {
      toast.error(error.response.data.message);
    } else if (error.response && error.response.status === 404) {
      toast.error("You are not registered");
    } else if (error.response && error.response.status === 401) {
      toast.error("Invalid Password");
    } else {
      toast.error("Something went wrong");
    }
  }
};

export const logoutUser = async function () {
  try {
    let logoutUserRes = await api.get("/users/logout", {
      withCredentials: true,
    });
    return logoutUserRes;
  } catch (error) {
    if (error.response && error.response.status === 500) {
      console.log("Error logging out");
    }
  }
};

export const getAllUsers = async function () {
  try {
    let getAllUsersRes = await api.get("/users/all-users", {
      withCredentials: true,
    });
    return getAllUsersRes;
  } catch (error) {
    if (error.response && error.response.status === 500) {
      toast.error("Something went wrong");
    }
  }
};

export const getUserProfile = async function () {
  try {
    let getUserProfileRes = await api.get("/users/profile", {
      withCredentials: true,
    });
    return getUserProfileRes;
  } catch (error) {
    if (error.response && error.response.status === 500) {
      toast.error("Error fetching the data of logged in user");
    }
  }
};

export const followUser = async function (id) {
  try {
    let followUserRes = await api.post(
      `/users/follow/${id}`,
      {},
      { withCredentials: true }
    );
    return followUserRes;
  } catch (error) {
    if (error.response && error.response.status === 500) {
      toast.error("Error following user");
    }
  }
};

export const unfollowUser = async function (id) {
  try {
    let unfollowUserRes = await api.post(
      `/users/unfollow/${id}`,
      {},
      { withCredentials: true }
    );
    return unfollowUserRes;
  } catch (error) {
    if (error.response && error.response.status === 500) {
      toast.error("Error unfollowing user");
    }
  }
};

export const editProfile = async function (formdata) {
  try {
    let editProfileRes = await api.put("/users/update/profile", formdata, {
      withCredentials: true,
    });
    return editProfileRes;
  } catch (error) {
    if (error.response && error.response.status === 500) {
      toast.error("Error updating the user");
    }
  }
};

export const forgotPassword = async function (email) {
  try {
    let forgotPasswordRes = await api.post(
      `/users/forgot-password`,
      { email },
      { withCredentials: true }
    );
    return forgotPasswordRes;
  } catch (error) {
    if (error.response && error.response.status === 500) {
      toast.error("Something went wrong");
    } else if (error.response && error.response.status === 404) {
      toast.error("User not found");
    }
  }
};

export const resetPassword = async function (token, newPassword) {
  try {
    let resetPasswordRes = await api.post(
      `/users/reset-password/${token}`,
      { newPassword },
      { withCredentials: true }
    );
    return resetPasswordRes;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      toast.error("User with this token not found");
    } else {
      toast.error("Error resetting password");
    }
  }
};

export const searchUser = async function (search) {
  try {
    let searchUserRes = await api.get(`/users/search/${search}`, {
      withCredentials: true,
    });
    return searchUserRes;
  } catch (error) {
    if (error.response && error.response.status === 500) {
      console.log("Error fetching users");
    }
  }
};

export const getSpecificUser = async function (id) {
  try {
    let getSpecificUserRes = await api.get(`/users/user/profile/${id}`, {
      withCredentials: true,
    });
    return getSpecificUserRes;
  } catch (error) {
    if(error.response && error.response.status === 404) {
      console.log("User not found")
    }
    else {
      console.log("Error fetching user")
    }
  }
};
