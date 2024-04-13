import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddLink = () => {
  const [linkName, setLinkName] = useState("");
  const [linkUrl, setLinkUrl] = useState("");
  const token = window.localStorage.getItem("token");
  const [linkType, setLinkType] = useState("Social");

  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post(
      "http://localhost:8000/link-handeler/add-link",
      { linkName, linkUrl, token, linkType }
    );

    if (response.data.error) {
      setError(response.data.error);
      return;
    }

    console.log(response.data.message);
    navigate("/");
  };

  const handleCancel = () => {
    navigate("/");
  };

  const handleOptionChange = (e) => {
    setLinkType(e.target.value);
  };

  return (
    <div className="w-full h-screen bg-[#1f1f1f] text-white flex justify-center items-center">
      <div className="w-1/2 border-2 border-[#b0b0b0] p-4 rounded-lg">
        <form className="w-full" onSubmit={handleSubmit}>
          <label
            htmlFor="linkName"
            className="text-lg select-none tracking-wider"
          >
            Link Name
          </label>
          <input
            className="w-full text-white mb-4 outline-none p-2 rounded-md placeholder-gray-400 bg-[#262626]"
            id="linkName"
            type="text"
            placeholder="Enter your Link Name"
            value={linkName}
            onChange={(e) => {
              setLinkName(e.target.value);
            }}
            autoComplete="off"
          />

          <label
            htmlFor="linkUrl"
            className="text-lg select-none tracking-wider"
          >
            URL
          </label>
          <input
            className="w-full text-white mb-4 outline-none p-2 rounded-md placeholder-gray-400 bg-[#262626] "
            id="linkUrl"
            type="text"
            placeholder="Enter your URL"
            value={linkUrl}
            onChange={(e) => {
              setLinkUrl(e.target.value);
            }}
            autoComplete="off"
          />

          <div className="w-full flex flex-col items-center">
            <label
              htmlFor="linkUrl"
              className="text-lg select-none tracking-wider"
            >
              Link Type
            </label>
            <select
              onChange={handleOptionChange}
              className="w-1/2 text-white mb-4 outline-none p-2 rounded-md placeholder-gray-400 bg-[#262626] border-none outline-none"
            >
              <option value="Social">Social</option>
              <option value="Misc">Misc</option>
              <option value="Study">Study</option>
              <option value="Bookmarks">Bookmarks</option>
            </select>
          </div>

          <div className="w-full flex justify-between mt-4">
            <button
              onClick={handleCancel}
              className="w-40 text-lg font-semibold text-[#df94ff] border-2 border-[#df94ff] hover:bg-[#df94ff] hover:text-black p-2 px-8 rounded-md tracking-wide"
            >
              Cancel
            </button>
            <button className="w-40 text-lg font-semibold text-[#df94ff] border-2 border-[#df94ff] hover:bg-[#df94ff] hover:text-black p-2 px-8 rounded-md tracking-wide">
              Save
            </button>
          </div>
        </form>
      </div>
      {error && (
        <div className="w-full fixed bottom-20 text-black flex justify-center text-lg text-center">
          <div className="bg-white rounded-lg p-2">{error}</div>
        </div>
      )}
    </div>
  );
};

export default AddLink;
