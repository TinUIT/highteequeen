import React from "react";

import Table from "../Table/Table";
import "./ProductManage.css";
const ProductManage = () => {
  return (
    <div className="ProductManage">
      <h1 className="tile-admin">Bill List</h1>
     
      <Table />
    </div>
  );
};

export default ProductManage;
