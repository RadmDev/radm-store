import Sidebar from "@/components/layouts/fragments/Sidebar";
import React from "react";
import { BiSolidDashboard, FaBoxArchive, HiUsers } from "./icons";

export const metadata = {
  title: "Admin",
  description: "Admin page from radm store",
};

const listSidebarItem = [
  {
    title: "Dashboard",
    url: "/admin/dashboard",
    icon: BiSolidDashboard,
  },
  {
    title: "Products",
    url: "/admin/products",
    icon: FaBoxArchive,
  },
  {
    title: "Users",
    url: "/admin/users",
    icon: HiUsers,
  },
];

const AdminLayout = ({ children }) => {
  return (
    <div className="flex">
      <Sidebar lists={listSidebarItem} />
      <div className="w-full py-10 px-16">{children}</div>
    </div>
  );
};

export default AdminLayout;
