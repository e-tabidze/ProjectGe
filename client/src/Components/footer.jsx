import React from "react";
import { NavLink } from "react-router-dom";
import "../CSS/footer.css";

const Footer = ({ currentUser }) => {
  return (
    <div className="footer-main-container">
      <div className="copyright">
        <h5>© 2021 gegold.ge</h5>
        <h5>ძვირფასეულობის ონლაინ ფლატფორმა</h5>
      </div>
      <div className="navigation">
        <NavLink to="/terms">
          <h5>საიტის წესები</h5>
        </NavLink>
        {currentUser && (
          <NavLink to="/my-profile">
            <h5>ჩემი გვერდი</h5>
          </NavLink>
        )}
        <h5>რეკლამა</h5>
        <h5>დახმარება</h5>
        <h5>კონტაქტი</h5>
      </div>
      <div className="icons">
        <i className="fa fa-facebook-official fa-2x" />
        <i className="fa fa-telegram fa-2x" />
        <i className="fa fa-whatsapp fa-2x" />
        <i className="fa fa-phone fa-2x" />
      </div>
    </div>
  );
};

export default Footer;
