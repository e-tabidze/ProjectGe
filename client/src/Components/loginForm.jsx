import React, { useState } from "react";
import Joi from "joi-browser";
import { DialogActions, TextField, Button } from "@material-ui/core";
import { login } from "../Services/APIEndpoints";

import "../CSS/loginForm.css";

const LoginForm = ({
  handleModalToggle,
  toggleForgotPassword,
  toggleRegisterForm,
}) => {
  const [user, setUser] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });

  const schema = {
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().max(30).min(8).required().label("Password"),
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const errorMessage = validateProperty({ name, value });
    console.log(errorMessage, "errorMessage");
    if (errorMessage)
      setErrors((prevState) => ({
        ...prevState,
        [name]: errorMessage,
      }));
    else
      setErrors((prevState) => ({
        ...prevState,
        [name]: null,
      }));

    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const validate = () => {
    const result = Joi.validate(user, schema, { abortEarly: false });

    if (!result.error) return null;

    const errors = {};
    for (let item of result.error.details) errors[item.path[0]] = item.message;

    return errors;
  };

  const validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const demoSchema = { [name]: schema[name] };
    const { error } = Joi.validate(obj, demoSchema);
    return error ? error.details[0].message : null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const demoErrors = validate();

    setErrors((prevState) => ({
      ...prevState,
      ["email"]: demoErrors ? demoErrors.email : null,
      ["password"]: demoErrors ? demoErrors.password : null,
    }));
    try {
      const { data: jwt } = await login(user.email, user.password);
      localStorage.setItem("token", jwt);
      console.log("token", jwt);
      window.location.reload(false);
      handleModalToggle();
    } catch (ex) {
      if (ex.response && ex.response.status == 400) {
        setErrors((prevState) => ({
          ...prevState,
          ["email"]: ex.response.data,
          ["password"]: ex.response.data,
        }));
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        autoFocus
        fullWidth
        margin="dense"
        name="email"
        value={user.email}
        onChange={handleChange}
        placeholder="თქვენი ელ-ფოსტა"
        error={errors.email}
      />
      <TextField
        fullWidth
        margin="dense"
        name="password"
        value={user.password}
        onChange={handleChange}
        type="password"
        placeholder="პაროლი"
        error={errors.password}
      />
      <DialogActions>
        <Button onClick={handleSubmit} disabled={validate()} color="primary">
          შესვლა
        </Button>
        <Button onClick={handleModalToggle} color="primary">
          გაუქმება
        </Button>
      </DialogActions>
      <div
        className="forgot-password"
        onClick={toggleForgotPassword}
        style={{ cursor: "pointer", textDecoration: "underline" }}
      >
        დაგავიწყდათ პაროლი?
      </div>
      <div className="forgot-password">
        ჯერ არ ხართ ჩვენი მომხმარებელი?
        <span
          onClick={toggleRegisterForm}
          style={{ cursor: "pointer", textDecoration: "underline" }}
        >
          {" "}
          რეგისტრაცია
        </span>
      </div>
    </form>
  );
};

export default LoginForm;
