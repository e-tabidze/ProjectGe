import React from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Typography from "@material-ui/core/Typography";

import { NavLink } from "react-router-dom";

import "../CSS/productCard.css";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "react-magic-slider-dots/dist/magic-dots.css";

const settings = {
  arrows: true,
  autoplay: true,
  autoplaySpeed: 3000,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

const ProductCard = ({ jewel }) => {
  return (
    <NavLink to={`/product/${jewel._id}`}>
      <Card>
        <CardHeader
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={jewel.name}
          subheader={`${jewel.price} ლარი`}
        />
        <CardContent>
          <Slider className="productcard-slider" {...settings}>
            {jewel &&
              jewel.productImage.map((img, index) => (
                <div key={index}>
                  <img
                    className="productcard-img"
                    src={jewel && `${img}`}
                    alt="project-ge"
                  />
                </div>
              ))}
          </Slider>
          <Typography variant="body2" color="textSecondary" component="p">
            {jewel.description}
          </Typography>
        </CardContent>
      </Card>
    </NavLink>
  );
};

export default ProductCard;
