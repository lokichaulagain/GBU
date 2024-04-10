"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import useCloudinaryFileUpload from "@/app/hooks/useCloudinaryFileUpload";
import Image from "next/image";
import ButtonActionLoader from "@/components/custom/ButtonActionLoader";
import OptionalLabel from "@/components/custom/OptionalLabel";
import { ReloadIcon } from "@radix-ui/react-icons";
import DynamicBreadcrumb from "@/components/DynamicBreadcrumb";
import { supabase } from "@/utils/supabase/supabaseClient";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  desc: z.string().optional(),
  image: z.string().optional(),
});

export default function Page1() {
  const [imageUrl, setImageUrl] = useState<string>("");
  const { uploading, handleFileUpload } = useCloudinaryFileUpload();

  // Define your form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      desc: "",
      image: "",
    },
  });

  // Define a submit handler
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsCreating(true);
      const { data, error, status } = await supabase.from("Type").insert([values]).select();

      if (error || status !== 201) {
        throw new Error("Failed to create type");
      }

      toast.success("Type created successfully");
      form.reset();
      setImageUrl("");
    } catch (error) {
      toast.error("Failed to create type");
    } finally {
      setIsCreating(false);
    }
  };

  useEffect(() => {
    form.setValue("image", imageUrl);
  }, [form, imageUrl]);

  return (
    <Form {...form}>
      {/* <DynamicBreadcrumb
        items={[
          { name: "Dashboard", link: "/dashboard" },
          { name: "Types", link: "/types" },
          { name: "Create", link: "/types/create", isCurrentPage: true },
        ]}
      /> */}

      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className=" grid grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type Name *</FormLabel>
              <Input
                placeholder="Type Name"
                {...field}
              />
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="desc"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <Input
                placeholder="Description"
                {...field}
              />
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Image <OptionalLabel /> <span className="text-primary/85  text-xs">[image must be less than 1MB]</span>
              </FormLabel>
              <div className=" flex items-center  gap-2">
                <Input
                  type="file"
                  onChange={(event) => handleFileUpload(event.target.files?.[0], setImageUrl)}
                />

                <>
                  {uploading ? (
                    <div className=" flex flex-col gap-2 rounded-md items-center justify-center h-9 w-9 border">
                      <ButtonActionLoader />
                    </div>
                  ) : (
                    <Image
                      width={100}
                      height={100}
                      src={imageUrl }
                      alt="img"
                      className="p-0.5 rounded-md overflow-hidden h-9 w-9 border"
                    />
                  )}
                </>
              </div>
            </FormItem>
          )}
        />

        <div className=" mt-8 space-x-2">
          <Button
            type="submit"
            disabled={isCreating}>
            {isCreating && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
            {isCreating ? " Please wait" : " Create Type"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
