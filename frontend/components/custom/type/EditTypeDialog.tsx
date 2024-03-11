"use client";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useEffect, useState } from "react";
import defaultImage from "../../../public/default-images/unit-default-image.png";
import { toast } from "sonner";
import { useParams } from "next/navigation";
import { useGetTypeQuery, useUpdateTypeMutation } from "@/lib/features/typeSlice";
import { MoreHorizontal } from "lucide-react";

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
  

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  description: z.string().optional(),
  image: z.string().optional(),
});

type Props = {
  currentSelectedTypeId?: string;
};

export default function EditTypeDialog({ currentSelectedTypeId }: Props) {
    console.log(currentSelectedTypeId)
  const { data, isError, isLoading } = useGetTypeQuery(currentSelectedTypeId);
  const type = data?.data;

  const [imageUrl, setImageUrl] = useState<string>("");

  const [updateType, { data: aa, isError: ab, isLoading: ac }] = useUpdateTypeMutation();
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
    if (type) {
      form.reset({
        name: type.name || "",
        description: type.description || "",
        image: type.image || "",
      });
      setImageUrl(type.image || "");
    }
  }, [form, type]);

  // Define a submit handler.
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const res: any = await updateType({ typeId: currentSelectedTypeId, updatedType: values });
      toast(res.data.msg);
    } catch (error: any) {
      toast.warning(error.response.message);
    }
  };

  return (
    <Popover>
    <PopoverTrigger>Open</PopoverTrigger>
    <PopoverContent>{currentSelectedTypeId}</PopoverContent>
  </Popover>
  
  );
}
