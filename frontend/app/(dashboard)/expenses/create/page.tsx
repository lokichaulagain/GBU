"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useState } from "react";
import categoryDefaultImage from "../../../../public/default-images/unit-default-image.png";
import { toast } from "sonner";
import { useCreateCategoryMutation } from "@/lib/features/categorySlice";
import { useGetAllExpenseCategoryQuery } from "@/lib/features/expenseCategorySlice";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  description: z.string().optional(),
  image: z.string().optional(),
});

export default function Page() {
  const [createCategory, { data, error, isLoading, status, isSuccess, isError }] = useCreateCategoryMutation();
  const [imageUrl, setImageUrl] = useState<string>("");

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      image: "",
    },
  });

  // Define a submit handler.
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      console.log(values)
      const res = await createCategory(values);
      toast(res.data.msg);
      form.reset();
      setImageUrl("");
    } catch (error: any) {
      toast.warning(error.response.message);
    }
  };

  console.log();

  const { data: expenseCategories } = useGetAllExpenseCategoryQuery({});
  console.log(expenseCategories);

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
                  className=" w-32 h-32 border cursor-pointer border-neutral-600 border-dashed rounded-lg  flex items-center justify-center   ">
                  <Image
                    width={500}
                    height={500}
                    src={imageUrl || categoryDefaultImage}
                    alt="img"
                    className="p-2 rounded-md overflow-hidden h-32 w-32"
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
            <Select {...field}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a fruit" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Fruits</SelectLabel>
                  <SelectItem value="apple">Apple</SelectItem>
                  <SelectItem value="banana">Banana</SelectItem>
                  <SelectItem value="blueberry">Blueberry</SelectItem>
                  <SelectItem value="grapes">Grapes</SelectItem>
                  <SelectItem value="pineapple">Pineapple</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          )}
        />

        {/* <FormField
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
        /> */}

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input
                  placeholder="Description"
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
