"use client";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useEffect } from "react";
import { toast } from "sonner";
import { useParams } from "next/navigation";
import { useGetUnitQuery, useUpdateUnitMutation } from "@/lib/unitSlice";
import EditIcon from "../EditIcon";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

type Props = {
  selectedUnitId: string;
};

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  shortForm: z.string().optional(),
});

export default function EditUnitDialog({ selectedUnitId }: Props) {
  const { data, isError, isLoading } = useGetUnitQuery(selectedUnitId);
  const unit = data?.data;
  console.log(unit);

  const [updateUnit, { data: aa, isError: ab, isLoading: ac }] = useUpdateUnitMutation();
  // 1. Define your form.
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      shortForm: "",
    },
  });

  useEffect(() => {
    if (unit) {
      form.reset({
        name: unit.name || "",
        shortForm: unit.shortForm || "",
      });
    }
  }, [form, unit]);

  // Define a submit handler.
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const res: any = await updateUnit({ unitId: selectedUnitId, updatedUnit: values });
      toast(res.data.msg);
    } catch (error: any) {
      toast.warning(error.response.message);
    }
  };
  return (
    // <Dialog>
    //   <DialogTrigger>
    //     <EditIcon size={20}/>
    //   </DialogTrigger>
    //   <DialogContent>
    //     <DialogHeader>
    //       <DialogTitle>Are you absolutely sure?</DialogTitle>
    //       <DialogDescription>
    //         <Form {...form}>
    //           <form
    //             onSubmit={form.handleSubmit(onSubmit)}
    //             className=" space-y-8">
    //             <FormField
    //               control={form.control}
    //               name="name"
    //               render={({ field }) => (
    //                 <FormItem>
    //                   <FormLabel>Unit Name *</FormLabel>
    //                   <FormControl>
    //                     <Input
    //                       placeholder="Unit Name"
    //                       {...field}
    //                     />
    //                   </FormControl>
    //                   <FormMessage />
    //                 </FormItem>
    //               )}
    //             />

    //             <FormField
    //               control={form.control}
    //               name="shortForm"
    //               render={({ field }) => (
    //                 <FormItem>
    //                   <FormLabel>Short Form</FormLabel>
    //                   <FormControl>
    //                     <Input
    //                       placeholder="Short Form"
    //                       {...field}
    //                     />
    //                   </FormControl>
    //                   <FormMessage />
    //                 </FormItem>
    //               )}
    //             />

    //             <Button type="submit">Submit</Button>
    //           </form>
    //         </Form>
    //       </DialogDescription>
    //     </DialogHeader>
    //   </DialogContent>
    // </Dialog>

    <Popover>
      <PopoverTrigger>Open</PopoverTrigger>
      <PopoverContent>Place content for the popover here.</PopoverContent>
    </Popover>
  );
}
