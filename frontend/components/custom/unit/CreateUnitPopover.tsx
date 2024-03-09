"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useCreateUnitMutation } from "@/lib/unitSlice";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import ButtonActionLoader from "../ButtonActionLoader";

type Props = {
  refetch?: any;
};

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  shortForm: z.string().optional(),
});

export default function CreateUnitPopover({ refetch }: Props) {
  const [createUnit, { error, isLoading }] = useCreateUnitMutation();

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      shortForm: "",
    },
  });

  // Define a submit handler.
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const res: any = await createUnit(values);
    if (res.data) {
      toast.success(res.data.msg);
      form.reset();
      refetch();
    }
  };

  if (error) {
    if ("status" in error) {
      const errMsg = "error" in error ? error.error : JSON.stringify(error.data);
      const errorMsg = JSON.parse(errMsg).msg;
      toast.error(errorMsg);
    } else {
      const errorMsg = error.message;
      toast.error(errorMsg);
    }
  }

  return (
    <Popover>
      <PopoverTrigger>
        <Button>Add New Unit</Button>
      </PopoverTrigger>

      <PopoverContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className=" space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Unit Name *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Unit Name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="shortForm"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Short Form</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Short Form"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={isLoading}>
              {isLoading && <ButtonActionLoader />}
              Submit
            </Button>
          </form>
        </Form>
      </PopoverContent>
    </Popover>
  );
}
