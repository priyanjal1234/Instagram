import React, { useEffect, useState } from "react";
import { getAllUsers, searchUser } from "../services/UserService";
import { Link } from "react-router-dom";

const Search = () => {
  const [search, setsearch] = useState("");
  const [users, setusers] = useState([]);
  const [allUsers, setallUsers] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      let fetchUsersRes = await getAllUsers();
      if (fetchUsersRes && fetchUsersRes.status === 200) {
        setallUsers(fetchUsersRes.data);
      }
    }
    fetchUsers();
  }, []);

  function handleSearch(e) {
    let newValue = e.target.value 
    setsearch(newValue)
    if(newValue) {
      let filteredUsers = allUsers.filter(user => user.name.toLowerCase().includes(newValue.toLowerCase()))
      setusers(filteredUsers)
    } else {
      setusers([])
    }
  }

  return (
    <div className="w-full h-screen bg-zinc-900 text-white flex items-center justify-center">
      <div className="w-[500px] h-fit px-3 py-2 bg-zinc-700 rounded-lg">
        <input
          value={search}
          onChange={handleSearch}
          className="w-full px-3 py-2 bg-transparent border-2 border-zinc-300 rounded-full outline-none"
          type="text"
          placeholder="Search"
        />
        {users &&
          users.map((user, index) => (
            <Link to={`/profile/${user && user._id}`} className="w-full h-fit flex items-center gap-3 mt-3" key={index}>
                <div className="w-[40px] h-[40px] border-2 overflow-hidden border-white rounded-full">
                    {
                        user && user.profilePicture && user.profilePicture === "khaali.jpg" ? <img className="w-full h-full object-cover" src="https://img.freepik.com/premium-vector/silver-membership-icon-default-avatar-profile-icon-membership-icon-social-media-user-image-vector-illustration_561158-4215.jpg" alt="" /> : <img className="w-full h-full object-cover" src={user.profilePicture && user.profilePicture} alt="" />
                    }
                </div>
                <span>{user && user.name}</span>

            </Link>
          ))}
      </div>
    </div>
  );
};

export default Search;
