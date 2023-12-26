"use client";

import AuthLayout from "@/components/layouts/AuthLayout";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import authServices from "@/services/auth";
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

    try {
      const result = await authServices.registerAccount(data);

      if (result.data.status) {
        setIsLoading(false);
        e.target.reset();
        push("/auth/login");
      } else {
        setIsLoading(false);
        setError("Email already exists");
        console.log("failed");
      }
    } catch (error) {
      setIsLoading(false);
      setError("Failed to register user");
    }
  };

  return (
    <AuthLayout
      title="Register"
      error={error}
      link="/auth/login"
      linkText="Already have an account? Login "
    >
      <form action="" onSubmit={handleSubmit}>
        <Input type="email" name="email" label="Email" required />
        <Input type="text" name="fullname" label="Fullname" required />
        <Input type="number" name="phone" label="Phone" required />
        <Input type="password" name="password" label="Password" required />
        <Button type="submit" className="p-3">
          {isLoading ? "Loading..." : "Register"}
        </Button>
      </form>
    </AuthLayout>
  );
};

export default RegisterPage;
