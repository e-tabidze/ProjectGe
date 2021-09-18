import React, { useState, useEffect } from "react";
import { getJewel, getSimilarJewels } from "../Services/APIEndpoints";
import "../CSS/jewelPage.css";
import ProductCard from "../Components/productCard";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import PhoneIcon from "@material-ui/icons/Phone";
import { useLocation } from "react-router-dom";
import MagicSliderDots from "react-magic-slider-dots";
import "react-magic-slider-dots/dist/magic-dots.css";
import internal from "../Resources/images/internal.jpeg";

const JewelPage = () => {
  const [jewel, setJewel] = useState(null);
  const [similarJewels, setSimilarJewels] = useState(null);

  const location = useLocation();

  useEffect(() => {
    handleGetJewel();
  }, []);

  useEffect(() => {
    handleGetJewel();
  }, [location.pathname]);

  useEffect(() => {
    if (jewel) {
      handleGetSimilarJewels();
    }
  }, [jewel]);

  const settings = {
    dots: true,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 2000,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,

    appendDots: (dots) => {
      return (
        <MagicSliderDots
          dots={dots}
          numDotsToShow={4}
          dotWidth={30}
          className="dots"
        />
      );
    },
  };

  const handleGetJewel = async () => {
    let jewelId = window.location.pathname.split("/")[2];
    let jewel = await getJewel(jewelId);
    setJewel(jewel);
  };

  const handleGetSimilarJewels = async () => {
    let data = await getSimilarJewels(jewel.piece._id);
    setSimilarJewels(data);
  };

  return (
    <div>
      <img src={internal} style={{ margin: "36px 0px" }} />
      <div className="jewelPage-main-container">
        <div className="imageSide">
          {jewel && jewel.productImage.length > 1 ? (
            <Slider
              className="slider-jewelpage"
              {...settings}
              style={{ width: "500px" }}
            >
              {jewel &&
                jewel.productImage.map((img, index) => (
                  <div key={index}>
                    <img
                      className="bannerImage"
                      src={jewel && `/${img}`}
                      alt="project-ge"
                    />
                  </div>
                ))}
            </Slider>
          ) : (
            <>
              {jewel &&
                jewel.productImage.map((img) => {
                  return (
                    <img
                      className="main-image"
                      src={jewel && `${img}`}
                    />
                  );
                })}
            </>
          )}
        </div>
        <div className="descriptionSide">
          <div className="general-info">
            <div>
              <div className="jewelpage-name"> {jewel && jewel.name} </div>
              <div className="jewelpage-price">{jewel && jewel.price} ლარი</div>
            </div>
            <div>
              <div className="jewelpage-phone">
                <PermIdentityIcon />
                {jewel && jewel.contactPerson}
              </div>
              <div className="jewelpage-person">
                <PhoneIcon />
                {jewel && jewel.contactNumber}
              </div>
            </div>
          </div>

          <div className="productdescitle">პროდუქტის აღწერა</div>
          <div className="separator"></div>
          <div className="jewelpage-description">
            {jewel && jewel.description}
          </div>
          <div className="productdescitle">სპეციფიკაციები</div>
          <div className="separator"></div>
          <table>
            <tr>
              <td>ნაკეთობა:</td>
              <td>{jewel && jewel.piece.name}</td>
            </tr>
            <tr>
              <td> მასალა: </td>
              <td>{jewel && jewel.metal.name} </td>
            </tr>
            <tr>
              <td>სინჯი:</td>
              <td>{jewel && jewel.standard} </td>
            </tr>
            <tr>
              <td>ზომა:</td>
              <td>{jewel && jewel.size}</td>
            </tr>
            <tr>
              <td>წონა:</td>
              <td>{jewel && jewel.weight}</td>
            </tr>
            <tr>
              <td> ძვირფასი ქვა: </td>
              <td>{jewel && jewel.stone.name} </td>
            </tr>
            {/* <tr>
              <td> განცხადების ტიპი: </td>
              <td>{jewel && jewel.type.name} </td>
            </tr> */}
          </table>
          <div className="separator"></div>
        </div>
      </div>
      <img src={internal} style={{ margin: "36px 0px" }} />

      {similarJewels ? (
        <div className="similar-prod-title">მსგავსი პროდუქტები</div>
      ) : (
        <div className="similar-prod-title">
          მსგავსი პროდუქტები ვერ მოიძებნა
        </div>
      )}

      <div className="similar-products">
        {similarJewels &&
          similarJewels.map((jewel) => {
            return <ProductCard key={jewel._id} jewel={jewel} />;
          })}
      </div>
      <img src={internal} style={{ margin: "36px 0px" }} />
    </div>
  );
};

export default JewelPage;
