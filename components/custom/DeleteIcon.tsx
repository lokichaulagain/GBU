"use client";

import { Trash2 } from "lucide-react";

type Props = {
  size?: number;
};

export default function DeleteIcon({ size = 16 }: Props) {
  return (
    <div>
      <Trash2 size={size} className=" text-red-500/80 cursor-pointer" />
    </div>
  );
}
