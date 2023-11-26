"use client";

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
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

export const formSchema = z
  .object({
    email: z.string().email(),
    password: z
      .string()
      .min(5, "Password must have a minimum of 5 characters")
      .max(25, "Password must not be longer than 25 characters")
      .regex(/[0-9]/, { message: "Must contain a number" }),
  })
  .required();

interface IAccountFormProps {
  onSubmit: SubmitHandler<z.infer<typeof formSchema>>;
  formBtnText: string;
  formSubmitted?: boolean;
  emailErrorMsg?: string;
  passwordErrorMsg?: string;
}

const AccountForm: React.FC<IAccountFormProps> = ({
  onSubmit,
  formBtnText,
  formSubmitted = false,
  emailErrorMsg = "",
  passwordErrorMsg = "",
}) => {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (emailErrorMsg.length === 0) {
      form.clearErrors("email");
    } else {
      form.setError("email", { message: emailErrorMsg }, { shouldFocus: true });
    }
  }, [form, emailErrorMsg]);

  useEffect(() => {
    if (passwordErrorMsg.length === 0) {
      form.clearErrors("password");
    } else {
      form.setError(
        "password",
        { message: passwordErrorMsg },
        { shouldFocus: true }
      );
    }
  }, [form, passwordErrorMsg]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 text-accent-foreground"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email*</FormLabel>
              <FormControl>
                <Input
                  className="text-accent"
                  type="email"
                  placeholder="Email"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password*</FormLabel>
              <FormControl>
                <Input
                  className="text-accent"
                  type="password"
                  placeholder="Password"
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
          className="w-full text-base"
          variant={"secondary"}
        >
          {formSubmitted ? (
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            <></>
          )}
          {formBtnText}
        </Button>
      </form>
    </Form>
  );
};

export default AccountForm;
