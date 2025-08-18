import React from "react";
import { stepsData } from "../assets/assets";
import { motion } from "framer-motion";

const Steps = () => {
  return (
    <motion.div
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="flex flex-col items-center justify-center my-32"
    >
      <h1 className="text-3xl sm:text-4xl font-semibold mb-2 text-white">
        How it works
      </h1>
      <p className="text-lg text-gray-300 mb-8">
        Transform Your Ideas Into Professional Visuals with AI Magic
      </p>
      <div className="space-y-4 w-full max-w-3xl text-sm">
        {stepsData.map((item, index) => {
          const IconComponent = item.icon;
          return (
            <motion.div
              key={index}
              className="flex items-center gap-4 p-5 px-8 bg-gray-900/60 backdrop-blur-sm shadow-lg border border-purple-500/30 cursor-pointer hover:scale-[1.02] hover:bg-gray-800/60 hover:border-purple-400/50 transition-all duration-300 rounded-lg"
              whileHover={{ y: -2 }}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="p-2 rounded-full bg-purple-600/20 border border-purple-500/40">
                <IconComponent size={24} className="text-purple-400" />
              </div>
              <div>
                <h2 className="text-xl font-medium text-white">{item.title}</h2>
                <p className="text-gray-400">{item.description}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default Steps;
