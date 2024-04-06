import React from "react";
import { Badge } from "@/components/ui/badge";

type Props = {
  value: string;
  className: string;
};

export default function Pill({ value, className }: Props) {
  return (
    <Badge
      variant="outline"
      className={`${className} w-16 flex items-center justify-center  border-none rounded-md`}>
      {value}
    </Badge>
  );
}
