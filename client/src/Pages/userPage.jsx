import React, { useState, useEffect } from "react";
import { getUserJewels } from "../Services/APIEndpoints";
import NewProductModal from "../Components/newProductModal";
import MyProduct from "../Components/myProduct";
import side from "../Resources/images/side.jpeg";
import internal from "../Resources/images/internal.jpeg";

import "../CSS/userPage.css";

const UserPage = ({ currentUser }) => {
  const [newProductModalActive, setNewProductModalActive] = useState(false);
  const [userJewels, setUserJewels] = useState([]);

  useEffect(() => {
    handleGetUserJewels();
  }, []);

  const handleGetUserJewels = async () => {
    let jewelData = await getUserJewels(currentUser._id);
    setUserJewels(jewelData.data);
  };

  const handleNewProductModalToggle = () => {
    setNewProductModalActive(!newProductModalActive);
  };

  return (
    <div className="userpage-main-container">
      <div>
        <img
          src={side}
          className="right"
          style={{ margin: "36px 0px 0px 16px" }}
        />
        <img
          src={side}
          className="right"
          style={{ margin: "36px 0px 0px 16px" }}
        />
      </div>
      <div className="content">
        <img src={internal} style={{ marginTop: "36px" }} />
        <div className="user-settings">
          <div className="options">
            {newProductModalActive && (
              <>
                <div className="newProductModal">
                  <NewProductModal
                    handleNewProductModalToggle={handleNewProductModalToggle}
                    currentUser={currentUser}
                  />
                </div>
              </>
            )}
          </div>
          <div className="textUser">
            მომხმარებლის სახელი: {currentUser.name}
          </div>
          <div className="textUser">
            მომხმარებლის იმეილი: {currentUser.email}
          </div>
          <div className="addButton" onClick={handleNewProductModalToggle}>
            <div>
              <i
                class="fa fa-plus-circle fa-3x"
                style={{ marginRight: "20px" }}
              />
            </div>
            <div>ახალი განცხადების დამატება</div>
          </div>
          {userJewels ? (
            <div className="title">
              <p> ჩემი განცხადებები</p>
            </div>
          ) : (
            <div className="title">თქვენ ჯერ არ დაგიმატებიათ განცხადება</div>
          )}

          <div>
            {userJewels &&
              userJewels.map((jewel, index) => {
                return (
                  <MyProduct
                    key={index}
                    jewel={jewel}
                    currentUser={currentUser}
                    userJewels={userJewels}
                    setUserJewels={setUserJewels}
                    getUserJewels={getUserJewels}
                  />
                );
              })}
          </div>
        </div>
      </div>
      <div>
        <img
          src={side}
          className="right"
          style={{ margin: "36px 0px 0px 16px" }}
        />
        <img
          src={side}
          className="right"
          style={{ margin: "36px 0px 0px 16px" }}
        />
      </div>
    </div>
  );
};

export default UserPage;
