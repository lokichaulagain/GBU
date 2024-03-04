"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useParams } from "next/navigation";
import { useGetExpenseCategoryQuery, useUpdateExpenseCategoryMutation } from "@/lib/features/expenseCategorySlice";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
});

export default function Page() {
  const params = useParams();
  const expenseCategoryId = params.id;

  const { data, isError, isLoading } = useGetExpenseCategoryQuery(expenseCategoryId);
  const expenseCategory = data?.data;

  const [updateExpenseCategory, { data: aa, isError: ab, isLoading: ac }] = useUpdateExpenseCategoryMutation();
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
      const res: any = await updateExpenseCategory({ expenseCategoryId: expenseCategoryId, updatedExpenseCategory: values });
      toast(res.data.msg);
    } catch (error: any) {
      toast.warning(error.response.message);
    }
  };

  return (
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

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
