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
import defaultImage from "../../../../public/default-images/unit-default-image.png";
import ButtonActionLoader from "@/components/custom/ButtonActionLoader";
import { supabase } from "@/app/dashboard/components/sheets/AdminCreateSheet";
import OptionalLabel from "@/components/custom/OptionalLabel";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useParams } from "next/navigation";
import DynamicBreadcrumb from "@/components/DynamicBreadcrumb";
import { ICategoryOut } from "@/app/types/category";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  desc: z.string().optional(),
  image: z.string().optional(),
});

export default function Page1() {
  const [imageUrl, setImageUrl] = useState<string>("");
  const params: any = useParams();
  const id = parseFloat(params.id);
  console.log(id);

  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [category, setCategory] = useState<ICategoryOut>();

  const [refetch, setRefetch] = useState<boolean>(false);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        setIsFetching(true);
        let { data: Category, error } = await supabase.from("Category").select().eq("id", id).single();
        setCategory(Category);
        setRefetch(false);
      } catch (error) {
        console.error("Failed to fetch category");
      } finally {
        setIsFetching(false);
      }
    };
    fetchCategory();
  }, [id, refetch]);


  // Define your form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      desc: "",
      image: "",
    },
  });

  useEffect(() => {
    if (category) {
      form.reset({
        name: category.name || "",
        desc: category.desc || "",
        image: category.image || "",
      });
      setImageUrl(category.image || "");
    }
  }, [form, category]);

  useEffect(() => {
    form.setValue("image", imageUrl);
  }, [form, imageUrl]);

  // Define a submit handler
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsUpdating(true);
      const { data, error, status } = await supabase.from("Category").update(values).eq("id", id).select();

      if (error || status !== 200) {
        throw new Error("Failed to update category");
      }

      toast.success("Category updated successfully");
      form.reset();
      setImageUrl("");
      setRefetch(true);
    } catch (error) {
      toast.error("Failed to update category");
    } finally {
      setIsUpdating(false);
    }
  };

  useEffect(() => {
    form.setValue("image", imageUrl);
  }, [form, imageUrl]);

  const { uploading, handleFileUpload } = useCloudinaryFileUpload();

  return (
    <Form {...form}>
      <DynamicBreadcrumb
        items={[
          { name: "Dashboard", link: "/dashboard" },
          { name: "Categories", link: "/categories" },
          { name: "Edit", link: "/categories/edit", isCurrentPage: true },
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
              <FormLabel>Category Name *</FormLabel>
              <Input
                placeholder="Category Name"
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
                      src={imageUrl || defaultImage}
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
            disabled={isUpdating}>
            {isUpdating && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
            {isUpdating ? " Please wait" : " Update Category"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
