import React from "react";
import SearchIcon from "@material-ui/icons/Search";
import "../CSS/searchBar.css";

const SearchBar = ({ onChange }) => {
  return (
    <div className="searchBox">
      <input
        className="input"
        placeholder="ძებნა..."
        onChange={(e) => onChange(e.target.value)}
      />
      <SearchIcon className="searchIcon" />
    </div>
  );
};

export default SearchBar;
