"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export const formSchema = z
  .object({
    answer: z.string().min(1, { message: "Must provide an answer" }).trim(),
  })
  .required();

interface IProductQuestionPostAnswerProps {
  questionId: number;
}

const ProductQuestionPostAnswer: React.FC<IProductQuestionPostAnswerProps> = ({
  questionId,
}) => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [answerPosted, setAnswerPosted] = useState(false);
  const [answerPostedWasValid, setAnswerPostedWasValid] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      answer: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setFormSubmitted(true);
    fetch(
      `${process.env.NEXT_PUBLIC_SERVER_API_HOST_ADDRESS}/v1/products/questions/answer`,
      {
        headers: {
          "Content-type": "application/json",
        },
        credentials: "include",
        method: "POST",
        body: JSON.stringify({
          questionId: questionId,
          answer: values.answer,
        }),
      }
    )
      .then((response) => {
        if (response.ok) {
          // Answer posted
          setFormSubmitted(false);
          setAnswerPostedWasValid(true);
          setAnswerPosted(true);
          form.reset();
        } else {
          // Answer failed to post
          setFormSubmitted(false);
          setAnswerPostedWasValid(false);
          setAnswerPosted(true);
        }
      })
      .catch((err) => {
        console.error(err);
        // Ansewr failed to post
        setFormSubmitted(false);
        setAnswerPostedWasValid(false);
        setAnswerPosted(true);
      });
  }

  return (
    <div className="flex flex-col space-y-2">
      <h3 className="text-2xl font-semibold">Answer this question</h3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <fieldset
            disabled={answerPostedWasValid}
            className="space-y-3 text-accent-foreground"
          >
            <FormField
              control={form.control}
              name="answer"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      className="text-accent w-full flex"
                      placeholder="Answer..."
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
              className="text-base"
              variant={"secondary"}
            >
              {formSubmitted ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <></>
              )}
              Post Answer
            </Button>
          </fieldset>
        </form>
      </Form>
      {isMounted ? (
        <AlertDialog open={answerPosted} onOpenChange={setAnswerPosted}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                {answerPostedWasValid
                  ? "Answer posted"
                  : "Failed to post answer"}
              </AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogAction className="bg-secondary">Ok</AlertDialogAction>
          </AlertDialogContent>
        </AlertDialog>
      ) : (
        <></>
      )}
    </div>
  );
};

export default ProductQuestionPostAnswer;
