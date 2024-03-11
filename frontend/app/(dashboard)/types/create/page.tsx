"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useCreateTypeMutation } from "@/lib/features/typeSlice";
import useCloudinaryFileUpload from "@/app/hooks/useCloudinaryFileUpload";
import Image from "next/image";
import defaultImage from "../../../../public/default-images/unit-default-image.png";
import ButtonActionLoader from "@/components/custom/ButtonActionLoader";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  description: z.string().optional(),
  image: z.string().optional(),
});

export default function Page1() {
  const [createType, { data, error, isLoading, status, isSuccess, isError }] = useCreateTypeMutation();
  const [imageUrl, setImageUrl] = useState<string>("");

  // Define your form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      image: "",
    },
  });

  // Define a submit handler
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const res: any = await createType(values);
      toast(res.data.msg);
      form.reset();
      setImageUrl("");
    } catch (error: any) {
      toast.warning(error.response.message);
    }
  };

  useEffect(() => {
    form.setValue("image", imageUrl);
  }, [form, imageUrl]);

  const { uploading, handleFileUpload } = useCloudinaryFileUpload();

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8">
        <FormItem>
          <FormLabel>Type Image</FormLabel>
        </FormItem>

        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type Name *</FormLabel>
              <Input
                type="file"
                onChange={(event) => handleFileUpload(event.target.files?.[0], setImageUrl)}
              />

              {uploading ? (
                <div className=" flex flex-col gap-2 items-center justify-center h-32 w-32 border">
                  <ButtonActionLoader />
                  <p>Uploading...</p>
                </div>
              ) : (
                <Image
                  width={400}
                  height={400}
                  src={imageUrl || defaultImage}
                  alt="img"
                  className="p-2 rounded-md overflow-hidden h-32 w-32"
                />
              )}
            </FormItem>
          )}
        />

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
          name="description"
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

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

// For Back up

{
  /* <FormItem>
  <input
    type="file"
    onChange={(event) => {
      const file = event.target.files?.[0];
      if (file) {
        setUploading(true); // Set uploading state to true when uploading starts
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "notes-app-unsigned");
        fetch("https://api.cloudinary.com/v1_1/dubzpy7hn/image/upload", {
          method: "POST",
          body: formData,
        })
          .then((response) => response.json())
          .then(handleImageUpload)
          .catch((error) => {
            console.error("Error uploading image:", error);
            toast.error("Error uploading image");
            setUploading(false); // Set uploading state to false if there's an error
          });
      }
    }}
  />
  {uploading ? ( // Display loading indicator if uploading
    <p>Uploading...</p>
  ) : (
    <Image
      width={500}
      height={500}
      src={imageUrl || defaultImage}
      alt="img"
      className="p-2 rounded-md overflow-hidden h-32 w-32"
    />
  )}
</FormItem>; */
}
