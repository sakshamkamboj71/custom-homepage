import React from "react";
import { Outlet } from "react-router-dom";
import Create from "./Create";
import MiniNav from "./MiniNav";
import Navbar from "./Navbar";

const MainPage = () => {
  return (
    <>
      <Navbar />
      <div className="w-full h-screen pt-20 enableScroll bg-[#1f1f1f] text-white">
        <Create />
        <MiniNav />
        <Outlet />
      </div>
    </>
  );
};

export default MainPage;
