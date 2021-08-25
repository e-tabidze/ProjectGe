import React, { useEffect, useState } from "react";
import {
  getMetals,
  getPieces,
  getStones,
  editJewel,
} from "../Services/APIEndpoints";
import Joi from "joi-browser";
import ImageField from "../Reusable components/imgField";

import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
} from "@material-ui/core";

import "../CSS/newProductModal.css";
import "../CSS/editProductModal.css";

import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const EditProductModal = ({ currentUser, productObject, toggleEditModal }) => {
  const [pieces, setPieces] = useState(null);
  const [metals, setMetals] = useState(null);
  const [stones, setStones] = useState(null);
  const [newJewel, setNewJewel] = useState({
    name: productObject.name,
    pieceId: productObject.piece._id,
    price: productObject.price,
    metalId: productObject.metal._id,
    stoneId: productObject.stone._id,
    weight: productObject.weight,
    size: productObject.size,
    standard: productObject.standard,
    contactPerson: productObject.contactPerson,
    contactNumber: productObject.contactNumber,
    description: productObject.description,
    existingProductImage: productObject.productImage,
    productImage: {},
  });
  const [errors, setErrors] = useState({
    name: "",
    pieceId: "",
    price: "",
    metalId: "",
    stoneId: "",
    weight: "",
    size: "",
    standard: "",
    contactPerson: "",
    contactNumber: "",
    description: "",
    productImage: "",
  });
  const [sizeActive, setSizeActive] = useState(false);
  const [metalType, setMetalType] = useState("");
  const [successModal, setSuccessModal] = useState(false);

  const [chosenFileURL, setChosenFileURL] = [];

  const goldStandard = [
    { id: 0, name: "333" },
    { id: 1, name: "337" },
    { id: 2, name: "412" },
    { id: 3, name: "560" },
    { id: 4, name: "583" },
    { id: 5, name: "585" },
    { id: 6, name: "750" },
    { id: 7, name: "800" },
    { id: 8, name: "900" },
    { id: 9, name: "916" },
    { id: 10, name: "958" },
    { id: 11, name: "999" },
    { id: 12, name: "სხვა" },
  ];

  const silverStandard = [
    { id: 13, name: "84" },
    { id: 14, name: "875" },
    { id: 15, name: "916" },
    { id: 16, name: "925" },
    { id: 17, name: "800" },
    { id: 18, name: "960" },
    { id: 19, name: "სხვა" },
  ];

  useEffect(() => {
    handleGetPieces();
    handleGetMetals();
    handleGetStones();
    // handleGetTypes();
  }, []);

  const schema = {
    name: Joi.string().required().max(100).label("დასახელება"),
    pieceId: Joi.string().required().max(50).label("ნაკეთობა"),
    price: Joi.number().required().max(10000).label("ფასი"),
    metalId: Joi.string().max(50).label("მეტალი"),
    stoneId: Joi.string().max(50).label("შიგთავსი"),
    weight: Joi.number().max(10000).label("წონა"),
    size: Joi.label("ზომა"),
    standard: Joi.label("სინჯი"),
    contactNumber: Joi.number().label("საკონტაქტო ნომერი"),
    contactPerson: Joi.string().label("საკონტაქტი პირი"),
    description: Joi.string().max(512).label("ნივთის აღწერა"),
    productImage: Joi.any(),
    existingProductImage: Joi.any(),
  };

  const handleGetPieces = async () => {
    let piecesData = await getPieces();
    setPieces(piecesData);
  };

  const handleGetMetals = async () => {
    let metalsData = await getMetals();
    setMetals(metalsData);
  };

  const handleGetStones = async () => {
    let stonesData = await getStones();
    setStones(stonesData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let errorMessage = validateProperty({ name, value });
    if (value == "6106818702b7fc0bf4c57e78") {
      setSizeActive(!sizeActive);
    }

    if (value == "60346d19b9a8610b7021d7a9") {
      setMetalType("gold");
    } else if (value == "60346d23b9a8610b7021d7aa") {
      setMetalType("silver");
    }

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
    if (name === "productImage") {
      setNewJewel((prevState) => ({
        ...prevState,
        [name]: e.target.files,
      }));
    } else {
      setNewJewel((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const validate = () => {
    const result = Joi.validate(newJewel, schema, { abortEarly: false });

    if (!result.error) return null;

    const errors = {};
    for (let item of result.error.details) errors[item.path[0]] = item.message;

    return errors;
  };

  const validateProperty = ({ name, value }) => {
    let obj = { [name]: value };
    let demoSchema = { [name]: schema[name] };

    const { error } = Joi.validate(obj, demoSchema);
    if (error && error.details.length === 2) {
      return error.details[1].message;
    } else {
      return error ? error.details[0].message : null;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const demoErrors = validate();
    setErrors((prevState) => ({
      ...prevState,
      // ["duration"]: demoErrors ? demoErrors.duration : null,
      ["name"]: demoErrors ? demoErrors.name : null,
      ["pieceId"]: demoErrors ? demoErrors.piece : null,
      ["price"]: demoErrors ? demoErrors.price : null,
      ["metalId"]: demoErrors ? demoErrors.metal : null,
      ["stoneId"]: demoErrors ? demoErrors.stone : null,
      ["weight"]: demoErrors ? demoErrors.weight : null,
      ["size"]: demoErrors ? demoErrors.size : null,
      ["standard"]: demoErrors ? demoErrors.standard : null,
      ["contactNumber"]: demoErrors ? demoErrors.contactNumber : null,
      ["contactPerson"]: demoErrors ? demoErrors.contactPerson : null,
      ["description"]: demoErrors ? demoErrors.description : null,
      ["productImage"]: demoErrors ? demoErrors.productImage : null,
      // ["typeId"]: demoErrors ? demoErrors.type : null,
    }));
    if (demoErrors) console.log(demoErrors, "demoerrors", newJewel);
    else {
      let userToken = localStorage.getItem("token");
      let jewelFormData = objectToFormData(newJewel);
      editJewel(jewelFormData, productObject._id, userToken);
      setSuccessModal(true);
    }
  };

  const objectToFormData = (obj) => {
    let fd = new FormData();
    for (let item in obj) {
      if (item === "productImage") {
        for (const key of Object.keys(obj[item])) {
          fd.append(item, obj[item][key]);
        }
      } else {
        fd.append(item, obj[item]);
      }
    }
    return fd;
  };

  const handleDeleteImage = (imgUrl, e) => {
    e.preventDefault();
    let newImgArr = newJewel.existingProductImage.filter(
      (image) => image !== imgUrl
    );

    setNewJewel((prevState) => ({
      ...prevState,
      ["existingProductImage"]: newImgArr,
    }));
  };

  const handleDeleteFileImage = (img, e) => {
    e.preventDefault();
    let prImArr = Array.from(newJewel.productImage);
    let index = prImArr.indexOf(img);
    prImArr.splice(index, 1);
    setNewJewel((prevState) => ({
      ...prevState,
      ["productImage"]: prImArr,
    }));
  };

  useEffect(() => {
    console.log(newJewel);
  }, [newJewel]);

  return (
    <>
      {successModal ? (
        <Alert variant="filled" severity="success">
          პროდუქტი წარმატებით რედაქტირდა
        </Alert>
      ) : (
        <Dialog
          open={toggleEditModal}
          onClose={toggleEditModal}
          aria-labelledby="draggable-dialog-title"
        >
          <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
            განცხადების რედაქტირება
          </DialogTitle>
          <DialogContent>
            <form onSubmit={handleSubmit}>
              <div className="new-product-form">
                <div className="inner-blocks">
                  <TextField
                    required
                    className="input-form"
                    name="name"
                    value={newJewel.name}
                    onChange={handleChange}
                    label="დასახელება"
                    size="small"
                    variant="outlined"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                  {errors.name && <span>{errors.name}</span>}
                  <FormControl>
                    <InputLabel>ნაკეთობა</InputLabel>
                    {pieces && (
                      <Select
                        name={"pieceId"}
                        label={"ნაკეთობა"}
                        value={newJewel.pieceId}
                        onChange={handleChange}
                        variant="outlined"
                      >
                        {pieces.map((piece) => {
                          return (
                            <MenuItem
                              key={piece._id}
                              value={piece._id}
                              selected={
                                piece._id === productObject.pieceId
                                  ? true
                                  : false
                              }
                              error={errors.pieceId}
                            >
                              {piece.name}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    )}
                  </FormControl>

                  {sizeActive == true && (
                    <TextField
                      className="input-form"
                      name="size"
                      value={newJewel.size}
                      onChange={handleChange}
                      label={"ზომა"}
                      // error={errors.size}
                      size="small"
                      variant="outlined"
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  )}
                  {errors.size && <span>{errors.size}</span>}

                  <FormControl>
                    <InputLabel>ძვირფასი მეტალი</InputLabel>
                    {metals && (
                      <Select
                        name={"metalId"}
                        label={"ძვირფასი მეტალი"}
                        value={newJewel.metalId}
                        onChange={handleChange}
                        variant="outlined"
                      >
                        {metals.map((metal) => {
                          return (
                            <MenuItem
                              key={metal._id}
                              value={metal._id}
                              error={errors.metalId}
                            >
                              {metal.name}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    )}
                  </FormControl>

                  {metalType.length > 0 && (
                    <>
                      {metalType == "Gold" ? (
                        <FormControl>
                          <InputLabel>სინჯი</InputLabel>
                          {goldStandard && (
                            <Select
                              name={"standard"}
                              label={"სინჯი"}
                              value={newJewel.standard}
                              onChange={handleChange}
                              variant="outlined"
                            >
                              {goldStandard.map((standard) => {
                                return (
                                  <MenuItem
                                    key={standard.id}
                                    value={standard.name}
                                    error={errors.standardId}
                                  >
                                    {standard.name}
                                  </MenuItem>
                                );
                              })}
                            </Select>
                          )}
                        </FormControl>
                      ) : (
                        <FormControl>
                          <InputLabel>სინჯი</InputLabel>
                          {silverStandard && (
                            <Select
                              name={"standard"}
                              label={"სინჯი"}
                              value={newJewel.standard}
                              onChange={handleChange}
                              variant="outlined"
                            >
                              {silverStandard.map((standard) => {
                                return (
                                  <MenuItem
                                    key={standard.id}
                                    value={standard.name}
                                    error={errors.standardId}
                                  >
                                    {standard.name}
                                  </MenuItem>
                                );
                              })}
                            </Select>
                          )}
                        </FormControl>
                      )}
                    </>
                  )}
                </div>
                <div className="inner-blocks">
                  <FormControl>
                    <InputLabel>შიგთავსი</InputLabel>
                    {stones && (
                      <Select
                        name={"stoneId"}
                        label={"ძვირფასი მეტალი"}
                        value={newJewel.stoneId}
                        onChange={handleChange}
                        variant="outlined"
                      >
                        {stones.map((stone) => {
                          return (
                            <MenuItem
                              key={stone._id}
                              value={stone._id}
                              error={errors.stoneId}
                            >
                              {stone.name}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    )}
                  </FormControl>

                  <TextField
                    className="input-form"
                    name="weight"
                    value={newJewel.weight}
                    onChange={handleChange}
                    label={"წონა (გრამი)"}
                    // error={errors.weight}
                    size="small"
                    variant="outlined"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                  {errors.weight && <span>{errors.weight}</span>}

                  <TextField
                    required
                    className="input-form"
                    name="price"
                    value={newJewel.price}
                    onChange={handleChange}
                    label={"ფასი"}
                    // error={errors.price}
                    size="small"
                    variant="outlined"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                  {errors.price && <span>{errors.price}</span>}

                  <span>საკონტაქტო პირი:</span>
                  <TextField
                    className="input-form"
                    name="contactPerson"
                    value={newJewel.contactPerson}
                    onChange={handleChange}
                    label={"სახელი"}
                    // error={errors.contactNumber}
                    size="small"
                    variant="outlined"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                  {errors.contactPerson && <span>{errors.contactPerson}</span>}

                  <TextField
                    className="input-form"
                    name="contactNumber"
                    value={newJewel.contactNumber.toString()}
                    onChange={handleChange}
                    label={"საკონტაქტო ნომერი"}
                    // error={errors.contactNumber}
                    size="small"
                    variant="outlined"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                  {errors.contactNumber && <span>{errors.contactNumber}</span>}
                </div>
              </div>

              <div className="descriptionSection">
                <DialogContentText>ახალი ფოტოების დამატება</DialogContentText>
                <ImageField onChange={handleChange} />
                <DialogContentText>თქვენი ფოტოები</DialogContentText>
                <div className="existingImages">
                  {newJewel.productImage &&
                    Array.from(newJewel.productImage).map((file, index) => {
                      return (
                        <div className="existingImageItem" key={index}>
                          <img alt="Product" src={URL.createObjectURL(file)} />
                          <button
                            onClick={(e) => handleDeleteFileImage(file, e)}
                            className="existingItemDelete"
                          >
                            X
                          </button>
                        </div>
                      );
                    })}
                </div>

                <div className="existingImages">
                  {newJewel.existingProductImage &&
                    newJewel.existingProductImage.map((image, index) => {
                      return (
                        <div className="existingImageItem" key={index}>
                          <img
                            alt="Product"
                            src={`http://localhost:3000/${image}`}
                          />
                          <button
                            onClick={(e) => handleDeleteImage(image, e)}
                            className="existingItemDelete"
                          >
                            X
                          </button>
                        </div>
                      );
                    })}
                </div>
                <TextField
                  fullWidth
                  className="input-form description"
                  style={{ height: "100px" }}
                  name="description"
                  value={newJewel.description}
                  onChange={handleChange}
                  label="ნივთის აღწერა"
                  size="medium"
                  variant="outlined"
                  rows={12}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputProps={{
                    maxLength: 512,
                    style: {
                      height: "100px",
                    },
                  }}
                  helperText="მაქსიმუმ 512 სიმბოლო"
                />
                {errors.description && <span>{errors.description}</span>}
              </div>
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={(e) => handleSubmit(e)} color="primary">
              რედაქტირება
            </Button>
            <Button onClick={toggleEditModal} color="primary">
              გაუქმება
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
};

export default EditProductModal;
