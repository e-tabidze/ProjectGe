import React, { useState, useEffect } from "react";
// import Input from "../Reusable components/input";
// import Button from "../Reusable components/button";
import Joi from "joi-browser";
import { changePassword } from "../Services/APIEndpoints";
import { TextField, Button } from "@material-ui/core";

const ForgotPasswordReset = (props) => {
  const [newPassword, setNewPassword] = useState({
    newPassword: "",
    repeat_password: "",
  });
  const [userId, setUserId] = useState("");
  const [userToken, setUserToken] = useState("");
  const [errors, setErrors] = useState({
    newPassword: "",
    repeat_password: "",
  });

  useEffect(() => {
    handleGetCredentials();
    log();
  }, []);

  const log = () => {
    console.log("Came TO RESET");
  };

  const handleGetCredentials = () => {
    let userID = props.match.params.userId;
    let token = props.match.params.token;
    setUserId(userID);
    setUserToken(token);
    console.log(userId, " ", token, "< = Credentials");
  };

  const schema = {
    newPassword: Joi.string().max(255).min(8).required().label("Password"),
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

    setNewPassword((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const validate = (object, objectSchema) => {
    const result = Joi.validate(object, objectSchema, { abortEarly: false });

    if (!result.error) return null;

    const errors = {};
    for (let item of result.error.details) errors[item.path[0]] = item.message;

    return errors;
  };

  const validateProperty = ({ name, value }) => {
    let obj = { [name]: value };
    let demoSchema = { [name]: schema[name] };
    if (name === "repeat_password") {
      obj = { password: newPassword.newPassword, [name]: value };
      demoSchema = { [name]: schema[name], password: schema["newPassword"] };
    }

    const { error } = Joi.validate(obj, demoSchema);
    console.log(error, "<==== ERROR");
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

    try {
      const response = await changePassword(
        userId,
        userToken,
        newPassword.newPassword
      );
      localStorage.setItem("token", response.headers["x-auth-token"]);
      window.location.reload(false);
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        console.log(ex.response);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="reset-password-page" >
      <TextField
        className="input-form"
        name="newPassword"
        value={newPassword.newPassword}
        onChange={handleChange}
        type="password"
        label={"პაროლის განახლება"}
        placeholder="პაროლი"
        error={errors.newPassword}
        size="small"
        variant="outlined"
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        className="input-form"
        name="repeat_password"
        value={newPassword.repeat_password}
        onChange={handleChange}
        type="password"
        placeholder="გაიმეორეთ პაროლი"
        error={errors.repeat_password}
        size="small"
        variant="outlined"
        InputLabelProps={{
          shrink: true,
        }}
      />

      <Button onClick={handleSubmit} color="primary">
        პაროლის განახლება
      </Button>
    </form>
  );
};

export default ForgotPasswordReset;
