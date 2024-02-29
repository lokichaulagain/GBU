"use client";
import { INavItem, ISubLink } from "@/app/types/type";
import { ChevronDown, Home } from "lucide-react";
import Link from "next/link";
import Collapsible from "react-collapsible";

type Props = {
  item: INavItem;
};

export default function CollapsibleTab({ item }: Props) {
  return (
    <div className=" ">
      {/* <p className=" text-xs tracking-wider uppercase mb-2  mt-6">LAYOUTS & PAGES</p> */}
      <Collapsible
        transitionTime={100}
        trigger={
          <Link
            href={item.href}
            className="flex items-center   gap-1 hover:text-gray-100 transition-all ease-out duration-300">
            {item.icon} {item.name} {item.subLinks?.length && <ChevronDown size={18} />}
          </Link>
        }>
        <div className=" space-y-4 pt-4">
          {item.subLinks?.map((sublink: ISubLink, index: number) => (
            <div
              key={index}
              className=" flex flex-col">
              <Link
                href={sublink.href}
                className=" ml-3 hover:text-gray-100 transition-all ease-out duration-300 hover:transform hover:translate-x-1">
                {sublink.title}
              </Link>
            </div>
          ))}
        </div>
      </Collapsible>
    </div>
  );
}
