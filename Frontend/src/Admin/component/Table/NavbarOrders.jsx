import React, { useState } from "react";
import "./NavbarOrders.css";
import { Link } from "react-router-dom";
import Select from "react-dropdown-select";


function NavbarOrders() {

  const options=[
    {id:"All Orders", name:1},
    {id: "Wait for confirmation", name:2},
    {id:"Delivering",name: 3},
    {id:"Completed", name:4},
    {id:"Cancelled", name:5},
  ]
  const defaultValue = [{ id: "All Orders", name: 1 }];
  const [selectedValue, setSelectedValue] = useState(defaultValue);

  const handleSelectChange = (values) => {
    setSelectedValue(values);
  };

  return (
    <div className="NavbarOrders">
      <Select
        name ="select"
        options={options}
        labelField="id"
        valueField="name"
        values={selectedValue}
        onChange={handleSelectChange}
        color="#D77B44"
       
      ></Select>
    {/* <p>{selectedValue.length > 0 && selectedValue[0].name}</p> */}
    
      
    </div>
  );
}

export default NavbarOrders;
