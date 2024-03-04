"use client";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import Loader from "../SpinLoader";
import { toast } from "sonner";
import { supabase } from "./AdminCreateSheet";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { CldUploadWidget } from "next-cloudinary";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";

const formSchema = z.object({
  name: z.string().min(5, {
    message: "Category name must be at least 5 characters.",
  }),

  image: z.string().max(250, {
    message: "Image must not be greater than 250 characters.",
  }),

  parentId: z.string().max(30, {
    message: "Parent Id cannot be greater than 30 characters.",
  }),

  desc: z.string().max(100, {
    message: "Description cannot be greater than 100 characters.",
  }),
});

export function CategoryCreateSheet() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      image: "",
      parentId: "",
      desc: "",
    },
  });

  const [modelIsClosedToUploadImage, setmodelIsClosedToUploadImage] = useState(false);

  const [image, setImage] = useState<string>("");
  console.log(image);

  useEffect(() => {
    form.setValue("image", image);
  }, [form, image]);

  //  Create admin handler
  const [isCreating, setIsCreating] = useState(false);
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsCreating(true);
      const { data, error } = await supabase.from("Category").insert([values]).select();
      data && toast("Success");
    } catch (error) {
      console.error(error);
      error && toast("Success");
      setIsCreating(false);
    } finally {
      setIsCreating(false);
    }
  }

  // Fetch admins
  const [categories, setCategories] = useState<any>([]);
  useEffect(() => {
    const fetch = async () => {
      try {
        let { data: allCategories, error } = await supabase.from("Category").select("*");
        setCategories(allCategories);
      } catch (error) {
        console.error(error);
      } finally {
      }
    };
    fetch();
  }, []);

  const [parentId, setParentId] = useState("");
  console.log(parentId);

  return (
    <Sheet>
      <div className=" flex items-center gap-4">
        {modelIsClosedToUploadImage && (
          <div className=" z-50 ">
            <CldUploadWidget
              uploadPreset="notes-app-unsigned"
              onSuccess={(results: any) => {
                setImage(results.info.url);
                setmodelIsClosedToUploadImage(false);
              }}>
              {({ open }) => {
                return <Button onClick={() => open()}>Select Image</Button>;
              }}
            </CldUploadWidget>
          </div>
        )}
        <SheetTrigger asChild>
          <Button>New Category</Button>
        </SheetTrigger>
      </div>
      <SheetContent className=" h-screen overflow-y-scroll">
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>Make changes to your profile here. Click save when youre done.</SheetDescription>
        </SheetHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Loki Chaulagain"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="desc"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>desc</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="desc"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {
              <SheetClose asChild>
                <div
                  onClick={() => setmodelIsClosedToUploadImage(true)}
                  className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="picture">Image</Label>
                  {image ? (
                    <Image
                      src={image}
                      alt="img"
                      width={500}
                      height={50}
                      blurDataURL={image}
                      placeholder="blur"
                      className="h-full w-full border border-dashed rounded-lg border-neutral-4 mt-2  object-scale-down overflow-hidden"
                    />
                  ) : (
                    <div className=" w-full h-32 border border-dashed rounded-lg flex flex-col items-center justify-center mt-2 ">
                      <span>Image</span>
                      <span className=" text-xs ">(New box will open)</span>
                    </div>
                  )}
                </div>
              </SheetClose>
            }

            <Select>
              <SelectTrigger  onChange={(value:any) => setParentId(value)} className="w-full ">
                <SelectValue placeholder="Select a fruit" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup className="  min-h-24 max-h-52 overflow-y-scroll">
                  <SelectLabel>Fruits</SelectLabel>
                  {categories.map((category: any) => (
                    <SelectItem
                     
                      key={category.id}
                      value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>

            {/* <SheetClose asChild> */}
            <Button
              className=" w-full"
              type="submit">
              {isCreating ? <Loader /> : "Submit"}
            </Button>
            {/* </SheetClose> */}
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
