import React from "react";
import side from "../Resources/images/side.jpeg";
import internal from "../Resources/images/internal.jpeg";
import main from "../Resources/images/main.jpeg";
import "../CSS/ad.css";

const Ad = () => {
  return (
    <div className="ad">
      <h1 className="contact">ჩვენს საიტზე რეკლამის განთავსება</h1>
      <img src={main} />
      <img src={internal} />
      <img src={side} />
    </div>
  );
};

export default Ad;
