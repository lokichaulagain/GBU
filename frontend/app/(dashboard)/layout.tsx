"use client";
import { INavItem } from "@/app/types/type";
import { Home, Menu, Settings, User2 } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import CollapsibleTab from "../dashboard/components/CollapsibleTab";
import AdminNotification from "../dashboard/components/AdminNotification";
import AdminCircleUser from "../dashboard/components/AdminCircleUser";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const changeFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  return (
    <div className=" flex">
      {!isFullScreen && (
        <div className={`${isFullScreen ? "" : "w-2/12"}  h-screen overflow-y-scroll bg-slate-800 p-4`}>
          <p className=" text-3xl font-semibold  mb-8 text-gray-200 ">Dashboard</p>
          <div className=" space-y-5 tracking-wider text-gray-400 ">
            {navItems.map((item: INavItem, index: number) => (
              <CollapsibleTab
                key={index}
                item={item}
              />
            ))}
          </div>
        </div>
      )}

      <div className={`${isFullScreen ? " w-full " : " w-10/12"} h-screen overflow-y-scroll  bg-slate-100`}>
        <div className="  flex items-center justify-between bg-white h-12 px-4 shadow-md z-50">
          <Button
            onClick={changeFullScreen}
            variant="outline">
            <Menu className=" cursor-pointer " />
          </Button>
          <div className=" flex space-x-4">
            <AdminNotification />
            <AdminCircleUser />
          </div>
        </div>
        <div className=" px-4 mt-8 ">{children}</div>
      </div>
    </div>
  );
}

const navItems = [
  {
    name: "Dashboard",
    icon: <Settings size={15} />,
    href: "/dashboard",
  },

  {
    name: "Overview",
    href: "",
    icon: <Home size={15} />,
    subLinks: [
      {
        title: "Dashboard",
        href: "/dashboard",
      },

      {
        title: "Users",
        href: "/users",
      },

      {
        title: "Categories",
        href: "/categories",
      },
    ],
  },

  {
    name: "Items",
    icon: <User2 size={15} />,
    href: "",

    subLinks: [
      {
        title: "Units",
        href: "/units",
      },

      {
        title: "Categories",
        href: "/categories",
      },

      {
        title: "About3",
        href: "/users",
      },
    ],
  },

  {
    name: "Settings",
    icon: <Settings size={15} />,
    href: "/settings",
  },
];
