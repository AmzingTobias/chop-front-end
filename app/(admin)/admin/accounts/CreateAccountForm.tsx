"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface ICreateAccountFormProps {
  refreshAccounts: () => void;
}

export const createAccountSchema = z
  .object({
    email: z.string().email(),
    password: z
      .string()
      .min(5, "Password must have a minimum of 5 characters")
      .max(25, "Password must not be longer than 25 characters")
      .regex(/[0-9]/, { message: "Must contain a number" }),
    accountType: z.enum(["customer", "sales", "admin", "support", "warehouse"]),
  })
  .required();

const CreateAccountForm: React.FC<ICreateAccountFormProps> = ({
  refreshAccounts,
}) => {
  const form = useForm<z.infer<typeof createAccountSchema>>({
    resolver: zodResolver(createAccountSchema),
    defaultValues: {
      email: "",
      password: "",
      accountType: "customer",
    },
  });

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [accountCreated, setAccountCreated] = useState(false);

  const createFormSubmit = (values: z.infer<typeof createAccountSchema>) => {
    setFormSubmitted(true);
    fetch(
      `${process.env.NEXT_PUBLIC_SERVER_API_HOST_ADDRESS}/v1/auth/${values.accountType}/create`,
      {
        headers: {
          "Content-type": "application/json",
        },
        credentials: "include",
        method: "POST",
        body: JSON.stringify({
          email: values.email,
          password: values.password,
        }),
      }
    )
      .then((response) => {
        if (response.ok) {
          setFormSubmitted(false);
          refreshAccounts();
          setAccountCreated(true);
        } else if (response.status === 409) {
          form.setError("email", { message: "Email already in use" });
        } else {
          console.error(`Internal error: ${response.status}`);
          form.setError("root", { message: "Internal error" });
        }
      })
      .catch((err) => {
        setFormSubmitted(false);
        form.setError("root", { message: "Internal error" });
        console.error(err);
      });
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(createFormSubmit)}
          className="space-y-2"
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
                <FormMessage className="max-w-[200px]" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="accountType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Account type*</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select an account type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="customer">Customer</SelectItem>
                      <SelectItem value="sales">Sales</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="support">Support</SelectItem>
                      <SelectItem value="warehouse">Warehouse</SelectItem>
                    </SelectContent>
                  </Select>
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
            Create
          </Button>
        </form>
      </Form>
      <AlertDialog open={accountCreated} onOpenChange={setAccountCreated}>
        <AlertDialogContent>
          <AlertDialogTitle>Account created</AlertDialogTitle>
          <AlertDialogAction className="bg-secondary">Ok</AlertDialogAction>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default CreateAccountForm;
