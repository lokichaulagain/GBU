"use client";

import { FilePenLine } from "lucide-react";

type Props = {
  size?: number;
};

export default function EditIcon({ size = 16 }: Props) {
  return (
    <div>
      <FilePenLine size={size} className=" cursor-pointer" />
    </div>
  );
}
