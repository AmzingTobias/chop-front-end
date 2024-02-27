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

interface IAskAProductQuestionFormProps {
  productId: number | string;
}

const formSchema = z
  .object({
    question: z
      .string()
      .min(5, { message: "Question must be longer than 5 characters" })
      .trim(),
  })
  .required();

const AskAProductQuestionForm: React.FC<IAskAProductQuestionFormProps> = ({
  productId,
}) => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [questionPosted, setQuestionPosted] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      question: "",
    },
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  function onSubmit(values: z.infer<typeof formSchema>) {
    fetch(
      `${process.env.NEXT_PUBLIC_SERVER_API_HOST_ADDRESS}/v1/products/questions/${productId}`,
      {
        headers: {
          "Content-type": "application/json",
        },
        credentials: "include",
        method: "POST",
        body: JSON.stringify({
          question: values.question,
        }),
      }
    )
      .then((response) => {
        if (response.ok) {
          // Answer posted
          setFormSubmitted(false);
          setQuestionPosted(true);
          form.reset();
        } else {
          // Answer failed to post
          setFormSubmitted(false);
          setQuestionPosted(false);
          form.setError("root", { message: "Question failed to post" });
        }
      })
      .catch((err) => {
        console.error(err);
        // Ansewr failed to post
        setFormSubmitted(false);
        setQuestionPosted(false);
        form.setError("root", { message: "Question failed to post" });
      });
  }

  return (
    <div className="bg-accent text-accent-foreground p-6 rounded-md shadow-md">
      <div className="flex flex-col space-y-3">
        <h3 className="text-3xl font-semibold underline">Ask a question</h3>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-3 text-accent-foreground"
          >
            <FormField
              control={form.control}
              name="question"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      className="text-accent w-full flex min-h-[160px]"
                      placeholder="Question to ask..."
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
              Ask question
            </Button>
          </form>
        </Form>
        {isMounted ? (
          <AlertDialog open={questionPosted} onOpenChange={setQuestionPosted}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Question posted</AlertDialogTitle>
              </AlertDialogHeader>
              <AlertDialogAction className="bg-secondary">Ok</AlertDialogAction>
            </AlertDialogContent>
          </AlertDialog>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default AskAProductQuestionForm;
