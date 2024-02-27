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
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

export const productTypeSchema = z.object({
  name: z.string().min(3, {
    message: "Product type name must be at least 3 characters.",
  }),
});

interface IProductTypeFormProps {
  defaultValues?: { name: string };
  onFormSubmit: SubmitHandler<z.infer<typeof productTypeSchema>>;
  submitBtnText: string;
}

const ProductTypeForm: React.FC<IProductTypeFormProps> = ({
  defaultValues = { name: "" },
  onFormSubmit,
  submitBtnText,
}) => {
  const form = useForm<z.infer<typeof productTypeSchema>>({
    resolver: zodResolver(productTypeSchema),
    defaultValues: defaultValues,
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onFormSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Product type name..." {...field} />
              </FormControl>
              <FormDescription>
                This is the name for the product type
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">{submitBtnText}</Button>
      </form>
    </Form>
  );
};

export default ProductTypeForm;
