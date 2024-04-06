"use client";
import { INavItem } from "@/app/types/type";
import CollapsibleTab from "./CollapsibleTab";
import { MyTable } from "./MyTable";
import { Home, Menu, Settings, User2 } from "lucide-react";
import AdminCircleUser from "./AdminCircleUser";
import AdminNotification from "./AdminNotification";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import BreadCum from "./BreadCum";
type Props = {};

export default function AdminSideMenu({}: Props) {
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
        <div className=" px-4 mt-8 ">
          <BreadCum />

          <MyTable />
        </div>
      </div>
    </div>
  );
}

const navItems = [
  {
    name: "Overview",
    href: "",
    icon: <Home size={15} />,
    subLinks: [
      {
        title: "Home1",
        href: "/haha",
      },

      {
        title: "Home2",
        href: "/loki",
      },

      {
        title: "Home3",
        href: "/lala",
      },
    ],
  },

  {
    name: "Users",
    icon: <User2 size={15} />,
    href: "",

    subLinks: [
      {
        title: "About1",
        href: "/sss",
      },

      {
        title: "About2",
        href: "/edsds",
      },

      {
        title: "About3",
        href: "/sdsd",
      },
    ],
  },

  {
    name: "Settings",
    icon: <Settings size={15} />,
    href: "/haha",
  },
];
