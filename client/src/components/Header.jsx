import React from "react";
import { assets } from "../assets/assets";

const Header = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center my-20">
      <div className="text-stone-500 inline-flex text-center gap-2 bg-white px-6 py-1 rounded-full border border-neutral-500">
        <p>Best text to image generator</p>
        <img src={assets.star_icon} alt="" />
      </div>
      <h1 className="text-4xl max-w-[300px] sm:text-7xl sm:max-w-[590px] mx-auto mt-10 text-center">
        Turn text to <span className="text-blue-600">image</span>, in seconds.
      </h1>
      <p className="text-center max-w-xl  mx-auto mt-5">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis est
        reprehenderit, ipsa voluptas esse ex dolore voluptatibus atque quo
        consequuntur commodi necessitatibus alias recusandae at nobis veritatis
        ea fugit mollitia.
      </p>
      <button className="sm:text-lg text-white bg-black w-auto mt-8 px-12 py-2.5 flex items-center gap-2 rounded-full">
        Generate Images <img className="h-6" src={assets.star_group} alt="" />
      </button>
      <div className="flex flex-wrap justify-center gap-3 mt-16">
        {Array(6)
          .fill("")
          .map((item, index) => (
            <img
              className="rounded hover:scale-105 transition-all duration-300 cursor-pointer max-sm:w-10"
              src={index % 2 === 0 ? assets.sample_img_2 : assets.sample_img_1}
              alt=""
              key={index}
              width={70}
            />
          ))}
      </div>
      <p className="mt-2 text-neutral-600">Generated images from MindSketch</p>
    </div>
  );
};

export default Header;
