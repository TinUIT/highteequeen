import "./ProductDetail.css";
import Header from "../../components/header/header";
import product from "../../assets/product.png";
import product1 from "../../assets/product 1.png";
import { useLocation } from 'react-router-dom';
// import { getStorage, ref, getDownloadURL } from "firebase/storage";
// import { app } from "../../firebase/firebase";
import React, { useState, useEffect, useContext } from 'react';
import { CartContext } from '../../contexts/CartContext';
import { UserContext } from "../../contexts/UserContext";
import Productdetail from "../../components/productdetail/productdetail";
import axios from "axios";
import Register from "../../components/register/registerform";
import Login from "../../components/login/loginform";
import { Dialog } from "@material-ui/core";
// import { Modal } from "react-bootstrap";
import Modal from "../../components/Modal/Modal";
import Uncomment from "../../assets/Uncomment.gif"


const ProductDetail = () => {
  const location = useLocation()
  const { nameProduct } = location.state || {};
  const { price } = location.state || {};
  const { image } = location.state || {};
  const [imageUrl, setImageUrl] = useState(null);
  const [countProduct, setCountProduct] = useState(1);
  const [products, setProducts] = useState([]);
  const [apiEndpoint, setApiEndpoint] = useState("http://localhost:8080/api/v1/products");
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const userInfo = JSON.parse(localStorage.getItem('user-info'));
  const [customerId, setCustomerId] = useState(userInfo ? userInfo.customerId : "");
  const { productId } = location.state || {};
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [reviews, setReviews] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [openPopupRegister, setOpenPopupRegister] = useState(false);
  const { user, updateUserProfile } = useContext(UserContext);
  const [openPopupLogin, setOpenPopupLogin] = useState(false);

  const [isNameProductInList, setisNameProductInList] = useState(false)

  
  const [odersdetailProductName, setOdersdetailProductName] = useState([]);


  useEffect(() => {


    if (userInfo && userInfo.orders && userInfo.orders.length > 0) {
      const productNameList = userInfo.orders.map((order) => {
        if (order.orderDetails && order.orderDetails.length > 0) {
          return order.orderDetails[0].productName;
        }

        return "";
      });
      setOdersdetailProductName(productNameList);
      const NameProductInList = productNameList.includes(nameProduct);
      setisNameProductInList(NameProductInList)


    }

  }, [userInfo, nameProduct]);




  useEffect(() => {
    axios.get(`${apiEndpoint}?page=${currentPage}&size=8`)
      .then(response => {
        setProducts(response.data.content);
        setTotalPages(response.data.totalPages);
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  }, [currentPage, apiEndpoint]);

  useEffect(() => {
    axios.get(`http://localhost:8080/api/review/product/${productId}`)
      .then(response => {
        setReviews(response.data);

      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  }, []);

  const handleReviewSubmit = (event) => {
    if (!customerId) {
      console.log("No customerId");
      setOpenModal(true)
      return;
    }
    event.preventDefault();

    const reviewData = {
      customerId,
      productId,
      rating,
      comment
    };

    axios.post('http://localhost:8080/api/review/addReview', reviewData)
      .then(response => {
        console.log('Review added successfully:', response.data);

        setRating(0);
        setComment('');
        setReviews(prevReviews => [...prevReviews, response.data]);
        document.getElementById("comment-input").value = '';
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
    setComment('');
    setRating(0);




  };

  const handleRatingChange = (event) => {
    setRating(event.target.value);
  };
  const handleYes = () => {
    setOpenModal(false);
    setOpenPopupRegister(true);

  }

  // useEffect(() => {
  //   const storage = getStorage(app);
  //   var storageRef = ref(storage, "white.jpg");

  //   if (image != null) {
  //     storageRef = ref(storage, image);
  //   }
  //   console.log(image);
  //   getDownloadURL(storageRef).then((url) => {
  //     setImageUrl(url);
  //   });
  // }, [image]);

  const { addToCart } = useContext(CartContext);
  const handleAddToCart = () => {
    console.log("fullname",userInfo.userData.fullname);
    
    if (userInfo.userData.fullname) {
      console.log(productId, nameProduct, price, imageUrl);
      const product = { productId, nameProduct, price, imageUrl, quantity: countProduct };
      addToCart(product);
    }
    else { setOpenPopupLogin(true) }
  };
  const commetexample = [
    {
      name: "ABCD",
      Countstar: 5,
      content: "Black Rouge Real Strawberry Milk Toner is very good"
    },
    {
      name: "123456",
      Countstar: 4,
      content: "Black Rouge Real Strawberry Milk Toner is very good, beautifull"
    },
    {
      name: "123456",
      Countstar: 4,
      content: "Black Rouge Real Strawberry Milk Toner is very good, beautifull"
    },
  ];
  return (
    <>
      <Header />
      <section className="productdetail-name">
        <h3 className="product-name">{nameProduct}</h3>
      </section>
      <div className="Product-detail-page-wrapper">

        <div className="Product-detail-page-wrapper-left">
          <main className="container-productdetail">

            <section className="productdetail-product">
              <div className="product-left">
                <img
                  className="img-product"
                  src={image}
                  alt="image product"
                ></img>
                <ul className="producttail-listsuggest">
                  <li className="wrap-product-suggest-img" onClick={() => setImageUrl(product)}>
                    <img
                      className="product-suggest-img"
                      src={image}
                      alt="immage product suggest"

                    ></img>
                  </li>
                  <li className="wrap-product-suggest-img" onClick={() => setImageUrl(product1)}>
                    <img
                      className="product-suggest-img"
                      src={product1}
                      alt="immage product suggest"
                    ></img>
                  </li>
                  <li className="wrap-product-suggest-img" onClick={() => setImageUrl(product)}>
                    <img
                      className="product-suggest-img"
                      src={product}
                      alt="immage product suggest"
                    ></img>
                  </li>
                  <li className="wrap-product-suggest-img" onClick={() => setImageUrl(product1)}>
                    <img
                      className="product-suggest-img"
                      src={product1}
                      alt="immage product suggest"
                    ></img>
                  </li>
                </ul>
              </div>
              <div className="product-right">
                <h4 className="product-right-name">
                  {nameProduct}
                </h4>
                <ul className="list-star">
                  <li className="wrap-star">
                    <i class="StarProduct far fa-star"></i>
                  </li>
                  <li className="wrap-star">
                    <i class="StarProduct far fa-star"></i>
                  </li>
                  <li className="wrap-star">
                    <i class="StarProduct far fa-star"></i>
                  </li>
                  <li className="wrap-star">
                    <i class="StarProduct far fa-star"></i>
                  </li>
                  <li className="wrap-star">
                    <i class="StarProduct far fa-star"></i>
                  </li>
                </ul>
                <p className="productdetail-review desc">(0 Review)</p>
                <p className="productdetail-code desc">Code SPMU3BRHNHWGHG </p>
                <h6 className="productdetail-price">${price}</h6>
                <div className="productdetail-variant">
                  <p className="variant-title desc">Option</p>
                  <div className="list-product-colors">
                    <button className="color"></button>
                    <button className="color"></button>
                    <button className="color"></button>
                    <button className="color"></button>
                    <button className="color"></button>
                  </div>
                </div>
                <div className="productdetail-count">
                  <button
                    onClick={() => setCountProduct(countProduct - 1)}
                    className="btn-count decrease"
                    disabled={countProduct === 1}
                  >
                    -
                  </button>
                  <input
                    className="number-count"
                    type="text"
                    value={countProduct}
                  ></input>
                  <button
                    onClick={() => setCountProduct(countProduct + 1)}
                    className="btn-count increase"
                  >
                    +
                  </button>

                </div>
                <div className="productdetail-btn">
                  <button className="btn-cta btn-add" onClick={handleAddToCart} >Add to card</button>
                  <button className="btn-cta btn-buy">Buy</button>
                </div>
              </div>
            </section>
          </main>
          {nameProduct === "A12 Dashed Brown" ?
            (<div className="wrapper-Description">
              <div className="Description">
                The Lip A12 Dashed Brown is a stylish and versatile lip product that adds a touch of glamour to your makeup look. With its beautiful shade of brown, it offers a bold and confident appearance, perfect for both daytime and evening wear. <br />
                <div className="wrapper-image-description"><img className="Iamge-description" src={imageUrl}></img></div>

                This lip product features a unique dashed texture, adding depth and dimension to your lips. The formula is smooth and creamy, providing comfortable wear throughout the day. Its long-lasting formula ensures that your lips stay vibrant and pigmented for hours without fading or smudging.<br />

                The Dashed Brown shade is suitable for a wide range of skin tones, making it a versatile choice for anyone looking to enhance their lips with a touch of elegance. Whether you're going for a natural everyday look or a more dramatic evening look, this lip product is sure to make a statement.<br />

                The Lip A12 Dashed Brown comes in a sleek and compact packaging, making it easy to carry in your purse or makeup bag for on-the-go touch-ups. Its applicator allows for precise and effortless application, ensuring a flawless finish every time.<br />

                Enhance your lips with the Lip A12 Dashed Brown and experience a combination of style, comfort, and long-lasting color. Elevate your makeup look and embrace the beauty of this stunning lip product.</div>
            </div>) : <>
              (<div className="wrapper-Description">
                <div className="Description">
                  With its long-lasting formula, our Soft Matte Lipstick stays put throughout the day, eliminating the need for frequent touch-ups <br />
                  <div className="wrapper-image-description"><img className="Iamge-description" src={imageUrl}></img></div>

                  Whether you're heading to the office, a special event, or a night out on the town, you can rely on our lipstick to maintain its intense color and flawless matte finish.Not only does our Soft Matte Lipstick provide exceptional color payoff, but it also nourishes your lips. Enriched with moisturizing ingredients, it helps keep your lips hydrated and supple, preventing any dryness or chapping.

                  The sleek and elegant packaging of our Soft Matte Lipstick adds a touch of luxury to your beauty routine. Its compact design makes it convenient to carry in your purse or makeup bag,
                  allowing you to achieve a stunning lip look wherever you go.</div>
              </div>)



            </>}

          <div className="wrapper-comment">
            <div className="Count-start-Review">

              <div className="Star-Review">
                <div className="Wrapper-Review-star-num">
                  <p className="title-Star-review">Review</p>
                  <div className="Review-star-num-procduct">
                    <p className="Review-star-num">4.6</p>
                    <i className="StarCount fas fa-star"></i>
                  </div>
                </div>
                {isNameProductInList ? (<div className="wrapper-Rating-star-input">
                  <div className="wrapper-comment-from-user">
                    <p className="title-rating">Rating</p>
                    <form class="star-rating">
                      <input class="radio-input" type="radio" id="star5" name="star-input" value="5" onChange={handleRatingChange} />
                      <label class="radio-label" for="star5" title="5 stars">5 stars</label>

                      <input class="radio-input" type="radio" id="star4" name="star-input" value="4" onChange={handleRatingChange} />
                      <label class="radio-label" for="star4" title="4 stars">4 stars</label>

                      <input class="radio-input" type="radio" id="star3" name="star-input" value="3" onChange={handleRatingChange} />
                      <label class="radio-label" for="star3" title="3 stars">3 stars</label>

                      <input class="radio-input" type="radio" id="star2" name="star-input" value="2" onChange={handleRatingChange} />
                      <label class="radio-label" for="star2" title="2 stars">2 stars</label>

                      <input class="radio-input" type="radio" id="star1" name="star-input" value="1" onChange={handleRatingChange} />
                      <label class="radio-label" for="star1" title="1 star">1 star</label>
                    </form>
                  </div>
                  <div className="wrapper-comment-input">
                    <p className="comment-description" >Comment description</p>
                    <input id="comment-input" className="input-comment-user" type="text" placeholder="Enter comment description..." onChange={(e) => setComment(e.target.value)}></input>

                    <button className="button-comment-description" onClick={handleReviewSubmit}>Submit</button>
                  </div>
                </div>) : (<><div className="Uncomment-wrapper">
                  <p className="Wrapper-text-uncomment">You need to buy products to review</p>
                  <div className="wrapper-img-uncoment">
                    <img className="Uncomment-img" src={Uncomment}></img></div></div></>)}
              </div>

            </div>


          </div>
          {/* <div className="wrapper-show-comment-product">
            <div className="Show-comment-product">
              {reviews.length !== 0 ? (reviews.map((item) => <>
                <div className="Avatar-user-container">
                  <div className="Avatar-user-comment-show">
                    <img className="Avatar-user-comment" src={product}></img>
                  </div>
                  <div>
                    <div className="Name-user-comment">{item.customerFullName}</div>
                    <div className="Count-Start-comment">{item.rating}★</div>
                  </div>
                </div>
                <div className="Content-user-comment">{item.comment}
                </div>
                <hr></hr>
              </>
              )) : (<> <div>There are no reviews yet</div></>)
              } </div></div> */}
        </div>
        <div className="Product-detail-page-wrapper-right">
          {/* {products.map(product => (
            <div className="Product-detail-page">
              <Productdetail nameProduct={product.name} description={product.description} price={product.price} image={product.image} productId={product.id} sales={product.sales} />
            </div>
          ))} */}
        </div>
      </div>
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
        content="You can't comment if you don't have an account. Do you want to register now?"
        onCancel={() => setOpenModal(false)}
        onYes={handleYes}
      ></Modal>
    </>
  );
};

export default ProductDetail;