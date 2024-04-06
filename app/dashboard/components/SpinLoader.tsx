"use client";
import { Loader } from "lucide-react";
import React from "react";

export default function SpinLoader() {
  return (
    <div className="h-screen flex items-center justify-center">
      <Loader className="animate-spin" />
    </div>
  );
}
