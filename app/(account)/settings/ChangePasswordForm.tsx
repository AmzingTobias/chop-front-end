"use client";

import * as z from "zod";
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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z
  .object({
    password: z
      .string()
      .min(5)
      .max(25)
      .regex(/[0-9]/, { message: "Must contain a number" }),
    confirm: z
      .string()
      .min(5)
      .max(25)
      .regex(/[0-9]/, { message: "Must contain a number" }),
  })
  .required()
  .refine((data) => data.password === data.confirm, {
    message: "Passwords don't match",
    path: ["confirm"], // path of error
  });

export function ChangePasswordForm() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirm: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    fetch(
      `${process.env.NEXT_PUBLIC_SERVER_API_HOST_ADDRESS}/v1/auth/change-password`,
      {
        headers: {
          "Content-type": "application/json",
        },
        credentials: "include",
        method: "PUT",
        body: JSON.stringify({
          "new-password": values.password,
        }),
      }
    )
      .then((response) => {
        if (response.ok) {
          alert("Password updated");
        } else {
          alert("Didn't update");
        }
      })
      .catch((err) => {
        alert(err);
        console.error(err);
      });
    console.log(values);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirm"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="confirm password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          className="bg-gradient-to-t from-indigo-900 to-blue-900 hover:from-indigo-900/60 hover:to-blue-900/60 active:bg-none active:bg-blue-800"
          type="submit"
        >
          Submit
        </Button>
      </form>
    </Form>
  );
}
