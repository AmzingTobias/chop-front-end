"use client";

import ProductQuestionAnswerRating from "@/app/(customerFacing)/(shop)/product/[id]/ProductQuestionAnswerRating";
import {
  IProductQuestionAnswer,
  deleteProductQuestionAnswer,
} from "@/app/data/products";
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
import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

interface IProductQuestionAnswerProps {
  answer: IProductQuestionAnswer;
  refreshQuestions: () => void;
}

const ProductQuestionAnswer: React.FC<IProductQuestionAnswerProps> = ({
  answer,
  refreshQuestions,
}) => {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const requestDeleteAnswer = () => {
    deleteProductQuestionAnswer(answer.id)
      .then((deleted) => {
        if (!deleted) {
          console.error("Could not delete answer");
        }
        refreshQuestions();
      })
      .catch((err) => {
        console.error(err);
        refreshQuestions();
      });
  };

  return (
    <>
      <div className="flex flex-row gap-2 bg-accent w-full text-accent-foreground p-2 rounded-md ">
        <p>{answer.answer}</p>
        <div className="ml-auto flex flex-row items-center">
          <ProductQuestionAnswerRating
            overallRating={answer.overallRating}
            answerId={answer.id}
            customerLoggedIn={false}
          />
          <div
            className="hover:opacity-80 cursor-pointer"
            onClick={() => setConfirmDelete(true)}
          >
            <AiOutlineClose size={"1.2rem"} />
          </div>
        </div>
      </div>
      <AlertDialog open={confirmDelete} onOpenChange={setConfirmDelete}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm deletion</AlertDialogTitle>
            <AlertDialogDescription className="text-accent-foreground/90">
              Are you sure you want to delete this answer
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-transparent border-secondary text-accent-foregound">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive"
              onClick={() => {
                requestDeleteAnswer();
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

export default ProductQuestionAnswer;
