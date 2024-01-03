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
  export default function DetailAdminBill({ product, onClose, ID }) {
  const [isAddingProduct, setIsAddingProduct] = React.useState(false);
  const [posts, setPosts] = useState([]);
  // const  [ContentBill,setContentBill]=useState([]);
  // const [DetailContentBill,setDetailContentBill]=useState([]);
  const [ContentBill, setContentBill] = useState([product]);
  const [DetailContentBill, setDetailContentBill] = useState(dataExample);
  const [userInfo, setUserInfo] = useState({});
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
      console.log('Order Details Response:', orderDetailsResponse.data);
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
                {/* <hr></hr> */}
                {/* {ContentBill.map((info, index)=>(<>
                  {index === 0 && (
                  <React.Fragment key={info.recipientName}>
                    <div className="wrapper-info-user">Name: {info.recipientName}</div>
                    <div className="wrapper-info-user">Email: {info.email}</div>
                    <div className="wrapper-info-user">Phone: {info.recipientPhone}</div>
                    <div className="wrapper-info-user">Address: {info.shippingAddress}</div>
                    <hr />
                  </React.Fragment>
                )}
                </>
                
 
                ))
                } */}
          {ContentBill.map((info, index) => (
            <React.Fragment key={index}>
      <div className="wrapper-info-user">Name: {userInfo.NameUser}</div>
      <div className="wrapper-info-user">Email: {userInfo.Email}</div>
      <div className="wrapper-info-user">Phone: {userInfo.Phone}</div>
      <div className="wrapper-info-user">Address: {userInfo.Address}</div>
           
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
                <TableRow key={index}>
                  <TableCell align="left">{item.id}</TableCell>
                  <TableCell align="left">{/* Use the correct property name for product name */}</TableCell>
                  <TableCell align="left">{item.price}</TableCell>
                  <TableCell align="left">{item.number_of_products}</TableCell>
                  <TableCell align="left">{item.total_money}</TableCell>
                </TableRow>
              ))}

              </TableBody>
            </Table>
          </TableContainer>

        </div>
     
      
      
      
    </div>
  );
};
