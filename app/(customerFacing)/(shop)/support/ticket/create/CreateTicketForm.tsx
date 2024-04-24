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
import { useRouter, useSearchParams } from "next/navigation";
import { addCommentToTicket, createTicket } from "@/app/data/support";

const ticketCreateSchema = z.object({
  title: z.string().trim().min(1, {
    message: "Ticket title cannot be empty",
  }),
  comment: z.string().trim(),
});

const CreateTicketForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const titleFromParams = searchParams.get("title");
  const createTicketForm = useForm<z.infer<typeof ticketCreateSchema>>({
    resolver: zodResolver(ticketCreateSchema),
    defaultValues: {
      title: titleFromParams === null ? "" : titleFromParams,
      comment: "",
    },
  });

  const redirectToTicketPage = (ticketId: number) => {
    router.push(`/support/ticket/${ticketId}`);
  };

  function onSubmit(values: z.infer<typeof ticketCreateSchema>) {
    createTicket(values.title)
      .then((ticketId) => {
        if (values.comment.length > 0) {
          addCommentToTicket(ticketId, values.comment)
            .then(() => redirectToTicketPage(ticketId))
            .catch((err) => {
              console.error(err);
              alert("Ticket created, but could not add comment");
              redirectToTicketPage(ticketId);
            });
        } else {
          redirectToTicketPage(ticketId);
        }
      })
      .catch((err) => {
        console.error(err);
        createTicketForm.setError("title", {
          message: "Could not create ticket",
        });
      });
  }

  return (
    <Form {...createTicketForm}>
      <form
        onSubmit={createTicketForm.handleSubmit(onSubmit)}
        className={"space-y-2 bg-primary p-4 rounded-md shadow-md text-accent"}
      >
        <FormField
          control={createTicketForm.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xl">Ticket title</FormLabel>
              <FormControl>
                <Input placeholder="Title..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={createTicketForm.control}
          name="comment"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xl">Comment</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Comment..."
                  className="min-h-[250px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="sm:w-fit w-full" variant={"secondary"} type="submit">
          Create ticket
        </Button>
      </form>
    </Form>
  );
};

export default CreateTicketForm;
