import React from "react";
import Cards from "../Cards/Cards";
import Table from "../Table/Table";
import "./MainDash.css";
const MainDash = () => {
  return (
    <div className="MainDash">
      <h1 className="tile-admin">Dashboard</h1>
      <Cards />
      <Table />
    </div>
  );
};

export default MainDash;
