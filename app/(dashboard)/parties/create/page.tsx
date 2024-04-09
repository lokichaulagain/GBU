"use client";
import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
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
import DynamicBreadcrumb from "@/components/DynamicBreadcrumb";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ITypeOut } from "@/app/types/type";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),

  phone: z.coerce.number({
    required_error: "Phone is required",
    invalid_type_error: "Phone must be a number",
  }),

  type: z.coerce.number({
    required_error: "Select the type of party",
    invalid_type_error: "Type must be a number",
  }),

  openingBalance: z.coerce.number().default(0),
  openingBalanceDate: z.coerce.date().default(new Date()),

  address: z.string().min(10, {
    message: "Address must be at least 10 characters.",
  }),

  email: z.string().min(10, {
    message: " Email must be at least 10 characters.",
  }),

  panNumber: z.string().length(10, {
    message: " Pan Number must be exactly 10 characters.",
  }),

  image: z.string().optional(),
});

export default function Page() {
  const [types, setTypes] = React.useState<ITypeOut[]>([]);
  React.useEffect(() => {
    const fetch = async () => {
      let { data, error } = await supabase.from("Type").select("*");
      if (error || !data) {
        throw new Error("Failed to fetch types");
      }

      setTypes(data || []);
    };
    fetch();
  }, []);
  console.log(types);

  const [imageUrl, setImageUrl] = useState<string>("");

  // Define your form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: 0,
      type: 0,
      openingBalance: 0,
      openingBalanceDate: new Date(),
      address: "",
      email: "",
      panNumber: "",
      image: "",
    },
  });

  // console.log(form.getValues());

  // Define a submit handler
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsCreating(true);
      const { data, error, status } = await supabase
        .from("Party")
        .insert([values])
        .select();

      if (error || status !== 201) {
        throw new Error("Failed to create party");
      }

      toast.success("Party created successfully");
      form.reset();
      setImageUrl("");
    } catch (error) {
      toast.error("Failed to create party");
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
          { name: "Categories", link: "/categories" },
          { name: "Create", link: "/categories/create", isCurrentPage: true },
        ]}
      />

      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className=" grid grid-cols-2 gap-4"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Party Name</FormLabel>
              <Input {...field} placeholder="Loki Chaulagain" />
              <FormMessage {...field} />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone</FormLabel>
              <Input {...field} placeholder=" 9854765769" />
              <FormMessage {...field} />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type</FormLabel>

              <Select
                {...field}
                onValueChange={field.onChange}
                defaultValue={field.name.toString()}
                value={field.value.toString()}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {types.map((item) => (
                    <SelectItem key={item.id} value={item.id.toString()}>
                      {item.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="openingBalance"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Opening Balance</FormLabel>
              <Input {...field} />
              <FormMessage {...field} />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="openingBalanceDate"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-3">
              <FormLabel>Opening Balance Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        " w-full pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
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
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address </FormLabel>
              <FormControl>
                <Input placeholder="Kathmandu, Nepal" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <Input {...field} placeholder="Email Address" />
              <FormMessage {...field} />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="panNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pan Number</FormLabel>
              <Input {...field} placeholder="Pan Number " />
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
                Image <OptionalLabel />{" "}
                <span className="text-primary/85  text-xs">
                  [image must be less than 1MB]
                </span>
              </FormLabel>
              <div className=" flex items-center  gap-2">
                <Input
                  type="file"
                  onChange={(event) =>
                    handleFileUpload(event.target.files?.[0], setImageUrl)
                  }
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
          <Button type="submit" disabled={isCreating}>
            {isCreating && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
            {isCreating ? " Please wait" : " Create Party"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
