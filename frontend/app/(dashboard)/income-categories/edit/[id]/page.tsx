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
import { useGetIncomeCategoryQuery, useUpdateIncomeCategoryMutation } from "@/lib/features/incomeCategorySlice";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
});

export default function Page() {
  const params = useParams();
  const incomeCategoryId = params.id;

  const { data, isError, isLoading } = useGetIncomeCategoryQuery(incomeCategoryId);
  const incomeCategory = data?.data;

  const [updateIncomeCategory, { data: aa, isError: ab, isLoading: ac }] = useUpdateIncomeCategoryMutation();
  // 1. Define your form.
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  useEffect(() => {
    if (incomeCategory) {
      form.reset({
        name: incomeCategory.name || "",
      });
    }
  }, [form, incomeCategory]);

  // Define a submit handler.
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const res: any = await updateIncomeCategory({ incomeCategoryId: incomeCategoryId, updatedIncomeCategory: values });
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
              <FormLabel>Income Category Name </FormLabel>
              <FormControl>
                <Input
                  placeholder="Income Category Name"
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
