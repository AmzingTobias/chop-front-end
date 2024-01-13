"use client";

import { useEffect, useRef } from "react";
import { BsStar, BsStarHalf, BsStarFill } from "react-icons/bs";

interface IProductReviewRatingProps {
  rating: number;
  numberOfStars: number;
  setRating?: React.Dispatch<number>;
}

const ProductReviewRating: React.FC<IProductReviewRatingProps> = ({
  rating,
  numberOfStars,
  setRating,
}) => {
  const starRef = useRef<HTMLDivElement>(null);

  const handleStarClick = (
    event: React.MouseEvent<HTMLDivElement>,
    index: number
  ) => {
    if (setRating !== undefined)
      if (starRef.current !== null) {
        const boundingBox = starRef.current.getBoundingClientRect();
        const relativeClickX = event.clientX - boundingBox.left;
        const starWidth = boundingBox.width / 5; // Assuming 5 stars
        const ratingToSet = index + 1;
        if (
          relativeClickX % starWidth > starWidth * 0.25 &&
          relativeClickX % starWidth < starWidth * 0.75
        ) {
          setRating(ratingToSet - 0.5); // Clicked on the left half, so set a half-star
        } else if (relativeClickX % starWidth > starWidth * 0.75) {
          setRating(ratingToSet); // Clicked on the left half, so set a half-star
        } else {
          setRating(ratingToSet - 1); // Clicked on the right half, so set a full star
        }
      }
  };

  return (
    <div
      className="flex flex-row text-secondary text-2xl w-fit gap-1"
      ref={starRef}
    >
      {[...Array(numberOfStars)].map((_, index) => {
        return (
          <div
            className={`${setRating === undefined ? "" : "cursor-pointer"}`}
            key={index}
            onClick={(event) => {
              handleStarClick(event, index);
            }}
          >
            {index + 1 <= rating ? (
              <BsStarFill />
            ) : rating - index !== 0.5 ? (
              <BsStar />
            ) : (
              <BsStarHalf />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ProductReviewRating;
