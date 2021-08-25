import React from "react";

import "../CSS/input.css";

const Input = ({
  name,
  value,
  onChange,
  type,
  placeholder,
  error,
  autoFocus,
  className,
  label,
}) => {
  return (
    <div className={label ? "input-container" : ""}>
      {label && <div className="label"> {label} </div>}
      <div className={label ? "input-field" : ""}>
        <input
          className="input-form"
          className={className}
          value={value}
          name={name}
          id={name}
          onChange={onChange}
          type={type}
          autoFocus={autoFocus}
          placeholder={placeholder}
        />
        <div>{error ? error : " "}</div>
      </div>
    </div>
  );
};

export default Input;
