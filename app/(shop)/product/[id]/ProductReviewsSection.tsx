"use client";

import { TProductReview, deleteProductReview } from "@/app/data/products";
import ProductReviewsThread from "./ProductReviewsThread";
import ProductReviewForm from "./ProductReviewForm";
import { useEffect, useState } from "react";
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

interface IProductReviewsSectionProps {
  productId: number;
  initialReviews: TProductReview[];
  loggedInCustomerId?: number;
}

const ProductReviewsSection: React.FC<IProductReviewsSectionProps> = ({
  productId,
  initialReviews,
  loggedInCustomerId,
}) => {
  const [reviews, setReviews] = useState(initialReviews);

  const customersReview =
    loggedInCustomerId !== undefined
      ? reviews.find((review) => review.customerId === loggedInCustomerId)
      : undefined;

  const [customerHasReviewed, setCustomerHasReviewed] = useState(
    customersReview !== undefined
  );

  const [customerEditingReview, setCustomerEditingReview] = useState(false);

  const [isMounted, setIsMounted] = useState(false);
  const [reviewDeletedRequest, setReviewDeletedRequest] = useState(false);
  const [reviewPosted, setReviewPosted] = useState(false);
  const [reviewIdForDeleteRequest, setReviewIdForDeleteRequest] = useState(-1);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const deleteCustomerReview = (reviewId: number) => {
    setReviewIdForDeleteRequest(reviewId);
    setReviewDeletedRequest(true);
  };

  return (
    <div className="flex flex-col gap-4 bg-primary rounded-md shadow-md p-6">
      {reviews.length > 0 && (
        <ProductReviewsThread
          deleteReview={deleteCustomerReview}
          reviews={reviews}
          loggedInCustomerId={loggedInCustomerId}
          setCustomerEditingReview={setCustomerEditingReview}
        />
      )}
      {reviews.length > 0 &&
      (customerEditingReview ||
        !customerHasReviewed ||
        loggedInCustomerId === undefined) ? (
        <hr className="border-accent" />
      ) : (
        <></>
      )}

      {!customerHasReviewed && loggedInCustomerId === undefined && (
        <ProductReviewForm productId={productId} setReviews={setReviews} />
      )}
      {!customerHasReviewed && loggedInCustomerId !== undefined && (
        <ProductReviewForm
          setCustomerHasReviewed={setCustomerHasReviewed}
          productId={productId}
          setReviews={setReviews}
        />
      )}
      {customerEditingReview && (
        <ProductReviewForm
          productId={productId}
          editReview={customersReview}
          setReviews={setReviews}
        />
      )}
      {isMounted ? (
        <AlertDialog
          open={reviewDeletedRequest}
          onOpenChange={setReviewDeletedRequest}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirm deletion</AlertDialogTitle>
              <AlertDialogDescription className="text-accent-foreground/90">
                Are you sure you want to delete your review?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="bg-transparent border-secondary text-accent-foregound">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                className="bg-destructive"
                onClick={() => {
                  deleteProductReview(reviewIdForDeleteRequest)
                    .then((deleted) => {
                      setReviews((previousReviews) =>
                        previousReviews.filter(
                          (review) => review.id !== reviewIdForDeleteRequest
                        )
                      );
                      setCustomerHasReviewed(false);
                    })
                    .catch((err) => {
                      console.error(err);
                    });
                }}
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      ) : (
        <></>
      )}
    </div>
  );
};

export default ProductReviewsSection;
