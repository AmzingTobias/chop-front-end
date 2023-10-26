"use client";

import { useState } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

const ProductFavouriteBtn = () => {
  const [previewFavourite, setPreviewFavourite] = useState(false);

  //TODO Load from API
  const isFavourite = false;

  return (
    <div
      onMouseOver={() => setPreviewFavourite(true)}
      onMouseLeave={() => setPreviewFavourite(false)}
    >
      {isFavourite || previewFavourite ? (
        <div className="text-red-500">
          <AiFillHeart />
        </div>
      ) : (
        <AiOutlineHeart />
      )}
    </div>
  );
};

export default ProductFavouriteBtn;
