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
import Image from "next/image";
import { IBankBalanceOut } from "@/app/types/cashAndBank";
import { supabase } from "@/utils/supabase/supabaseClient";
type Props = {};

const columns: ColumnDef<IBankBalanceOut>[] = [
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
    accessorKey: "amount",
    header: "amount",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("amount")}</div>
    ),
  },
  {
    accessorKey: "date",
    header: "date",
    cell: ({ row }) => <div className="capitalize">{row.getValue("date")}</div>,
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

            <Link href={`/bankBalance/edit/${item.id}`}>
              <DropdownMenuItem>Edit Bank Balance</DropdownMenuItem>
            </Link>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <span className=" flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
                  {" "}
                  Delete bank balance
                </span>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    your account and remove your data from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    className=" bg-red-500/90"
                    // onClick={() => deletePaymentIn(item.id)}
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
export default function Page({}: Props) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const [refreshNow, setRefreshNow] = useState(false);

  const [bankBalance, setBankBalance] = React.useState<IBankBalanceOut[]>([]);

  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  // fetching data from supabase
  React.useEffect(() => {
    const fetch = async () => {
      let { data, error } = await supabase.from("Bank-balance").select("*");

      if (error) {
        throw new Error("Failed to fetch bank balance");
      }
      setBankBalance(data || []);
    };
    fetch();
  }, [refreshNow]);

  console.log(bankBalance, "bankbalancedata");

  // for delete operation of data
  const deleteBankBalance = async (id: number) => {
    try {
      setIsDeleting(true);
      const { error, data, status } = await supabase
        .from("Bank-balance")
        .delete()
        .eq("id", id);

      setRefreshNow(!refreshNow);
      if (error || status !== 204) {
        throw new Error("Failed to delete bank balance");
      }
      toast.success(
        isDeleting ? "Bank balance deleting" : "Bank balance deleted successfully"
      );
    } catch (error) {
      toast.error("Failed to delete bank balance");
    } finally {
      setIsDeleting(false);
    }
  };

  

  return <div>Page</div>;
}
