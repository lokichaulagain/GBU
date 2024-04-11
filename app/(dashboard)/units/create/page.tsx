"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";
import useCloudinaryFileUpload from "@/app/hooks/useCloudinaryFileUpload";
import { ReloadIcon } from "@radix-ui/react-icons";
import DynamicBreadcrumb from "@/components/custom/DynamicBreadcrumb";
import { supabase } from "@/utils/supabase/supabaseClient";
import OptionalLabel from "@/components/custom/OptionalLabel";

const formSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Name must be between 2-20 characters.",
    })
    .max(20, {
      message: "Name must be between 2-20 characters.",
    }),

  shortForm: z.string().optional(),
});

export default function Page() {
  // Define your form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      shortForm: "",
    },
  });

  // Define a submit handler
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsCreating(true);
      const { data, error, status } = await supabase.from("Unit").insert([values]).select();

      if (error || status !== 201) {
        throw new Error("Failed to create unit");
      }

      toast.success("Unit created successfully");
      form.reset();
    } catch (error) {
      toast.error("Failed to create unit");
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <Form {...form}>
      <DynamicBreadcrumb
        items={[
          { name: "Dashboard", link: "/dashboard" },
          { name: "Units", link: "/units" },
          { name: "Create", link: "/units/create", isCurrentPage: true },
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
              <FormLabel>
                Short Form <OptionalLabel />{" "}
              </FormLabel>
              <Input
                placeholder="Short Form "
                {...field}
              />
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="  space-x-2">
          <Button
            type="submit"
            disabled={isCreating}>
            {isCreating && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
            {isCreating ? " Please wait" : " Create Unit"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
