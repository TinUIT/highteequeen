import "./FavoriteCart.css";
import deleteIcon from "../../assets/delete-btn.png"
import { useState } from "react";
import Modal from "../Modal/Modal";
import { Link } from 'react-router-dom';

const FavoriteCard = ({
  title,
  productId,
  price,
  imageUrl, 
  onRemove,
  quantity
}) => {
  const [countProduct, setCountProduct] = useState(quantity);
  const [openModal,setOpenModal]= useState(false);
  const handleRemove = () => {
    setOpenModal(false); // Close the modal
    onRemove(); // Call the callback function to remove the component from the cart
  };

  return (
    <>
      <div className="container-cardcomplete-fa">
      <Link state={{ nameProduct: title,productId: productId, price, image: `http://localhost:8080/api/v1/products/images/${imageUrl}` }} to="/product-detail">
      <div className="cardcomplete-left-fa">
      <img className="productcard-image-fa" src={`http://localhost:8080/api/v1/products/images/${imageUrl}`} alt="product" />
        <div className="productcomplete-desc-fa">
          <h6 className="productcomplete-content-fa">{title}</h6>
          <p className="productcomplete-content productcomplete-price-fa">
            ${price}
          </p>
        
        </div>
        </div>

    </Link>

        <button className="btn-delete-fa" onClick={() => setOpenModal(true)} >
          <img
            className="icon-delete-fa"
            src={deleteIcon}
            alt="delete icon"
          ></img>
        </button>
       
      
      
       
    
      
    </div>
    <Modal
        openModal={openModal}
        content="Do you want to remove the product from the favorite product?"
        onCancel={() => setOpenModal(false)}
        onYes={handleRemove}
        style={{left:"0px"}}

       
        

      ></Modal>
      </>
  );
};

export default FavoriteCard;