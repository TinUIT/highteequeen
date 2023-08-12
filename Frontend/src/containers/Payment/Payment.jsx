import "./Payment.css";
import Header from "../../components/header/header";
import Product from "../../assets/product.png";
import CardComplete from "../../components/CardComplete/CardComplete";
import CheckOutSection from "../../components/CheckOutSection/CheckOutSection";

const dataExample = [
  {
    title: "Half n Half Water Glow Season 2",
    colorProduct: "Pink",
    price: "$150",
    product: Product,
    isChooseNumProduct: false,
  },
  {
    title: "Black Rouge Real Strawberry Milk Toner",
    colorProduct: "Pink",
    price: "$200",
    product: Product,
    isChooseNumProduct: false,
  },
  {
    title: "Triple Layer Eye Palette",
    colorProduct: "01 Blossom Forest",
    price: "$180",
    product: Product,
    isChooseNumProduct: false,
  },
];

const Payment = () => {
  return (
    <>
      <Header />
      <main>
        <div className="container-payment">
          <div className="wrap-paymenttop">
            <div className="payment-detail">
              <p className="payment-name">Tạ Phạm Kiều Diễm</p>
              <p className="payment-telephone">+84123456789</p>
              <p className="payment-address">
                273 An Dương Vương, P3, Q5, Tp. HCM
              </p>
            </div>
          </div>
          <div className="wrap-listcard">
            {dataExample.map((item) => (
              <CardComplete
                title={item.title}
                colorProduct={item.colorProduct}
                price={item.price}
                imgProduct={item.product}
                isChooseNumProduct={item.isChooseNumProduct}
              />
            ))}
          </div>
          <CheckOutSection
            className="cartpage-checkout"
            priceItems="$530"
            priceDelivery="$30"
            priceTotal="$500"
          />
        </div>
      </main>
    </>
  );
};

export default Payment;