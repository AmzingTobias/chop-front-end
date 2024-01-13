"use client";

import { TProductReview } from "@/app/data/products";
import ProductReviewRating from "./ProductReviewRating";
import { Button } from "@/components/ui/button";

interface IProductReviewsThreadProps {
  reviews: TProductReview[];
  deleteReview: (reviewId: number) => void;
  loggedInCustomerId?: number;
  setCustomerEditingReview?: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProductReviewsThread: React.FC<IProductReviewsThreadProps> = ({
  reviews,
  deleteReview,
  loggedInCustomerId,
  setCustomerEditingReview,
}) => {
  return (
    <div className="flex flex-col gap-4 ">
      {reviews.map((review) => (
        <div
          key={review.id}
          className="flex flex-col p-4 bg-accent text-accent-foreground rounded-md gap-2"
        >
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-0">
            <ProductReviewRating
              numberOfStars={5}
              rating={review.rating / 2.0}
            />
            <div className="flex flex-col sm:flex-row sm:space-x-4 sm:ml-auto">
              {review.updatedOn !== null && (
                <small className="font-bold">
                  Updated on:{" "}
                  {new Date(
                    review.updatedOn as unknown as string
                  ).toLocaleDateString()}
                </small>
              )}
              <small
                className={`${review.updatedOn !== null ? "line-through" : ""}`}
              >
                Posted on:{" "}
                {new Date(
                  review.createdOn as unknown as string
                ).toLocaleDateString()}
              </small>
            </div>
          </div>
          <h3>{review.review}</h3>
          {loggedInCustomerId === review.customerId &&
            setCustomerEditingReview !== undefined && (
              <div className="flex flex-row gap-4">
                <Button
                  onClick={() => setCustomerEditingReview(true)}
                  variant={"secondary"}
                  className="w-fit"
                >
                  Edit your review
                </Button>
                <Button
                  onClick={() => {
                    setCustomerEditingReview(false), deleteReview(review.id);
                  }}
                  variant={"secondary"}
                  className="w-fit"
                >
                  Delete your review
                </Button>
              </div>
            )}
        </div>
      ))}
    </div>
  );
};

export default ProductReviewsThread;
