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
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

export const createProductSchema = z
  .object({
    name: z.string().min(2, "Name must be longer"),
    description: z.string(),
    price: z.coerce.number().min(0),
    stockCount: z.coerce.number().min(0).int(),
    available: z.boolean(),
  })
  .required();

interface IFormDetailsProps {
  handleOnSubmit: SubmitHandler<z.infer<typeof createProductSchema>>;
}

const FormDetails: React.FC<IFormDetailsProps> = ({ handleOnSubmit }) => {
  const createProductForm = useForm<z.infer<typeof createProductSchema>>({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      stockCount: 0,
      available: false,
    },
  });

  return (
    <Form {...createProductForm}>
      <form
        onSubmit={createProductForm.handleSubmit(handleOnSubmit)}
        className="p-2 text-accent flex flex-col gap-4 max-h-fit"
      >
        <FormField
          control={createProductForm.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product name</FormLabel>
              <FormControl>
                <Input placeholder="Name..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={createProductForm.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product description</FormLabel>
              <FormControl>
                <Textarea
                  className="text-accent w-full flex min-h-[160px]"
                  placeholder="Description..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={createProductForm.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  min={0}
                  placeholder="Price..."
                  inputMode="decimal"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={createProductForm.control}
          name="stockCount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Stock count</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  inputMode="numeric"
                  min={0}
                  placeholder="Stock count..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={createProductForm.control}
          name="available"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
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
                <FormLabel>Available</FormLabel>
                <FormDescription>
                  If the product is available for purchase
                </FormDescription>
              </div>
            </FormItem>
          )}
        />
        <Button type="submit" className="text-base" variant={"secondary"}>
          Create product
        </Button>
      </form>
    </Form>
  );
};

export default FormDetails;
