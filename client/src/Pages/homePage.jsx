import React, { useState, useEffect } from "react";
import {
  getJewels,
  getStones,
  getMetals,
  getPieces,
} from "../Services/APIEndpoints";
import Filter from "../Reusable components/filter";
import Pagination from "../Components/pagination";
import AdSlider from "../Components/adSlider";
import SearchBar from "../Reusable components/searchBar";

import "../CSS/homePage.css";
import side from "../Resources/images/side.jpeg";

const HomePage = () => {
  const [jewels, setJewels] = useState([]);

  const [pieces, setPieces] = useState(null);
  const [metals, setMetals] = useState(null);
  const [stones, setStones] = useState(null);
  const [checkboxStates, setCheckboxStates] = useState({});
  const [showAllItems, setShowAllItems] = useState(false);

  useEffect(() => {
    // handleGetJewel();
    handleGetJewels();
    handleGetPieces();
    handleGetMetals();
    handleGetStones();
  }, []);

  const handleGetJewels = async () => {
    let jewelData = await getJewels();
    // let actives = jewelData.filter((object) => object.expired === false);
    setJewels(jewelData);
  };

  const handleGetPieces = async () => {
    let piecesData = await getPieces();
    setPieces(piecesData);
  };

  const handleGetStones = async () => {
    let stonesData = await getStones();
    setStones(stonesData);
  };

  const handleGetMetals = async () => {
    let metalsData = await getMetals();
    setMetals(metalsData);
  };

  const handlePieceSelect = async (piece) => {
    let jewelArr = await getJewels();
    let newPieceArr = jewelArr.filter((item) => {
      return item.piece._id === piece._id;
    });
    setJewels(newPieceArr);
  };

  const handleMetalSelect = async (metal) => {
    let jewelArr = await getJewels();
    let newMetalArr = jewelArr.filter((item) => {
      return item.metal._id === metal._id;
    });
    setJewels(newMetalArr);
  };

  const handleStoneSelect = async (stone) => {
    let jewelArr = await getJewels();
    let newStoneArr = jewelArr.filter((item) => {
      return item.stone._id === stone._id;
    });
    setJewels(newStoneArr);
  };

  const checkboxChange = (item, title) => (event) => {
    setCheckboxStates({ ...checkboxStates, [item._id]: event.target.checked });
    switch (title) {
      case "ნაკეთობა":
        handlePieceSelect(item);
        setShowAllItems(!showAllItems);
        break;
      case "მასალა":
        handleMetalSelect(item);
        setShowAllItems(!showAllItems);
        break;
      case "შიგთავსი":
        handleStoneSelect(item);
        setShowAllItems(!showAllItems);
        break;
      default:
        break;
    }
  };
  const handleSearchByName = async (symbols) => {
    let demoJewels = await getJewels();
    let filtered = demoJewels.filter((item) => {
      return item.name.toLowerCase().includes(symbols.toLowerCase());
    });
    setJewels(filtered, "filtered");
  };

  return (
    <div className="homepage-main-container">
      <div className="filter-section">
        <Filter
          items={metals}
          title={"მასალა"}
          checkboxStates={checkboxStates}
          onItemSelect={checkboxChange}
        />
        <Filter
          items={pieces}
          title={"ნაკეთობა"}
          checkboxStates={checkboxStates}
          onItemSelect={checkboxChange}
        />
        <Filter
          items={stones}
          title={"შიგთავსი"}
          checkboxStates={checkboxStates}
          onItemSelect={checkboxChange}
        />
      </div>
      <div className="homepage-content">
        <div className="advertising-component">
          <SearchBar onChange={handleSearchByName} />
          <AdSlider />
          <>
            <Pagination jewels={jewels} itemsPerPage={12} />
          </>
        </div>
      </div>
      <div>
        <img src={side} className="right" />
        <img src={side} className="right" />
        <img src={side} className="right" />
        <img src={side} className="right" />
      </div>
    </div>
  );
};

export default HomePage;
