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
// import { getStorage, ref, getDownloadURL } from "firebase/storage";
// import { app } from "../../../firebase/firebase";
import Modal from '../../../components/Modal/Modal';
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
export default function ProductWarehouse() {

  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState({})
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [imageUrl, setImageUrl] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [productModals, setProductModals] = useState({});
  // const [bearerToken, setBearerToken] = useState(null);
  const [userInfo, setUserInfoo] = useState(JSON.parse(localStorage.getItem('user-info')));

  const getCategoryName = (category_id) => {
    switch (category_id) {
      case 1:
        return "Cleanser";
      case 2:
        return "Eyeshadow";
      case 3:
        return "Toner";
      case 4:
        return "Lipstick";
      case 5:
        return "Powder";
      case 6:
        return "Eyeliner";
      case 7:
        return "Primer";
      case 8:
        return "Blush";
      default:
        return "";
    }
  };

  // const getBrandName = (brand_id) => {
  //   switch (brand_id) {
  //     case 1:
  //       return "3CE";
  //     case 2:
  //       return "Black Rouge";
  //       case 3:
  //         return "3CE";
  //       case 4:
  //         return "Black Rouge";
  //         case 5:
  //       return "3CE";
  //     case 6:
  //       return "Black Rouge";
  //       case 7:
  //         return "3CE";
  //       case 8:
  //         return "Black Rouge";
  //     default:
  //       return "";
  //   }
  // };
  
  // useEffect(() => {
  //   const storage = getStorage(app);
  //   var storageRef = ref(storage, "white.jpg");

  //   getDownloadURL(storageRef).then((url) => {
  //     setImageUrl(url);
  //   });
  // }, [products]);

  const userInfoString = localStorage.getItem('user-info');
  // console.log(userInfoString);


  useEffect(() => {
    axios.get(`http://localhost:8080/api/v1/products?page=${currentPage}&size=5`, {
      headers: {
        'Authorization': `Bearer ${userInfo.token}`,
      },
    })
      .then(response => {
        setProducts(response.data.products);
        console.log(response.data.products);
        setTotalPages(response.data.totalPages);
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  }, [currentPage]);
  const [isAddingProduct, setIsAddingProduct] = React.useState(false);
  const [isUpdateProduct, setIsUpdateProduct] = React.useState(false);
  const [openUpdateProduct, setOpenUpdateProduct] = useState(false);
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
      brandId: "",
      // origin: "",
      description: "",
      categoryName: "",
      inStock: "",
      salesCount: "",
    }
    setProduct(item);
  };

  const handleUpdateProduct = (id, name, price, image, brandId, description, category_id, inStock, salesCount) => {
    setIsUpdateProduct(!isUpdateProduct);
    var item = {
      id, name, price, image, brandId, description, category_id, inStock, salesCount
    }
    setProduct(item);
    setOpenUpdateProduct(true);
  };

  const handleEditButtonClick = (item) => {
    setProduct(item);
    setOpenUpdateProduct(true);
  };
  const handleDelete = (id) => {

    axios.delete(`http://localhost:8080/api/v1/products/${id}`, {
      headers: {
        'Authorization': `Bearer ${userInfo.token}`,
      },
    })
      .then(response => {
        return axios.get(`http://localhost:8080/api/v1/products?page=${currentPage}&size=5`, {
          headers: {
            'Authorization': `Bearer ${userInfo.token}`,
          },
        })
      })
      .then(response => {
        setProducts(response.data.products);
        setTotalPages(response.data.totalPages);
        setProductModals(prevState => ({ ...prevState, [id]: false }));


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
    <>
    
      
  <div className="Table">
    <h1 className="tile-admin">Product</h1>
    <div className="wrapper-Addmin-Add-Product">
      <button className="Addmin-Add-Product" onClick={handleAddProduct}>
        {isAddingProduct ? "Close" : "Add Product"}
      </button>
      
    </div>
    { isAddingProduct ? <AddProduct product={null} type={"Add"} /> : null }
    <TableContainer
      component={Paper}
      style={{ boxShadow: "0px 13px 20px 0px #80808029" }}
    >
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
          <TableCell align="left">Id</TableCell>
            <TableCell align="left">Name</TableCell>
            <TableCell align="left">Price</TableCell>
            <TableCell align="left">Image</TableCell>
            <TableCell align="left">Category</TableCell>
            <TableCell align="left">Brand</TableCell>
            <TableCell align="left">Description</TableCell>
            <TableCell align="left">Quantity</TableCell>
            <TableCell align="left">Sale</TableCell>
          </TableRow>
        </TableHead>
        <TableBody style={{ color: "white" }}>
          {posts.map((item, postIndex) => (
            <TableRow
              key={item.id}
            >
              <TableCell align="left">{item.id}</TableCell>
              <TableCell align="left">{item.name}</TableCell>
              <TableCell align="left">{item.price}</TableCell>
              <TableCell align="left">
                <div className="Product-img-admin">
                  <div className="wrapper-img-admin-add">
                    {item.product_images.map((image, index) => (
                      <img key={index} className="Img-Admin-add" src={"http://localhost:8080/api/v1/products/images/" + image.image_url} alt={`Product ${index}`} />
                    ))}
                  </div>

                  <div className="wrapper-item-img">{item.images}</div>
                </div>
              </TableCell>
              <TableCell align="left">{getCategoryName(item.category_id)}</TableCell>
              <TableCell align="left">{item.brand_id}</TableCell>
              <TableCell align="left">{item.description}</TableCell>
              <TableCell align="left">{item.inStock}</TableCell>
              <TableCell align="left">{item.salesCount}</TableCell>
              <div className="delete-button">
                <Button

                  variant="outlined"
                  color="error"
                  onClick={() => setProductModals(prevState => ({ ...prevState, [item.id]: true }))}
                >
                  <i class="fas fa-trash-alt"></i>
                </Button>

                <Button

                  variant="outlined"
                  color="error"
                  onClick={() => handleEditButtonClick(item)}
                >
                  <i class="fas fa-edit"></i>
                </Button>

              </div>
              <Modal
                openModal={productModals[item.id] || false}
                content="Do you want to remove product?"
                onCancel={() => setProductModals(prevState => ({ ...prevState, [item.id]: false }))}
                onYes={() => handleDelete(item.id)}
                style={{ left: "0px", backgroundColor: "transparent", color: "black" }}
              ></Modal>
              <Dialog open={openUpdateProduct}
                onClose={() => setOpenUpdateProduct(false)}
                classes={{ paper: 'customDialog' }}>
                <DialogTitle style={{ fontWeight: "Bold" }}>
                  Edit Product
                  <Button
                    onClick={() => setOpenUpdateProduct(false)}
                    style={{ position: "absolute", right: 8, top: 15, color: "red", fontSize: 25 }}
                  >
                    <i class="fas fa-times"></i>
                  </Button>
                  <hr />
                </DialogTitle>
                <DialogContent>
                  <AddProduct product={product} type={"Update"} />
                </DialogContent>
                {/* <DialogActions>
                    <Button onClick={() => setOpenUpdateProduct(false)}>Cancel</Button>
                  </DialogActions> */}
              </Dialog>

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





  </div>
    {/* {posts.map((item, postIndex) => ( 
   ))} */}
  </>

  );
}