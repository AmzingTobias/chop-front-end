"use client";

import { EAccountTypes } from "@/app/data/auth";
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
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { IoCheckmark } from "react-icons/io5";
import { z } from "zod";

interface IStockAdjusterProps {
  accountTypeLoggedIn: EAccountTypes;
  productId: number;
  initialStockQuantity: number;
  setStockQuantity: React.Dispatch<React.SetStateAction<number>>;
}

export const editStockFormSchema = z
  .object({
    stock: z.coerce.number().min(0, { message: "Cannot be 0" }).int(),
  })
  .required();

const StockAdjuster: React.FC<IStockAdjusterProps> = (props) => {
  const form = useForm<z.infer<typeof editStockFormSchema>>({
    resolver: zodResolver(editStockFormSchema),
    defaultValues: {
      stock: props.initialStockQuantity,
    },
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [stockUpdated, setStockUpdated] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (stockUpdated) {
      // If the stock has been updated, set a timeout to revert it back to false after 1 seconds
      timeoutId = setTimeout(() => {
        setFormSubmitted(false);
        setStockUpdated(false);
      }, 1000);
    }
    return () => clearTimeout(timeoutId);
  }, [stockUpdated, formSubmitted]);

  const createFormSubmit = (values: z.infer<typeof editStockFormSchema>) => {
    setFormSubmitted(true);
    fetch(
      `${process.env.NEXT_PUBLIC_SERVER_API_HOST_ADDRESS}/v1/products/${props.productId}/stock/`,
      {
        headers: {
          "Content-type": "application/json",
        },
        credentials: "include",
        method: "PUT",
        body: JSON.stringify({
          stock: values.stock,
        }),
      }
    )
      .then((response) => {
        if (response.ok) {
          props.setStockQuantity(values.stock);
          setStockUpdated(true);
        } else {
          form.setError("stock", { message: "Stock not updated" });
          console.error(`Internal error: ${response.status}`);
          setFormSubmitted(false);
        }
      })
      .catch((err) => {
        setFormSubmitted(false);
        form.setError("root", { message: "Internal error" });
        console.error(err);
      });
  };

  if (props.accountTypeLoggedIn !== EAccountTypes.warehouse) {
    return null;
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(createFormSubmit)}
        className="space-y-2"
      >
        <FormField
          control={form.control}
          name="stock"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Stock quantity</FormLabel>
              <FormControl>
                <Input
                  className="text-accent "
                  placeholder="Stock"
                  type="number"
                  {...field}
                />
              </FormControl>
              <FormMessage className="max-w-fit" />
            </FormItem>
          )}
        />
        <Button
          disabled={formSubmitted}
          type="submit"
          className="w-full text-base"
          variant={"secondary"}
        >
          {formSubmitted && !stockUpdated ? (
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            <></>
          )}
          {stockUpdated && <IoCheckmark className="w-4 h-4 mr-2" />} Apply
        </Button>
      </form>
    </Form>
    // <div className="flex flex-row max-w-full">
    //   <form className="flex flex-row max-w-full">
    //     <input className="" type="number" defaultValue={stockQuantity}></input>
    //     <button>Apply</button>
    //   </form>
    // </div>
  );
};

export default StockAdjuster;
