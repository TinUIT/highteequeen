import './productdetail.css'
import logoName from '../../assets/SonA12.png';
import { Link } from 'react-router-dom';
import { useState, useEffect ,useContext} from 'react';
import Login from "../../components/login/loginform";
import { Dialog } from "@material-ui/core";
import { UserContext } from "../../contexts/UserContext";
import { FavoriteContext } from '../../contexts/FavoriteContext';
import { useLocation } from 'react-router-dom';
import { CartContext } from '../../contexts/CartContext';
import axios from 'axios';

function Productdetail  (props) {
  const location = useLocation()
  const [imageUrl, setImageUrl] = useState(null);
  const { user, updateUserProfile } = useContext(UserContext);
  const [openPopupLogin, setOpenPopupLogin] = useState(false);
  const { nameProduct = "" } = props;
  const { price } =  props;
  const { productId } = props;
  // const {sales}=props;
  const {image}=props;

  const {discountPercent}=props;
  const [userInfo,setUserInfo] = useState(JSON.parse(localStorage.getItem('user-info')));

  const [countProduct, setCountProduct] = useState(1);
  const { addToFavoriteCart } = useContext( FavoriteContext);
  const [salePro,setSalePro]=useState(0);
 
  
  const handleFavorite = () => {
    if (user.id) {
      const product = { productId, nameProduct, price, imageUrl, quantity: countProduct };
      console.log("props",props);
  
      axios.put(`http://localhost:8080/api/v1/products/favorites/add?userId=${user.id}&productId=${productId}`, product, {
        headers: {
          'Authorization': `Bearer ${userInfo.token}`,
          'Content-Type': 'application/json', // Set the content type
        },
      })
        .then(response => {
          if (response.data) {
            console.log('Product added to favorites:', response.data);
            addToFavoriteCart(product);
          } else {
            console.error('Empty or invalid response data:', response.data);
          }
        })
        .catch(error => {
          if (error.response) {
            console.error('Server responded with an error status:', error.response.status);
            console.error('Error response data:', error.response.data);
          } else if (error.request) {
            console.error('No response received from the server');
          } else {
            console.error('Error setting up the request:', error.message);
          }
        });
    } else {
      setOpenPopupLogin(true);
    }
  };  
  
  const { addToCart } = useContext(CartContext);
  const handleAddToCart = () => {
    if (user.id)
    {
    const product = { productId, nameProduct, price, imageUrl, quantity: countProduct };
    console.log(product)
    addToCart(product);} 
    else {setOpenPopupLogin(true)}
  };

  return(
    
    <div className="wrappperProductdetail" >
      <Link state={{ nameProduct: props.nameProduct, price : props.price, image: props.image, description:props.description, productId: props.productId }} to="/product-detail">
      <div className="Backgroud-Product-cpn" style={{ backgroundImage: `url(${image})` }}></div>
      </Link>
      <div className='Background-ProducdetailtName'  state={{ nameProduct: props.nameProduct, price : props.price, image: props.image, description:props.description, productId: props.productId }}>  
      <div className='ProducdetailtName'>
      <div className='Name-product'>{props.nameProduct}</div>
      {/* <div className='Price-product'>${props.price}</div> */}
     {discountPercent===0 ? 
      (<div className='Price-product'>${props.price}</div>):
      (
        <div className='wrapper-Product-seller'>

          <div className='Priceof Price-old'>${props.price}</div>
          <div className='Priceof Price-seller'>${props.price - (discountPercent/100)*props.price}</div>
        </div>)}
     
      <div className='wrapper-button'>
        <div className="wrapper-star">
            <i class="StarIcon far fa-star"></i>
            <i class="StarIcon far fa-star"></i>
            <i class="StarIcon far fa-star"></i>
            <i class="StarIcon far fa-star"></i>
            <i class="StarIcon far fa-star"></i>
        </div>
        <div className="wrapper-love">
        
            <button className="button love" onClick={handleFavorite}><i class="Buttondetail far fa-heart"></i></button>
            <button className="button cart" onClick={handleAddToCart}><i class="Buttondetail fas fa-shopping-cart"></i></button>

        </div>
        </div></div>
      </div>
      <Dialog open={openPopupLogin} onClose={() => setOpenPopupLogin(false)}>
        <Login onClose={() => setOpenPopupLogin(false)} />
      </Dialog>
    </div>
  );
}
  export default Productdetail;