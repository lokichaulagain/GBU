"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { supabase } from "@/utils/supabase/supabaseClient";
import { toast } from "sonner";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import OptionalLabel from "@/components/custom/OptionalLabel";
import ButtonActionLoader from "@/components/custom/ButtonActionLoader";
import Image from "next/image";
import useCloudinaryFileUpload from "@/app/hooks/useCloudinaryFileUpload";
import { cn } from "@/lib/utils";

type Props = {
  setRefreshNow: React.Dispatch<React.SetStateAction<boolean>>;
};

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),

  phone: z
    .string()
    .length(10, {
      message: "Phone number must be 10 characters.",
    })
    .regex(
      /^\d+$/,
      `Phone number must be numeric.
  `),

  type: z.string().optional(),
  openingBalance: z.coerce.number().optional(),
  openingBalanceDate: z.coerce.date().default(new Date()),

  address: z.string().optional(),
  email: z.string().optional(),
  panNumber: z.string().optional(),
  image: z.string().optional(),
});

export default function PartyCreateDialog({ setRefreshNow }: Props) {
  const [imageUrl, setImageUrl] = useState<string>("");

  // Define your form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      type: "",
      openingBalance: 0,
      openingBalanceDate: new Date(),
      address: "",
      email: "",
      panNumber: "",
      image: "",
    },
  });

  // Define a submit handler
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsCreating(true);
    console.log(values,"values")
    const { data, error, status } = await supabase.from("Party").insert([values]).select().single();

    if (error) {
      toast.error(error.details || "An error occurred during create. Please try again.");
      console.error("Failed to create party:", error.message);
      setIsCreating(false);
      return;
    }

    if (status === 201 && data) {
      setRefreshNow(true);
      form.reset();
      setIsCreating(false);
      toast.success("Party created successfully");
      return;
    }
  };

  useEffect(() => {
    form.setValue("image", imageUrl);
  }, [form, imageUrl]);

  const { uploading, handleFileUpload } = useCloudinaryFileUpload();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Create party</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[725px]">
        <DialogHeader>
          <DialogTitle>Create party</DialogTitle>
          <DialogDescription>Make changes to your profile here. Click save when youre done.</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className=" grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Party Name</FormLabel>
                  <Input
                    {...field}
                    placeholder="Loki Chaulagain"
                  />
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
                  <Input
                    {...field}
                    type="number"
                    placeholder=" 9854765769"
                  />
                  <FormMessage {...field} />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Party *</FormLabel>
                  <FormControl>
                    <Select
                      {...field}
                      onValueChange={field.onChange}
                      defaultValue={field.name}
                      value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Type" />
                        </SelectTrigger>
                      </FormControl>

                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Types</SelectLabel>
                          <SelectItem value="customer">Customer</SelectItem>
                          <SelectItem value="supplier">Supplier</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
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
                  <Input
                    {...field}
                    type="number"
                  />
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
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Kathmandu, Nepal"
                      {...field}
                    />
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
                  <Input
                    {...field}
                    placeholder="Email Address"
                  />
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
                  <Input
                    {...field}
                    placeholder="Pan Number "
                  />
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
                          src={imageUrl}
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
                {isCreating ? " Please wait" : " Create Party"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
