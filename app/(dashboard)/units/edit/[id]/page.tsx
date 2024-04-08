"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/app/dashboard/components/sheets/AdminCreateSheet";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useParams } from "next/navigation";
import DynamicBreadcrumb from "@/components/DynamicBreadcrumb";
import { IUnitOut } from "@/app/types/unit";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  shortForm: z.string().optional(),
});

export default function Page() {
  const params = useParams() as { id: string };
  const id = parseFloat(params.id);

  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [unit, setUnit] = useState<IUnitOut>();

  const [refetch, setRefetch] = useState<boolean>(false);
  useEffect(() => {
    const fetchUnit = async () => {
      setIsFetching(true);
      try {
        const { data: Unit, error } = await supabase.from("Unit").select().eq("id", id).single();
        if (error) {
          throw new Error("Failed to fetch unit");
        }
        setUnit(Unit);
        setRefetch(false);
      } catch (error) {
        console.error("Failed to fetch unit:", error);
      } finally {
        setIsFetching(false);
      }
    };

    fetchUnit();
  }, [id, refetch]);

  // Define your form
  const form = useForm<z.infer<typeof formSchema>>({
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

  // Define a submit handler
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsUpdating(true);
      const { data, error, status } = await supabase.from("Unit").update(values).eq("id", id).select();

      if (error || status !== 200) {
        throw new Error("Failed to update unit");
      }

      toast.success("Unit updated successfully");
      form.reset();
      setRefetch(true);
    } catch (error) {
      toast.error("Failed to update unit");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <Form {...form}>
      <DynamicBreadcrumb
        items={[
          { name: "Dashboard", link: "/dashboard" },
          { name: "Units", link: "/units" },
          { name: "Edit", link: "/units/edit", isCurrentPage: true },
        ]}
      />

      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className=" grid grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Unit Name *</FormLabel>
              <Input
                placeholder="Unit Name"
                {...field}
              />
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
              <Input
                placeholder="Short Form"
                {...field}
              />
              <FormMessage />
            </FormItem>
          )}
        />

        <div className=" mt-8 space-x-2">
          <Button
            type="submit"
            disabled={isUpdating}>
            {isUpdating && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
            {isUpdating ? " Please wait" : " Update Unit"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
