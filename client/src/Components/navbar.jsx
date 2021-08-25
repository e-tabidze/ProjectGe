import React, { useState } from "react";
import { NavLink } from "react-router-dom";
// import SearchBar from "../Reusable components/searchBar";
import Button from "../Reusable components/button";
import DropDownMenu from "./dropdownMenu";
import AccountModal from "./accountModal";
import logo from "../Resources/images/logo.png";
import MenuItem from "../Reusable components/menuItem";

import "../CSS/navbar.css";

const Navbar = ({ handleSearchByName, currentUser }) => {
  const [dropDownActive, setDropDownActive] = useState(false);
  const [accountModalActive, setAccoutModalActive] = useState(false);

  const handleAccountModalToggle = () => {
    setAccoutModalActive(!accountModalActive);
  };

  const handleDropDownMenuToggle = () => {
    setDropDownActive(!dropDownActive);
  };

  const handleNavigation = (e) => {
    e.preventDefault();
    window.location.href = "/my-profile";
  };

  return (
    <div className="navbar-main-container">
      <NavLink to="/">
        <img src={logo} alt="gegold logo" className="logo" />
      </NavLink>

      <div className="items">
        {currentUser && (
          <NavLink to="/my-profile">
            <span className="email-initial">{currentUser.email.charAt(0)}</span>
          </NavLink>
        )}

        {currentUser ? (
          <Button
            className="profile-button"
            label="პირადი კაბინეტი"
            onClick={handleNavigation}
          />
        ) : (
          <Button
            className="login-submit"
            label={currentUser ? "პირადი კაბინეტი" : "შესვლა"}
            onClick={handleAccountModalToggle}
          />
        )}

        {accountModalActive && (
          <>
            <div className="accountModal">
              <AccountModal
                handleAccountModalToggle={handleAccountModalToggle}
              />
            </div>
          </>
        )}

        <MenuItem
          icon={<i className="fa fa-bars fa-2x" />}
          className="fa fa-bars fa-2x dropdowmmenuicon"
          onClick={handleDropDownMenuToggle}
        />
      </div>

      {dropDownActive && (
        <>
          <div
            onMouseLeave={() => setDropDownActive(false)}
            className="dropdown"
          >
            <DropDownMenu
              currentUser={currentUser}
              onClick={handleDropDownMenuToggle}
              handleAccountModalToggle={handleAccountModalToggle}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Navbar;
