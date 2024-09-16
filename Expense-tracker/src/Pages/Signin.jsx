import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { registerRoute } from "../service/service";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Signin = () => {
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  function handleValidation() {
    if (username === "" || password === "" || email === "") {
      toast.error("Email Password and username is required.", toastOptions);
      return false;
    }
    if (username.length < 4) {
      toast.error("username is too small.", toastOptions);
      return false;
    }
    if (password !== confirmPassword) {
      toast.error("Password do not match.", toastOptions);
      return fasle;
    }
    return true;
  }

  async function handleSignin(e) {
    e.preventDefault();

    if (handleValidation()) {
      try {
        const { data } = await axios.post(registerRoute, {
          username,
          email,
          password,
        });

        if (data.success) {
          toast.success("Registration successful!", toastOptions);
          localStorage.setItem("expense", JSON.stringify(data.user));

          navigate("/");
        } else {
          toast.error(data.message || "Registration failed", toastOptions);
        }
      } catch (error) {
        toast.error(
          "Something went wrong. Please try again later.",
          toastOptions
        );
        console.error(error);
      }
    }
  }

  return (
    <>
      <div className="flex flex-row items-center justify-center h-screen">
        <div className="flex flex-col items-center justify-center p-5 gap-3 border-2 border-gray-800  w-[300px] rounded-md">
          <div className="text-center">
            <h3 className="text-gray-500 font-bold tracking-wider">
              Signin here
            </h3>
            <img src="vite.svg" className="h-11 w-11 mx-auto" alt="logo" />
          </div>

          <form
            className="flex flex-col items-center justify-between gap-2 w-full"
            onSubmit={(e) => handleSignin(e)}
          >
            <input
              type="text"
              placeholder="Enter your username!"
              className="w-full p-2 border border-gray-300 rounded-md"
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="text"
              placeholder="Enter your email!"
              className="w-full p-2 border border-gray-300 rounded-md"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Enter your password!"
              className="w-full p-2 border border-gray-300 rounded-md"
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="conform your password!"
              className="w-full p-2 border border-gray-300 rounded-md"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md w-full"
              type="submit"
            >
              signin
            </button>
          </form>
          <p className="text-center">
            Already have an account?{" "}
            <Link to="/login">
              <span className="text-blue-700">login</span>
            </Link>
          </p>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Signin;
