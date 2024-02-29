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
import { useGetUnitQuery, useUpdateUnitMutation } from "@/lib/unitSlice";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  shortForm: z.string().optional(),
  image: z.string().optional(),
});

export default function Page() {
  const params = useParams();
  const unitId = params.id;
  console.log(unitId);

  const { data, isError, isLoading } = useGetUnitQuery(unitId);
  const unit = data?.data;
  console.log(unit);

  const [imageUrl, setImageUrl] = useState<string>("");

  const [updateUnit, { data: aa, isError: ab, isLoading: ac }] = useUpdateUnitMutation();
  // 1. Define your form.
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      shortForm: "",
      image: "",
    },
  });

  useEffect(() => {
    if (unit) {
      form.reset({
        name: unit.name || "",
        shortForm: unit.shortForm || "",
        image: unit.image || "",
      });
      setImageUrl(unit.image || "");
    }
  }, [form, unit]);

  // Define a submit handler.
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const res:any = await updateUnit({ unitId: unitId, updatedUnit: values });
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
          <FormLabel>Unit Image</FormLabel>
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
                  className=" h-32 border cursor-pointer border-neutral-600 w-1/12 border-dashed rounded-lg flex flex-col items-center justify-center ">
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

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
