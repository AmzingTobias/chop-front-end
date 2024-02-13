"use client";

import { createNewBrand } from "@/app/data/brands";
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
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { z } from "zod";

const brandSchema = z.object({
  name: z.string().min(3, {
    message: "Brand name must be at least 3 characters.",
  }),
});

interface INewBrandProps {
  refreshBrands: () => void;
}

const NewBrand: React.FC<INewBrandProps> = ({ refreshBrands }) => {
  const [brandCreatedAlert, setBrandCreatedAlert] = useState(false);
  const [brandCreateFailed, setBrandCreateFailed] = useState(false);

  const form = useForm<z.infer<typeof brandSchema>>({
    resolver: zodResolver(brandSchema),
    defaultValues: {
      name: "",
    },
  });

  const createBrandFormSubmit = (values: z.infer<typeof brandSchema>) => {
    createNewBrand(values.name)
      .then(() => {
        refreshBrands();
        setBrandCreatedAlert(true);
      })
      .catch((err) => {
        console.error(err);
        setBrandCreateFailed(true);
      });
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(createBrandFormSubmit)}
          className="space-y-2"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input placeholder="Brand name..." {...field} />
                </FormControl>
                <FormDescription>
                  This is the name for the new brand
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Create brand</Button>
        </form>
      </Form>
      <AlertDialog open={brandCreatedAlert} onOpenChange={setBrandCreatedAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Created new brand</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogAction className="bg-secondary">Ok</AlertDialogAction>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={brandCreateFailed} onOpenChange={setBrandCreateFailed}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Failed to create brand</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogAction className="bg-secondary">Ok</AlertDialogAction>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default NewBrand;
