import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../../contexts/CartContext";
import "./CheckOutSection.css";

const CheckOutSection = ({
  priceItems,
  priceDelivery,
  priceTotal,
  itemQuantity,
  ...props
}) => {
  const { cart, removeFromCart } = useContext(CartContext);
  return (
    <div className="container-checkoutSection" {...props}>
      <ul className="list-checkout">
        <li className="checkout-content">
          <p className="checkout-desc">
            Items<span>({cart.length})</span>
          </p>
          <p className="checkout-desc">{priceItems}</p>
        </li>
        <li className="checkout-content">
          <p className="checkout-desc">Delivery Services</p>
          <p className="checkout-desc">{priceDelivery}</p>
        </li>
        <li className="checkout-content">
          <p className="checkout-desc">Total payment</p>
          <p className="checkout-desc">{priceTotal}</p>
        </li>
        <li className="wrap-checkout-button">
          <Link to="/payment-method"><button className="checkout-button">CHECK OUT</button></Link>
        </li>
      </ul>
    </div>
  );
};

export default CheckOutSection;