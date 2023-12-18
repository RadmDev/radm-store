"use client";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const RegisterPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { push } = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const data = {
      email: e.target.email.value,
      fullname: e.target.fullname.value,
      phone: e.target.phone.value,
      password: e.target.password.value,
    };

    const result = await fetch("/api/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (result.status) {
      setIsLoading(false);
      e.target.reset();
      push("/auth/login");
    } else {
      setIsLoading(false);
      setError("Email already exists");
      console.log("failed");
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-semibold mb-3">Register</h1>
      {error && <p className="text-red-500 py-2">{error}</p>}
      <div className="w-full lg:w-[30%] p-5 border shadow-sm mb-5">
        <form action="" onSubmit={handleSubmit}>
          <Input type="email" name="email" label="Email" required />
          <Input type="text" name="fullname" label="Fullname" required />
          <Input type="number" name="phone" label="Phone" required />
          <Input type="password" name="password" label="Password" required />
          <Button type="submit" className="p-3">
            {isLoading ? "Loading..." : "Register"}
          </Button>
        </form>
      </div>
      <p>
        Have an account? Sign in{" "}
        <Link href="/auth/login" className="text-color-blue">
          here
        </Link>
      </p>
    </div>
  );
};

export default RegisterPage;
