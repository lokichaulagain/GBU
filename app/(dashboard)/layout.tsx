"use client";
import { Menu, Settings, User2 } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import CollapsibleTab from "../../components/custom/CollapsibleTab";
import AdminNotification from "../../components/custom/AdminNotification";
import AdminCircleUser from "../../components/custom/AdminCircleUser";
import ThemeToggleButton from "@/components/custom/ThemeToggleButton";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const changeFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  return (
    <div className=" flex">
      {!isFullScreen && (
        <ScrollArea className={`${isFullScreen ? "" : "w-2/12"}  h-screen border p-4`}>
          <div>
            <p className=" text-3xl font-semibold  mb-8   ">Global Baluwa</p>
            <div className=" space-y-4 tracking-wider   ">
              {navItems.map((item: any, index: number) => (
                <CollapsibleTab
                  key={index}
                  item={item}
                />
              ))}
            </div>
          </div>
        </ScrollArea>
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
        title: "Categories",
        href: "/categories",
      },
      {
        title: "Items List",
        href: "/items",
      },

      {
        title: "Units",
        href: "/units",
      },

      // {
      //   title: "Parties",
      //   href: "/parties",
      // },

      // {
      //   title: "Types",
      //   href: "/types",
      // },
    ],
  },

  {
    name: "Parties",
    icon: <Settings size={15} />,
    href: "/parties",
  },

  {
    name: "Cash & Banks ",
    icon: <User2 size={15} />,
    href: "",

    subLinks: [
      {
        title: "Cash In Hand",
        href: "/cash-in-hand",
      },

      {
        title: "Bank Balance",
        href: "/bank-balance",
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
    name: "Payment In/Out ",
    icon: <User2 size={15} />,
    href: "",

    subLinks: [
      {
        title: "Payment In",
        href: "/payment-in",
      },

      {
        title: "Payment Out",
        href: "/payment-out",
      },
    ],
  },

  {
    name: "Settings",
    icon: <Settings size={15} />,
    href: "/",
  },
];
