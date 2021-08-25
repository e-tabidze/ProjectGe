import React from "react";

import "../CSS/button.css"

const Button = ({ label, onClick, disabled, className }) => {
  return (
    <div className="default-button">
      <button
        className={`button ${className}`}
        onClick={(e) => onClick(e)}
        disabled={disabled}
      >
        {label}
      </button>
    </div>
  );
};

export default Button;