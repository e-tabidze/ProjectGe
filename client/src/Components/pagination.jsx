import React, { useState } from "react";
import ProductCard from "./productCard";
import AdSlider from "../Components/adSlider";

import banner1 from "../Resources/images/1080x200.jpeg";

import "../CSS/pagination.css";

const Pagination = ({ jewels, itemsPerPage }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const [pageNumberLimit, setPageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);

  const pages = [];

  for (let i = 1; i <= Math.ceil(jewels && jewels.length / itemsPerPage); i++) {
    pages.push(i);
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems =
    jewels.length != 0 ? jewels.slice(indexOfFirstItem, indexOfLastItem) : null;

  const handleClick = (e) => {
    setCurrentPage(Number(e.target.id));
  };

  const renderData = () => {
    return (
      <div className="product-section">
        {currentItems.sort().map((jewel) => {
          return <ProductCard key={jewel._id} jewel={jewel} />;
        })}
        <div className="secondAd">
          <img
            className="bannerImage"
            src={banner1}
            alt="project-ge"
          />
        </div>
        <div className="thirdAd">
          <img
            className="bannerImage"
            src={banner1}
            alt="project-ge"
          />
        </div>
        {/* <AdSlider /> */}
      </div>
    );
  };

  const renderPageNumbers = pages.map((number) => {
    if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
      return (
        <li
          key={number}
          id={number}
          onClick={handleClick}
          className={currentPage == number ? "active" : null}
        >
          {number}
        </li>
      );
    } else {
      return null;
    }
  });

  const handleNexbtn = () => {
    setCurrentPage(currentPage + 1);
    if (currentPage + 1 > maxPageNumberLimit) {
      setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };

  const handlePrevbtn = () => {
    setCurrentPage(currentPage - 1);
    if ((currentPage - 1) % pageNumberLimit == 0) {
      setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };

  let pageIncrementbtn = null;
  if (pages.length > maxPageNumberLimit) {
    pageIncrementbtn = <li onClick={handleNexbtn}> &hellip; </li>;
  }

  let pageDecrementbtn = null;
  if (pages.length > maxPageNumberLimit) {
    pageDecrementbtn = <li onClick={handlePrevbtn}> &hellip; </li>;
  }

  return (
    <div className="pagination-container-wrapper">
      <ul>{currentItems ? renderData() : null}

      </ul>
      <ul className="pagenumbers">
        <li>
          <button
            className="buttonnav"
            onClick={handlePrevbtn}
            disabled={currentPage == pages[0] ? true : false}
          >
            <i className="fa fa-angle-double-left fa-2x" />
          </button>
        </li>
        {pageDecrementbtn}
        {renderPageNumbers}
        {pageIncrementbtn}
        <li>
          <button
            className="buttonnav"
            onClick={handleNexbtn}
            disabled={currentPage == pages[pages.length - 1] ? true : false}
          >
            <i className="fa fa-angle-double-right fa-2x" />
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
