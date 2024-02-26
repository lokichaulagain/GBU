"use client";
import CloudinaryUpload from "@/app/dashboard/components/CloudinaryUpload";
import { CategoryCreateSheet } from "@/app/dashboard/components/sheets/CategoryCreateSheet";
import { CategoryListTable } from "@/app/dashboard/components/tables/CategoryListTable";
import { CategoryViewDetailListTable } from "@/app/dashboard/components/tables/CategoryViewDetailListTable";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CldUploadButton, CldUploadWidget } from "next-cloudinary";
import React, { useState } from "react";

type Props = {};

export default function Page({}: Props) {
  return (
    <div>
      <div className=" mb-8 px-4">
        <div className="space-y-1">
          <h4 className="text-base font-medium leading-none">Categories Page</h4>
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

          {/* <CategoryCreateSheet /> */}
        </div>
      </div>
      <CategoryViewDetailListTable />
    </div>
  );
}
