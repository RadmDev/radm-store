import React from "react";

const Select = (props) => {
  const { label, name, defaultValue, disabled, options } = props;

  return (
    <div className="flex flex-col my-5">
      <label htmlFor={name}>{label}</label>
      <select
        name={name}
        id={name}
        defaultValue={defaultValue}
        disabled={disabled}
        className="p-4 bg-color-white-2 mt-1 outline-none disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {options?.map((option) => (
          <option key={option.label} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
