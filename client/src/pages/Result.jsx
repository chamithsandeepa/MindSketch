import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { motion } from "framer-motion";
import { AppContext } from "../context/AppContext";

const Result = () => {
  const [image, setImage] = useState(assets.sample_img_1);
  const [isImageloaded, setIsImageLoaded] = useState(false);
  const [Loading, setLoading] = useState(false);
  const [input, setInput] = useState("");

  const { generateImage } = useContext(AppContext);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (input) {
      const generatedImage = await generateImage(input);
      if (generatedImage) {
        setIsImageLoaded(true);
        setImage(generatedImage);
      }
    }
    setLoading(false);
  };

  return (
    <motion.form
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onSubmit={onSubmitHandler}
      className="flex flex-col min-h-[90vh] justify-center items-center"
    >
      <div>
        <div className="relative">
          <img
            className="max-w-sm rounded-lg border border-purple-500/20"
            src={image}
            alt=""
          />
          <span
            className={`absolute bottom-0 left-0 h-1 bg-purple-500 rounded-bl-lg transition-all duration-[10s] ${
              Loading ? "w-full" : "w-0"
            }`}
          ></span>
        </div>
        <p
          className={`text-purple-400 text-sm mt-3 ${!Loading ? "hidden" : ""}`}
        >
          Loading...
        </p>
      </div>
      {!isImageloaded && (
        <div className="flex w-full max-w-xl bg-gray-800/60 border border-purple-500/30 text-gray-300 text-sm p-0.5 mt-10 rounded-full backdrop-blur-sm">
          <input
            onChange={(e) => setInput(e.target.value)}
            value={input}
            className="flex-1 bg-transparent outline-none ml-8 max-sm:w-20 placeholder-gray-500 text-gray-300"
            type="text"
            placeholder="Describe what you want to Generate"
          />
          <button
            className="bg-purple-600 hover:bg-purple-500 px-10 sm:px-16 py-3 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25 text-white"
            type="submit"
          >
            Generate
          </button>
        </div>
      )}
      {isImageloaded && (
        <div className="flex gap-2 flex-wrap justify-center text-gray-300 text-sm p-0.5 mt-10 rounded-full">
          <p
            onClick={() => setIsImageLoaded(false)}
            className="bg-transparent border border-purple-500/30 hover:border-purple-400/50 text-gray-300 hover:text-gray-100 px-8 py-3 rounded-full cursor-pointer transition-all duration-300 hover:bg-purple-600/10"
          >
            Generate Another
          </p>
          <a
            className="bg-purple-600 hover:bg-purple-500 px-10 py-3 rounded-full cursor-pointer transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25 text-white"
            href={image}
            download=""
          >
            Download
          </a>
        </div>
      )}
    </motion.form>
  );
};

export default Result;
