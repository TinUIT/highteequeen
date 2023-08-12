import "./ProductWarehouse.css";
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
import axios from "axios";
import Logoweb from "../assets/Logoweb.png";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { app } from "../../../firebase/firebase";
import Modal from '../../../components/Modal/Modal';

export default function ProductWarehouse() {

  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState({})
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [imageUrl, setImageUrl] = useState(null);
  const [openModal, setOpenModal] = useState(false);


  useEffect(() => {
    const storage = getStorage(app);
    var storageRef = ref(storage, "white.jpg");

    getDownloadURL(storageRef).then((url) => {
      setImageUrl(url);
    });
  }, [products]);
  useEffect(() => {
    axios.get(`http://localhost:8080/api/products?page=${currentPage}&size=5`)
      .then(response => {
        setProducts(response.data.content);
        setTotalPages(response.data.totalPages);
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  }, [currentPage]);
  const [isAddingProduct, setIsAddingProduct] = React.useState(false);
  const [isUpdateProduct, setIsUpdateProduct] = React.useState(false);
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    setPosts(products);
  }, [products])

  const handleAddProduct = () => {
    setIsAddingProduct(!isAddingProduct);
    var item = {
      name: "",
      price: "",
      image: "",
      brand: "",
      origin: "",
      description: "",
      categoryName: "",
    }
    setProduct(item);
  };

  const handleUpdateProduct = (id, name, price, image, brand, origin, description, categoryName) => {
    setIsUpdateProduct(!isUpdateProduct);
    var item = {
      id, name, price, image, brand, origin, description, categoryName
    }
    setProduct(item);
  };

  const handleDelete = (id) => {
   
    axios.delete(`http://localhost:8080/api/products/delete/${id}`)
      .then(response => {
        return axios.get(`http://localhost:8080/api/products?page=${currentPage}&size=5`)

      })
      .then(response => {
        setProducts(response.data.content);
        setTotalPages(response.data.totalPages);
       

      })
      .catch(error => {
        console.error('There was an error!', error);
      });
      setOpenModal(false);
      

  };



  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  let startPage, endPage;
  if (currentPage <= 1) {
    startPage = 0;
    endPage = 2;
  } else if (currentPage + 1 >= totalPages) {
    startPage = totalPages - 3;
    endPage = totalPages - 1;
  } else {
    startPage = currentPage - 1;
    endPage = currentPage + 1;
  }
  const pageNumbers = [...Array((endPage + 1) - startPage).keys()].map(i => startPage + i);
  return (
    <><div className="Table">
      <h1 className="tile-admin">Product</h1>
      <TableContainer
        component={Paper}
        style={{ boxShadow: "0px 13px 20px 0px #80808029" }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>

              <TableCell align="left">Name</TableCell>
              <TableCell align="left">Price</TableCell>
              <TableCell align="left">Image</TableCell>
              <TableCell align="left">Category</TableCell>
              <TableCell align="left">Brand</TableCell>
              <TableCell align="left">Origin</TableCell>
              <TableCell align="left">Description</TableCell>
            </TableRow>
          </TableHead>
          <TableBody style={{ color: "white" }}>
            {posts.map((item, postIndex) => (
              <TableRow
                key={item.id}
              >

                <TableCell align="left">{item.name}</TableCell>
                <TableCell align="left">{item.price}</TableCell>
                <TableCell align="left">
                  <div className="Product-img-admin">
                    <div className="wrapper-img-admin-add">
                      <img className="Img-Admin-add" src={Logoweb}>
                      </img>
                    </div>
                    <div className="wrapper-item-img">{item.image}</div>
                  </div>
                </TableCell>
                <TableCell align="left">{item.categoryName}</TableCell>
                <TableCell align="left">{item.brand}</TableCell>
                <TableCell align="left">{item.origin}</TableCell>
                <TableCell align="left">{item.description}</TableCell>
                <div className="delete-button">
                  <Button

                    variant="outlined"
                    color="error"
                    onClick={() => setOpenModal(true)}
                  >
                    <i class="fas fa-trash-alt"></i>
                  </Button>

                  <Button

                    variant="outlined"
                    color="error"
                    onClick={() => handleUpdateProduct(item.id, item.name, item.price, item.image, item.brand, item.origin, item.description, item.categoryName)}
                  >
                    <i class="fas fa-edit"></i>
                  </Button>

                </div>
                <Modal
                  openModal={openModal}
                  content="Do you want to remove product?"
                  onCancel={() => setOpenModal(false)}
                  onYes={() => handleDelete(item.id)}
                  style={{ left: "0px", backgroundColor: "transparent", color: "black" }}
                ></Modal>
              </TableRow>
            ))}
          </TableBody>
        </Table>

      </TableContainer>

      <div className="Wrapper-Pagniation">
        <nav aria-label="Page navigation example">
          <ul className="pagination">
            <li className="page-item">
              <a className="page-link" href="#" aria-label="Previous" onClick={() => handlePageChange(currentPage > 0 ? currentPage - 1 : 0)}>
                <span aria-hidden="true">&laquo;</span>
              </a>
            </li>
            {pageNumbers.map(number => (
              <li className={`page-item ${currentPage === number ? 'active' : ''}`} key={number}>
                <a className="page-link" href="#" onClick={() => handlePageChange(number)}>{number + 1}</a>
              </li>
            ))}
            <li className="page-item">
              <a className="page-link" href="#" aria-label="Next" onClick={() => handlePageChange(currentPage + 1 < totalPages ? currentPage + 1 : totalPages - 1)}>
                <span aria-hidden="true">&raquo;</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>

      <div className="wrapper-Addmin-Add-Product">
        <button className="Addmin-Add-Product" onClick={handleAddProduct}>
          {isAddingProduct ? "Close" : "Add Product"}
        </button>
      </div>
      {isAddingProduct ? <AddProduct product={null} type={"Add"} /> : null}
      {isUpdateProduct ? <AddProduct product={product} type={"Update"} /> : null}


    </div>
      {/* {posts.map((item, postIndex) => ( 
   ))} */}
    </>

  );
}