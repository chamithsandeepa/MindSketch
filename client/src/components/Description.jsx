import React from "react";
import { assets } from "../assets/assets";
import { motion } from "framer-motion";

const Description = () => {
  return (
    <motion.div
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="flex flex-col items-center justify-center my-24 p-6 md:px-28"
    >
      <h1 className="text-3xl sm:text-4xl font-semibold mb-2 text-white">
        Create AI Images
      </h1>
      <p className="text-gray-300 mb-8">
        Turn your imagination into professional visuals
      </p>
      <div className="flex flex-cols gap-5 md:gap-14 md:flex-row items-center">
        <motion.img
          className="w-80 xl:w-96 rounded-lg border border-purple-500/30 shadow-lg shadow-purple-500/20"
          src={assets.sample_img_1}
          alt=""
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        />
        <div>
          <h2 className="text-3xl font-medium max-w-lg mb-4 text-white">
            Introducing the AI-Powered Text to Image Generator
          </h2>
          <p className="text-gray-300 mb-4">
            Experience the future of digital creativity with our cutting-edge AI
            technology. Our advanced neural networks understand complex
            descriptions and transform them into stunning, high-resolution
            images that capture every detail of your vision. Whether you're a
            designer, marketer, or creative enthusiast, our platform empowers
            you to bring any concept to life instantly.
          </p>
          <p className="text-gray-400">
            From photorealistic portraits to abstract art, fantasy landscapes to
            product mockups - our AI handles it all with remarkable precision
            and artistic flair. No more waiting for designers or struggling with
            complex software. Simply describe what you see in your mind, and
            watch as our intelligent system crafts professional-quality visuals
            that exceed your expectations.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default Description;
