"use client";

import { TProductReview, getReviewsForProduct } from "@/app/data/products";
import { useCallback, useEffect, useState } from "react";
import ProductReview from "./ProductReview";
import ProductReviewRating from "@/app/(customerFacing)/(shop)/product/[id]/ProductReviewRating";

interface IProductReviewsProps {
  productId: number;
}

const ProductReviews: React.FC<IProductReviewsProps> = (props) => {
  const useData = () => {
    const [data, setData] = useState<TProductReview[] | undefined>(undefined);
    const refreshData = useCallback(() => {
      getReviewsForProduct(props.productId)
        .then((dataFetched) => {
          setData(dataFetched);
        })
        .catch((err) => {
          console.error(err);
          setData([]);
        });
    }, [setData]);
    useEffect(() => {
      refreshData();
    }, [refreshData]);
    return { data, refreshData };
  };
  const { data: reviews, refreshData: refreshReviews } = useData();

  if (reviews === undefined) {
    return null;
  }

  if (reviews.length === 0) {
    return (
      <div className="w-full flex items-center justify-center mt-32">
        <h2 className="text-4xl italic">No reviews</h2>
      </div>
    );
  }

  return (
    <div className="bg-primary flex flex-col gap-2 p-4 rounded-md shadow-md">
      <div className="flex flex-row gap-4 font-semibold text-lg">
        <h3>Average Rating: </h3>
        <ProductReviewRating
          numberOfStars={5}
          rating={
            reviews.reduce((prev, current) => prev + current.rating, 0) /
            reviews.length /
            2.0
          }
        />
      </div>
      {reviews.map((review) => (
        <ProductReview
          key={review.id}
          refreshReviews={refreshReviews}
          review={review}
        />
      ))}
    </div>
  );
};

export default ProductReviews;
