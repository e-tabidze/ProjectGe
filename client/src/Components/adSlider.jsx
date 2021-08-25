import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import MagicSliderDots from "react-magic-slider-dots";
import "react-magic-slider-dots/dist/magic-dots.css";
import "../CSS/bannerSlider.css";

import banner1 from "../Resources/images/main.jpeg";
import banner2 from "../Resources/images/main.jpeg";
import banner3 from "../Resources/images/main.jpeg";
import banner4 from "../Resources/images/main.jpeg";

const AdSlider = () => {
  const settings = {
    dots: true,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
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

  const banners = [
    { image: banner1 },
    { image: banner2 },
    { image: banner3 },
    { image: banner4 },
  ];
  return (
    <div className="sliderComponent">
      <Slider className="slider" {...settings}>
        {banners &&
          banners.map((banner) => (
            <div key={banner.image}>
              <img
                className="bannerImage"
                src={banner.image}
                alt="project-ge"
              />
            </div>
          ))}
      </Slider>
    </div>
  );
};

export default AdSlider;
