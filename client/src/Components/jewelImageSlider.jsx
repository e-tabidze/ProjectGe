import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import MagicSliderDots from "react-magic-slider-dots";
import "react-magic-slider-dots/dist/magic-dots.css";

const JewelImageSlider = (jewel) => {
  const settings = {
    dots: true,
    arrows: true,
    // autoplay: true,
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

  return (
    <div className="sliderComponent">
      <Slider className="slider" {...settings}>
        {jewel &&
          jewel.productImage.map((img, index) => (
            <div key={index}>
              <img
                className="bannerImage"
                src={jewel && `http://localhost:3000/${img}`}
                alt="project-ge"
              />
            </div>
          ))}
      </Slider>
    </div>
  );
};

export default JewelImageSlider;
