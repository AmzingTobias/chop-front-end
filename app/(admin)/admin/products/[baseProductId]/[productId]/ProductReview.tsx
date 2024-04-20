"use client";
import ProductReviewRating from "@/app/(customerFacing)/(shop)/product/[id]/ProductReviewRating";
import { TProductReview, deleteReviewForProduct } from "@/app/data/products";
import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface IProductReviewProps {
  review: TProductReview;
  refreshReviews: () => void;
}

const ProductReview: React.FC<IProductReviewProps> = ({
  review,
  refreshReviews,
}) => {
  const [confirmDelete, setConfirmDelete] = useState(false);

  const deleteReview = () => {
    deleteReviewForProduct(review.id)
      .then((deleted) => {
        if (!deleted) {
          console.error("Review could not be deleted");
        }
        refreshReviews();
      })
      .catch((err) => {
        console.error(err);
        refreshReviews();
      });
  };

  return (
    <>
      <div
        key={review.id}
        className="flex flex-col p-4 bg-accent text-accent-foreground rounded-md gap-2"
      >
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-0">
          <ProductReviewRating numberOfStars={5} rating={review.rating / 2.0} />
          <div className="flex flex-col ml-auto justify-end">
            <div
              className="cursor-pointer hover:opacity-80"
              onClick={() => setConfirmDelete(true)}
            >
              <AiOutlineClose size={"1.5rem"} />
            </div>
          </div>
        </div>
        <div className="flex flex-col space-x-4">
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
        <h3>{review.review}</h3>
      </div>
      <AlertDialog open={confirmDelete} onOpenChange={setConfirmDelete}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm deletion</AlertDialogTitle>
            <AlertDialogDescription className="text-accent-foreground/90">
              Are you sure you want to delete the review
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-transparent border-secondary text-accent-foregound">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive"
              onClick={() => {
                deleteReview();
              }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default ProductReview;
