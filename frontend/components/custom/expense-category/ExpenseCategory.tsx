"use client";
import * as React from "react";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import SettingExpenseCatagoryPopover from "@/components/custom/expense-category/SettingExpenseCatagoryPopover";
import CreateExpenseCategoryPopover from "./CreateExpenseCategoryPopover";
import { useGetAllExpenseCategoryQuery } from "@/lib/features/expenseCategorySlice";

type Props = {
  currentSelectedCategoryId: string;
  setCurrentSelectedCategoryId: any;
  setCurrentCategoryObjectId: any;
};

export default function ExpenseCategory({ currentSelectedCategoryId, setCurrentSelectedCategoryId, setCurrentCategoryObjectId }: Props) {
  const [searchText, setsearchText] = React.useState<string>("");
  console.log(searchText);

  const { data: expenseCategories, isError, isLoading, isFetching, refetch } = useGetAllExpenseCategoryQuery({name:searchText});

  return (
    <div className="space-y-4">
      <div className=" flex items-center justify-between">
        <p className=" text-2xl font-medium">
          Categories <span className=" text-lg">(16)</span>
        </p>

        <CreateExpenseCategoryPopover refetch={refetch} />
      </div>
      <Input
        onChange={(e) => setsearchText(e.target.value)}
        placeholder="Search category by name..."
      />
      <ScrollArea className=" h-[85vh] rounded-md border">
        <Table>
          <TableCaption>A list of your expense categories.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead className="text-right">Total Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {expenseCategories?.data.map((item: any) => (
              <TableRow
                key={item._id}
                onClick={() => setCurrentCategoryObjectId(item._id)}>
                <TableCell>{item.name}</TableCell>
                <TableCell className="text-right">$250.00</TableCell>
                <TableCell className="text-right flex gap-2">
                  <div onClick={() => setCurrentSelectedCategoryId(item.expenseCategoryId)}>
                    <SettingExpenseCatagoryPopover
                      currentSelectedCategoryId={currentSelectedCategoryId}
                      refetch={refetch}
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollArea>
    </div>
  );
}
