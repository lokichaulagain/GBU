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
import DialogTriggerAction from "@/components/custom/DialogTriggerAction";
import { ICashInHandOut } from "@/app/types/cashAndBank";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";

type Props = {
  id: number;
  setRefreshNow: React.Dispatch<React.SetStateAction<boolean>>;
};

const formSchema = z.object({
  amount: z.coerce.number().min(1).max(10000000),
  date: z.coerce.date().default(new Date()),
  note: z.string().optional(),
});

export default function BankBalanceEditDialog({ id, setRefreshNow }: Props) {
  // Define your form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: 0,
      date: new Date(),
      note: "",
    },
  });

  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [cashInHand, setCashInHand] = useState<ICashInHandOut | undefined>(undefined);
  useEffect(() => {
    const fetch = async () => {
      setIsFetching(true);
      const { data, error, status } = await supabase.from("Bank-balance").select().eq("id", id).single();

      if (error) {
        console.error("Failed to fetch bank-balance:", error.message);
        setIsFetching(false);
        return;
      }

      if (status === 200 && data) {
        setCashInHand(data);
        setIsFetching(false);
      }
    };

    fetch();
  }, [id]);

  useEffect(() => {
    if (cashInHand) {
      form.reset({
        amount: cashInHand.amount,
        date: new Date(cashInHand.date),
        note: cashInHand.note,
      });
    }
  }, [form, cashInHand]);

  // Define a submit handler
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsUpdating(true);
    const { data, error, status } = await supabase.from("Bank-balance").update(values).eq("id", id);

    if (error) {
      setIsUpdating(false);
      toast.error(error.details || "An error occurred during update. Please try again.");
      return;
    }

    if (status == 204) {
      setRefreshNow(true);
      form.reset();
      setIsUpdating(false);
      toast.success("Bank-balance updated successfully.");
      return;
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <p>
          <DialogTriggerAction title="Edit bank-balance" />
        </p>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[725px]">
        <DialogHeader>
          <DialogTitle>Update bank-balance</DialogTitle>
          <DialogDescription>Make changes to your profile here. Click save when youre done.</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className=" grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <Input
                    {...field}
                    type="number"
                    placeholder="10,000"
                  />
                  <FormMessage {...field} />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="date"
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

            <div className=" mt-8 space-x-2">
              <Button
                type="submit"
                disabled={isUpdating}>
                {isUpdating && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
                {isUpdating ? " Please wait" : " Create bank-balance"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
