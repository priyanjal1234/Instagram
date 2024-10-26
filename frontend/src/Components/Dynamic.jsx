import React from "react";
import { Navigate, useParams } from "react-router-dom";
import CreatePost from "./CreatePost";
import Profile from "./Profile";
import Sidebar from "./Sidebar";
import Search from "./Search";

const Dynamic = ({sidebardata}) => {
  let { name } = useParams();
  if (name === "create") {
    return <CreatePost />;
  } else if (name === "profile") {
    return (
      <div className="w-full min-h-screen bg-black flex">
        <Profile />
      </div>
    );
  } else if(name === "search") {
    return <Search />
  }
};

export default Dynamic;
