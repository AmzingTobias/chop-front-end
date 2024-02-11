"use client";
import {
  TBaseProduct,
  TProductType,
  updateBaseProduct,
} from "@/app/data/products";
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useState } from "react";

interface IUpdateBaseProductProps {
  baseProduct: TBaseProduct;
}

const baseProductSchema = z.object({
  description: z.string().min(10, {
    message: "Description must be at least 2 characters.",
  }),
});

const UpdateBaseProductDescription: React.FC<IUpdateBaseProductProps> = ({
  baseProduct,
}) => {
  const form = useForm<z.infer<typeof baseProductSchema>>({
    resolver: zodResolver(baseProductSchema),
    defaultValues: {
      description: baseProduct.description,
    },
  });

  const [couldNotUpdateBoxOpen, setCouldNotUpdateBoxOpen] = useState(false);
  const [updatedBoxOpen, setUpdatedBoxOpen] = useState(false);

  const sendUpdate = (values: z.infer<typeof baseProductSchema>) => {
    updateBaseProduct(baseProduct.id, values.description)
      .then((updated) => {
        if (updated) {
          setUpdatedBoxOpen(true);
        } else {
          setCouldNotUpdateBoxOpen(true);
        }
      })
      .catch((err) => {
        console.error(err);
        setCouldNotUpdateBoxOpen(true);
      });
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(sendUpdate)} className="space-y-2">
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input placeholder="Description..." {...field} />
                </FormControl>
                <FormDescription>
                  This is the description for the base product
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Update</Button>
        </form>
      </Form>
      <AlertDialog
        open={couldNotUpdateBoxOpen}
        onOpenChange={setCouldNotUpdateBoxOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Failed to update description</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogAction className="bg-secondary">Ok</AlertDialogAction>
        </AlertDialogContent>
      </AlertDialog>
      <AlertDialog open={updatedBoxOpen} onOpenChange={setUpdatedBoxOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Description updated</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogAction className="bg-secondary">Ok</AlertDialogAction>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default UpdateBaseProductDescription;
