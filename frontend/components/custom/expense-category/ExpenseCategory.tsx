"use client";
import * as React from "react";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import SettingExpenseCatagoryPopover from "@/components/custom/expense-category/SettingExpenseCatagoryPopover";
import CreateExpenseCategoryPopover from "./CreateExpenseCategoryPopover";
import { useGetAllExpenseCategoryQuery } from "@/lib/features/expenseCategorySlice";
import { Search } from "lucide-react";
import ButtonActionLoader from "../ButtonActionLoader";

type Props = {
  currentSelectedCategoryId: string;
  setCurrentSelectedCategoryId: any;
  setCurrentCategoryObjectId: any;
};

export default function ExpenseCategory({ currentSelectedCategoryId, setCurrentSelectedCategoryId, setCurrentCategoryObjectId }: Props) {
  const [searchText, setsearchText] = React.useState<string>("");
  // const debouncedSearch = useDebounce(searchText, 500)
  console.log(searchText);

  const { data: expenseCategories, isError, isLoading, isFetching, refetch } = useGetAllExpenseCategoryQuery({ name: searchText });


  console.log(expenseCategories)
  return (
    <div className="space-y-4">
      <div className=" flex items-center justify-between">
        <p className=" text-2xl font-medium">
          Categories <span className=" text-lg">(16)</span>
        </p>

        <CreateExpenseCategoryPopover refetch={refetch} />
      </div>

      <div className="relative">
        <div className="absolute top-3 px-1 ">{isFetching ? <ButtonActionLoader /> : <Search size={16} />}</div>
        <input
          type="text"
          placeholder="Search category by name..."
          onChange={(e) => setsearchText(e.target.value)}
          className="flex items-center h-10 w-full rounded-md border border-input bg-transparent px-6 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
        />
      </div>

      <ScrollArea className=" h-[85vh] rounded-md border">
        <Table>
          <TableCaption>A list of your expense categories.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead className="text-right">Total Amount (Rs)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {expenseCategories?.data.map((item: any) => (
              <TableRow
                key={item._id}
                onClick={() => setCurrentCategoryObjectId(item._id)}>
                <TableCell>{item.name}</TableCell>
                <TableCell className="text-right">Rs. {item.totalAmount}</TableCell>
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
