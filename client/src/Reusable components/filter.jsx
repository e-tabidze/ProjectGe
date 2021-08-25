import React from "react";
import { Checkbox, FormControlLabel } from "@material-ui/core";

import "../CSS/filter.css";

const CustomCheckbox = ({ checkboxChange, item, title }) => (

  <Checkbox
    className="checkbox"
    size="small"
    onChange={checkboxChange(item, title)}
  />
);

const MemoCheckbox = React.memo(
  CustomCheckbox,
  (prev, next) => prev.key === next.key
);

const Filter = ({ items, title, onItemSelect, checkboxStates }) => {
  return (
    <div>
      <div className="filterTitle"> {title} </div>
      <div className="filter-main-container">
        {items &&
          items.map((item, index) => {
            const value = checkboxStates[item._id] ? true : false;
            return (
              <FormControlLabel
                key={index}
                checked={value}
                control={
                  <MemoCheckbox
                    checkboxChange={onItemSelect}
                    item={item}
                    title={title}
                  />
                }
                label={item.name}
              />
            );
          })}
      </div>
    </div>
  );
};

export default Filter;
