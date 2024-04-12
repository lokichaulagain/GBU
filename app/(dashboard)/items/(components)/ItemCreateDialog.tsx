"use client";
import React, { useState } from "react";
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
import { ICategoryOut } from "@/app/types/category";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { IUnitOut } from "@/app/types/unit";

type Props = {
  setRefreshNow: React.Dispatch<React.SetStateAction<boolean>>;
};

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),

  category: z.string().min(1, {
    message: "Category is required",
  }),

  unit: z.string().min(1, {
    message: "Unit is required",
  }),

  sp: z.string().optional(),
  cp: z.string().optional(),

  openingStock: z.string().optional(),
  asOfDate: z.coerce.date().default(new Date()),

  itemCode: z.string().optional(),
  itemLocation: z.string().optional(),
  note: z.string().optional(),
});

export default function ItemCreateDialog({ setRefreshNow }: Props) {
  // Define your form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      category: "",
      unit: "",
      sp: "",
      cp: "",
      openingStock: "",
      asOfDate: new Date(),
      itemCode: "",
      itemLocation: "",
      note: "",
    },
  });

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

  const [units, setUnits] = useState<IUnitOut[]>();
  React.useEffect(() => {
    const fetch = async () => {
      let { data, error } = await supabase.from("Unit").select("*");
      if (error || !data) {
        throw new Error("Failed to fetch units");
      }

      setUnits(data || []);
    };
    fetch();
  }, []);

  // Define a submit handler
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsCreating(true);
      const { data, error, status } = await supabase.from("Item").insert([values]).select();

      if (error || status !== 201) {
        throw new Error("Failed to create item");
      }
      setRefreshNow(true);
      toast.success("Item created successfully");
      form.reset();
    } catch (error) {
      toast.error("Failed to create item");
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Create item</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[725px]">
        <DialogHeader>
          <DialogTitle>Create item</DialogTitle>
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
                    <FormLabel>Item Name *</FormLabel>
                    <Input
                      placeholder="Item Name"
                      {...field}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category </FormLabel>
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
                          <SelectGroup>
                            <SelectLabel>Categories</SelectLabel>
                            {categories.map((item) => (
                              <SelectItem
                                key={item.id}
                                value={item.id.toString()}>
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
                name="unit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Unit </FormLabel>
                    <FormControl>
                      <Select
                        {...field}
                        onValueChange={field.onChange}
                        defaultValue={field.name}
                        value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a unit" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Units</SelectLabel>
                            {units?.map((item) => (
                              <SelectItem
                                key={item.id}
                                value={item.id.toString()}>
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
                name="sp"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Selling price</FormLabel>

                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Rs. 2000"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="cp"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cost price</FormLabel>

                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Rs. 1000"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="openingStock"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Opening stock *</FormLabel>

                    <FormControl>
                      <Input
                        type="number"
                        placeholder=""
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="itemCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Item code </FormLabel>

                    <FormControl>
                      <Input
                        placeholder=" Enter item code here"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="itemLocation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Item location </FormLabel>

                    <FormControl>
                      <Input
                        placeholder=" Enter location here"
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
                    <FormLabel>Note </FormLabel>

                    <FormControl>
                      <Input
                        placeholder="Enter note here"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className=" flex justify-end mt-8">
                <Button
                  type="submit"
                  disabled={isCreating}>
                  {isCreating && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
                  {isCreating ? " Please wait" : " Create Item"}
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
