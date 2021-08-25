import React, { useEffect, useState } from "react";
import {
  getMetals,
  getPieces,
  getStones,
  // getTypes,
  postJewels,
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
} from "@material-ui/core";

import "../CSS/newProductModal.css";

import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const NewProductModal = ({ handleNewProductModalToggle, currentUser }) => {
  const [pieces, setPieces] = useState(null);
  const [metals, setMetals] = useState(null);
  const [stones, setStones] = useState(null);
  // const [types, setTypes] = useState(null);
  const [newJewel, setNewJewel] = useState({
    // duration: "",
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
    productImage: {},
    // typeId: "",
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
    // typeId: "",
  });
  const [sizeActive, setSizeActive] = useState(false);
  const [metalType, setMetalType] = useState("");
  const [successModal, setSuccessModal] = useState(false);

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
    // duration: Joi.number()
    //   .max(100)
    //   .default(30)
    //   .label("ხანგრძლივობა"),
    name: Joi.string().required().max(100).label("დასახელება"),
    pieceId: Joi.string().required().max(50).label("ნაკეთობა"),
    price: Joi.number().required().max(10000).label("ფასი"),
    metalId: Joi.string().max(50).label("მეტალი"),
    stoneId: Joi.string().max(50).label("შიგთავსი"),
    weight: Joi.number().max(10000).label("წონა"),
    size: Joi.label("ზომა"),
    standard: Joi.label("სინჯი"),
    contactNumber: Joi.string().label("საკონტაქტო ნომერი"),
    contactPerson: Joi.string().label("საკონტაქტი პირი"),
    description: Joi.string().max(512).label("ნივთის აღწერა"),
    productImage: Joi.any(),
    // typeId: Joi.string().required(),
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

  // const handleGetTypes = async () => {
  //   let typesData = await getTypes();
  //   setTypes(typesData);
  // };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let errorMessage = validateProperty({ name, value });
    if (value == "609c0d3330fda220ba62a5a9") {
      setSizeActive(!sizeActive);
    }

    if (value == "609c0b3e82706f1df0e5a470") {
      setMetalType("gold");
    } else if (value == "609c0b4c82706f1df0e5a471") {
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
      console.log(newJewel);
      postJewels(jewelFormData, userToken);
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

  return (
    <>
      {successModal ? (
        <Alert variant="filled" severity="success">
          პროდუქტი წარმატებით დაემატა
        </Alert>
      ) : (
        <Dialog
          open={handleNewProductModalToggle}
          onClose={handleNewProductModalToggle}
          // PaperComponent={PaperComponent}
          aria-labelledby="draggable-dialog-title"
        >
          <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
            ახალი განცხდების დამატება:
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
                      {metalType == "gold" ? (
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
                    value={newJewel.contactNumber}
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
                <ImageField onChange={handleChange} />

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
            <Button onClick={handleSubmit} color="primary">
              დამატება
            </Button>
            <Button onClick={handleNewProductModalToggle} color="primary">
              გაუქმება
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
};

export default NewProductModal;
