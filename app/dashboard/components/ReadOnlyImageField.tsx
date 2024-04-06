"use client";
import Image from "next/image";
import unitDefaultImage from "../../../public/default-images/unit-default-image.png";

type Props = {
  label: string;
  value: string;
};

export default function ReadOnlyImageield({ label, value }: Props) {
  return (
    <div className=" space-y-1.5">
      <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">{label}</label>
      <div className=" h-32 border   w-1/12 border-dashed rounded-lg flex flex-col items-center justify-center ">
        <Image
          width={500}
          height={500}
          src={value || unitDefaultImage}
          alt="img"
          className="p-2 rounded-md overflow-hidden"
        />
      </div>
    </div>
  );
}
