import React from "react";

const Button = (props) => {
  const {
    type,
    onClick,
    children,
    variant = "bg-color-black-1 text-color-white-1",
    className,
  } = props;
  return (
    <button
      type={type}
      onClick={onClick}
      className={`flex gap-2 items-center justify-center w-full hover:opacity-50 focus:outline-4 focus:outline-color-black transition-all duration-300 ease-in-out ${
        " " + variant
      } ${" " + className}`}
    >
      {children}
    </button>
  );
};

export default Button;
