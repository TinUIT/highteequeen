import './productdetail.css'
import logoName from '../../assets/SonA12.png';
import { Link } from 'react-router-dom';
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import {app} from "../../firebase/firebase"
import { useState, useEffect ,useContext} from 'react';
import Login from "../../components/login/loginform";
import { Dialog } from "@material-ui/core";
import { UserContext } from "../../contexts/UserContext";
import { FavoriteContext } from '../../contexts/FavoriteContext';
import { useLocation } from 'react-router-dom';
import { CartContext } from '../../contexts/CartContext';



function Productdetail  (props) {
  const location = useLocation()
  const [imageUrl, setImageUrl] = useState(null);
  const { user, updateUserProfile } = useContext(UserContext);
  const [openPopupLogin, setOpenPopupLogin] = useState(false);
  const { nameProduct = "" } = props;
  const { price } =  props;
  const { productId } = props;
  const {sales}=props;

  const [countProduct, setCountProduct] = useState(1);
  const { addToFavoriteCart } = useContext( FavoriteContext);
  const [salePro,setSalePro]=useState(0);
 
  
  const handleFavorite = () => {
    if (user.fullName)
    {
    const product = { productId, nameProduct, price, imageUrl, quantity: countProduct};
    console.log(product)
    addToFavoriteCart(product);} 
    else {setOpenPopupLogin(true)}
  };
  const { addToCart } = useContext(CartContext);
  const handleAddToCart = () => {
    if (user.fullName)
    {
    const product = { productId, nameProduct, price, imageUrl, quantity: countProduct };
    console.log(product)
    addToCart(product);} 
    else {setOpenPopupLogin(true)}
  };
  

  useEffect(() => {
    const storage = getStorage(app);
    var storageRef = ref(storage, "white.jpg"); 
    const calculatedSeller = price - (price *( sales/100));
    var roundedSeller = Math.round(calculatedSeller);
    console.log("giá trị",sales);
    setSalePro(roundedSeller);
    
    if(props.image != null) {
      storageRef = ref(storage, props.image);
    }
    console.log(props.productId);
    getDownloadURL(storageRef).then((url) => {
      setImageUrl(url);      

    });
  }, [props.image]);
  return(
    
    <div className="wrappperProductdetail" >
       <Link state={{ nameProduct: props.nameProduct, price : props.price, image: props.image, description:props.description, productId: props.productId }} to="/product-detail">
    
      <div className="Backgroud-Product-cpn" style={{ backgroundImage: `url(${imageUrl})` }}>

      </div>
      </Link>
      <div className='Background-ProducdetailtName'  state={{ nameProduct: props.nameProduct, price : props.price, image: props.image, description:props.description, productId: props.productId }}>  
      <div className='ProducdetailtName'>
      <div className='Name-product'>{props.nameProduct}</div>
      {sales===0 ? 
      (<div className='Price-product'>${props.price}</div>):
      (
        <div className='wrapper-Product-seller'>

          <div className='Priceof Price-old'>${props.price}</div>
          <div className='Priceof Price-seller'>${salePro}</div>

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