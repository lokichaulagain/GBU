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
import categoryDefaultImage from "../../../../public/default-images/unit-default-image.png";
import { toast } from "sonner";

import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useGetAllExpenseCategoryQuery } from "@/lib/features/expenseCategorySlice";
import { useCreateExpenseMutation } from "@/lib/features/expenseSlice";


const formSchema = z.object({
  expenseCategory: z.string().length(24, {
    message: "Expense category is rquired",
  }),

  amount: z.coerce.number().min(1, {
    message: "Amount is rquired",
  }),
  paymentMethod: z.string(),
  date: z.date().optional(),
  note: z.string().optional(),
  image: z.string().optional(),
});

export default function Page() {
  const [createExpense, { data, error, isLoading, status, isSuccess, isError }] = useCreateExpenseMutation();
  const { data: expenseCategories, isError: aa, isLoading: isFetching, refetch } = useGetAllExpenseCategoryQuery({});
  const [imageUrl, setImageUrl] = useState<string | undefined>();

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      expenseCategory: "",
      amount: 0,
      paymentMethod: "cash",
      date: undefined,
      note: "",
      image: undefined,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const res = await createExpense(values);
      toast(res.data.msg);
      form.reset();
      setImageUrl(undefined);
    } catch (error: any) {
      toast.warning(error.response.message);
    }
  }

  //
  // const { watch } = form;
  // const watchedFields = watch();

  // useEffect(() => {
  //   console.log(watchedFields);
  // }, [watchedFields]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className=" space-y-8">
        <FormItem>
          <FormLabel>Category Image</FormLabel>
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
                  className=" w-32 h-32 border cursor-pointer border-neutral-600 border-dashed rounded-lg  flex items-center justify-center   ">
                  <Image
                    width={500}
                    height={500}
                    src={imageUrl || categoryDefaultImage}
                    alt="img"
                    className="p-2 rounded-md overflow-hidden h-32 w-32"
                  />
                </div>
              );
            }}
          </CldUploadWidget>
        </FormItem>

        <FormField
          control={form.control}
          name="expenseCategory"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Categories</FormLabel>
              <FormControl>
                <Select
                  {...field}
                  onValueChange={field.onChange}
                  defaultValue={field.name}>
                  <SelectTrigger className="">
                    <SelectValue placeholder="Select Expense Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Categories (Expense)</SelectLabel>
                      {expenseCategories?.data.map((item: any) => (
                        <SelectItem
                          key={item._id}
                          value={item._id}>
                          {item.name}
                        </SelectItem>
                      ))}
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
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount </FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Amount in Rupees"
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
            <FormItem className=" flex flex-col gap-1">
              <FormLabel>Received Date</FormLabel>
              <FormControl>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button  className={cn("pl-3 text-left font-normal gap-2", !field.value && "text-primary-foreground")}>
                      {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                      <CalendarIcon className="ml-auto h-4 w-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-auto p-0"
                    align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="paymentMethod"
          render={({ field }) => (
            <FormItem className=" flex flex-col gap-1">
              <FormLabel>Payment Method</FormLabel>

              <RadioGroup
                onChange={field.onChange}
                defaultValue="cash">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="cash"
                    id="cash"
                  />
                  <Label htmlFor="cash">Cash</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="cheque"
                    id="cheque"
                  />
                  <Label htmlFor="cheque">Cheque</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="online"
                    id="online"
                  />
                  <Label htmlFor="online">Online</Label>
                </div>
              </RadioGroup>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="note"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Note</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Note"
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
