"use client";
import { Button } from "../../ui/button";
import { menuItems } from "@repo/shared/dummyContent";
import { cn } from "../../../config/utils";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { Badge } from "../../ui/badge";
import { Separator } from "../../ui/separator";

interface SidebarProps {
  toggleNavMenu?: () => void;
  appName?: string;
}

const Sidebar = ({ toggleNavMenu, appName }: SidebarProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const highlighted = menuItems.find((item) => {
    if (item.href === "" && (pathname === "/dashboard" || pathname === "/")) {
      return true;
    }
    return item.href === pathname.split("/")[2];
  });

  return (
    <aside className={cn("md:w-64 w-full px-4")}>
      <Link
        href={"/"}
        className="flex flex-col items-center gap-1 text-3xl font-bold text-center py-4 "
      >
        PurePride
        <Badge variant={"secondary"} className="xl:ml-auto">
          {appName}
        </Badge>
      </Link>
      <Separator />
      <section className="mt-4 space-y-6">
        {menuItems.map((item) => (
          <Button
            variant={
              highlighted?.href === item.href ? "btn-primary" : "btn-sidebar"
            }
            className="text-center text-xl rounded-xl py-4  w-full h-full flex justify-start gap-3 items-center duration-100 transition-all"
            key={item.href}
            onClick={() => {
              router.push(`/dashboard/${item.href}`);
              toggleNavMenu && toggleNavMenu();
            }}
          >
            {React.createElement(item.icon)} {item.name}
          </Button>
        ))}
      </section>
    </aside>
  );
};

export default Sidebar;
