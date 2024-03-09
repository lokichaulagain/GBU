"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useEffect } from "react";
import { toast } from "sonner";
import { useParams } from "next/navigation";
import { useGetAllUnitQuery, useGetUnitQuery, useUpdateUnitMutation } from "@/lib/unitSlice";
import ButtonActionLoader from "@/components/custom/ButtonActionLoader";
import SpinLoader from "@/app/dashboard/components/SpinLoader";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  shortForm: z.string().optional(),
});

export default function Page() {
  const params = useParams();
  const unitId = params.id;

  const { data, isLoading: isFetching, refetch: singleUnitRefresh } = useGetUnitQuery(unitId);
  const unit = data?.data;

  const { refetch } = useGetAllUnitQuery({});

  const [updateUnit, { error: updateError, isLoading: isUpdating }] = useUpdateUnitMutation();
  // 1. Define your form.
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      shortForm: "",
    },
  });

  useEffect(() => {
    if (unit) {
      form.reset({
        name: unit.name || "",
        shortForm: unit.shortForm || "",
      });
    }
  }, [form, unit]);

  // Define a submit handler.
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const res: any = await updateUnit({ unitId: unitId, updatedUnit: values });
    if (res) {
      toast.success(res.data.msg);
      refetch();
      singleUnitRefresh();
    }
  };

  if (isFetching) {
    return (
      <div>
        <SpinLoader />
      </div>
    );
  }

  if (updateError) {
    if ("status" in updateError) {
      const errMsg = "error" in updateError ? updateError.error : JSON.stringify(updateError.data);
      const errorMsg = JSON.parse(errMsg).msg;
      toast.error(errorMsg);
    } else {
      const errorMsg = updateError.message;
      toast.error(errorMsg);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className=" grid grid-cols-2 gap-8 ">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Unit Name *</FormLabel>
              <FormControl>
                <Input
                  placeholder="Unit Name"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="shortForm"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Short Form</FormLabel>
              <FormControl>
                <Input
                  placeholder="Short Form"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          disabled={isUpdating}
          type="submit">
          {isUpdating && <ButtonActionLoader />} Submit
        </Button>
      </form>
    </Form>
  );
}
