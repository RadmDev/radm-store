import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Link from "next/link";
import React from "react";
import { FaGoogle } from "react-icons/fa";

const AuthLayout = (props) => {
  const { error, title, children, link, linkText } = props;

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-semibold mb-3">{title}</h1>
      {error && <p className="text-red-500 py-2">{error}</p>}
      <div className="w-full lg:w-[30%] p-5 border shadow-sm mb-5">
        {children}
      </div>
      <p>
        {linkText}
        <Link href={link} className="text-color-blue">
          here
        </Link>
      </p>
    </div>
  );
};

export default AuthLayout;
