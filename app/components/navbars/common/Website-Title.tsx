import { useState } from "react";
import { Raleway } from "next/font/google";
const raleway = Raleway({ subsets: ["latin"] });

const WebsiteTitle = () => {
  return (
    <div className="w-full">
      <h1
        className={`text-5xl text-white font-extrabold hover:text-gray-300 text-center ${raleway.className}`}
      >
        chop
      </h1>
    </div>
  );
};

export default WebsiteTitle;
