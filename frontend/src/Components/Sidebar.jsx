import React, { useEffect, useState } from "react";
import { IoHomeOutline } from "react-icons/io5";
import { IoIosSearch } from "react-icons/io";
import { FaRegHeart } from "react-icons/fa";
import { FaRegPlusSquare } from "react-icons/fa";
import { FaRegUserCircle } from "react-icons/fa";

import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { getNotifications } from "../services/NotificationService";

const Sidebar = () => {
  const [notifications, setnotifications] = useState([])
  const sidebardata = [
    { icon: <IoHomeOutline />, name: "Home" },
    { icon: <IoIosSearch />, name: "Search" },
    { icon: <FaRegHeart />, name: "Notifications" },
    { icon: <FaRegPlusSquare />, name: "Create" },
    { icon: <FaRegUserCircle />, name: "Profile" },
  ];
  let { currentUser } = useSelector(state => state.user)

  useEffect(() => {
    async function fetchNotifications() {
      let fetchNotificationsRes = await getNotifications(currentUser && currentUser._id)
      if(fetchNotificationsRes.status === 200) {
        setnotifications(fetchNotificationsRes.data)
      }
    }
    fetchNotifications()
  },[])

  return (
    <div className="w-[16%] fixed top-0 left-0 h-screen border-r-2 border-zinc-700 px-4 py-8">
      <div className="mb-8">
        <img
          className="w-[120px]"
          src="https://github.com/asynchronousJavascriptor/instaclone/blob/main/public/images/logo.png?raw=true"
          alt=""
        />
      </div>
      {sidebardata.map((item, index) => (
        <div key={index} className="w-full flex gap-2 mb-6 items-center">
          <span className="text-3xl">{item.icon}</span>
          {
            item.name === "Notifications" ? <NavLink
            to={`/${item.name.toLowerCase()}`}
            className={({ isActive }) =>
              isActive
                ? "text-blue-600 font-semibold"
                : "text-white font-semibold"
            }
          >
            Notifications <span>{notifications && notifications.length > 0 ? <div className="w-[5px] h-[5px] bg-red-500 rounded-full"></div>: ""}</span>
          </NavLink> : <NavLink
            to={`/${item.name.toLowerCase()}`}
            className={({ isActive }) =>
              isActive
                ? "text-blue-600 font-semibold"
                : "text-white font-semibold"
            }
          >
            {item.name}
          </NavLink>
          }
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
