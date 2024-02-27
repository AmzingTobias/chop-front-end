"use client";

import {
  TDiscountCodeEntry,
  createNewDiscountCode,
} from "@/app/data/discounts";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogHeader,
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
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const brandSchema = z.object({
  code: z.string().min(1, {
    message: "Code must contain a character",
  }),
  percent: z.coerce.number().min(0).max(100).int(),
  active: z.boolean(),
  stackable: z.boolean(),
  remainingUses: z.coerce.number().min(-1).int(),
});

interface INewDiscountCodeFormProps {
  discountCodes: TDiscountCodeEntry[];
  refreshCodes: () => void;
}

const NewDiscountCodeForm: React.FC<INewDiscountCodeFormProps> = ({
  discountCodes,
  refreshCodes,
}) => {
  const [createdAlert, setCreatedAlert] = useState(false);
  const [createFailedAlert, setCreateFailedAlert] = useState(false);

  const form = useForm<z.infer<typeof brandSchema>>({
    resolver: zodResolver(brandSchema),
    defaultValues: {
      code: "",
      active: false,
      stackable: false,
      percent: 0,
      remainingUses: 0,
    },
  });

  const createNewCodeSubmit = (values: z.infer<typeof brandSchema>) => {
    const codeExists = discountCodes.findIndex(
      (discountCode) =>
        discountCode.code.toLowerCase() === values.code.toLowerCase()
    );

    if (codeExists === -1) {
      form.clearErrors("code");
      createNewDiscountCode(
        values.code,
        values.percent,
        values.remainingUses,
        values.active,
        values.stackable
      )
        .then(() => {
          form.reset();
          // Show code created
          setCreatedAlert(true);
          refreshCodes();
        })
        .catch((err) => {
          console.error(err);
          // Show code failed to create
          setCreateFailedAlert(true);
        });
    } else {
      form.setError("code", { message: "Code already in use" });
    }
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(createNewCodeSubmit)}
          className="space-y-2"
        >
          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Code</FormLabel>
                <FormControl>
                  <Input placeholder="Code..." {...field} />
                </FormControl>
                <FormDescription>This is the code</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="percent"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Percentage %</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    inputMode="numeric"
                    min={0}
                    max={100}
                    placeholder="Percent off..."
                    {...field}
                  />
                </FormControl>
                <FormDescription>This is the value of the code</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="remainingUses"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Number of uses</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    inputMode="numeric"
                    min={-1}
                    placeholder="Number of uses..."
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  This is the number of uses for the code
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="active"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Input
                    className="w-fit scale-110"
                    type="checkbox"
                    onChange={field.onChange}
                    checked={field.value}
                    disabled={field.disabled}
                    ref={field.ref}
                    onBlur={field.onBlur}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Active</FormLabel>
                  <FormDescription>
                    If the code will be active after creation
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="stackable"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Input
                    className="w-fit scale-110"
                    type="checkbox"
                    onChange={field.onChange}
                    checked={field.value}
                    disabled={field.disabled}
                    ref={field.ref}
                    onBlur={field.onBlur}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Stackable</FormLabel>
                  <FormDescription>
                    If the code can be used in conjunction with other codes
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />
          <Button type="submit">Create code</Button>
        </form>
      </Form>
      <AlertDialog open={createdAlert} onOpenChange={setCreatedAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Discount code created</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogAction className="bg-secondary">Ok</AlertDialogAction>
        </AlertDialogContent>
      </AlertDialog>
      <AlertDialog open={createFailedAlert} onOpenChange={setCreateFailedAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Failed to create code</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogAction className="bg-secondary">Ok</AlertDialogAction>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default NewDiscountCodeForm;
