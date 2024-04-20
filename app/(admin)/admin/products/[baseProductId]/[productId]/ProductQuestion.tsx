"use client";

import { IProductQuestion, deleteProductQuestion } from "@/app/data/products";
import { AiOutlineClose } from "react-icons/ai";
import ProductQuestionAnswer from "./ProductQuestionAnswer";
import ProductQuestionPostAnswer from "./ProductQuestionPostAnswer";
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

interface IProductQuestionProps {
  question: IProductQuestion;
  refreshQuestions: () => void;
}

const ProductQuestion: React.FC<IProductQuestionProps> = ({
  question,
  refreshQuestions,
}) => {
  const [confirmDelete, setConfirmDelete] = useState(false);

  const requestDeleteQuestion = () => {
    deleteProductQuestion(question.id)
      .then((deleted) => {
        if (!deleted) {
          console.error("Could not delete question");
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
      <div className="w-full flex-col space-y-4 mt-0 p-6 bg-primary flex shadow-md rounded-sm">
        <div className="flex flex-row">
          <div className="flex flex-col">
            <h3 className="text-3xl font-semibold">{question.question}</h3>
            <p className="italic">
              Asked on{" "}
              {new Date(
                question.askedOn as unknown as string
              ).toLocaleDateString()}
            </p>
          </div>
          <div
            className="ml-auto hover:opacity-80 cursor-pointer h-fit"
            onClick={() => setConfirmDelete(true)}
          >
            <AiOutlineClose size={"1.5rem"} />
          </div>
        </div>
        <div className="flex-col space-y-1">
          {question.answers &&
            question.answers.map((answer) => {
              return (
                <ProductQuestionAnswer
                  key={answer.id}
                  answer={answer}
                  refreshQuestions={refreshQuestions}
                />
              );
            })}
        </div>
        <>
          {question.answers !== undefined && question.answers.length > 0 && (
            <hr className="border-accent" />
          )}
          <ProductQuestionPostAnswer
            questionId={question.id}
            refreshQuestions={refreshQuestions}
          />
        </>
      </div>
      <AlertDialog open={confirmDelete} onOpenChange={setConfirmDelete}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm deletion</AlertDialogTitle>
            <AlertDialogDescription className="text-accent-foreground/90">
              Are you sure you want to delete this question
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-transparent border-secondary text-accent-foregound">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive"
              onClick={() => {
                requestDeleteQuestion();
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

export default ProductQuestion;
