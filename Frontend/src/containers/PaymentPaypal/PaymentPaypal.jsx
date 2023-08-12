import "./PaymentPaypal.css";
import Header from "../../components/header/header";
import PaypalImage from "../../assets/paypal.png";
import DirectPaymentImg from "../../assets/directpayment.png";
import tickImage from "../../assets/tick.png";
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../contexts/CartContext";
import { UserContext } from "../../contexts/UserContext";
import axios from "axios";

const PaymentPayPal = () => {
  const [openTick, setOpenTick] = useState("direct");
  const { cart } = useContext(CartContext);
  const { user } = useContext(UserContext);
  console.log(cart);
  const handlePay = () => {
    const orderDetails = cart.map(item => ({
      productId: item.productId,
      quantity: item.quantity,
      subtotal: item.quantity * item.price
    }));
    const order = {
      customerId: user.customerId,
      orderDetails: orderDetails,
      paymentMethod: openTick,
      status: "on-process",
      shippingAddress: user.address,
      recipientPhone: user.phone,
    }
    console.log(JSON.stringify(order));
    axios.post("http://localhost:8080/api/orders", order)
    .then(response => {
      console.log(response.data)
    })
    .catch(error => {
        console.error('There was an error!', error);
    });
  }
  return (
    <>
      <Header />
      <main className="container-paymentpaypal">
        <div
          onClick={() => setOpenTick("paypal")}
          className="wrap-payment-method"
        >
          <img className="method-image" src={PaypalImage} alt="paypal"></img>
          <div className="wrap-paymentticked">
            <button className="payment-method">PayPal</button>
            {openTick === "paypal" && (
              <img className="ticked-image" src={tickImage} alt="ticked" />
            )}
          </div>
        </div>
        <div
          onClick={() => setOpenTick("direct")}
          className="wrap-payment-method"
        >
          <img
            className="method-image"
            src={DirectPaymentImg}
            alt="paypal"
          ></img>
          <div className="wrap-paymentticked">
            <button className="payment-method">Direct Payment</button>
            {openTick === "direct" && (
              <img className="ticked-image" src={tickImage} alt="ticked" />
            )}
          </div>
        </div>
        <Link
          className="paymentpaypal-btn"
          to={openTick === "direct" ? "/" : "/paypal"}
          onClick={handlePay}
        >
          CONTINUE
        </Link>
      </main>
    </>
  );
};

export default PaymentPayPal;