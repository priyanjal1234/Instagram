import React, { useEffect } from "react";
import { followUser, getAllUsers, unfollowUser } from "../services/UserService";
import { useDispatch, useSelector } from "react-redux";
import { setAllUsers, setLoggedin } from "../redux/reducers/UserReducer";
import { toast } from "react-toastify";

const HomeRight = () => {
  let dispatch = useDispatch();
  let { allUsers, currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    async function fetchUsers() {
      let fetchUsersRes = await getAllUsers();
      if (fetchUsersRes.status === 200) {
        dispatch(setAllUsers(fetchUsersRes.data));
      }
    }
    fetchUsers();
  }, [allUsers]);

  async function handleFollowUser(id) {
    let followUserRes = await followUser(id);
  }

  async function handleUnfollowUser(id) {
    let unfollowUserRes = await unfollowUser(id);
  }

  return (
    <div className="px-6 py-12 flex flex-col gap-6">
      {allUsers && currentUser && [currentUser,...allUsers.filter(user => user && user._id.toString() !== currentUser._id.toString())]
        .map((user, index) => (
          <div
            key={index}
            className="w-[350px] h-[55px] flex justify-between items-center"
          >
            <div className="flex items-center gap-4">
              <div className="w-[55px] h-[55px]  overflow-hidden rounded-full">
                {user &&
                user.profilePicture &&
                user.profilePicture === "khaali.jpg" ? (
                  <img
                    className="w-full h-full object-cover"
                    src="https://img.freepik.com/premium-vector/silver-membership-icon-default-avatar-profile-icon-membership-icon-social-media-user-image-vector-illustration_561158-4215.jpg"
                    alt=""
                  />
                ) : (
                  <img className="w-full h-full object-cover" src={user && user.profilePicture} alt="" />
                )}
              </div>
              <div>
                <h2 className="textl-lg font-semibold">
                  {user && user.username}
                </h2>
                <h2 className="text-zinc-400">{user && user.name}</h2>
              </div>
            </div>
            <div>
              {currentUser && currentUser._id === user._id ? (
                <span className="text-blue-600 cursor-pointer">Switch</span>
              ) : currentUser && currentUser.following.includes(user._id) ? (
                <span
                  className="text-zinc-600 cursor-pointer"
                  onClick={() => handleUnfollowUser(user._id)}
                >
                  Following
                </span>
              ) : (
                <span
                  onClick={() => handleFollowUser(user._id)}
                  className="text-blue-600 cursor-pointer"
                >
                  Follow
                </span>
              )}
            </div>
          </div>
        ))}
    </div>
  );
};

export default HomeRight;
