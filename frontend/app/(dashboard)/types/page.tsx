"use client";
import * as React from "react";
import { ColumnDef, ColumnFiltersState, SortingState, VisibilityState, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";
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
import { ITypeOut } from "@/app/types/type";
import { useGetAllTypeQuery, useDeleteTypeMutation } from "@/lib/features/typeSlice";
import CreateTypePopover from "@/components/custom/type/CreateTypePopover";
import ButtonActionLoader from "@/components/custom/ButtonActionLoader";
import EditTypeDialog from "@/components/custom/type/EditTypeDialog";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import DeleteIcon from "@/components/custom/DeleteIcon";

export default function Page() {
  const { data: types, isError, isLoading: isFetching, refetch } = useGetAllTypeQuery({});
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const [currentSelectedTypeId, setCurrentSelectedTypeId] = React.useState<string>("");
  console.log(currentSelectedTypeId);
  const [deleteType, { data: deleteData, isError: isDeleteError, error: deleteError, isLoading: isDeleting }] = useDeleteTypeMutation();

  const [open, setOpen] = React.useState(false);

  const handleMoreClick = (typeId) => {
    setCurrentSelectedTypeId(typeId); // Set the currentSelectedTypeId state with the typeId of the clicked item
    // setOpen(true); // Open the dropdown menu
  };

  const handleDelete = async (id: string) => {
    const res: any = await deleteType(id);
    console.log(res);
    if (res.data) {
      toast.success(res.data.msg);
      refetch();
    }
  };

  const columns: ColumnDef<ITypeOut>[] = [
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
      accessorKey: "name",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Type Name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => <div className="lowercase">{row.getValue("name")}</div>,
    },

    {
      accessorKey: "typeId",
      header: "Type Id",
      cell: ({ row }) => <div>{row.getValue("typeId") || "NA"}</div>,
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
              alt="Type Image"
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
        console.log(item);

        return (
          <div onClick={() => setCurrentSelectedTypeId(item.typeId)}>
              <EditTypeDialog  currentSelectedTypeId={currentSelectedTypeId} />
            </div>
          // <DropdownMenu>
          //   {/* <DropdownMenuTrigger asChild></DropdownMenuTrigger> */}
            
          //   <DropdownMenuContent align="end">
          //     <DropdownMenuLabel>Actions</DropdownMenuLabel>
          //     <DropdownMenuItem onClick={() => navigator.clipboard.writeText(item.typeId)}>Copy item ID</DropdownMenuItem>
          //     <DropdownMenuSeparator />
          //     <Link href={`/types/view/${item.typeId}`}>
          //       <DropdownMenuItem>View type</DropdownMenuItem>
          //     </Link>
          //     <Link href={`/types/edit/${item.typeId}`}>
          //       <DropdownMenuItem>Edit type</DropdownMenuItem>
          //     </Link>

          //     <DropdownMenuItem onSelect={(e: any) => e.preventDefault()}>dfdfdf</DropdownMenuItem>

          //     <DropdownMenuItem onSelect={(e: any) => e.preventDefault()}>
          //       <EditTypeDialog />
          //     </DropdownMenuItem>

          //     <DropdownMenuItem onClick={() => handleDelete(item.typeId)}>Delete</DropdownMenuItem>
          //     <DropdownMenuItem>View item details</DropdownMenuItem>
          //   </DropdownMenuContent>
          // </DropdownMenu>
        );
      },
    },
  ];

  const table = useReactTable({
    // data,
    data: types?.data || [],
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
    <div className="w-full">
      <div className="flex justify-between items-center py-4">
        <Input
          placeholder="Filter by name..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) => table.getColumn("name")?.setFilterValue(event.target.value)}
          className="max-w-sm"
        />

        <div className=" space-x-2">
          <CreateTypePopover />

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
        {/* {isFetching && <p>Loading</p>} */}
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
  );
}
