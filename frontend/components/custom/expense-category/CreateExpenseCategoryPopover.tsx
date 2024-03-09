"use client";
import { Button } from "@/components/ui/button";
import { Loader, Plus } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useCreateExpenseCategoryMutation } from "@/lib/features/expenseCategorySlice";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
});

type Props = {
  refetch: any;
};

export default function CreateExpenseCategoryPopover({ refetch }: Props) {
  const [createExpenseCategory, { data, error, isLoading, status, isSuccess, isError }] = useCreateExpenseCategoryMutation();

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  // Define a submit handler.
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const res: any = await createExpenseCategory(values);
      if (res.data) {
        toast(res.data.msg);
        form.reset();
        refetch();
      }
      if (res.error) {
        toast.error(res.error.data.msg);
      }
    } catch (error: any) {
      toast.error("Something went wrong");
    }
  };

  return (
    <Popover>
      <PopoverTrigger>
        <Button>
          <Plus
            size={18}
            className=" mr-2"
          />
          Add New Category
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className=" space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Expense Category </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Expense Category Name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              disabled={isLoading}
              type="submit">
              {isLoading && (
                <Loader
                  size={16}
                  className=" animate-spin mr-2"
                />
              )}
              Submit
            </Button>
          </form>
        </Form>
      </PopoverContent>
    </Popover>
  );
}
