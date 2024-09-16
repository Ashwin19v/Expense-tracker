import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { loginRoute } from "../service/service";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Login = () => {
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  function handleValidation() {
    if (username === "" || password === "") {
      toast.error(" Password and username is required.", toastOptions);
      return false;
    }
    if (username.length < 4) {
      toast.error("username is too small.", toastOptions);
      return false;
    }
    return true;
  }
  async function handleLogin(e) {
    e.preventDefault();

    if (handleValidation()) {
      try {
        const { data } = await axios.post(loginRoute, {
          username,
          password,
        });

        if (data.status === false || data.message === "Invalid credentials") {
          toast.error(data.message || "Login failed", toastOptions);
        }

        if (data.success) {
          toast.success("Login successful!", toastOptions);
          localStorage.setItem("expense", JSON.stringify(data.user));
          navigate("/");
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
              Login here
            </h3>
            <img src="vite.svg" className="h-11 w-11 mx-auto" alt="logo" />
          </div>

          <form
            className="flex flex-col items-center justify-between gap-2 w-full"
            onSubmit={(e) => handleLogin(e)}
          >
            <input
              type="text"
              placeholder="Enter your username!"
              className="w-full p-2 border border-gray-300 rounded-md"
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="Enter your password!"
              className="w-full p-2 border border-gray-300 rounded-md"
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md w-full"
              type="submit"
            >
              Login
            </button>
          </form>
          <p className="text-center">
            Don't have an account?{" "}
            <Link to="/signin">
              <span className="text-blue-700">Sign In</span>
            </Link>
          </p>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Login;
