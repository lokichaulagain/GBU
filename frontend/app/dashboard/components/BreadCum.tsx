import React from "react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
type Props = {};

export default function BreadCum({}: Props) {
  return (
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

        <Button>Add New</Button>
      </div>
    </div>
  );
}
