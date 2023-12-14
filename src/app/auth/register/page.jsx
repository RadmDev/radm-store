"use client";

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

    // console.log({ data });

    const result = await fetch("/api/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (result.status === 200) {
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
            <label htmlFor="fullname">Fullname</label>
            <input
              name="fullname"
              id="fullname"
              type="text"
              className="p-3 bg-color-white-2 mt-1 focus:outline-none"
            />
          </div>
          <div className="flex flex-col my-5">
            <label htmlFor="phone">Phone</label>
            <input
              name="phone"
              id="phone"
              type="text"
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
            {isLoading ? "Loading..." : "Register"}
          </button>
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
