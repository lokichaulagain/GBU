"use client";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useDeleteExpenseCategoryMutation } from "@/lib/features/expenseCategorySlice";
import * as PopoverPrimitive from "@radix-ui/react-popover";
const PopoverClose = PopoverPrimitive.Close;

import React from "react";
import { toast } from "sonner";

type Props = {
  currentSelectedCategoryId: string | undefined;
  refetch: any;
};

export default function DeleteAlertDilog({ currentSelectedCategoryId, refetch }: Props) {
  const [deleteExpenseCategory, { data, isError, isLoading }] = useDeleteExpenseCategoryMutation();

  const handleDelete = async () => {
    try {
      const res: any = await deleteExpenseCategory(currentSelectedCategoryId);
      toast(res.data.msg);
      refetch();
    } catch (error: any) {
      toast.warning(error.response.message);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button
          type="button"
          variant={"destructive"}>
          Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure? {currentSelectedCategoryId}</AlertDialogTitle>
          <AlertDialogDescription>This action cannot be undone. This will permanently delete your account and remove your data from our servers.</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>

          <AlertDialogAction className=" [all:unset] hover:[all:unset]">
            <PopoverClose>
              <Button
                type="button"
                onClick={handleDelete}
                variant={"destructive"}>
                Yes Confirm
              </Button>
            </PopoverClose>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
