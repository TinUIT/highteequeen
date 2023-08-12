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




function createData(
    ID,
  Name,
  Price,
  Quantity,
  Total,
  
) { 

  return {
    ID,
    Name,
    Price,
    Quantity,
    Total,
  };
}
const dataExample = [
  {
    ID: "#123",
    Name: "Half n Half Water Glow Season 1 ",    
    Price: "$150",
    Quantity: 1,
    Total:25,
    
  },
  {
    ID: "#123",
    Name: "Half n Half Water Glow Season 1 ",    
    Price: "$150",
    Quantity: 2,
    Total:30,
  },
  {
    ID: "#123",
    Name: "Half n Half Water Glow Season 1 ",    
    Price: "$150",
    Quantity: 3,
    Total:50,
  },
  
];
const Userexample = [
    {
      NameUser: "ABC",
      Email: "ABC@gmail.com ",    
      Phone:"0123456789",
      Address:"Dd,tp,Bt"
            
    },]

export default function DetailAdminBill(props) {
  const [isAddingProduct, setIsAddingProduct] = React.useState(false);
  const [posts, setPosts] = useState([]);
  const  [ContentBill,setContentBill]=useState([]);
  const [DetailContentBill,setDetailContentBill]=useState([]);

  useEffect(()=>setPosts(dataExample),[])
  useEffect(() => {
    axios.get("http://localhost:8080/api/orders?page=0&size=5")
        .then(response => {
            setContentBill(response.data.content)
            console.log("TestProduct",response.data.content[props.ID]);
            const OrderDetailBill=response.data.content[props.ID].orderDetails;
          
           
            // const Detail = (OrderDetailBill).map((bill) => {
            //   {
            //    return bill.orderDetails;
              
            //  }
          
            // })
        
            
            setDetailContentBill(OrderDetailBill);
          
     
            
             

        })
       
        .catch(error => {
            console.error('There was an error!', error);
        });
}, []);
console.log("TestProductBill",DetailContentBill)
  

 
  


  
  return (
    <div className="Table">
        <div className="Admin-Info-User">
            <div className="Wrapper-avatar-user-admin">
            <img className="avatar-user-admin"src={LogoWeb}></img></div>
            <div className="In-Info-User">
                <hr></hr>
                {ContentBill.map((info, index)=>(<>
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
                }
            </div>

        </div>
     
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
            {DetailContentBill.map((item) => (
              <TableRow
                key={item.productId}               
              >
                
                <TableCell align="left">{item.productId}</TableCell>
                <TableCell align="left">{item.productName}</TableCell>
                <TableCell align="left">{item.price}</TableCell>
                <TableCell align="left">{item.quantity}</TableCell>
                <TableCell align="left">{item.subtotal}</TableCell>
              
              
              
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      
      
    </div>
  );
};
