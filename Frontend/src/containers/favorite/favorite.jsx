
import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import Header from '../../components/header/header';
import { Footer } from '../../components/footer/footer';
import FavoriteCard from '../../components/FavoriteCart/FavoriteCart';
import ProfileUser from '../../components/Profile-User/ProfileUser';
import Modal from '../../components/Modal/Modal';
import { FavoriteContext } from '../../contexts/FavoriteContext';
import EmtyPage from '../../assets/EmtyPage.gif';
import {API_BASE_URL} from "../../api/config"
import './favorite.css';

const Favorite = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [userInfo, setUserInfo] = useState(JSON.parse(localStorage.getItem('user-info')));
  const [openModal, setOpenModal] = useState(false);
  const { FavoriteCart } = useContext(FavoriteContext);
  const favoriteItems = FavoriteCart || [];
  const [favoriteProducts, setFavoriteProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(/* initial value */);

  const handleLogout = () => {
    localStorage.removeItem('user-info');
    setUserInfo('');
    setOpenModal(false);
    window.location.href = '/';
  };

const handleRemoveItem = (index, productId, title, price, imageUrl) => {
    if (userInfo?.id) {
      const product = {
        productId,
        title,
        price,
        imageUrl,
      };

      axios
        .delete(
          `${API_BASE_URL}/products/favorites/add?userId=${userInfo.id}&productId=${productId}`,
          {
            headers: {
              Authorization: `Bearer ${userInfo.token}`,
              'Content-Type': 'application/json',
            },
            data: product, // Ensure this is the correct payload
          }
        )
        .then((response) => {
          return axios.get(`${API_BASE_URL}/users/details/${userInfo.id}`, {
            headers: {
              Authorization: `Bearer ${userInfo.token}`,
            },
          });
        })
        .then((response) => {
          if (response.data && response.data.favoriteProducts) {
            setFavoriteProducts(response.data.favoriteProducts);
            console.log(response.data.favoriteProducts);
          } else {
            console.error('Empty or invalid response data:', response.data);
          }
        })
        .catch((error) => {
          console.error('There was an error!', error);
        });

      setOpenModal(false);
    }
  };

  useEffect(() => {
    if (!userInfo) {
      window.location.href = '/';
    }

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 765);
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [userInfo]);

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/users/details/${userInfo?.id}`, {
        headers: {
          Authorization: `Bearer ${userInfo?.token}`,
        },
      })
      .then((response) => {
        if (response.data && response.data.favoriteProducts) {
          setFavoriteProducts(response.data.favoriteProducts);
          console.log(response.data.favoriteProducts);
        } else {
          console.error('Empty or invalid response data:', response.data);
        }
      })
      .catch((error) => {
        console.error('Error fetching favorite products:', error);
        // Display a user-friendly error message
      });
  }, [currentPage, userInfo?.id, userInfo?.token]);

  console.log('Favorite Products:', favoriteProducts);

  return (
    <>
      <Header />
      <div className="Body-ProfilePage">
        <ProfileUser />
        <div className={`Info-person ${isMobile ? 'hide-text' : ''}`}>
          <div className="Category-account">
            <Link to="/profile">
              <div className="Tab My-Account-Tab">
                <i className="icon-p far fa-user"></i>
                <div className="repone">My Account</div>
              </div>
            </Link>
            <div className="Tab Favorite-Product-Tab">
              <i className="icon-p far fa-heart"></i>
              <div className="repone">Favorite Product</div>
            </div>
            <Link to="/oder-management">
              <div className="Tab Oder-management-Tab">
                <i className="icon-p fas fa-tasks"></i>
                <div className="repone">Order management</div>
              </div>
            </Link>
            <div className="Tab Log-out" onClick={() => setOpenModal(true)}>
              <i className="icon-p fas fa-sign-out"></i>
              <div className="repone">Log out</div>
            </div>
          </div>
          {favoriteProducts.length === 0 ? (
            <div className="Emty-CartPage-fa">
              <div className="wrapper-gif-empty-fa">
                <img className="gif-empty-fa" src={EmtyPage} alt="Empty Cart" />
              </div>
              <div className="Content-empty-car-page-fa">
                <p className="Cart-empty-fa">
                  Sorry, the cart is empty. Would you like to return to the homepage?
                </p>
                <Link to="/">
                  <button className="HomePage-comeback-fa">Homepage</button>
                </Link>
              </div>
            </div>
          ) : (
            <div className="Wrapper-Favorite-Product">
              {favoriteProducts.map((item, index) => (
                <FavoriteCard
                    productId={item.id}
                    title={item.name}
                    price={item.price}
                    imageUrl={item.product_images.length > 0 ? item.product_images[0].image_url : ''}
                    onRemove={() => handleRemoveItem(index, item.id, item.name, item.price, /* other properties */)}
                />
               ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
      <Modal
        openModal={openModal}
        content="Do you want to log out?"
        onCancel={() => setOpenModal(false)}
        onYes={handleLogout}
      />
    </>
  );
};

export default Favorite;
