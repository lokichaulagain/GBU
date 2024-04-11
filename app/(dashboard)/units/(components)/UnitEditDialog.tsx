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
import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { ReloadIcon } from "@radix-ui/react-icons";
import { IUnitOut } from "@/app/types/unit";
import DialogTriggerAction from "@/components/custom/DialogTriggerAction";

type Props = {
  id: number;
  setRefreshNow: any;
};

const formSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Name must be between 2-20 characters.",
    })
    .max(20, {
      message: "Name must be between 2-20 characters.",
    }),

  shortForm: z
    .string()
    .min(1, {
      message: "Short form must be between 1-10 characters.",
    })
    .max(10, {
      message: "Short form must be between 1-10 characters.",
    }),
});

export default function UnitEditDialog({ id, setRefreshNow }: Props) {
  // Define your form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      shortForm: "",
    },
  });

  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [unit, setUnit] = useState<IUnitOut>();
  useEffect(() => {
    const fetchUnit = async () => {
      try {
        setIsFetching(true);
        const { data: Unit, error } = await supabase.from("Unit").select().eq("id", id).single();
        if (error) {
          throw new Error("Failed to fetch unit");
        }
        setUnit(Unit);
      } catch (error) {
        console.error("Failed to fetch unit:", error);
      } finally {
        setIsFetching(false);
      }
    };

    fetchUnit();
  }, [id]);

  useEffect(() => {
    if (unit) {
      form.reset({
        name: unit.name || "",
        shortForm: unit.shortForm || "",
      });
    }
  }, [form, unit]);

  // Define a submit handler
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsUpdating(true);
      const { data, error, status } = await supabase.from("Unit").update(values).eq("id", id);

      if (error || status !== 204) {
        let errorMessage = "Failed to update unit";
        if (error && error.message) {
          errorMessage = error.message;
        }
        throw new Error(errorMessage);
      }

      setRefreshNow(true);
      form.reset();
      toast.success("Unit updated successfully");
    } catch (error: any) {
      toast.error(error.message || "An error occurred during update. Please try again.");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <p>
          <DialogTriggerAction title="Edit unit" />
        </p>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[725px]">
        <DialogHeader>
          <DialogTitle>Update unit</DialogTitle>
          <DialogDescription>Make changes to your profile here. Click save when youre done.</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className=" grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Unit Name *</FormLabel>
                    <Input
                      placeholder="CENTIMETER"
                      {...field}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="shortForm"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Short Form *</FormLabel>
                    <Input
                      placeholder="CM"
                      {...field}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className=" flex justify-end mt-8">
              <Button
                type="submit"
                disabled={isUpdating}>
                {isUpdating && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
                {isUpdating ? " Please wait" : " Update Unit"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
