import React from "react";
import "./Header.css";
import SearchBar from "./SearchBar.js";

export default function Header() {
  return (
    <div className="header">
      <div className="title">recipe central</div>
      <div className="search-bar">
        <SearchBar />
      </div>
    </div>
  );
}
