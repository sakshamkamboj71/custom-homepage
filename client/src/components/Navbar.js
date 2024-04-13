import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    window.localStorage.removeItem("token");
    navigate("/");
    window.location.reload();
  };

  return (
    <div className="w-full fixed bg-[#121212] flex justify-center items-center h-20 text-5xl text-white select-none">
      <div className="hover:text-[#cd59ff] tracking-widest font-light">
        ESCAPE
      </div>
      <div
        onClick={handleLogout}
        className="absolute right-12 text-lg text-white border-white hover:border-[#df94ff] hover:text-black hover:bg-[#df94ff] rounded-md p-3 px-4 border-2 cursor-pointer"
      >
        Logout
      </div>
    </div>
  );
};

export default Navbar;
