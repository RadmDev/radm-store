import Sidebar from "@/components/layouts/fragments/Sidebar";
import React from "react";
import { BiSolidDashboard, FaBoxArchive } from "./icons";

export const metadata = {
  title: "Admin",
  description: "Admin page from radm store",
};

const iconList = {};

const listSidebarItem = [
  {
    title: "Dashboard",
    url: "/admin",
    icon: BiSolidDashboard,
  },
  {
    title: "Products",
    url: "/admin/products",
    icon: FaBoxArchive,
  },
];

const AdminLayout = ({ children }) => {
  return (
    <div>
      <Sidebar lists={listSidebarItem} />
      {children}
    </div>
  );
};

export default AdminLayout;
