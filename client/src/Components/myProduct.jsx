import React, { useState } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { deleteJewel } from "../Services/APIEndpoints";
import { toast } from "react-toastify";
import ConfirmModal from "./confirmModal";
import EditProductModal from "./editProductModal";
import "../CSS/myProduct.css";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "react-magic-slider-dots/dist/magic-dots.css";

const MyProduct = ({ jewel, currentUser }) => {
  const [openConfirm, setOpenConfirm] = useState(false);
  const [editActive, toggleEditActive] = useState(false);
  const toggleConfirmModal = () => {
    setOpenConfirm(!openConfirm);
  };

  const toggleEditModal = () => {
    toggleEditActive(!editActive);
  };

  const handleDeleteJewel = async () => {
    let userToken = localStorage.getItem("token");
    try {
      await deleteJewel(jewel._id, userToken);
      window.location.reload(false);
    } catch (ex) {
      if (ex.response && ex.response.status === 404) console.log(ex);
      toast.error("პროდუქტი უკვე წაშლილია");
    }
  };

  const settings = {
    arrows: true,
    autoplay: true,
    autoplaySpeed: 2000,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <>
      {openConfirm && (
        <ConfirmModal
          contentText={"ნამდვილად გსურთ პროდუქტის წაშლა?"}
          confirmText={"წაშლა"}
          open={openConfirm}
          onClose={() => setOpenConfirm(!openConfirm)}
          confirmClick={handleDeleteJewel}
          cancel={() => setOpenConfirm(!openConfirm)}
        />
      )}
      {editActive && (
        <EditProductModal
          productObject={jewel}
          currentUser={currentUser}
          toggleEditModal={toggleEditModal}
        />
      )}
      <div className="myproduct-main-container">
        {jewel && jewel.productImage.length > 1 ? (
          <Slider
            className="slider-jewelpage"
            {...settings}
            style={{ width: "400px" }}
          >
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
        ) : (
          <>
            {jewel &&
              jewel.productImage.map((img) => {
                return (
                  <img
                    className="myproduct-img"
                    src={jewel && `http://localhost:3000/${img}`}
                  />
                );
              })}
          </>
        )}

        <div className="myproduct-content">
          <table>
            <tr>
              <td>{jewel && jewel.name}</td>
            </tr>
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
              <td> ძვირფასი ქვა: </td>
              <td>{jewel && jewel.stone.name} </td>
            </tr>

            <tr>
              <td>წონა:</td>
              <td>{jewel && jewel.weight}</td>
            </tr>

            <tr>
              <td>ზომა:</td>
              <td>{jewel && jewel.size}</td>
            </tr>

            <tr>
              <td>აღწერა:</td>
              <td>{jewel && jewel.description}</td>
            </tr>
          </table>
        </div>
        <div className="myproduct-content">
          <table>
            {/* <tr>
              <td>განცხადების ID:</td>
              <td>{jewel && jewel._id}</td>
            </tr> */}
            <tr>
              <td>განთავსების თარიღი:</td>
              <td>{jewel && jewel.creationDate}</td>
            </tr>
            <tr>
              <td> საკონტაქტი პირი: </td>
              <td>{jewel && jewel.contactPerson} </td>
            </tr>
            <tr>
              <td> ტელეფონის ნომერი: </td>
              <td>{jewel && jewel.contactNumber} </td>
            </tr>
          </table>
        </div>
        <EditIcon className="editIcon" onClick={toggleEditModal} />
        <DeleteIcon className="deleteicon" onClick={toggleConfirmModal} />
      </div>
    </>
  );
};

export default MyProduct;
