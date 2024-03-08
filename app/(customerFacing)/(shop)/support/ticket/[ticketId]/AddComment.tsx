"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { addCommentToTicket } from "@/app/data/support";

interface IAddCommentProps {
  ticketId: number;
  refreshComments: () => void;
  className?: string;
}

const ticketCommentSchema = z.object({
  comment: z.string().trim().min(1, {
    message: "Comment cannot be empty",
  }),
});

const AddComment: React.FC<IAddCommentProps> = ({
  ticketId,
  refreshComments,
  className,
}) => {
  const commentForm = useForm<z.infer<typeof ticketCommentSchema>>({
    resolver: zodResolver(ticketCommentSchema),
    defaultValues: {
      comment: "",
    },
  });

  function onSubmit(values: z.infer<typeof ticketCommentSchema>) {
    addCommentToTicket(ticketId, values.comment)
      .then(() => {
        refreshComments();
        commentForm.reset();
      })
      .catch((err) => {
        console.error(err);
        commentForm.setError("comment", { message: "Failed to add comment" });
      });
  }

  return (
    <Form {...commentForm}>
      <form
        onSubmit={commentForm.handleSubmit(onSubmit)}
        className={cn(
          "space-y-2 bg-primary p-4 rounded-md shadow-md text-accent",
          className
        )}
      >
        <FormField
          control={commentForm.control}
          name="comment"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xl">Comment</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Comment..."
                  className="min-h-[175px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button variant={"secondary"} type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default AddComment;
