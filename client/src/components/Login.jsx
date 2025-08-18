import React, { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "react-toastify";
import { User, Mail, Lock, X } from "lucide-react";

const Login = () => {
  const [state, setState] = useState("Login");
  const { setShowLogin, backendUrl, setToken, setUser } =
    useContext(AppContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if (state === "Login") {
        // Handle login
        const { data } = await axios.post(backendUrl + "/api/user/login", {
          email,
          password,
        });
        if (data.success) {
          setToken(data.token);
          setUser(data.user);
          localStorage.setItem("token", data.token);
          setShowLogin(false);
        } else {
          toast.error(data.message);
        }
      } else {
        // Handle signup
        const { data } = await axios.post(backendUrl + "/api/user/register", {
          name,
          email,
          password,
        });
        if (data.success) {
          setToken(data.token);
          setUser(data.user);
          localStorage.setItem("token", data.token);
          setShowLogin(false);
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/50 flex justify-center items-center">
      <motion.form
        onSubmit={onSubmitHandler}
        initial={{ opacity: 0.2, y: 50 }}
        transition={{ duration: 0.3 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative bg-gray-900/95 border border-purple-500/30 p-10 rounded-xl text-gray-300 backdrop-blur-sm"
      >
        <h1 className="text-center text-2xl text-gray-100 font-medium">
          {state}
        </h1>
        <p className="text-sm text-gray-400 text-center mt-2">
          Welcome back! Please sign in to continue
        </p>
        {state !== "Login" && (
          <div className="border border-purple-500/30 bg-gray-800/60 px-6 py-2 flex items-center gap-2 rounded-full mt-6 focus-within:border-purple-400/50 transition-all duration-300">
            <User size={20} className="text-gray-400" />
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              className="outline-none text-sm bg-transparent text-gray-300 placeholder-gray-500 flex-1"
              type="text"
              placeholder="Full Name"
              required
            />
          </div>
        )}
        <div className="border border-purple-500/30 bg-gray-800/60 px-6 py-2 flex items-center gap-2 rounded-full mt-4 focus-within:border-purple-400/50 transition-all duration-300">
          <Mail size={20} className="text-gray-400" />
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="outline-none text-sm bg-transparent text-gray-300 placeholder-gray-500 flex-1"
            type="email"
            placeholder="Email"
            required
          />
        </div>
        <div className="border border-purple-500/30 bg-gray-800/60 px-6 py-2 flex items-center gap-2 rounded-full mt-4 focus-within:border-purple-400/50 transition-all duration-300">
          <Lock size={20} className="text-gray-400" />
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="outline-none text-sm bg-transparent text-gray-300 placeholder-gray-500 flex-1"
            type="password"
            placeholder="Password"
            required
          />
        </div>
        <p className="text-sm text-purple-400 hover:text-purple-300 my-4 cursor-pointer transition-colors duration-300">
          Forgot Password?
        </p>
        <button className="bg-purple-600 hover:bg-purple-500 w-full text-white py-2 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25">
          {state === "Login" ? "Login" : "Create Account"}
        </button>
        {state === "Login" ? (
          <p className="mt-5 text-center text-gray-400">
            Don't have an account?{" "}
            <span
              onClick={() => setState("Sign Up")}
              className="text-purple-400 hover:text-purple-300 cursor-pointer transition-colors duration-300"
            >
              Sign Up
            </span>
          </p>
        ) : (
          <p className="mt-5 text-center text-gray-400">
            Already have an account?{" "}
            <span
              onClick={() => setState("Login")}
              className="text-purple-400 hover:text-purple-300 cursor-pointer transition-colors duration-300"
            >
              Login
            </span>
          </p>
        )}
        <X
          onClick={() => setShowLogin(false)}
          size={24}
          className="absolute top-5 right-5 cursor-pointer text-gray-400 hover:text-gray-200 transition-colors duration-300"
        />
      </motion.form>
    </div>
  );
};

export default Login;
