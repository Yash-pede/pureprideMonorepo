import { Home, LucideFileText, LucideList, LucideUser } from "lucide-react";

export const menuItems: {
  name: string;
  href: string;
  icon: React.FC;
  alert: boolean;
}[] = [
  {
    name: "Dashboard",
    href: "",
    icon: Home,

    alert: false,
  },
  {
    name: "Products",
    href: "products",
    icon: LucideList,

    alert: false,
  },
  {
    name: "Orders",
    href: "orders",
    icon: LucideList,

    alert: false,
  },
  {
    name: "Users",
    href: "users",
    icon: LucideUser,

    alert: true,
  },
  {
    name: "Stocks",
    href: "stocks",
    icon: LucideFileText,

    alert: true,
  },
];
