import React from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuPortal, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { UserCircleIcon } from "lucide-react";
type Props = {};

export default function AdminCircleUser({}: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <UserCircleIcon className=" cursor-pointer" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {lists.map((item: any, index: any) => (
            <DropdownMenuItem
              key={index}
              className=" cursor-pointer hover:bg-slate-100">
              {item.name}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

const lists = [
  {
    name: "Profile",
    href: "/",
  },

  {
    name: "Billing",
    href: "/",
  },
  {
    name: "Settings",
    href: "/",
  },
  {
    name: "Log out",
    href: "/",
  },
];
