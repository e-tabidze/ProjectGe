import React, { useState } from "react";
import LoginForm from "./loginForm";
import RegisterForm from "./registerForm";

import { forgotPassword } from "../Services/APIEndpoints";
import ForgotPasswordModal from "./forgotPasswordModal";
import MuiAlert from "@material-ui/lab/Alert";
import { Dialog, DialogTitle } from "@material-ui/core";

import "../CSS/accountModal.css";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const AccountModal = ({ handleAccountModalToggle }) => {
  const [forgotPasswordModalActive, setForgotPasswordModalActive] =
    useState(true);
  const [userEmail, setUserEmail] = useState("");
  const [alert, setAlert] = useState("");
  const [registerForm, setRegisterForm] = useState(false);

  const toggleRegisterForm = () => {
    setRegisterForm(!registerForm);
  };

  const toggleForgotPassword = () =>
    setForgotPasswordModalActive(!forgotPasswordModalActive);

  const handleChange = (e) => {
    setUserEmail(e.target.value);
  };

  const handleSubmitResetLink = async (e) => {
    e.preventDefault();
    try {
      await forgotPassword(userEmail);
      setAlert("success");
    } catch (ex) {
      if (ex.response && ex.response.status == 400) {
        setAlert("error");
      }
    }
  };
  return (
    <>
      {alert === "error" ? (
        <Alert variant="filled" severity="error">
          დაფიქსირდა შეცდომა. გთხოვთ შეიყვანეთ სწორი იმეილი
        </Alert>
      ) : (
        <>
          {alert == "success" ? (
            <Alert variant="filled" severity="success">
              ბმული წარმატებით გაიგზავნა მითითებულ იმეილზე
            </Alert>
          ) : (
            <>
              {forgotPasswordModalActive ? (
                <Dialog
                  open={handleAccountModalToggle}
                  onClose={handleAccountModalToggle}
                  aria-labelledby="form-dialog-title"
                >
                  {registerForm ? (
                    <>
                      <DialogTitle id="form-dialog-title">
                        რეგისტრაცია
                      </DialogTitle>
                      <RegisterForm
                        handleModalToggle={handleAccountModalToggle}
                      />
                    </>
                  ) : (
                    <>
                      <DialogTitle id="form-dialog-title">შესვლა</DialogTitle>
                      <LoginForm
                        handleModalToggle={handleAccountModalToggle}
                        toggleForgotPassword={toggleForgotPassword}
                        toggleRegisterForm={toggleRegisterForm}
                      />
                    </>
                  )}
                </Dialog>
              ) : (
                <ForgotPasswordModal
                  toggleForgotPassword={toggleForgotPassword}
                  handleSubmitResetLink={handleSubmitResetLink}
                  userEmail={userEmail}
                  handleChange={handleChange}
                />
              )}
            </>
          )}
        </>
      )}
    </>
  );
};

export default AccountModal;
