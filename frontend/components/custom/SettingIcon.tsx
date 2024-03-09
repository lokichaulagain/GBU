"use client";

import { Settings, Trash2 } from "lucide-react";

type Props = {
  size?: number;
};

export default function SettingIcon({ size = 16 }: Props) {
  return (
    <div>
      <Settings size={size} className=" text-foreground/80 cursor-pointer" />
    </div>
  );
}