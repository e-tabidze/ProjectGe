import React, { useState } from "react";
import Joi from "joi-browser";
import Button from "@material-ui/core/Button";
import { TextField } from "@material-ui/core";
import { registerUser } from "../Services/APIEndpoints";
import { NavLink } from "react-router-dom";
import DialogActions from "@material-ui/core/DialogActions";

import "../CSS/registerForm.css";

const RegisterForm = ({ handleModalToggle }) => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    repeat_password: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    repeat_password: "",
  });

  const schema = {
    name: Joi.string().max(50).required().label("სახელი"),
    email: Joi.string().email().required().max(255).label("Email"),
    password: Joi.string().max(255).min(8).required().label("Password"),
    repeat_password: Joi.any()
      .valid(Joi.ref("password"))
      .required()
      .error(() => {
        return { message: "The passwords don't match." };
      }),
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let errorMessage = validateProperty({ name, value });

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
    let obj = { [name]: value };
    let demoSchema = { [name]: schema[name] };
    if (name === "repeat_password") {
      obj = { password: user.password, [name]: value };
      demoSchema = { [name]: schema[name], password: schema["password"] };
    }

    const { error } = Joi.validate(obj, demoSchema);
    if (error && name === "repeat_password") {
      if (error.details.length === 2) {
        return error.details[1].message;
      } else {
        return error.details[0].message;
      }
    } else {
      return error ? error.details[0].message : null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const demoErrors = validate();

    setErrors((prevState) => ({
      ...prevState,
      ["name"]: demoErrors ? demoErrors.name : null,
      ["email"]: demoErrors ? demoErrors.email : null,
      ["password"]: demoErrors ? demoErrors.password : null,
      ["repeat_password"]: demoErrors ? demoErrors.repeat_password : null,
    }));

    try {
      const response = await registerUser(user);
      localStorage.setItem("token", response.headers["x-auth-token"]);
      handleModalToggle();
      window.location.reload(false);
    } catch (ex) {
      if (ex.response && ex.response.status == 400) {
        setErrors((prevState) => ({
          ...prevState,
          ["email"]: ex.response.data,
        }));
      }
    }
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <div className="register-inputs">
          <TextField
            autoFocus
            fullWidth
            margin="dense"
            name="name"
            value={user.name}
            onChange={handleChange}
            placeholder="თქვენი სახელი"
            error={errors.name}
          />
          <TextField
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
          <TextField
            fullWidth
            margin="dense"
            name="repeat_password"
            value={user.repeat_password}
            onChange={handleChange}
            type="password"
            placeholder="გაიმეორეთ პაროლი"
            error={errors.repeat_password}
          />
        </div>
        <div>
          გთხოვთ გაეცნოთ{" "}
          <NavLink to="/terms" target="_blank">
            <a style={{ cursor: "pointer", textDecoration: "underline" }}>
              საიტის წესებს
            </a>
          </NavLink>
        </div>
        <DialogActions>
          <Button onClick={handleSubmit} color="primary">
            რეგისტრაცია
          </Button>
          <Button onClick={handleModalToggle} color="primary">
            გაუქმება
          </Button>
        </DialogActions>
      </form>
    </div>
  );
};

export default RegisterForm;
