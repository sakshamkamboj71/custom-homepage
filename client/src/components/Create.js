import { Plus } from "@phosphor-icons/react";
import React from "react";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const navigate = useNavigate();
  const handleCreate = () => {
    navigate("/add-link");
  };
  return (
    <div className="h-20 flex justify-end items-center">
      <div
        onClick={handleCreate}
        className="mr-16 w-12 h-12 flex justify-center items-center border-2 rounded-full text-[#df94ff] border-[#df94ff] hover:text-white hover:bg-[#df94ff] cursor-pointer"
      >
        <Plus size={32} />
      </div>
    </div>
  );
};

export default Create;
