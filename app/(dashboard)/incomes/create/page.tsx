"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import useCloudinaryFileUpload from "@/app/hooks/useCloudinaryFileUpload";
import Image from "next/image";
import defaultImage from "../../../../public/default-images/unit-default-image.png";
import ButtonActionLoader from "@/components/custom/ButtonActionLoader";
import OptionalLabel from "@/components/custom/OptionalLabel";
import { CalendarIcon, ReloadIcon } from "@radix-ui/react-icons";
import DynamicBreadcrumb from "@/components/custom/DynamicBreadcrumb";
import { supabase } from "@/utils/supabase/supabaseClient";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ICategoryOut } from "@/app/types/category";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const formSchema = z.object({
  category: z.string().min(1, {
    message: "Category is required.",
  }),

  amount: z.string().min(1, {
    message: "Amount is required.",
  }),

  paymentMethod: z.enum(["Cash", "Online", "Cheque"]),

  note: z.string().optional(),
  date: z.coerce.date().default(new Date()),
  image: z.string().optional(),
});

export default function Page1() {
  const [imageUrl, setImageUrl] = useState<string>("");

  const [categories, setCategories] = React.useState<ICategoryOut[]>([]);
  React.useEffect(() => {
    const fetch = async () => {
      let { data, error } = await supabase.from("Category").select("*");
      if (error || !data) {
        throw new Error("Failed to fetch categories");
      }

      setCategories(data || []);
    };
    fetch();
  }, []);
  console.log(categories);

  // Define your form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      category: "",
      amount: "",
      paymentMethod: "Cash",
      note: "",
      date: new Date(),
      image: "",
    },
  });

  // Define a submit handler
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsCreating(true);
      const { data, error, status } = await supabase.from("Income").insert([values]).select();

      if (error || status !== 201) {
        throw new Error("Failed to create income");
      }

      toast.success("Income created successfully");
      form.reset();
      setImageUrl("");
    } catch (error) {
      toast.error("Failed to create income");
    } finally {
      setIsCreating(false);
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
          { name: "Incomes", link: "/incomes" },
          { name: "Create", link: "/incomes/create", isCurrentPage: true },
        ]}
      />

      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className=" grid grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category *</FormLabel>
              <FormControl>
                <Select
                  {...field}
                  onValueChange={field.onChange}
                  defaultValue={field.name}
                  value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categories.map((item) => (
                      <SelectItem
                        key={item.id}
                        value={item.id.toString()}>
                        {item.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount *</FormLabel>

              <FormControl>
                <Input
                  type="number"
                  placeholder="0"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="note"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Note <OptionalLabel />{" "}
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Note"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-1 mt-1">
              <FormLabel>Date *</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(" w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}>
                      {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent
                  className="w-auto p-0"
                  align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="paymentMethod"
          render={({ field }) => (
            <FormItem>
              <FormLabel> Payment Method *</FormLabel>

              <FormControl>
                <RadioGroup
                  {...field}
                  onValueChange={field.onChange}
                  defaultValue={field.name.toString()}
                  value={field.value.toString()}
                  className=" flex  items-center gap-8">
                  {availablePaymentMethods.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-2">
                      <RadioGroupItem
                        value={item}
                        id={item}
                      />
                      <FormLabel htmlFor="r1">{item}</FormLabel>
                    </div>
                  ))}
                </RadioGroup>
              </FormControl>

              <FormMessage {...field} />
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
            disabled={isCreating}>
            {isCreating && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
            {isCreating ? " Please wait" : " Create Category"}
          </Button>
        </div>
      </form>
    </Form>
  );
}

const availablePaymentMethods = ["Cash", "Online", "Cheque"];
