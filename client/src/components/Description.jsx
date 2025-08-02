import React from "react";
import { assets } from "../assets/assets";

const Description = () => {
  return (
    <div className="flex flex-col items-center justify-center my-24 p-6 md:px-28">
      <h1 className="text-3xl sm:text-4xl font-semibold mb-2">
        Create AL Images
      </h1>
      <p className="text-gray-500 mb-8">Turn your imagination into visuals</p>
      <div className="flex flex-cols gap-5 md:gap-14 md:flex-row items-center">
        <img
          className="w-80 xl:w-96 rounded-lg"
          src={assets.sample_img_1}
          alt=""
        />
        <div>
          <h2 className="text-3xl font-medium max-w-lg mb-4">
            Introducing the AI-Powered Text to Image Generator
          </h2>
          <p className="text-gray-600 mb-4">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nulla
            aperiam tenetur tempore, deserunt iste perspiciatis molestias labore
            veniam molestiae soluta libero nesciunt placeat eligendi, laborum
            nostrum incidunt obcaecati quam dicta.
          </p>
          <p className="text-gray-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus,
            nobis ducimus. Eius fugiat aliquid sit dignissimos possimus
            voluptate, beatae maiores aliquam totam quis quos id accusantium
            molestiae dolorum reprehenderit provident!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Description;
