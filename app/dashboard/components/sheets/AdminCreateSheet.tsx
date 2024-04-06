"use client";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createClient } from "@supabase/supabase-js";
import { useState } from "react";
import Loader from "../SpinLoader";
import { toast } from "sonner";

const supabaseUrl = "https://wnmdsfcgklevznryhgmp.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndubWRzZmNna2xldnpucnloZ21wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTIwMTc2OTgsImV4cCI6MjAyNzU5MzY5OH0.aPqU-niF_tY7VQifaFsjDtJgLiUqFosYzhUN6lcJKVo";
export const supabase = createClient(supabaseUrl, supabaseKey);

const formSchema = z.object({
  fullName: z.string().min(5, {
    message: "Full Name must be at least 5 characters.",
  }),

  username: z.string().min(4, {
    message: "Username must be at least 4 characters.",
  }),

  phone: z
    .string()
    .length(10, "Phone number must be 10 characters")
    .refine((val) => !Number.isNaN(parseInt(val, 10)), {
      message: "Expected number, received a string",
    }),
  email: z.string().min(2, {
    message: "Email must be at least 2 characters.",
  }),

  password: z.string().min(2, {
    message: "Password must be at least 2 characters.",
  }),

  role: z.string().min(2, {
    message: "role must be at least 2 characters.",
  }),
});

export function AdminCreateSheet() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      username: "",
      email: "",
      phone: undefined,
      password: "",
      role: "",
    },
  });

  //  Create admin handler
  const [isCreating, setIsCreating] = useState(false);
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsCreating(true);
      const { data, error } = await supabase.from("Admin").insert([values]).select();
      data && toast("Success");
    } catch (error) {
      console.error(error);
      error && toast("Success");
      setIsCreating(false);
    } finally {
      setIsCreating(false);
    }
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>New Admin</Button>
      </SheetTrigger>
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
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>fullName</FormLabel>
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
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>username</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="loki55"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>phone</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="9812345678"
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
                  <FormLabel>email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="youremail@gmail.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Complex#$%Password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>role</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="user"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>role</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="user"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>role</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="user"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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
