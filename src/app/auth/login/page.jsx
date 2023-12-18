"use client";

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
          <div className="flex flex-col my-5">
            <label htmlFor="email">Email</label>
            <input
              name="email"
              id="email"
              type="email"
              className="p-3 bg-color-white-2 mt-1 focus:outline-none"
            />
          </div>
          <div className="flex flex-col my-5">
            <label htmlFor="password">Password</label>
            <input
              name="password"
              id="password"
              type="password"
              className="p-3 bg-color-white-2 mt-1 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="w-full p-3 bg-color-black-1 text-color-white-1 hover:opacity-50 focus:outline-4 focus:outline-color-black transition-all duration-300 ease-in-out"
          >
            {isLoading ? "Loading..." : "Login"}
          </button>
        </form>
        <hr className="my-5" />
        <div className="w-full">
          <button
            type="button"
            onClick={() => signIn("google", { callbackUrl, redirect: false })}
            className="flex gap-2 items-center justify-center w-full p-4 bg-color-black-1 text-color-white-1 hover:opacity-50 focus:outline-4 focus:outline-color-black transition-all duration-300 ease-in-out"
          >
            <i className="text-color-white-1">
              <FaGoogle size={24} />
            </i>
            Login With Google
          </button>
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
