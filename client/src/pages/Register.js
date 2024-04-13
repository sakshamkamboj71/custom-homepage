import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await axios.post(
      "http://localhost:8000/user-auth/register",
      {
        username,
        password,
        email,
      }
    );

    console.log(response.data);

    if (response.data.error) {
      setError(response.data.error);
      return;
    }

    navigate("/");
  };

  const handleRegisterNav = () => {
    navigate("/");
  };

  return (
    <div className="flex w-full h-screen">
      <div className="bg-[#121212] w-1/3 text-white flex flex-col items-center justify-center text-6xl font-semibold select-none tracking-widest">
        <div className="mb-4">REGISTER</div>

        <div className="text-lg tracking-normal">
          Already a user ?{" "}
          <span
            onClick={handleRegisterNav}
            className="cursor-pointer text-[#df94ff] underline"
          >
            Login
          </span>
        </div>
      </div>
      <div className="bg-[#1f1f1f] w-2/3 flex flex-col items-center justify-center text-white">
        <form className="w-1/2" onSubmit={handleSubmit}>
          <label htmlFor="email" className="text-lg select-none tracking-wider">
            Email
          </label>
          <input
            className="w-full text-white mb-4 outline-none p-2 rounded-md placeholder-gray-400 bg-[#262626]"
            id="email"
            type="text"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            autoComplete="off"
          />
          <label
            htmlFor="username"
            className="text-lg select-none tracking-wider"
          >
            Username
          </label>
          <input
            className="w-full text-white mb-4 outline-none p-2 rounded-md placeholder-gray-400 bg-[#262626]"
            id="username"
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            autoComplete="off"
          />
          <label
            htmlFor="password"
            className="text-lg select-none tracking-wider"
          >
            Password
          </label>
          <input
            className="w-full text-white mb-4 outline-none p-2 rounded-md placeholder-gray-400 bg-[#262626] "
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            autoComplete="off"
          />

          <div className="w-full flex justify-center mt-4">
            <button className="text-lg font-semibold text-[#df94ff] border-2 border-[#df94ff] hover:bg-[#df94ff] hover:text-black p-2 px-8 rounded-md tracking-wide">
              Submit
            </button>
          </div>
        </form>

        {error && (
          <div className="fixed bottom-20 bg-white text-black p-2 text-lg text-center rounded-lg">
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default Register;
