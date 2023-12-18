"use client";
import { Button } from "../../ui/button";
import { menuItems } from "@repo/shared/dummyContent";
import { cn } from "../../../config/utils";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

interface SidebarProps {
  toggleNavMenu?: () => void;
}

const Sidebar = ({ toggleNavMenu }: SidebarProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const highlighted = menuItems.find((item) => {
    if (item.href === "" && (pathname === "/dashboard" || pathname === "/")) {
      return true;
    }
    return item.href === pathname.split("/")[2];
  });

  return (
    <aside className={cn("w-64 px-4 h-screen dark:backdrop-brightness-90")}>
      <Link href={"/"} className="block text-3xl font-bold text-center py-4 border-b border-b-slate-700 dark:border-b-slate-700 ">
        PurePride
      </Link>
      <section className="mt-4 space-y-6">
        {menuItems.map((item) => (
          <Button
            variant={highlighted?.href === item.href ? "default" : "btn-sidebar"}
            className="text-center text-xl rounded-xl py-4  w-full h-full flex justify-start gap-3 items-center"
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
