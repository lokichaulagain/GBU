"use client";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useGetExpenseCategoryQuery, useUpdateExpenseCategoryMutation } from "@/lib/features/expenseCategorySlice";
import SettingIcon from "../SettingIcon";
import { useEffect } from "react";
import DeleteAlertDilog from "../DeleteAlertDilog";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
});

type Props = {
  currentSelectedCategoryId: string;
  refetch: any;
};

export default function SettingExpenseCatagoryPopover({ currentSelectedCategoryId, refetch }: Props) {
  const { data, isError, isLoading } = useGetExpenseCategoryQuery(currentSelectedCategoryId);
  const expenseCategory = data?.data;

  const [updateExpenseCategory, { data: a, isError: ab, isLoading: abc }] = useUpdateExpenseCategoryMutation();
  // 1. Define your form.
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  useEffect(() => {
    if (expenseCategory) {
      form.reset({
        name: expenseCategory.name || "",
      });
    }
  }, [form, expenseCategory]);

  // Define a submit handler.
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const res: any = await updateExpenseCategory({ expenseCategoryId: currentSelectedCategoryId, updatedExpenseCategory: values });
      toast(res.data.msg);
    } catch (error: any) {
      toast.warning(error.response.message);
    }
  };

  return (
    <Popover>
      <PopoverTrigger>
        <SettingIcon />
      </PopoverTrigger>
      <PopoverContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className=" space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Expense Category Name </FormLabel>
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

            <div className=" flex justify-between">
              <Button type="submit">Update</Button>
              <DeleteAlertDilog
                currentSelectedCategoryId={currentSelectedCategoryId}
                refetch={refetch}
              />
            </div>
          </form>
        </Form>
      </PopoverContent>
    </Popover>
  );
}
