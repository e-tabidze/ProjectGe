import React from "react";
import "../CSS/select.css";

const Select = ({ options, error, handleChange, name, label, value }) => {
  return (
    <div className={label ? "select-container" : "select-main-container"}>
      {label && <div className={label ? "label" : ""}> {label} </div>}
      <select
        className={label ? "select-fields" : "option-field"}
        onChange={(e) => handleChange(e)}
        name={name}
        defaultValue={null}
      >
        <option className="option" value={value} >
          - აირჩიე -
        </option>
        {options &&
          options.map((option, index) => (
            <option key={index} className="option" error={error} value={option._id}>
              {option.name}
            </option>
          ))}
      </select>
    </div>
  );
};

export default Select;
