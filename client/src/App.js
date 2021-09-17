import React, { useState, useEffect } from "react";
import { getJewels } from "./Services/APIEndpoints";
import { ToastContainer } from "react-toastify";
import { Route, Switch, Router } from "react-router-dom";
import jwtDecode from "jwt-decode";
import Navbar from "./Components/navbar";
import HomePage from "./Pages/homePage";
import UserPage from "./Pages/userPage";
import Terms from "./Pages/terms";
import Footer from "./Components/footer";
import JewelPage from "./Pages/jewelPage";

import ResetPasswordPage from "./Components/forgotPasswordReset";

import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import ForgotPasswordReset from "./Components/forgotPasswordReset";
import ContactUs from "./Pages/contactUs";
import Ad from "./Pages/ad";

function App() {
  const [currentUser, setCurrentUser] = useState("");

  useEffect(() => {
    getCurrentUser();
  }, []);


  useEffect(() => {
    console.log(currentUser);
  }, [currentUser])

  const getCurrentUser = () => {
    try {
      const jwt = localStorage.getItem("token");
      let currentUserData = jwtDecode(jwt);
      setCurrentUser(currentUserData);
    } catch (ex) {}
  };
  const handleSearchByName = async (symbols, setJewels) => {
    let demoJewels = await getJewels();
    console.log(demoJewels);
    let filtered = demoJewels.filter((item) => {
      return item.name.toLowerCase().includes(symbols.toLowerCase());
    });
    console.log(filtered);
    setJewels(filtered);
  };

  return (
    <Router>
      <div className="App">
        <ToastContainer />
        <Navbar
          handleSearchByName={handleSearchByName}
          currentUser={currentUser}
        />
        <Route exact path="/" component={() => <HomePage />} />
        <Route exact path="/product/:id" component={JewelPage} />
        <Route
          path="/forgot-password/:userId/:token"
          component={ForgotPasswordReset}
        />
        <Route
          exact
          path="/my-profile"
          render={(props) => {
            if (!currentUser) return null;
            return <UserPage {...props} currentUser={currentUser} />;
          }}
        />
        <Route exact path="/terms" component={Terms} />
        <Route exact path="/contact-us" component={ContactUs} />
        <Route exact path="/gegold-ads" component={Ad} />

        <Route
          path="/reset-password/:userId/:token"
          component={ResetPasswordPage}
        />
        <Footer currentUser={currentUser} />
      </div>
    </Router>
  );
}

export default App;
