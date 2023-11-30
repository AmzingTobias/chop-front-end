"use client";

import { useState } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

const ProductFavouriteBtn = () => {
  //TODO Load from API
  const [isFavourite, setIsFavourite] = useState(false);

  return (
    <div
      onClick={(event) => {
        event.preventDefault();
        setIsFavourite((prevToggle) => !prevToggle);
      }}
      className="relative flex justify-center cursor-default bg-accent rounded-full p-1.5 text-secondary text-xl "
    >
      <AiFillHeart
        className={`absolute hover:opacity-100 ${
          isFavourite ? "opacity-100" : "opacity-0"
        }`}
      />
      <AiOutlineHeart style={{ strokeWidth: "50px" }} />
    </div>
  );
};

export default ProductFavouriteBtn;
