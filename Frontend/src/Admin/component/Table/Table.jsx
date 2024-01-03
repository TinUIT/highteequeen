import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./Table.css";
import DetailAdminBill from "../DetailAdminBill/DetailAdminBill";
import TickAccept from "../assets/TickAccept.gif";
import axios from "axios";
import NavbarOrders from "./NavbarOrders";
import ReactPaginate from "react-paginate";

// function createData(name, trackingId, date, status) {
//   return { name, trackingId, date, status };
// }

// const rows = [
//   createData("Lasania Chiken Fri", 18908424, "2 March 2022", "Approved"),
//   createData("Big Baza Bang ", 18908424, "2 March 2022", "Pending"),
//   createData("Mouth Freshner", 18908424, "2 March 2022", "Approved"),
//   createData("Cupcaka", 18908421, "2 March 2022", "Delivered"),
//   createData("Cupcakb", 18908421, "2 March 2022", "Delivered"),
//   createData("Cupcakc", 18908421, "2 March 2022", "Delivered"),
//   createData("Cupcakd", 18908421, "2 March 2022", "Delivered"),
//   createData("Cupcake", 18908421, "2 March 2022", "Delivered"),
//   createData("Cupcakf", 18908421, "2 March 2022", "Delivered"),
// ];

const makeStyle = (status) => {
  if (status === "Approved") {
    return {
      background: "rgb(145 254 159 / 47%)",
      color: "green",
    };
  } else if (status === "Pending") {
    return {
      background: "#ffadad8f",
      color: "red",
    };
  } else {
    return {
      background: "#59bfff",
      color: "white",
    };
  }
};



export default function BasicTable() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isAccept, setisAccept] = useState(false);
  // const [isAccepted, setIsAccepted] = useState(Array(rows.length).fill(false));
  // const [isCancel, setIsCancel] = useState(Array(rows.length).fill(false));
  const [isAccepted, setIsAccepted] = useState(Array(0).fill(false));
  const [isCancel, setIsCancel] = useState(Array(0).fill(false));
  const [Bill, setBill] = useState([]);
  
  const [listOrder, setListOrder] = useState([]);
  const [ID, setID] = useState();

  const handleDetailBill = (product, index) => {
    setSelectedProduct(product);
    setID(index);
    console.log("ID", index);
    console.log(product);
  };

  const handleCloseDetail = () => {
    setSelectedProduct(null);
  };

  const handleAccept = (index) => {
    axios.get(`http://localhost:8080/api/orders/${index}/success`).then(() => {
      const newIsAccepted = [...isAccepted];
      newIsAccepted[index - 1] = true;
      
      setIsAccepted(newIsAccepted);
     
    });
  };


  const handleCancel = (index) => {
    axios.get(`http://localhost:8080/api/orders/${index}/deny`).then(() => {
      const newIsCancel = [...isCancel];
      newIsCancel[index - 1] = true;
      setIsCancel(newIsCancel);
   
    });
  };

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };
  

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5; // Update this value based on your requirements
  const pageCount = Math.ceil(Bill.length / itemsPerPage);

  const startIndex = currentPage * itemsPerPage;
const endIndex = startIndex + itemsPerPage;
const displayedItems = listOrder.slice(startIndex, endIndex);






  // useEffect(() => {
  //   axios
  //     .get("http://localhost:8080/api/orders?page=0&size=5")
  //     .then((response) => {
  //       setBill(response.data);
  //       setContentBill(response.data.content);
  //     })
  //     .catch((error) => {
  //       console.error("There was an error!", error);
  //     });
  // }, [ isAccepted,isCancel]);
  useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await axios.get(
        'http://localhost:8080/api/v1/orders/get-orders-by-keyword?page=0&limit=10',
        {
          headers: {
            accept: '*',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjIsImVtYWlsIjoiMjA1MjE4MThAZ20udWl0LmVkdS52biIsInN1YiI6IjIwNTIxODE4QGdtLnVpdC5lZHUudm4iLCJleHAiOjE3MDY4MDQ4ODl9.jIPkeYVkTn87aqXUSERq6HYjgbqdbxq5bGDJfUzT4ho',
          },
        }
      );
      setBill(response.data.orders);
      setListOrder(response.data.orders);
      setIsAccepted(Array(response.data.orders.length).fill(false));
      setIsCancel(Array(response.data.orders.length).fill(false));
    } catch (error) {
      console.error('There was an error!', error);
    }
  };

  fetchData();
// }, [isAccepted, isCancel]);
}, []);


  return (
    <div className="Table">
      {/* <h3>Recent Orders</h3> */}
      <NavbarOrders/>
      <TableContainer
        component={Paper}
        style={{ boxShadow: "0px 13px 20px 0px #80808029" }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Order ID</TableCell>
              <TableCell align="left">Date</TableCell>
              <TableCell align="left">Status</TableCell>
              <TableCell align="left"></TableCell>
              <TableCell align="left">Active</TableCell>
            </TableRow>
          </TableHead>
          <TableBody style={{ color: "white" }}>
            {listOrder.map((row, index) => (
               <React.Fragment key={row.id}>
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}

              >
                {/* <TableCell align="left">{row.orderId}</TableCell>
                <TableCell align="left">{row.orderDate}</TableCell> */}
                <TableCell align="left">{row.id}</TableCell>
                <TableCell align="left">{`${row.order_date[2]} / ${row.order_date[1]} / ${row.order_date[0]}`}</TableCell>
                <TableCell align="left">
                  <span className="status" style={makeStyle(row.status)}>
                    {row.status}
                  </span>
                </TableCell>
                <TableCell align="left" className="Details">
                  {selectedProduct === row ? (
                    <button className="Bt-Admin-Close" onClick={handleCloseDetail}>
                      Close
                    </button>
                  ) : (
                    <button
                      className="Bt-Admin-Details"
                      onClick={() => handleDetailBill(row, index)}
                    >
                      Details
                    </button>
                  )}
                </TableCell>
                <TableCell align="left" className="Active">
                  <div className="Wrap-button-active">
                    {row.status === "on-process" ? (
                      <>
                        <button
                          className="ButtonActive Accept"
                          onClick={() => handleAccept(row.orderId)}
                        >
                          Accept
                        </button>
                        <button
                          className="ButtonActive Deny"
                          onClick={() => handleCancel(row.orderId)}
                        >
                          Deny
                        </button>
                      </>
                    ) : (
                      <>
                        {row.status !== "success" ? (
                          isAccepted[index] && row.status === "success" ? (
                            <div className="Wrap-img-tick-accept">
                              <img
                                className="IMG-Tick-Accept"
                                src={TickAccept}
                                alt="Tick Accept"
                              />
                            </div>
                          ) : (
                            <button
                              className="ButtonActive Accept"
                              onClick={() => handleAccept(row.orderId)}
                            >
                              Accept
                            </button>
                          )
                        ) : (
                          !isCancel[index] && row.status !== "deny" ? (
                            <button
                              className="ButtonActive Deny"
                              onClick={() => handleCancel(row.orderId)}
                            >
                              Deny
                            </button>
                          ) : (
                            <></>
                          )
                        )}
                      </>
                    )}
                  </div>
                </TableCell>
              </TableRow>
              {selectedProduct === row && (
                  <TableRow>
                    <TableCell align="left" colSpan={5}>
                      <DetailAdminBill
                        product={selectedProduct}
                        onClose={handleCloseDetail}
                        ID={row.id}
                      />
                    </TableCell>
                  </TableRow>
                )}

              </React.Fragment>
            ))}
            
          </TableBody>
       

        </Table>
      
      </TableContainer>
     
      {/* <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
          /> */}
      
      
      {/* {selectedProduct && (
        <DetailAdminBill product={selectedProduct} onClose={handleCloseDetail} ID={ID} />
      )} */}
    </div>
  );
}