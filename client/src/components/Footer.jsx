import React from "react";
import { assets } from "../assets/assets";
import { Facebook, Twitter, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <div className="flex items-center justify-between gap-4 py-3 mt-20 border-t border-purple-500/20">
      <img src={assets.logo} width={150} alt="" />
      <p className="flex-1 border-l border-purple-500/30 pl-4 text-sm text-gray-300 max-sm:hidden">
        Copyright © 2025 MindSketch. Empowering creativity through AI
        innovation.
      </p>
      <div className="flex gap-2.5">
        <div className="p-2 rounded-full bg-gray-800/60 border border-purple-500/30 hover:bg-purple-600/20 hover:border-purple-400/50 transition-all duration-300 cursor-pointer group">
          <Facebook
            size={20}
            className="text-gray-300 group-hover:text-purple-400 transition-colors duration-300"
          />
        </div>
        <div className="p-2 rounded-full bg-gray-800/60 border border-purple-500/30 hover:bg-purple-600/20 hover:border-purple-400/50 transition-all duration-300 cursor-pointer group">
          <Twitter
            size={20}
            className="text-gray-300 group-hover:text-purple-400 transition-colors duration-300"
          />
        </div>
        <div className="p-2 rounded-full bg-gray-800/60 border border-purple-500/30 hover:bg-purple-600/20 hover:border-purple-400/50 transition-all duration-300 cursor-pointer group">
          <Instagram
            size={20}
            className="text-gray-300 group-hover:text-purple-400 transition-colors duration-300"
          />
        </div>
      </div>
    </div>
  );
};

export default Footer;
