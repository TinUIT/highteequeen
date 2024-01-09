import "./DetailAdminBill.css";
import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import AddProduct from "../AddProduct/AddProduct";
import LogoWeb from "../assets/Logoweb.png";
import axios from "axios";
import Item from "antd/es/list/Item";
//cu



function createData(productId, productName, price, quantity, Subtotal,trackingId) {
  return {
    productId,
    productName,
    price,
    quantity,
    Subtotal,
    trackingId,
  };
}
const dataExample = [
  {
    productId: "#123",
    productName: "Half n Half Water Glow Season 1 ",    
    price: "$150",
    quantity: 1,
    Subtotal:25,
    trackingId:18908424,
    
  },
  {
    productId: "#123",
    productName: "Half n Half Water Glow Season 1 ",    
    price: "$150",
    quantity: 2,
    Subtotal:30,
    trackingId:18908422,
  },
  {
    productId: "#123",
    productName: "Half n Half Water Glow Season 1 ",    
    price: "$150",
    quantity: 3,
    Subtotal:50,
    trackingId:18908424,
  },
  
];
const Userexample = [
    {
      NameUser: "ABC",
      Email: "ABC@gmail.com ",    
      Phone:"0123456789",
      Address:"Dd,tp,Bt"
            
    },]

// export default function DetailAdminBill(props) {
  export default function DetailAdminBill({ product, onClose, ID, ID_User,all_total }) {
  const [isAddingProduct, setIsAddingProduct] = React.useState(false);
  const [posts, setPosts] = useState([]);
  // const  [ContentBill,setContentBill]=useState([]);
  // const [DetailContentBill,setDetailContentBill]=useState([]);
  const [ContentBill, setContentBill] = useState([product]);
  const [DetailContentBill, setDetailContentBill] = useState(dataExample);
  const [userInfo, setUserInfo] = useState([]);
  const [orderDetails, setOrderDetails] = useState([]);


//   useEffect(() => {
//     // Simulating data from API
//     // Replace this with your actual API call
//     setContentBill(Userexample);


//   }, [ID]);
// console.log("TestProductBill",DetailContentBill)

useEffect(() => {
  const fetchData = async () => {
    try {
      // Fetch user info
      const userInfoRespone = await axios.get(
      `http://localhost:8080/api/v1/orders/${ID}`,
        {
          headers: {
            accept: '*',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjIsImVtYWlsIjoiMjA1MjE4MThAZ20udWl0LmVkdS52biIsInN1YiI6IjIwNTIxODE4QGdtLnVpdC5lZHUudm4iLCJleHAiOjE3MDY4NjUyOTZ9.we_aBIGPTTL4IDd4PoFVFY4O7LVf6yopz-Q3j617DGw',
          },
        }
      );
    
      // Fetch order details
      const orderDetailsResponse = await axios.get(
      
        `http://localhost:8080/api/v1/order_details/order/${ID}`,
        {
          headers: {
            accept: '*',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjIsImVtYWlsIjoiMjA1MjE4MThAZ20udWl0LmVkdS52biIsInN1YiI6IjIwNTIxODE4QGdtLnVpdC5lZHUudm4iLCJleHAiOjE3MDY3NzgzNTh9.QRIuxIocF8UBxcByrSV4s5Slz33IkgOYHJH8cX3v0TA',
          },
        }
      );
      setOrderDetails([orderDetailsResponse.data]);
      setUserInfo([userInfoRespone.data]);
      console.log('Order Details Response:', orderDetailsResponse.data);
      console.log('user Response:', userInfoRespone.data);
      console.log('user id: ',ID_User);

    } catch (error) {
      console.error('Error:', error.message);
      console.error('Response Status:', error.response?.status);
      console.error('Response Data:', error.response?.data);
    }
  };

  fetchData();
}, [ID]);



// const combinedData = Userexample.map((user, index) => ({
//   ...user,
//   orderDetails: DetailContentBill[index],
// }));




  return (
    <div className="DetailAdminBill">
       <div class="my-div">
          <div class="line1"></div>
          <div class="BestSeller"> 
            <h2>Detail order</h2>
          </div>
          <div class="line2"></div>

        </div>
        <div className="Admin-Info-User">
            <div className="Wrapper-avatar-user-admin">
            <img className="avatar-user-admin"src={LogoWeb}></img></div>
            <div className="In-Info-User">
             
            {userInfo.map((info, index) => (
              <React.Fragment key={info.id}>
                {index === 0 && (
                  <>
                    <div className="wrapper-info-user">Name: {info.fullname}</div>
                    <div className="wrapper-info-user">Email: {info.email}</div>
                    <div className="wrapper-info-user">Phone: {info.phone_number}</div>
                    <div className="wrapper-info-user">Address: {info.address}</div>
               
                  </>
                )}
              </React.Fragment>
            ))}

            </div>
        </div>
        <div className="Product_Order">
          <TableContainer
            component={Paper}
            style={{ boxShadow: "0px 13px 20px 0px #80808029" }}
          >
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="left">ID</TableCell>
                  <TableCell align="left">Name</TableCell>
                  <TableCell align="left">Price</TableCell>
                  <TableCell align="left">Quantity</TableCell>
                  <TableCell align="left">Total</TableCell>
                </TableRow>
              </TableHead>
              <TableBody style={{ color: "white" }}>
              {orderDetails.map((item, index) => (
                item.map((product) => (
                  <React.Fragment key={product.id}>
                    <TableRow 
                      key={product.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }} >
                      <TableCell align="left">{product.id}</TableCell>
                      {/* Use the correct property name for product name */}
                      <TableCell align="left">{/* Replace with product.productName or relevant property */}</TableCell>
                      <TableCell align="left">{product.price}</TableCell>
                      <TableCell align="left">{product.number_of_products}</TableCell>
                      <TableCell align="left">{product.total_money}</TableCell>
                    </TableRow>
                  </React.Fragment>
                ))
              ))}
              </TableBody>
            </Table>
          </TableContainer>
          <div className="all_total">
         
            <h2>All total: ${all_total}</h2>
          </div>

        </div>
     
      
      
      
    </div>
  );
};
