import React from "react";
import { useTheme } from "../Contexts/ThemeContext";
import { BsSearch } from "react-icons/bs";
import { ImStatsBars } from "react-icons/im";
import { MdSort } from "react-icons/md";
import { useNavigate } from "react-router-dom";

import "./Header.css";

const appLogo = require("../Assets/Images/contact-manager.png");
const lightMode = require("../Assets/Images/light-mode.png");
const darkMode = require("../Assets/Images/dark-mode.png");

const Header = (props) => {
  const {
    searchQuery,
    setSearchQuery,
    showStatistics,
    setShowStatistics,
    sortOrder,
    setSortOrder,
  } = props;
  const { isDarkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleSearchChange = (event) => {
    event.preventDefault();
    setSearchQuery(event.target.value);
  };

  const toggleStatistics = () => {
    setShowStatistics((prevState) => !prevState);
  };

  const handleSortOrderChange = (event) => {
    setSortOrder(event.target.value);
  };

  const renderStatsButton = () => (
    <button 
      className={`${showStatistics ? 'active-stats-button stats-button' : 'stats-button'}`}
      onClick={toggleStatistics}
      type="button"
    >
      <ImStatsBars className={`${showStatistics ? 'active-stats-icon stats-icon' : "stats-icon"}`} />
      <p className={`${ showStatistics ? 'active-stats-icon-label stats-icon-label' : 'stats-icon-label'}`}>Stats</p>
    </button>
  );

  const renderSortOrder = () => {
    return (
      <div className="sort-container">
        <MdSort className="sort-icon" />
        <select
          className="select-button"
          name="Sort by"
          value={sortOrder}
          onChange={handleSortOrderChange}
        >
          <option className="options" value="ascending">
            Sort by: Asc
          </option>
          <option className="options" value="descending">
            Sort by: Dsc
          </option>
        </select>
      </div>
    );
  };

  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <header className="header">
      <div className="header-content-container">
        <div className="logo-container">
          <img
            onClick={handleLogoClick}
            className="logo-img"
            src={appLogo}
            alt="Contact List Logo"
          />
          <h1 className="app-title">Contact Manager</h1>
        </div>
        <form className="header-form-container">
          <button className="search-button" type="button">
            <BsSearch color={isDarkMode ? "#ffffff" : "#000000"} />
          </button>
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={handleSearchChange}
            className="search-input"
          />
        </form>
        <div className="action-button-container">
          {renderStatsButton()}
          {renderSortOrder()}
        </div>
        <button className="theme-change-button" onClick={toggleTheme}>
          <img
            className="theme-icon"
            src={isDarkMode ? lightMode : darkMode}
            alt={isDarkMode ? "light mode" : "dark Mode"}
          />
        </button>
      </div>
    </header>
  );
};

export default Header;
