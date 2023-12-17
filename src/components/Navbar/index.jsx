"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";

const Navbar = () => {
  const { data } = useSession();

  return (
    <div className="fixed w-full h-20 p-5 bg-color-black-1 text-color-white-1 flex items-center justify-end">
      <button
        onClick={() => (data ? signOut() : signIn())}
        className="bg-color-white-1 px-4 py-3 text-color-black-1"
      >
        {data ? "Logout" : "Login"}
      </button>
    </div>
  );
};

export default Navbar;
