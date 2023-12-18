"use client";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaGoogle } from "react-icons/fa";

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { push, query } = useRouter();

  const callbackUrl = query?.callbackUrl || "/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: e.target.email.value,
        password: e.target.password.value,
        callbackUrl: callbackUrl,
      });

      if (!res.error) {
        setIsLoading(false);
        e.target.reset();
        push(callbackUrl);
      } else {
        setIsLoading(false);
        setError("Email or password is incorrect");
      }
    } catch (error) {
      setIsLoading(false);
      setError("Email or password is incorrect");
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-semibold mb-3">Login</h1>
      {error && <p className="text-red-500 py-2">{error}</p>}
      <div className="w-full lg:w-[30%] p-5 border shadow-sm mb-5">
        <form action="" onSubmit={handleSubmit}>
          <Input label="Email" name="email" type="email" />
          <Input label="Password" name="password" type="password" />
          <Button type="submit" className="p-3">
            {isLoading ? "Loading..." : "Login"}
          </Button>
        </form>
        <hr className="my-5" />
        <div className="w-full">
          <Button
            type="button"
            className="p-4"
            onClick={() => signIn("google", { callbackUrl, redirect: false })}
          >
            <i className="text-color-white-1">
              <FaGoogle size={24} />
            </i>
            Login With Google
          </Button>
        </div>
      </div>
      <p>
        Don{"'"}t have an account? Sign up{" "}
        <Link href="/auth/register" className="text-color-blue">
          here
        </Link>
      </p>
    </div>
  );
};

export default LoginPage;
