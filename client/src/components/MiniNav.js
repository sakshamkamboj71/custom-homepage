import React from "react";

import { useNavigate } from "react-router-dom";

const MiniNav = () => {
  const navigate = useNavigate();

  const handleAllNav = () => {
    navigate("/");
  };

  const handleSocialNav = () => {
    navigate("/social");
  };

  const handleMiscNav = () => {
    navigate("/misc");
  };

  const handleStudyNav = () => {
    navigate("/study");
  };

  const handleBookmarksNav = () => {
    navigate("/bookmarks");
  };
  return (
    <div className="w-full flex justify-center mb-4">
      <div className="flex tracking-widest text-lg select-none rounded-xl font-semibold">
        <div
          onClick={handleAllNav}
          className="p-4 cursor-pointer w-52 border-[#df94ff] text-center border-2 text-[#df94ff] hover:border-[#df94ff] hover:bg-[#df94ff] hover:text-black rounded-l-lg"
        >
          All
        </div>
        <div
          onClick={handleSocialNav}
          className="p-4 cursor-pointer w-52 border-[#df94ff] text-center border-2 text-[#df94ff] hover:border-[#df94ff] hover:bg-[#df94ff] hover:text-black"
        >
          Social
        </div>
        <div
          onClick={handleMiscNav}
          className="p-4 cursor-pointer w-52 border-[#df94ff] text-center border-2 text-[#df94ff] hover:border-[#df94ff] hover:bg-[#df94ff] hover:text-black"
        >
          Misc
        </div>
        <div
          onClick={handleStudyNav}
          className="p-4 cursor-pointer w-52 border-[#df94ff] text-center border-2 text-[#df94ff] hover:border-[#df94ff] hover:bg-[#df94ff] hover:text-black"
        >
          Study
        </div>
        <div
          onClick={handleBookmarksNav}
          className="p-4 cursor-pointer w-52 border-[#df94ff] text-center border-2 text-[#df94ff] hover:border-[#df94ff] hover:bg-[#df94ff] hover:text-black rounded-r-md"
        >
          Bookmarks
        </div>
      </div>
    </div>
  );
};

export default MiniNav;
