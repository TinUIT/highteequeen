import { useState, useContext , useEffect} from "react";
import { CartContext } from "../../contexts/CartContext";
import Modal from "../Modal/Modal";
import deleteIcon from "../../assets/delete-btn.png";
import "./CardComplete.css";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import {app} from "../../firebase/firebase";
import axios from "axios";

const CardComplete = ({ productId, nameProduct, price, imageUrl, quantity, onRemove, isChooseNumber, number=0, isClose, isCancel,isFirebase,Image,IDproduct }) => {
  const [countProduct, setCountProduct] = useState(quantity);
  const [openModal, setOpenModal] = useState(false);
  const [openModalCancel, setopenModalCancel] = useState(false);
  const [imageUrlFirebase, setImageUrlFirebase] = useState(Image);
  console.log("CardComplete",Image)
  

  const { addToCart } = useContext(CartContext);

  const handleUpdateCart = (amount) => {
    setCountProduct(countProduct + amount);
    const product = { nameProduct, price, imageUrl, quantity: amount };
    addToCart(product);
  };
  

  const handleConfirmRemove = () => {
    setOpenModal(false);
    onRemove();
  };
  useEffect(() => {
    const storage = getStorage(app);
    let storageRef = ref(storage, "white.jpg");

    if (isFirebase && Image != null) {
      storageRef = ref(storage, Image);
    }

    getDownloadURL(storageRef).then((url) => {
      setImageUrlFirebase(url);
    });
  }, [isFirebase, Image]);

  return (
    <div className="container-cardcomplete">
      <div className="cardcomplete-left">
        <img className="productcard-image" src={isFirebase===true ? imageUrlFirebase : imageUrl } alt="product" />
        <div className="productcomplete-desc">
          <h6 className="productcomplete-content">{nameProduct}</h6>
          <p className="productcomplete-content productcomplete-price">${price}</p>
        </div>
      </div>
      {isChooseNumber===true?
      (<div className="cardcomplete-right">
        <button className="btn-count decrease" disabled={countProduct <= 1} onClick={() => handleUpdateCart(-1)}>-</button>
        <input className="number-count" type="text" value={countProduct} readOnly />
       <button className="btn-count increase" onClick={() => handleUpdateCart(1)}>+</button>
      </div>):
    ( <div className="cardcomplete-right">
        <p className="Number-Cardcomplete">x{number}</p>
      </div>)}
      {isClose===true ? <button className="btn-delete" onClick={() => setOpenModal(true)}>
        <img className="icon-delete" src={deleteIcon} alt="delete icon" />
      </button>:<></>}
      {
        isCancel===true ? <button className="btn-delete-onpress" onClick={() => setopenModalCancel(true)}>
        <p className="Cancel-Onpress">Cancel</p>
      </button>:<></>
      }
      <Modal
        openModal={openModal}
        content="Do you want to remove the product from the cart?"
        onCancel={() => setOpenModal(false)}
        onYes={handleConfirmRemove}
        style={{left:"0px"}}

      />
        <Modal
        openModal={openModalCancel}
        content="Do you want to cancel order?"
        onCancel={() => setopenModalCancel(false)}
        
        style={{left:"0px"}}

      />
    </div>
  );
};

export default CardComplete;
