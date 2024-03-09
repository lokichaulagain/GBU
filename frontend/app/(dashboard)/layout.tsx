"use client";
import { Home, Menu, Settings, User2 } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import CollapsibleTab from "../dashboard/components/CollapsibleTab";
import AdminNotification from "../dashboard/components/AdminNotification";
import AdminCircleUser from "../dashboard/components/AdminCircleUser";
import ThemeToggleButton from "../dashboard/ThemeToggleButton";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const changeFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  return (
    <div className=" flex">
      {!isFullScreen && (
        <div className={`${isFullScreen ? "" : "w-2/12"}  h-screen overflow-y-scroll bg-primary p-4 text-primary-foreground `}>
          <p className=" text-3xl font-semibold  mb-8   ">Dashboard</p>
          <div className=" space-y-4 tracking-wider   ">
            {navItems.map((item: any, index: number) => (
              <CollapsibleTab
                key={index}
                item={item}
              />
            ))}
          </div>
        </div>
      )}

      <div className={`${isFullScreen ? " w-full " : " w-10/12"} h-screen overflow-y-scroll`}>
        <div className="  flex items-center justify-between  h-12 px-4 shadow-md z-50">
          <Button
            onClick={changeFullScreen}
            variant="outline">
            <Menu className=" cursor-pointer " />
          </Button>
          <div className=" flex space-x-4">
            <AdminNotification />
            <AdminCircleUser />
            <ThemeToggleButton />
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
    isTriggerDisable: true,
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
        title: "Types",
        href: "/types",
      },

      {
        title: "Income Categories",
        href: "/income-categories",
      },

      {
        title: "Expense Categories",
        href: "/expense-categories",
      },
    ],
  },

  {
    name: "Incomes Expenses",
    icon: <User2 size={15} />,
    href: "",

    subLinks: [
      {
        title: "Incomes",
        href: "/incomes",
      },

      {
        title: "Expenses",
        href: "/expenses",
      },
    ],
  },

  {
    name: "Settings",
    icon: <Settings size={15} />,
    href: "/settings",
  },
];
