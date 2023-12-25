import {
  calendar,
  element,
  forms,
  home,
  note,
  order,
  post,
  product,
  profile,
  user,
  settings,
  backup,
  chart,
  logs,
  userIcon,
  productIcon,
  revenueIcon,
  conversionIcon,
  product1,
  product2,
  product3,
  product4,
  product5,
  product6,
  product7,
  product8,
} from "./images/image";
import {
  Home,
  LucideFileText,
  LucideList,
  LucideListOrdered,
  LucideUser,
} from "lucide-react";

export const menus = [
  {
    id: 1,
    title: "Main",
    links: [
      {
        id: 1,
        image: home,
        name: "Home",
        url: "",
      },
      {
        id: 2,
        image: profile,
        name: "Profile",
        url: "profile",
      },
    ],
  },
  {
    id: 2,
    title: "List",
    links: [
      {
        id: 1,
        image: user,
        name: "Users",
        url: "users",
      },
      {
        id: 2,
        image: product,
        name: "product",
        url: "products",
      },
      {
        id: 3,
        image: order,
        name: "Orders",
        url: "orders",
      },
      {
        id: 4,
        image: post,
        name: "Post",
        url: "posts",
      },
    ],
  },
  {
    id: 3,
    title: "General",
    links: [
      {
        id: 1,
        image: element,
        name: "Element",
        url: "element",
      },
      {
        id: 2,
        image: forms,
        name: "Forms",
        url: "forms",
      },
      {
        id: 3,
        image: note,
        name: "notes",
        url: "notes",
      },
      {
        id: 4,
        image: calendar,
        name: "Calander",
        url: "chalander",
      },
    ],
  },
  {
    id: 4,
    title: "Analytics",
    links: [
      {
        id: 1,
        image: chart,
        name: "Charts",
        url: "charts",
      },
      {
        id: 2,
        image: logs,
        name: "Logs",
        url: "logs",
      },
    ],
  },
  {
    id: 5,
    title: "Maintanence",
    links: [
      {
        id: 1,
        image: settings,
        name: "Settings",
      },
      {
        id: 2,
        image: backup,
        name: "Backup",
      },
    ],
  },
];
export const topDealUsers = [
  {
    id: 1,
    img: "https://images.pexels.com/photos/8405873/pexels-photo-8405873.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
    username: "Elva McDonald",
    email: "elva@gmail.com",
    amount: "3.668",
  },
  {
    id: 2,
    img: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1600",
    username: "Linnie Nelson",
    email: "linnie@gmail.com",
    amount: "3.256",
  },
  {
    id: 3,
    img: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1600",
    username: "Brent Reeves",
    email: "brent@gmail.com",
    amount: "2.998",
  },
  {
    id: 4,
    img: "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=1600",
    username: "Adeline Watson",
    email: "adeline@gmail.com",
    amount: "2.512",
  },
  {
    id: 5,
    img: "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1600",
    username: "Juan Harrington",
    email: "juan@gmail.com",
    amount: "2.134",
  },
  {
    id: 6,
    img: "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=1600",
    username: "Augusta McGee",
    email: "augusta@gmail.com",
    amount: "1.932",
  },
  {
    id: 7,
    img: "https://images.pexels.com/photos/874158/pexels-photo-874158.jpeg?auto=compress&cs=tinysrgb&w=1600",
    username: "Angel Thomas",
    email: "angel@gmail.com",
    amount: "1.560",
  },
];

export const chartBoxUser = {
  color: "#8884d8",
  icon: userIcon,
  title: "Total Users",
  number: "11.238",
  dataKey: "users",
  percentage: 45,
  chartData: [
    { name: "Sun", users: 400 },
    { name: "Mon", users: 600 },
    { name: "Tue", users: 500 },
    { name: "Wed", users: 700 },
    { name: "Thu", users: 400 },
    { name: "Fri", users: 500 },
    { name: "Sat", users: 450 },
  ],
};
export const chartBoxProduct = {
  color: "skyblue",
  icon: productIcon,
  title: "Total Products",
  number: "238",
  dataKey: "products",
  percentage: 21,
  chartData: [
    { name: "Sun", products: 400 },
    { name: "Mon", products: 600 },
    { name: "Tue", products: 500 },
    { name: "Wed", products: 700 },
    { name: "Thu", products: 400 },
    { name: "Fri", products: 500 },
    { name: "Sat", products: 450 },
  ],
};
export const chartBoxRevenue = {
  color: "teal",
  icon: revenueIcon,
  title: "Total Revenue",
  number: "$56.432",
  dataKey: "revenue",
  percentage: -12,
  chartData: [
    { name: "Sun", revenue: 400 },
    { name: "Mon", revenue: 600 },
    { name: "Tue", revenue: 500 },
    { name: "Wed", revenue: 700 },
    { name: "Thu", revenue: 400 },
    { name: "Fri", revenue: 500 },
    { name: "Sat", revenue: 450 },
  ],
};
export const chartBoxConversion = {
  color: "gold",
  icon: conversionIcon,
  title: "Total Ratio",
  number: "2.6",
  dataKey: "ratio",
  percentage: 12,
  chartData: [
    { name: "Sun", ratio: 400 },
    { name: "Mon", ratio: 600 },
    { name: "Tue", ratio: 500 },
    { name: "Wed", ratio: 700 },
    { name: "Thu", ratio: 400 },
    { name: "Fri", ratio: 500 },
    { name: "Sat", ratio: 450 },
  ],
};

export const barChartBoxRevenue = {
  title: "Total Revenue",
  color: "#FF8042",
  dataKey: "Revenue",
  value: "1,000,000",
  chartData: [
    {
      name: "Sun",
      Revenue: 4000,
    },
    {
      name: "Mon",
      Revenue: 3000,
    },
    {
      name: "Tue",
      Revenue: 2000,
    },
    {
      name: "Wed",
      Revenue: 2780,
    },
    {
      name: "Thu",
      Revenue: 1890,
    },
    {
      name: "Fri",
      Revenue: 2390,
    },
    {
      name: "Sat",
      Revenue: 3490,
    },
  ],
};

export const barChartBoxProfits = {
  title: "Profit Earned",
  color: "#8884d8",
  dataKey: "profit",
  value: "100,000",
  chartData: [
    {
      name: "Sun",
      profit: 4000,
    },
    {
      name: "Mon",
      profit: 3000,
    },
    {
      name: "Tue",
      profit: 2000,
    },
    {
      name: "Wed",
      profit: 2780,
    },
    {
      name: "Thu",
      profit: 1890,
    },
    {
      name: "Fri",
      profit: 2390,
    },
    {
      name: "Sat",
      profit: 3490,
    },
  ],
};

export const rows = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 35, status: true },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42, status: false },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45, status: true },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 16, status: true },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
];

export const products = [
  {
    id: 1,
    isNew: true,
    category: "purepride",
    name: "Medicine - 1",
    price: "500",
    image: product1,
  },
  {
    id: 2,
    category: "injection",
    name: "Medicine - 2",
    price: "550",
    image: product1,
  },
  {
    id: 3,
    isNew: true,
    category: "pride it",
    name: "Medicine - 3",
    price: "503",
    image: product2,
  },
  {
    id: 4,
    category: "purepride",
    name: "Medicine - 4",
    price: "506",
    image: product3,
  },
  {
    id: 5,
    isNew: true,
    category: "purepride",
    name: "Medicine - 5",
    price: "503",
    image: product4,
  },
  {
    id: 6,
    category: "purepride",
    name: "Medicine - 6",
    price: "504",
    image: product5,
  },
  {
    id: 7,
    category: "purepride",
    name: "Medicine - 7",
    price: "506",
    image: product6,
  },
  {
    id: 7,
    isNew: true,
    category: "purepride",
    name: "Medicine - 8",
    price: "503",
    image: product7,
  },
  {
    id: 8,
    category: "purepride",
    name: "Medicine - 9",
    price: "503",
    image: product8,
  },
  {
    id: 8,
    isNew: true,
    category: "purepride",
    name: "Medicine - 10",
    price: "503",
    image: product1,
  },
];

export const product_input = [
  { inputName: "Category", category: "Category", type: "text" },
  { inputName: "Batch No", batch_no: "Batch No", type: "text" },
  { inputName: "Expiery Date", expieryDate: "Expiery Date", type: "date" },
  { inputName: "MRP", mrp: "MRP", type: "number" },
  {
    inputName: "Selling Price",
    selling_Price: "Selling Price",
    type: "number",
  },
  { inputName: "Quantity", quantity: "Quantity", type: "number" },
  { inputName: "Image", image: "Image", type: "image" },
];

export const avatars = [
  {
    name: "Ryan Florence",
    url: "https://bit.ly/ryan-florence",
  },
  {
    name: "Segun Adebayo",
    url: "https://bit.ly/sage-adebayo",
  },
  {
    name: "Kent Dodds",
    url: "https://bit.ly/kent-c-dodds",
  },
  {
    name: "Prosper Otemuyiwa",
    url: "https://bit.ly/prosper-baba",
  },
  {
    name: "Christian Nwamba",
    url: "https://bit.ly/code-beast",
  },
];

export const components: {
  title: string;
  href: string;
  description: string;
}[] = [
  {
    title: "Products",
    href: "/dashboard/products",
    description:
      "View all your products and their details. You can also add new products.",
  },
  {
    title: "Orders",
    href: "/dashborard/orders",
    description:
      "View all your orders and their details. You can also add new orders.",
  },
  {
    title: "Users",
    href: "/dashboard/users",
    description: "Manage all of your users here",
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    description: "Manage your account settings here",
  },
  {
    title: "Invoices",
    href: "/dashboard/invoices",
    description: "View all your invoices here",
  },
  {
    title: "Reports",
    href: "/dashboard/reports",
    description: "View all your reports here",
  },
];

export const menuItems: {
  name: string;
  href: string;
  icon: React.FC;
}[] = [
  {
    name: "Dashboard",
    href: "",
    icon: Home,
  },
  {
    name: "Products",
    href: "products",
    icon: LucideList,
  },
  {
    name: "Orders",
    href: "orders",
    icon: LucideList,
  },
  {
    name: "Users",
    href: "users",
    icon: LucideUser,
  },
  {
    name: "Stocks",
    href: "stocks",
    icon: LucideFileText,
  },
];
