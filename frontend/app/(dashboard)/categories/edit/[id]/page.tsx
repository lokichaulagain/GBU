"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useEffect, useState } from "react";
import itemDefaultImage from "../../../../../public/default-images/unit-default-image.png";
import { toast } from "sonner";
import { useParams } from "next/navigation";

import { useGetCategoryQuery, useUpdateCategoryMutation } from "@/lib/features/categorySlice";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  description: z.string().optional(),
  image: z.string().optional(),
});

export default function Page() {
  const params = useParams();
  const categoryId = params.id;
  console.log(categoryId);

  const { data, isError, isLoading } = useGetCategoryQuery(categoryId);
  const category = data?.data;

  const [imageUrl, setImageUrl] = useState<string>("");

  const [updateCategory, { data: aa, isError: ab, isLoading: ac }] = useUpdateCategoryMutation();
  // 1. Define your form.
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      image: "",
    },
  });

  useEffect(() => {
    if (category) {
      form.reset({
        name: category.name || "",
        description: category.description || "",
        image: category.image || "",
      });
      setImageUrl(category.image || "");
    }
  }, [form, category]);

  // Define a submit handler.
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const res: any = await updateCategory({ categoryId: categoryId, updatedCategory: values });
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
        <FormItem>
          <FormLabel>Category Image</FormLabel>
          <CldUploadWidget
            uploadPreset="notes-app-unsigned"
            onSuccess={(results: any) => {
              form.setValue("image", results.info.url);
              setImageUrl(results.info.url);
            }}>
            {({ open }) => {
              return (
                <div
                  onClick={() => open()}
                  className=" h-32 w-32 border cursor-pointer border-neutral-600 w-1/12 border-dashed rounded-lg flex  items-center justify-center ">
                  <Image
                    width={500}
                    height={500}
                    src={imageUrl || itemDefaultImage}
                    alt="img"
                    className="p-2 rounded-md overflow-hidden"
                  />
                </div>
              );
            }}
          </CldUploadWidget>
        </FormItem>

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category Name *</FormLabel>
              <FormControl>
                <Input
                  placeholder="Category Name"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
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

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
