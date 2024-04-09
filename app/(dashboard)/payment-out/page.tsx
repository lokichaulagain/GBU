"use client";
import * as React from "react";
import {
  CaretSortIcon,
  ChevronDownIcon,
  DotsHorizontalIcon,
} from "@radix-ui/react-icons";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { supabase } from "@/app/dashboard/components/sheets/AdminCreateSheet";
import Link from "next/link";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import defaultImg from "../../../public/default-images/unit-default-image.png";
import DynamicBreadcrumb from "@/components/DynamicBreadcrumb";
import Image from "next/image";
import { IPartyOut } from "@/app/types/party";

export default function Page() {
  const [refreshNow, setRefreshNow] = useState(false);

  const [paymentsOut, setPaymentsOut] = React.useState<any[]>([]);
  React.useEffect(() => {
    const fetch = async () => {
      let { data, error } = await supabase.from("Payment-out").select("*");
      if (error) {
        throw new Error("Failed to fetch parties");
      }
      setPaymentsOut(data || []);
    };
    fetch();
  }, [refreshNow]);

  console.log(paymentsOut);

  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const deletePaymentOut = async (id: number) => {
    try {
      setIsDeleting(true);
      const { error, data, status } = await supabase
        .from("Payment-out")
        .delete()
        .eq("id", id);

      setRefreshNow(!refreshNow);
      if (error || status !== 204) {
        throw new Error("Failed to delete payment-out");
      }
      toast.success(
        isDeleting ? "Payment-out deleting" : "Payment-out deleted successfully"
      );
    } catch (error) {
      toast.error("Failed to delete payment-out");
    } finally {
      setIsDeleting(false);
    }
  };

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const columns: ColumnDef<IPartyOut>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
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
      accessorKey: "receiptNumber",
      header: "receiptNumber",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("receiptNumber")}</div>
      ),
    },
    {
      accessorKey: "party",
      header: "party",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("party")}</div>
      ),
    },
    {
      accessorKey: "paymentMethod",
      header: "paymentMethod",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("paymentMethod")}</div>
      ),
    },
    {
      accessorKey: "paidAmount",
      header: "paidAmount",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("paidAmount")}</div>
      ),
    },

    {
      accessorKey: "image",
      header: "Image",
      cell: ({ row }) => {
        const image: string = row.getValue("image") as string;
        return (
          <div className="">
            <Image
              src={image || defaultImg}
              alt="Branch Image"
              width={30}
              height={30}
              className=" border p-1 rounded-md"
            />
          </div>
        );
      },
    },
    {
      id: "actions",
      enableHiding: false,
      header: "Action",
      cell: ({ row }) => {
        const item = row.original;
        console.log(item.id);

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <DotsHorizontalIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>

              <Link href={`/paymentsOut/edit/${item.id}`}>
                <DropdownMenuItem>Edit payment-out</DropdownMenuItem>
              </Link>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <span className=" flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
                    {" "}
                    Delete payment-out
                  </span>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      your account and remove your data from our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      className=" bg-red-500/90"
                      onClick={() => deletePaymentOut(item.id)}
                    >
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const table = useReactTable({
    data: paymentsOut,
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

  return (
    <div className="w-full">
      {/* <DynamicBreadcrumb
        items={[
          { name: "Dashboard", link: "/dashboard" },
          { name: "Payments in", link: "/paymentsIn", isCurrentPage: true },
        ]}
      /> */}

      {isDeleting && toast.success("Deleting ...")}
      <div className="flex items-center justify-between py-4">
        <Input
          placeholder="Search by name..."
          value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("email")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />

        <div className=" space-x-2">
          <Link href={"/payment-out/create"}>
            <Button>Create payment-out</Button>
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Columns <ChevronDownIcon className="ml-2 h-4 w-4" />
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
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
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
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>

        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
