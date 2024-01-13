"use client";

import { z } from "zod";
import ProductReviewRating from "./ProductReviewRating";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  TProductReview,
  getLastPurchaseDateForProduct,
  getReviewsForProduct,
  postProductReview,
  updateProductReview,
} from "@/app/data/products";

interface IProductReviewFormProps {
  productId: number;
  setReviews: React.Dispatch<React.SetStateAction<TProductReview[]>>;
  setCustomerHasReviewed?: React.Dispatch<React.SetStateAction<boolean>>;
  editReview?: TProductReview;
}

const formSchema = z
  .object({
    review: z
      .string()
      .min(10, { message: "Review must be longer than 10 characters" })
      .trim(),
  })
  .required();

const ProductReviewForm: React.FC<IProductReviewFormProps> = ({
  productId,
  setReviews,
  setCustomerHasReviewed,
  editReview,
}) => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [reviewPosted, setReviewPosted] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [rating, setRating] = useState(
    editReview === undefined ? 5 : editReview.rating / 2.0
  );

  const [lastPurchaseDateForProduct, setLastPurchaseDateForProduct] = useState<
    Date | undefined
  >(undefined);

  useEffect(() => {
    getLastPurchaseDateForProduct(productId).then((date) => {
      setLastPurchaseDateForProduct(date);
    });
  }, [productId]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      review: editReview === undefined ? "" : editReview.review,
    },
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (editReview !== undefined) {
      setFormSubmitted(true);
      // Review is currently being edited
      updateProductReview(editReview.id, values.review, Math.floor(rating * 2))
        .then((updated) => {
          setReviewPosted(true);
          setFormSubmitted(false);
          setReviews((prevReviews) =>
            prevReviews.map((review) => {
              if (review.id === editReview.id) {
                return {
                  ...review,
                  rating: Math.floor(rating * 2.0),
                  review: values.review,
                };
              } else {
                return review;
              }
            })
          );
        })
        .catch((_) => {
          setFormSubmitted(false);
          form.setError("review", { message: "Review failed to update" });
        });
    } else {
      setFormSubmitted(true);
      // New review was posted
      if (setCustomerHasReviewed !== undefined) {
        postProductReview(
          Number(productId),
          Math.floor(rating * 2.0),
          values.review
        )
          .then((posted) => {
            setFormSubmitted(false);
            setReviewPosted(true);
            getReviewsForProduct(productId)
              .then((reviews) => {
                setReviews(reviews);
              })
              .catch((err) => {
                console.error(err);
              });
          })
          .catch((err) => {
            setFormSubmitted(false);
            form.setError("review", { message: "Review failed to post" });
          });
      }
    }
  }

  if (lastPurchaseDateForProduct === undefined) {
    return (
      <div className="flex flex-col gap-4 ">
        <h3 className="text-center text-2xl">
          Purchase this product to review it
        </h3>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-3xl font-semibold underline">
        {editReview === undefined
          ? "Write your own review"
          : "Edit your previous review"}
      </h3>
      <div className="flex flex-col gap-4">
        <ProductReviewRating
          rating={rating}
          numberOfStars={5}
          setRating={
            lastPurchaseDateForProduct !== undefined ? setRating : undefined
          }
        />
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-3 text-accent-foreground"
          >
            <FormField
              control={form.control}
              name="review"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      className="text-accent w-full flex min-h-[160px]"
                      placeholder="Review..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              disabled={formSubmitted}
              type="submit"
              className="text-base w-full sm:w-fit"
              variant={"secondary"}
            >
              {formSubmitted ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <></>
              )}
              {editReview === undefined ? "Post review" : "Update review"}
            </Button>
          </form>
        </Form>
        {isMounted ? (
          <AlertDialog open={reviewPosted} onOpenChange={setReviewPosted}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  {editReview === undefined
                    ? "Review posted"
                    : "Review updated"}
                </AlertDialogTitle>
              </AlertDialogHeader>
              <AlertDialogAction
                className="bg-secondary"
                onClick={() => {
                  if (
                    setCustomerHasReviewed !== undefined &&
                    editReview === undefined
                  ) {
                    setCustomerHasReviewed(true);
                  }
                }}
              >
                Ok
              </AlertDialogAction>
            </AlertDialogContent>
          </AlertDialog>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default ProductReviewForm;
