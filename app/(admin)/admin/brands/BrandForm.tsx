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

export const brandSchema = z.object({
  name: z.string().min(3, {
    message: "Brand name must be at least 3 characters.",
  }),
});

interface IBrandFormProps {
  defaultValues?: { name: string };
  onFormSubmit: SubmitHandler<z.infer<typeof brandSchema>>;
  submitBtnText: string;
}

const BrandForm: React.FC<IBrandFormProps> = ({
  defaultValues = { name: "" },
  onFormSubmit,
  submitBtnText,
}) => {
  const form = useForm<z.infer<typeof brandSchema>>({
    resolver: zodResolver(brandSchema),
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
        <Button type="submit">{submitBtnText}</Button>
      </form>
    </Form>
  );
};

export default BrandForm;
