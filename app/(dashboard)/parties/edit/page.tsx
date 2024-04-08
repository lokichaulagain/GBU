"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/app/dashboard/components/sheets/AdminCreateSheet";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useParams } from "next/navigation";
import DynamicBreadcrumb from "@/components/DynamicBreadcrumb";
import { IPartyOut } from "@/app/types/party";
import Image from "next/image";
import ButtonActionLoader from "@/components/custom/ButtonActionLoader";
import OptionalLabel from "@/components/custom/OptionalLabel";



import OptionalLabel from "@/components/custom/OptionalLabel";
import { ReloadIcon } from "@radix-ui/react-icons";
import DynamicBreadcrumb from "@/components/DynamicBreadcrumb";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Form, FormControl } from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ITypeOut } from "@/app/types/type";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),

  phone: z.string().length(10, {
    message: "Phone must be exactly 10 characters.",
  }),

  type: z.coerce.number(),

  openingBalance: z.coerce.number(),
  openingBalanceDate: z.coerce.date(),
  address: z.string(),

  email: z.string().min(10, {
    message: "Name must be at least 10 characters.",
  }),

  panNumber: z.string().min(10, {
    message: "Pan Number must be at least 10 characters.",
  }),

  image: z.string().optional(),
});

export default function Page() {
  const params = useParams() as { id: string };
  const id = parseFloat(params.id);

  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [party, setParty] = useState<IPartyOut>();

  const [refetch, setRefetch] = useState<boolean>(false);
  useEffect(() => {
    const fetchParty = async () => {
      setIsFetching(true);
      try {
        const { data: Party, error } = await supabase.from("Party").select().eq("id", id).single();
        if (error) {
          throw new Error("Failed to fetch type");
        }
        setParty(Party);
        setRefetch(false);
      } catch (error) {
        console.error("Failed to fetch type:", error);
      } finally {
        setIsFetching(false);
      }
    };

    fetchParty();
  }, [id, refetch]);

  // Define your form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      type: 0,
      openingBalance: 0,
      openingBalanceDate: new Date(),
      address: "",
      email: "",
      panNumber: "",
      image: "",
    },
  });

  useEffect(() => {
    if (party) {
      form.reset({
        name: party.name || "",
        phone: party.phone || "",
        type: party.type || 0,
        openingBalance: party.openingBalance || 0,
        openingBalanceDate: party.openingBalanceDate || new Date(),
        address: party.address || "",
        email: party.email || "",
        panNumber: party.panNumber || "",
        image: party.image || "",
      });
    }
  }, [form, party]);

  // Define a submit handler
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsUpdating(true);
      const { data, error, status } = await supabase.from("Party").update(values).eq("id", id).select();

      if (error || status !== 200) {
        throw new Error("Failed to update party");
      }

      toast.success("Party updated successfully");
      form.reset();
      setRefetch(true);
    } catch (error) {
      toast.error("Failed to update party");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <Form {...form}>
      <DynamicBreadcrumb
        items={[
          { name: "Dashboard", link: "/dashboard" },
          { name: "Parties", link: "/parties" },
          { name: "Edit", link: "/parties/edit", isCurrentPage: true },
        ]}
      />

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
              <FormLabel>Type</FormLabel>
              <Select
                {...field}
                onValueChange={field.onChange}
                defaultValue={field.name.toString()}
                value={field.value.toString()}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {types.map((item) => (
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
            <FormItem className="flex flex-col hap-4">
              <FormLabel>Date of birth</FormLabel>
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
                  placeholder="Address"
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
              <Input {...field} />
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
              <Input {...field} />
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
            {isCreating ? " Please wait" : " Create Party"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
