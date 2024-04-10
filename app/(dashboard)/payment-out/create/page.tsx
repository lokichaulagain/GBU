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
import ButtonActionLoader from "@/components/custom/ButtonActionLoader";
import OptionalLabel from "@/components/custom/OptionalLabel";
import { ReloadIcon } from "@radix-ui/react-icons";
import DynamicBreadcrumb from "@/components/DynamicBreadcrumb";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { IPartyOut } from "@/app/types/party";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { supabase } from "@/utils/supabase/supabaseClient";

const formSchema = z.object({
  receiptNumber: z.string().min(5, {
    message: "Receipt  must be at least 5 characters.",
  }),

  paymentDate: z.coerce.date().default(new Date()),

  party: z.string({
    required_error: "Party is required.",
  }),

  paymentMethod: z.enum(["Cash", "Bank", "Cheque", "Esewa", "Khalti", "IME Pay", "Prabhu Pay", "Connect IPS", "Fone Pay", "Other"], {
    required_error: "Select the payment method.",
  }),

  paidAmount: z.coerce.number({
    required_error: "Amount is required",
    invalid_type_error: "Amount must be a number",
  }),

  note: z.string().optional(),
  image: z.string().optional(),
});

export default function Page() {
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

  const [imageUrl, setImageUrl] = useState<string>("");

  // Define your form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      receiptNumber: "",
      paymentDate: new Date(),
      party: "",
      paymentMethod: "Cash",
      paidAmount: 0,
      note: "",
      image: "",
    },
  });

  console.log(form.getValues());

  // Define a submit handler
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsCreating(true);
      const { data, error, status } = await supabase.from("Payment-out").insert([values]).select();

      if (error || status !== 201) {
        throw new Error("Failed to create payment-out");
      }

      toast.success("Payment-out created successfully");
      form.reset();
      setImageUrl("");
    } catch (error) {
      toast.error("Failed to create payment-out");
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
      {/* <DynamicBreadcrumb
        items={[
          { name: "Dashboard", link: "/dashboard" },
          { name: "Categories", link: "/categories" },
          { name: "Create", link: "/categories/create", isCurrentPage: true },
        ]}
      /> */}

      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className=" grid grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="receiptNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Receipt Number </FormLabel>
              <Input
                {...field}
                placeholder="12345"
              />
              <FormMessage {...field} />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="paymentDate"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-3">
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
          name="party"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type</FormLabel>

              <Select
                {...field}
                onValueChange={field.onChange}
                defaultValue={field.name}
                value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a type" />
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
          name="paidAmount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Received Amount </FormLabel>
              <Input
                type="number"
                {...field}
                placeholder="5,000"
              />
              <FormMessage {...field} />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="note"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Note </FormLabel>
              <Input
                {...field}
                placeholder="Something about the payment"
              />
              <FormMessage {...field} />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="paymentMethod"
          render={({ field }) => (
            <FormItem>
              <FormLabel> Payment Method</FormLabel>

              <RadioGroup
                {...field}
                onValueChange={field.onChange}
                defaultValue={field.name.toString()}
                value={field.value.toString()}>
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

                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="comfortable"
                    id="r2"
                  />
                  <Label htmlFor="r2">Comfortable</Label>
                </div>
              </RadioGroup>

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
                      src={imageUrl }
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
  );
}

const availablePaymentMethods = ["Cash", "Bank", "Cheque", "Esewa", "Khalti", "IME Pay", "Prabhu Pay", "Connect IPS", "Fone Pay", "Other"];
