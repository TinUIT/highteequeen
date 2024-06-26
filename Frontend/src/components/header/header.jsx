import "./header.css";
import logoImage from "../../assets/Logoweb.png";
import logoName from "../../assets/name.png";
import React, { useState, useEffect, useRef, useContext } from "react";
import Login from "../login/loginform";
import Register from "../register/registerform";
import { Dialog } from "@material-ui/core";
import Navbar from 'react-bootstrap/Navbar'
import { Nav } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
// import { atom, useAtom } from 'jotai';
import Avartar from "../../assets/avatar.png";
import { HLDropdown, HLMenu, HLCard } from "synos-helena";
import { Avatar } from "antd";
import "synos-helena/lib/helena.css";
import { CartContext } from '../../contexts/CartContext';
import axios from 'axios';
import Modal from "../../components/Modal/Modal"
import { UserContext } from "../../contexts/UserContext";
// import { getStorage, ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
// import { app, storage } from "../../firebase/firebase";
import { FavoriteContext } from "../../contexts/FavoriteContext";
import { NavDropdown } from "react-bootstrap";
import {API_BASE_URL} from "../../api/config"

function Header(props) {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [openPopupLogin, setOpenPopupLogin] = useState(false);
  const [openPopupRegister, setOpenPopupRegister] = useState(false);
  const [navBackground, setNavBackground] = useState(false);
  const [selectedTab, setSelectedTab] = useState(1);
  const navRef = useRef();
  const [openModal, setOpenModal] = useState(false);
  const { cart } = useContext(CartContext);
  const totalQuantity = cart ? cart.reduce((total, item) => total + item.quantity, 0) : 0;
  const { FavoriteCart } = useContext(FavoriteContext);
  const totalfavoriteQuantity = FavoriteCart ? FavoriteCart.length : 0;
  // const totalfavoriteQuantity = FavoriteCart ? FavoriteCart.reduce((total, item) => total + item.quantity, 0) : 0;
  const { user, updateUserProfile } = useContext(UserContext);
  const customerId = user && user.customerId;
  const [userInfo, setUserInfo] = useState(JSON.parse(localStorage.getItem('user-info')));
  const [url, setUrl] = useState('');
  const { TileProduct, setTitleProduct } = props;
  const [product, setProduct] = useState(0);
  const [expandedProduct, setExpandedProduct] = useState(null);
  const [NameUser, setNameUser] = useState("");

  // const { selectedCategory, setSelectedCategory } = props;
  const handleCategoryClick = (categoryName) => {
    // setSelectedCategory(categoryName);
    // Gọi hàm để lọc sản phẩm ở trang ProductPage
    props.handleFilterCategoryName(categoryName);
  };

  const handleLogout = () => {
    localStorage.removeItem('user-info');
    setOpenModal(false);
    setUserInfo();
    window.location.href = "/";

  };
  const handleProfileClick = () => {
    window.location.href = "/profile";

  }


  const menu = (
    <HLMenu>
      <HLMenu.Item>
        <Link className="dropdown-content header-link-profile" to="/profile">
          <i class="icon-p far fa-user"></i>
          My Account
        </Link>
      </HLMenu.Item>
      <HLMenu.Item>
        <button className="dropdown-content header-logout" onClick={() => setOpenModal(true)}>
          <i class="icon-p fas fa-sign-out"></i>Logout
        </button>
      </HLMenu.Item>
    </HLMenu>
  );

  const [isHovered, setIsHovered] = useState(false);
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  // const [name]=useAtom(textAtom);

  navRef.current = navBackground
  useEffect(() => {
    const handleScroll = () => {
      const show = window.scrollY > 50;
      if (navRef.current !== show) {
        setNavBackground(show);
      }
    };
    document.addEventListener('scroll', handleScroll);
    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, []);


  useEffect(() => {
    
    // if (user.role == "ADMIN") {
    //   console.log("testbug")
    //   window.location.href = "/admin";


    if (searchTerm) {
      axios.get(`${API_BASE_URL}/products?keyword=${searchTerm}&category_id=0&brand_id=0&page=0&limit=10&priceSort=asc`, {
          
      })
        .then(response => {
          // Handle the response, set search results, or perform other actions
          console.log(response.data);
          setSearchResults(response.data.products); // Assuming response.data contains the search results
        })
        .catch(error => {
          // Handle the error
          console.error(error);
        });
    } else {
      setSearchResults([]);
    }
  }, [searchTerm, userInfo?.token]);
  

  const handleSelectProduct = (selectedIndexed, e) => {
    setProduct(selectedIndexed);
    setExpandedProduct(selectedIndexed);
  };
  const handleExpandProduct = (selectedIndexed) => {
    if (expandedProduct === selectedIndexed) {
      setExpandedProduct(null); // Collapse the expanded product if clicked again
    } else {
      setExpandedProduct(selectedIndexed); // Expand the clicked product
    }
  };
  useEffect(() => {
    // Check if user is authenticated
    if (user && user.token) {
      // Make a request to the API to get user details
      axios.post(`${API_BASE_URL}/users/details`, {}, {
        headers: {
          'Authorization': `Bearer ${user.token}`,
          'accept': '*/*',
        }
      })
        .then(response => {
          // Extract the user's full name from the response

          // Save the user information in local storage
          localStorage.setItem('user-info', JSON.stringify({ ...user, userData: response.data }));
          setNameUser(response.data.fullname);


        })
        .catch(error => {
          // Handle errors, e.g., log them or show a message to the user
          console.error('Error fetching user details:', error);
        });
    }

  }, [user.token]);

  useEffect(() => {

    if (userInfo && userInfo.userData && userInfo.userData.avatar) {
      axios.get(`${API_BASE_URL}/users/avatars/${userInfo.userData.avatar}`, {
        headers: {
          'Authorization': `Bearer ${userInfo.token}`,
        },
        responseType: 'arraybuffer',
      })
        .then(response => {
          const imageBlob = new Blob([response.data], { type: response.headers['content-type'] });
          const imageUrl = URL.createObjectURL(imageBlob);
          setUrl(imageUrl);
        })
        .catch(error => {
          console.error('Có lỗi khi lấy ảnh!', error);
        });
    }
  }, []);



  return (
    <Navbar collapseOnSelect className="wrapHead" expand="sm" fixed="top" style={{ transition: '1s ease', backgroundColor: navBackground ? 'white' : 'rgba(255, 255, 255, 0.75)' }}>
      <div className="headerPart1">
        <img className="logoImage" src={logoImage} alt="Logo store" />
        <img className="logoName" src={logoName} alt="Logo name"></img>
        <div className="wrapButtons">
          <Link to="/favoritepd">
            <button className="IconButton heartButton">
              <i class="icon fas fa-heart"></i>
              <span className="num-fav">{totalfavoriteQuantity}</span>
            </button></Link>
          <Link to="/cart-page">
            <button className="IconButton cartButton">
              <i class="icon fas fa-shopping-cart"></i>
              <span className="num-fav num-cart" >{totalQuantity}</span>
            </button></Link>
          {user.message ?
            (<>

              <button
                className="RegisterButton"
                onClick={handleProfileClick}
              >
                {NameUser} {/* Lấy tên người dùng từ userData.fullname */}
              </button>

              <HLCard>
                <HLDropdown overlay={menu} trigger={["click"]}>
                  <Avatar
                    size={45}
                    src={url}
                  />
                </HLDropdown>
              </HLCard> </>) :
            (<>
              <button
                className="RegisterButton"
                onClick={() => setOpenPopupRegister(true)}
              >
                Register
              </button>
              <button
                className="LoginButton"
                onClick={() => setOpenPopupLogin(true)}
              >
                Login
              </button>

            </>)}




        </div>
      </div>

      <div className="Scroll-auto">
        <Navbar.Toggle aria-controls="navbarScroll" data-bs-target="#nabarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav>
            <div className="Control-tab" >
              <NavLink className={`Control-tab ${selectedTab === 1 ? 'active' : ''}`} eventKey="1" to="/" onClick={() => setSelectedTab(1)}>
                HOME
                <div className="div-tap-control">{selectedTab === 1 && <hr className="tap-control" />}</div>
              </NavLink>
            </div>
            <div className="Control-tab" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
              <NavLink className={`Control-tab ${selectedTab === 2 ? 'active' : ''}`} eventKey="2" to="/product" onClick={() => setSelectedTab(2)}>
                PRODUCTS
                <div className="div-tap-control">{selectedTab === 2 && <hr className="tap-control" />}</div>
              </NavLink>
              {isHovered && (
                <div className="product-menu">
                  <Link to="/product"
                    expanded={expandedProduct === 0}
                    onClick={() => {
                      handleExpandProduct(0);
                      setTitleProduct("Blush");
                      handleCategoryClick("Blush");
                    }}>
                    Blush
                  </Link>
                  <Link to="/product"
                    expanded={expandedProduct === 1}
                    onClick={() => {
                      handleExpandProduct(1);
                      setTitleProduct("Cleanser");
                      handleCategoryClick("Cleanser");
                    }}>
                    Cleanser</Link>
                  <Link to="/product"
                    expanded={expandedProduct === 2}
                    onClick={() => {
                      handleExpandProduct(2);
                      setTitleProduct("Eyeshadow");
                      handleCategoryClick("Eyeshadow");
                    }}>
                    Eyeshadow</Link>
                  <Link to="/product"
                    expanded={expandedProduct === 3}
                    onClick={() => {
                      handleExpandProduct(3);
                      setTitleProduct("Toner");
                      handleCategoryClick("Toner");
                    }}>
                    Toner</Link>
                  <Link to="/product"
                    expanded={expandedProduct === 4}
                    onClick={() => {
                      handleExpandProduct(4);
                      setTitleProduct("Lipstick");
                      handleCategoryClick("Lipstick");
                    }}>
                    Lipstick</Link>
                  <Link to="/product"
                    expanded={expandedProduct === 5}
                    onClick={() => {
                      handleExpandProduct(5);
                      setTitleProduct("Powder");
                      handleCategoryClick("Powder");
                    }}>
                    Powder</Link>
                  <Link to="/product"
                    expanded={expandedProduct === 6}
                    onClick={() => {
                      handleExpandProduct(6);
                      setTitleProduct("Eyeliner");
                      handleCategoryClick("Eyeliner");
                    }}>
                    Eyeliner</Link>
                  <Link to="/product"
                    expanded={expandedProduct === 7}
                    onClick={() => {
                      handleExpandProduct(7);
                      setTitleProduct("Primer");
                      handleCategoryClick("Primer");
                    }}>
                    Primer</Link>


                </div>
              )}
            </div>
            <div className={`Control-tab ${selectedTab === 3 ? 'active' : ''}`}>
              <NavLink className="Control-tab" eventKey="3" onClick={() => setSelectedTab(3)} to="/distribution-channel-page">BRAND
                <div className="div-tap-control">{selectedTab === 3 && <hr className="tap-control" />}</div>
              </NavLink>
            </div>
            <div className={`Control-tab ${selectedTab === 4 ? 'active' : ''}`}>
              <NavLink className="Control-tab" eventKey="4" to="/about-us" onClick={() => setSelectedTab(4)}>
                ABOUT
                <div className="div-tap-control">{selectedTab === 4 && <hr className="tap-control" />}</div>
              </NavLink>
            </div>
            <div className="control">
              <div className="input-search-container">
                <input
                  className="input-search"
                  type="text"
                  placeholder="Search.."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                />
                <ul className="autocomple-search-product">
                  {searchResults.map(product => (
                    <li key={product.id} className="result-search-product">
                      <Link state={{ nameProduct: product.name, price: product.price, image: product.image }} to="/product-detail">
                        {product.name}
                      </Link>
                    </li>
                  ))}
                </ul>

              </div>

              <button className="searchButton">
                <i className="fas fa-search"></i>
              </button>
            </div>
          </Nav>
        </Navbar.Collapse>
      </div>

      {/* <Navbar.Toggle aria-controls="navbarScroll" data-bs-target="#nabarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav>
            <div className="Control-tab">
              <NavLink className="Control-tab" eventKey="1" to="/">HOME
                <div id="HR-control">
                  <hr className="tap-control"></hr></div></NavLink>
            </div>
            <div className="Control-tab">
              <NavLink className="Control-tab" eventKey="2" to="/product">PRODUCTS</NavLink>
            </div >
            <NavLink className="Control-tab" eventKey="3" to="/distribution-channel-page">BRAND</NavLink>
            <div className="Control-tab">

              <NavLink className="Control-tab" eventKey="4" to="/about-us">ABOUT</NavLink>
            </div>
            <div className="control">
              <input className="input-search" type="text"  placeholder="Search.."></input>
              <button className="searchButton">
                <i class="fas fa-search"></i>
              </button>
            </div>
          </Nav>
        </Navbar.Collapse>
      </div> */}


      <Dialog open={openPopupLogin} onClose={() => setOpenPopupLogin(false)}>
        <Login onClose={() => setOpenPopupLogin(false)} />
      </Dialog>
      <Dialog
        open={openPopupRegister}
        onClose={() => setOpenPopupRegister(false)}
      >
        <Register onClose={() => setOpenPopupRegister(false)} />
      </Dialog>

      <Modal
        openModal={openModal}
        content="Do you want to log out ?"
        onCancel={() => setOpenModal(false)}
        onYes={handleLogout}
      ></Modal>








    </Navbar>



  );
}
export default Header;