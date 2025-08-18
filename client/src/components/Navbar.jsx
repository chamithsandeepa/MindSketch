import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { Star, User, LogOut } from "lucide-react";

const Navbar = () => {
  const { user, setShowLogin, logout, credit } = useContext(AppContext);

  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between py-4">
      <Link to="/">
        <img className="w-28 sm:w-32 lg:w-40" src={assets.logo} alt="" />
      </Link>
      <div>
        {user ? (
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => navigate("/buy")}
              className="flex items-center gap-2 bg-purple-900/40 backdrop-blur-sm border border-purple-500/30 px-4 sm:px-6 py-1.5 sm:py-3 rounded-full hover:scale-105 hover:bg-purple-800/50 transition-all duration-700"
            >
              <Star size={20} className="text-purple-400" />
              <p className="text-xs sm:text-sm font-medium text-gray-200">
                Credits Available: {credit}
              </p>
            </button>
            <p className="text-gray-300 max-sm:hidden pl-4">
              Welcome, {user.name}
            </p>
            <div className="relative group">
              <div className="w-10 h-10 bg-gray-800/60 border border-purple-500/30 rounded-full flex items-center justify-center hover:bg-purple-600/20 transition-all duration-300">
                <User
                  size={20}
                  className="text-gray-300 group-hover:text-purple-400 transition-colors duration-300"
                />
              </div>
              <div className="absolute hidden group-hover:block top-0 right-0 z-10 text-white rounded pt-12">
                <ul className="list-none m-0 p-2 bg-gray-900/90 backdrop-blur-sm rounded-md border border-purple-500/30 text-sm shadow-lg">
                  <li
                    onClick={logout}
                    className="py-2 px-4 cursor-pointer pr-10 hover:bg-purple-600/20 rounded transition-all duration-200 flex items-center gap-2"
                  >
                    <LogOut size={16} className="text-gray-400" />
                    Logout
                  </li>
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2 sm:gap-5">
            <p
              onClick={() => navigate("/buy")}
              className="cursor-pointer text-gray-300 hover:text-purple-400 transition-colors duration-300"
            >
              Pricing Plans
            </p>
            <button
              onClick={() => setShowLogin(true)}
              className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-7 sm:px-10 text-sm rounded-full border border-purple-500/30 shadow-lg shadow-purple-500/25 transition-all duration-300"
            >
              Get Started
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
