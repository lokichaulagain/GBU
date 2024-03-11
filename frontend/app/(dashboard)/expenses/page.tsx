"use client";
import * as React from "react";
import { ColumnDef, ColumnFiltersState, SortingState, VisibilityState, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import { ChevronDown, MoreHorizontal, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Image from "next/image";
import defaultImage from "../../../public/default-images/unit-default-image.png";
import Link from "next/link";
import { toast } from "sonner";
import SpinLoader from "@/app/dashboard/components/SpinLoader";
import { useGetAllExpenseQuery, useDeleteExpenseMutation } from "@/lib/features/expenseSlice";
import { IExpenseOut } from "@/app/types/expense";
import Pill from "@/components/custom/Pill";
import CustomChart from "@/components/custom/CustomChart";
import ExpenseCategory from "@/components/custom/expense-category/ExpenseCategory";

export default function Page() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const [deleteExpense, { data, isError: add, isLoading: arr }] = useDeleteExpenseMutation();
  const [currentSelectedCategoryId, setCurrentSelectedCategoryId] = React.useState<string>("");
  const [currentCategoryObjectId, setCurrentCategoryObjectId] = React.useState<string>("");
  const { data: expenses, isError, isLoading: isFetching, refetch } = useGetAllExpenseQuery({ expenseCategory: currentCategoryObjectId });

  const handleDelete = async (id: string) => {
    try {
      const res: any = await deleteExpense(id);
      toast(res.data.msg);
      refetch();
    } catch (error: any) {
      toast.warning(error.response.message);
    }
  };

  const columns: ColumnDef<IExpenseOut>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },

    {
      accessorKey: "date",
      header: "Date ",
      cell: ({ row }) => <div className="capitalize"> {row.getValue("date")}</div>,
    },

    {
      accessorKey: "amount",
      header: "Amount (Rs) ",
      cell: ({ row }) => <div className="capitalize">Rs. {row.getValue("amount")}</div>,
    },

    {
      accessorKey: "note",
      header: "Note",
      cell: ({ row }) => <div className="capitalize">Rs. {row.getValue("note")}</div>,
    },

    {
      accessorKey: "paymentMethod",
      header: "Payment Method",
      cell: ({ row }) => (
        <>
          {row.getValue("paymentMethod") === "cash" ? (
            <Pill
              value={row.getValue("paymentMethod")}
              className="bg-red-50  text-red-500"
            />
          ) : row.getValue("paymentMethod") === "cheque" ? (
            <Pill
              value={row.getValue("paymentMethod")}
              className="bg-sky-50  text-sky-500"
            />
          ) : row.getValue("paymentMethod") === "online" ? (
            <Pill
              value={row.getValue("paymentMethod")}
              className="bg-green-50   text-green-500"
            />
          ) : null}
        </>
      ),
    },

    {
      accessorKey: "image",
      header: "Image",
      cell: ({ row }) => {
        const imageUrl: string = row.getValue("image") as string;
        return (
          <div className="">
            <Image
              src={imageUrl || defaultImage}
              alt="Income Image"
              width={30}
              height={30}
            />
          </div>
        );
      },
    },

    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const item = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => navigator.clipboard.writeText(item.expenseId)}>Copy item ID</DropdownMenuItem>
              <DropdownMenuSeparator />

              <Link href={`/incomes/edit/${item.expenseId}`}>
                <DropdownMenuItem>Edit income</DropdownMenuItem>
              </Link>

              <DropdownMenuItem onClick={() => handleDelete(item.expenseId)}>Delete income</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const table = useReactTable({
    // data,
    data: expenses?.data || [],
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  if (isFetching) {
    return (
      <div>
        <SpinLoader />
      </div>
    );
  }

  return (
    <div className=" flex gap-4">
      <div className=" w-3/12">
        <ExpenseCategory
          currentSelectedCategoryId={currentSelectedCategoryId}
          setCurrentSelectedCategoryId={setCurrentSelectedCategoryId}
          setCurrentCategoryObjectId={setCurrentCategoryObjectId}
        />
      </div>

      <div className="w-9/12">
        <div className="w-full h-52">
          <CustomChart />
        </div>

        <div>
          <div className="flex justify-between items-center py-4">
            <Input
              placeholder="Filter by name..."
              value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
              onChange={(event) => table.getColumn("name")?.setFilterValue(event.target.value)}
              className="max-w-sm"
            />

            <div className=" space-x-2 flex items-center">
              <Link href={"/expenses/create"}>
                <Button>
                  <Plus
                    size={18}
                    className=" mr-2"
                  />{" "}
                  Add New Expense
                </Button>
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="ml-auto">
                    Columns <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {table
                    .getAllColumns()
                    .filter((column) => column.getCanHide())
                    .map((column) => {
                      return (
                        <DropdownMenuCheckboxItem
                          key={column.id}
                          className="capitalize"
                          checked={column.getIsVisible()}
                          onCheckedChange={(value) => column.toggleVisibility(!!value)}>
                          {column.id}
                        </DropdownMenuCheckboxItem>
                      );
                    })}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return <TableHead key={header.id}>{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}</TableHead>;
                    })}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}>
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center">
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
            
          </div>
          <div className="flex items-center justify-end space-x-2 py-4">
            <div className="flex-1 text-sm text-muted-foreground">
              {table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} row(s) selected.
            </div>
            <div className="space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}>
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}>
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
