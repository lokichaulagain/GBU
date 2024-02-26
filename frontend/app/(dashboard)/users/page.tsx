import BreadCum from "@/app/dashboard/components/BreadCum";
import { AdminCreateSheet } from "@/app/dashboard/components/sheets/AdminCreateSheet";
import { AdminListTable } from "@/app/dashboard/components/tables/AdminListTable";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import React from "react";

type Props = {};

export default function Page({}: Props) {
  return (
    <div>
      <div className=" mb-8 px-4">
        <div className="space-y-1">
          <h4 className="text-base font-medium leading-none">Dashboard Page</h4>
        </div>
        <Separator className="my-4" />
        <div className=" flex items-center justify-between">
          <div className="flex h-5 items-center space-x-4 text-sm">
            <div>Blog</div>
            <Separator orientation="vertical" />
            <div>Docs</div>
            <Separator orientation="vertical" />
            <div>Source</div>
          </div>

          <AdminCreateSheet />
        </div>
      </div>
      <AdminListTable/>
    </div>
  );
}
