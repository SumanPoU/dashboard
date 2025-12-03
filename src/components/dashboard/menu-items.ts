import {
  BarChart3,
  Package,
  PackagePlus,
  Settings,
  ShoppingCart,
  Tags,
  UsersRound,
} from "lucide-react";

export interface MenuSubItem {
  label: string;
  url: string;
  icon?: any;
}

export interface MenuItem {
  label: string;
  url?: string;
  icon: any;
  subItems?: MenuSubItem[];
}

export interface MenuGroup {
  group: string;
  items: MenuItem[];
}

export const menuItems: MenuGroup[] = [
  {
    group: "Transaction Management",
    items: [
      {
        label: "Dashboard",
        url: "#",
        icon: BarChart3,
      },
      // {
      //   label: "Orders",
      //   url: "#",
      //   icon: ShoppingCart,
      // },
      // {
      //   label: "Products",
      //   icon: Package,
      //   subItems: [
      //     { label: "All Products", url: "#", icon: Package },
      //     { label: "Add New", url: "#", icon: PackagePlus },
      //     { label: "Categories", url: "#", icon: Tags },
      //   ],
      // },
      // {
      //   label: "Customers",
      //   url: "#",
      //   icon: UsersRound,
      // },
      // {
      //   label: "Settings",
      //   icon: Settings,
      //   subItems: [
      //     { label: "General", url: "#" },
      //     { label: "Shipping", url: "#" },
      //     { label: "Payments", url: "#" },
      //   ],
      // },
    ],
  },
];
