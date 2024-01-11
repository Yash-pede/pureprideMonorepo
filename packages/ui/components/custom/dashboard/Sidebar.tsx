"use client";
import { Button } from "../../ui/button";
import { menuItems } from "@repo/shared/contents";
import { cn } from "../../../config/utils";
import Link from "next/link";
import { redirect, usePathname, useRouter } from "next/navigation";
import React, { Children, useContext } from "react";
import { Badge } from "../../ui/badge";
import { Separator } from "../../ui/separator";
import {
  ChevronFirst,
  ChevronLast,
  ChevronLeftCircleIcon,
  ChevronRightCircleIcon,
  MoreHorizontal,
} from "lucide-react";
import Image from "next/image";
import { expand, profileImage } from "@repo/shared/images";
import { createContext } from "vm";

interface SidebarProps {
  toggleNavMenu?: () => void;
  appName?: string;
}

const Sidebar = ({ toggleNavMenu, appName }: SidebarProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const [expanded, setExpanded] = React.useState(true);
  const highlighted = menuItems.find((item) => {
    if (item.href === "" && (pathname === "/dashboard" || pathname === "/")) {
      return true;
    }
    return item.href === pathname.split("/")[2];
  });

  return (
    <aside className={cn("h-screen ")}>
      <nav className="h-full flex flex-col md:border-r shadow-sm">
        <div className="p-4 pb-2 flex items-center justify-between">
          <h2
            className={`text-xl font-bold overflow-hidden transition-all ${
              expanded ? "w-32" : "w-0"
            }`}
          >
            {appName}
          </h2>
          <Button
            className="hidden md:block"
            variant={"ghost"}
            onClick={() => setExpanded((e) => !e)}
          >
            {expanded ? <ChevronFirst /> : <ChevronLast />}
          </Button>
        </div>
        <ul
          className="flex-1 px-3"
          onClick={() => toggleNavMenu && toggleNavMenu()}
        >
          {menuItems.map((item: any) => (
            <SidebarItem
              expanded={expanded}
              key={item.name}
              text={item.name}
              icon={item.icon}
              active={highlighted?.href === item.href}
              alert={item.alert}
              href={item.href}
            />
          ))}
        </ul>
        <div className="border-t flex p-3">
          <Image
            src={profileImage}
            alt=""
            width={32}
            height={32}
            className="w-10 h-10 rounded-md"
          />
          <div
            className={`flex justify-between items-center overflow-hidden transition-all ${
              expanded ? "ml-3 w-52" : "w-0"
            }`}
          >
            <div className="leading-4">
              <h4 className="font-semibold">jhon Wick</h4>
              <span>@jwick</span>
            </div>
            <MoreHorizontal />
          </div>
        </div>
      </nav>
    </aside>
  );
};

function SidebarItem({
  icon,
  text,
  active,
  alert,
  expanded,
  href,
}: {
  icon?: any;
  text: string;
  active?: boolean;
  alert?: boolean;
  expanded: boolean;
  href: string;
}) {
  return (
    <Link
      href={"/dashboard/" + href}
      className={`relative flex items-center justify-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group
      ${
        active
          ? "bg-gradient-to-tr from-primary/5 to-primary/15 text-primary"
          : "hover:bg-primary/10 text-foreground duration-200"
      }`}
    >
      {React.createElement(icon)}
      <span
        className={`overflow-hidden transition-all ${
          expanded ? "ml-3 w-52" : "w-0"
        }`}
      >
        {text}
      </span>
      {alert && (
        <div
          className={`absolute right-4 w-2 h-2 bg-primary rounded transition-all ${
            expanded ? "" : "top-2"
          }`}
        ></div>
      )}
      {!expanded && (
        <div
          className={`
        absolute left-full rounded-md px-2 py-1 ml-6
        bg-accent text-sm invisible opacity-20 -translate-x-3 transition-all 
        group-hover:visible group-hover:opacity-100 group-hover:translate-x-0 !z-50
      `}
        >
          {text}
        </div>
      )}
    </Link>
  );
}

export default Sidebar;
