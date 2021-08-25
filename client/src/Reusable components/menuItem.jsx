import React from "react";

import "../CSS/menuItem.css";

const MenuItem = ({ onClick, label, icon }) => {
  return (
    <table>
      <tr className="menu-item" onClick={(e) => onClick(e)}>
        <td className="dropdownitems">{icon}</td>
        <td className="dropdowntext">{label}</td>
      </tr>
    </table>
  );
};

export default MenuItem;
