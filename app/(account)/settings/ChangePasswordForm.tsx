"use client";

import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";

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
  const [confirmBoxOpen, setConfirmBoxOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [passwordChangeLoading, setPasswordChangeLoading] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

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
    setPasswordChangeLoading(true);
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
          setConfirmBoxOpen(true);
          setPasswordChangeLoading(false);
        } else {
          console.error("Password change failed");
          setPasswordChangeLoading(false);
        }
      })
      .catch((err) => {
        console.error(err);
        setPasswordChangeLoading(false);
      });
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg">New password*</FormLabel>
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
                <FormLabel className="text-lg">Confirm password*</FormLabel>
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
          <Button disabled={passwordChangeLoading} type="submit">
            {passwordChangeLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <></>
            )}
            Submit
          </Button>
        </form>
      </Form>
      {isMounted ? (
        <AlertDialog open={confirmBoxOpen} onOpenChange={setConfirmBoxOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Password updated</AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogAction>Ok</AlertDialogAction>
          </AlertDialogContent>
        </AlertDialog>
      ) : (
        <></>
      )}
    </>
  );
}
