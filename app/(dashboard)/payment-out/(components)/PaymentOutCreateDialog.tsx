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
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import OptionalLabel from "@/components/custom/OptionalLabel";
import Image from "next/image";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import useCloudinaryFileUpload from "@/app/hooks/useCloudinaryFileUpload";
import ButtonActionLoader from "@/components/custom/ButtonActionLoader";
import { IPartyOut } from "@/app/types/party";

type Props = {
  setRefreshNow: React.Dispatch<React.SetStateAction<boolean>>;
};

const formSchema = z.object({
receiptNumber: z.coerce.number(),
party: z.string().min(1,{
    message: "Select the party.",
  }),
   paymentMethod: z.string().min(4, {
    message: "Payment method  is required.",
  }),
  paidAmount: z.coerce.number(),
  note: z.string().optional(),
   image: z.string().optional(),
  paymentDate: z.coerce.date().default(new Date()),
});

export default function PaymentOutCreateDialog({ setRefreshNow }: Props) {
  const [imageUrl, setImageUrl] = useState<string>("");
   const [parties, setParties] = React.useState<IPartyOut[]>([]);
  React.useEffect(() => {
    const fetch = async () => {
      let { data, error } = await supabase.from("Party").select("*");
      if (error || !data) {
        throw new Error("Failed to fetch parties");
      }

      setParties(data || []);
    };
    fetch();
  }, []);
  console.log(parties);

  // Define your form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
     defaultValues: {
     receiptNumber: 0,
      party: "",
      paymentMethod: "",
      paidAmount: 0,
      note: "",
      image: "",
      paymentDate: new Date(),
    },
  });

  // Define a submit handler
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsCreating(true);
    const { data, error, status } = await supabase.from("Payment-out").insert([values]).select().single();

    if (error) {
      toast.error(error.details || "An error occurred during create. Please try again.");
      console.error("Failed to create payment out:", error.message);
      setIsCreating(false);
      return;
    }

    if (status === 201 && data) {
      setRefreshNow(true);
      form.reset();
      setIsCreating(false);
      toast.success("Payment out created successfully");
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
        <Button>Create Payment-out</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[725px]">
        <DialogHeader>
          <DialogTitle>Create Payment-out</DialogTitle>
          <DialogDescription>Make changes to your profile here. Click save when youre done.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className=" grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="receiptNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Receipt Number</FormLabel>
                  <Input
                    {...field}
                    type="number"
                    placeholder="Enter Receipt Number"
                  />
                  <FormMessage {...field} />
                </FormItem>
              )}
            />


             <FormField
          control={form.control}
          name="party"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Party</FormLabel>
          
              <Select
                {...field}
                onValueChange={field.onChange}
                defaultValue={field.name}
                value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a party" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {parties.map((item) => (
                    <SelectItem
                      key={item.id}
                      value={item.id.toString()}>
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
              name="paymentDate"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-1 mt-1">
                  <FormLabel>Payment Date</FormLabel>
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
                  <FormLabel>Payment Method*</FormLabel>
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
                          <SelectItem value="cash">Cash</SelectItem>
                          <SelectItem value="cheque">Cheque</SelectItem>
                          <SelectItem value="online">Online</SelectItem>
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
                {isCreating ? " Please wait" : " Create Payment-out"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
