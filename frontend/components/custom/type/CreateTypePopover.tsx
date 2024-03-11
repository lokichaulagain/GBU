"use client";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useCreateTypeMutation, useGetAllTypeQuery } from "@/lib/features/typeSlice";
import useCloudinaryFileUpload from "@/app/hooks/useCloudinaryFileUpload";
import Image from "next/image";
import defaultImage from "../../../public/default-images/unit-default-image.png";
import ButtonActionLoader from "@/components/custom/ButtonActionLoader";
import OptionalLabel from "../OptionalLabel";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  description: z.string().optional(),
  image: z.string().optional(),
});

type Props = {};

export default function CreateTypePopover({}: Props) {
  const [createType, { data, error, isLoading, status, isSuccess, isError }] = useCreateTypeMutation();
  const { refetch } = useGetAllTypeQuery({});

  const { uploading, handleFileUpload } = useCloudinaryFileUpload();
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
    const res: any = await createType(values);
    if (res.data) {
      toast.success(res.data.msg);
      form.reset();
      setImageUrl("");
      refetch();
    }
  };

  useEffect(() => {
    form.setValue("image", imageUrl);
  }, [form, imageUrl]);

  if (error) {
    if ("status" in error) {
      const errMsg = "error" in error ? error.error : JSON.stringify(error.data);
      const errorMsg = JSON.parse(errMsg).msg;
      toast.error(errorMsg);
      console.log(errorMsg);
    } else {
      const errorMsg = error.message;
      toast.error(errorMsg);
      console.log(errorMsg);
    }
  }

  return (
    <Popover>
      <PopoverTrigger>
        <Button>Add New Type</Button>
      </PopoverTrigger>
      <PopoverContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4">
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
                  <FormLabel>
                    Description <OptionalLabel />
                  </FormLabel>
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
                    Image <OptionalLabel />
                  </FormLabel>
                  <Input
                    type="file"
                    onChange={(event) => handleFileUpload(event.target.files?.[0], setImageUrl)}
                  />

                  {uploading ? (
                    <div className=" flex flex-col gap-2 rounded-md items-center justify-center h-16 w-16 border">
                      <ButtonActionLoader />
                    </div>
                  ) : (
                    <Image
                      width={100}
                      height={100}
                      src={imageUrl || defaultImage}
                      alt="img"
                      className="p-2 rounded-md overflow-hidden h-16 w-16 border"
                    />
                  )}
                </FormItem>
              )}
            />

            <Button type="submit">
              {isLoading && <ButtonActionLoader />}
              Submit
            </Button>
          </form>
        </Form>
      </PopoverContent>
    </Popover>
  );
}
