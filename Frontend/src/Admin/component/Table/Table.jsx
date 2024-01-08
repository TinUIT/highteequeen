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
  const [userInfo, setUserInfo] = useState(JSON.parse(localStorage.getItem('user-info')));
  
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

  const handleUpdateStatus = async (orderId, userId, status_update) => {
    try {
      const apiUrl = `http://localhost:8080/api/v1/orders/${orderId}/status`;
  
      // Use the Authorization header with the user's token
      const headers = {
        accept: 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
        'Content-Type': 'application/json',
      };
  
      // Set the new status to "delivered" and provide the user_id
      const requestData = {
        status: status_update,
        user_id: userId,
      };
  
      // Update the local state immediately
      const updatedListOrder = [...listOrder];
      updatedListOrder[orderId - 1].status = status_update; // Assuming orderId is 1-indexed
      setListOrder(updatedListOrder);
  
      // Update the local isAccepted state accordingly
      const newIsAccepted = [...isAccepted];
      newIsAccepted[orderId - 1] = true; // Assuming orderId is 1-indexed
      setIsAccepted(newIsAccepted);
  
      // Make the API request
      const response = await axios.put(apiUrl, requestData, { headers });
      console.log('Order successfully accepted:', response.data);
    } catch (error) {
      console.error('Error accepting order:', error);
    }
  };
  


  const handlePageClick = ({ selected }) => {
    const newPage = selected ; // Pagination starts from 0, but your API seems to start from 1
    setCurrentPage(newPage);
    const apiUrl = `http://localhost:8080/api/v1/orders/get-orders-by-keyword?page=${newPage}&limit=10`;
    fetchData(apiUrl);
  };

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5; // Update this value based on your requirements
  const [pageCount, setPageCount] = useState(0);

  const fetchData = async (url) => {
    try {
      const response = await axios.get(url, {
        headers: {
          accept: '*',
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
     
      setListOrder(response.data.orders);
      setIsAccepted(Array(response.data.orders.length).fill(false));
      setIsCancel(Array(response.data.orders.length).fill(false));
      setCurrentPage(0); // Reset current page to 0 after fetching new data
      const totalPages = response.data.totalPages || 0;
      console.log("token: ",userInfo.token);
      setPageCount(totalPages);
      console.log("total_page:", totalPages);
    } catch (error) {
      console.error('There was an error!', error);
    }

  };

    const handleStatusChange = (status) => {
      const keyword = status.toLowerCase();
      let apiUrl;
      console.log("keyword",keyword);
      if(keyword=="all orders"){
        apiUrl = `http://localhost:8080/api/v1/orders/get-orders-by-keyword?page=0&limit=10`;
      }
      else{
        apiUrl = `http://localhost:8080/api/v1/orders/get-orders-by-keyword?page=0&limit=10&keyword=${keyword}`;
      }
      fetchData(apiUrl);
    };

    useEffect(() => {
      const   apiUrl = `http://localhost:8080/api/v1/orders/get-orders-by-keyword?page=0&limit=10`;
      fetchData(apiUrl);
    }, []); // Initial data fetching



  return (
    <div className="Table">
      {/* <h3>Recent Orders</h3> */}
      <NavbarOrders onStatusChange={handleStatusChange} />
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
                    {row.status === "pending" ? (
                      <>
                        <button
                          className="ButtonActive Accept"
                          onClick={() => handleUpdateStatus(row.id, row.user_id,'delivered')}
                        >
                          Accept
                        </button>
                        <button
                          className="ButtonActive Deny"
                          onClick={() => handleUpdateStatus(row.id,row.user_id,'cancelled')}
                        >
                          Deny
                        </button>
                      </>
                    ) : (
                      <>
                        {row.status !== "delivered" ? (
                          isAccepted[index] && row.status === "delivered" ? (
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
                              onClick={() => handleUpdateStatus(row.id, row.user_id,'delivered')}
                            >
                              Accept
                            </button>
                          )
                        ) : (
                          !isCancel[index] && row.status !== "deny" ? (
                            <button
                              className="ButtonActive Deny"
                              onClick={() => handleUpdateStatus(row.id,row.user_id,'cancelled')}
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
                        ID_User={row.user_id}
                        all_total={row.total_money}
                      />
                    </TableCell>
                  </TableRow>
                )}

              </React.Fragment>
            ))}
            
          </TableBody>
       

        </Table>
      
      </TableContainer>
     <div className="order_page">
      <ReactPaginate
            breakLabel="..."
            nextLabel="next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel="< previous"
            
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            breakClassName="page-item"
            breakLinkClassName="page-link"
            containerClassName="pagination"
            activeClassName="active"
            />
      

     </div>
      
      
      {/* {selectedProduct && (
        <DetailAdminBill product={selectedProduct} onClose={handleCloseDetail} ID={ID} />
      )} */}
    </div>
  );
}