import React from "react";

const Input = (props) => {
  const { label, name, type, placeholder, required, className, ...rest } =
    props;
  return (
    <div className="flex flex-col my-5">
      {label && <label htmlFor={name}>{label}</label>}
      <input
        name={name}
        id={name}
        type={type}
        placeholder={placeholder}
        required={required}
        {...rest}
        className={`p-3 bg-color-white-2 mt-1 focus:outline-none ${className}`}
      />
    </div>
  );
};

export default Input;
