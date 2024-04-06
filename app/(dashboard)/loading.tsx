"use client";
import { Loader } from "lucide-react";

// This is page transition loading
export default function Loading() {
  return (
    <div className=" h-screen flex items-center justify-center">
      <div className=" flex items-center gap-1">
        <Loader size={14} /> <p>Loading...</p>
      </div>
    </div>
  );
}
