"use client";

import Button from "@/components/ui/Button";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Sidebar = (props) => {
  const { lists } = props;

  const pathname = usePathname();

  const isActive = (path) => {
    if (pathname === path) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div className="bg-color-black-1 text-color-white-1 p-5 w-72 h-screen flex flex-col justify-between">
      <div className="">
        <h1 className="text-2xl text-center font-semibold mb-10">
          Admin Panel
        </h1>
        <div className="flex flex-col gap-5">
          {lists?.map((list, index) => (
            <Link
              href={list.url}
              key={index}
              className={`text-base font-medium flex items-center gap-3 px-5 py-3 hover:bg-color-white-1 cursor-pointer transition-transform duration-200 ease-in-out group ${
                isActive(list.url) ? "bg-color-white-1 text-color-black-1" : ""
              }`}
            >
              <div className="text-2xl group-hover:text-black transition-transform duration-200 ease-in-out">
                {list.icon}
              </div>
              <h2 className="group-hover:text-black transition-transform duration-200 ease-in-out">
                {list.title}
              </h2>
            </Link>
          ))}
        </div>
      </div>
      <div>
        <Button
          type="button"
          variant="bg-color-white-1 text-color-black-1"
          className="py-4 px-8 font-semibold"
          onClick={() => signOut()}
        >
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
