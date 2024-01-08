
import "./Payment_order.css";
import axios from "axios";

import React, { useState, useEffect } from "react";

// import CardOrder from "../components/CardOrder";
// import OrderDetail from "../components/OrderDetail";
import { useLocation } from "react-router-dom";
// import { UserAuth } from "../context/AuthContext";

// import Noti_Order from "../components/Noti_Order";
// import { VoucherData } from "../components/VoucherData";
// import CardAddressUsed from "../components/CardAddressUsed";
import CardComplete from "../../components/CardComplete/CardComplete";

const PaymentOrder = () => {
  const [inputValue, setInputValue] = useState('');
  const [selectedVoucher, setSelectedVoucher] = useState(null);
  
  const location = useLocation();

  const [userInfo, setUserInfo] = useState(JSON.parse(localStorage.getItem('user-info')));


  const [product, setProduct] = useState(null);

  const { productData } = location.state || {};
  console.log('Product Data:', productData);
  const ShippingMethod = () => {
    const [selectedOption, setSelectedOption] = useState("");// Lấy những sản phẩm đã chọn bên giỏ hàng.
    const handleOptionSelect = (event) => {
      setSelectedOption(event.target.value);
    };

    // const calculateTotalPrice = () => {
    //   if (selectedCarts.length === 0) {
    //     return 0;
    //   }

    //   const totalPrice = selectedCarts.reduce((total, cart) => {
    //     if (cart.isChecked) {
    //       const cakePrice = cakes.find((cake) => cake.idcake === cart.idcake)?.price || 0;
    //       return total + (cakePrice * cart.num);
    //     }
    //     return total;
    //   }, 0);

    //   return totalPrice;
    // };
    const getValue = () => {
      var address = document.getElementById('address').value;

      // Log the value to the console (you can do whatever you want with the value)
      console.log('address:', address);
    }

    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleModal = () => {
      setIsModalOpen(true);
    };
    const handleAddOrder = async () => {
      try {
        const address = document.getElementById('address').value;
        const note = document.getElementById('Note').value;
  
        const orderData = {
          email: userInfo.username,
          address: address,
          note: note,
          status: "pending",
          user_id: userInfo.userData.id,
          fullname: userInfo.userData.fullname,
          phone_number: userInfo.userData.phone_number,
          total_money: productData.product_num * product.price,
          shipping_method: selectedOption, // Add the selected shipping method
          shipping_address: address,
          shipping_date: "2024-01-08", // Update with the actual shipping date
          payment_method: "Cash on Delivery", // Update with the actual payment method
          cart_items: [
            {
              product_id: productData.product_id,
              quantity: productData.product_num, // Update with the actual quantity
            },
          ],
        };
  
        const response = await axios.post('http://localhost:8080/api/v1/orders', orderData, {
          headers: {
            accept: '*',
            Authorization: `Bearer ${userInfo.token}`,
            'Content-Type': 'application/json',
          },
        });
  
        // Handle the response, e.g., show a success message
        console.log('Order placed successfully:', response.data);
  
      } catch (error) {
        // Handle errors, e.g., show an error message
        console.error('Error placing order:', error);
      }
    };

    const fetchData = async (url) => {
      try {
        const response = await axios.get(url, {
          headers: {
            accept: '*',
            Authorization: `Bearer ${userInfo.token}`,
          },
        });
        setProduct(response.data);

      } catch (error) {
        console.error('There was an error!', error);
      }
  
    };
    useEffect(() => {
      // Check if productData.product_id is available before fetching data
      if (productData.product_id) {
        const apiUrl = `http://localhost:8080/api/v1/products/${productData.product_id}`;
        fetchData(apiUrl);
        console.log('Product Data:', productData);
      }
    }, [productData.product_id]);
  
    const calculateOrderTotal = () => {
      // if (product && !isNaN(product.price) && !isNaN(product.product_num)) {
      //   const totalPrice = parseInt(product.price, 10) * parseInt(product.product_num, 10);
      //   return totalPrice;
      // }
      // return 0;


      return productData.product_num * product.price;
    };
    


    return (
      <>
        <div className="payment_body">
          <div className="payment_body_left">
            <div className="address_info">
              <div style={{ padding: '20px' }}>
                <h3 className="width_common left">Information of order</h3>
                <p>Full name: {userInfo.userData.fullname} </p>
                <p>Phone number: {userInfo.userData.phone_number}</p>
                <p>email: {userInfo.username}</p>
           
                <form id="myForm">

                  <label for="address">address:</label>
                  <input type="text" id="address" name="address" />
                  <br/>
                  <label for="Note">Note:</label>
                  <input type="text" id="Note" name="Note" />
                 
                </form>
              
                </div>
             
            </div>
            <div className="shipping_method">
              <div style={{ padding: '20px' }}>
                <h3 className="width_common left">Delivery</h3>
                <label className="width_common choose">
                  <input
                    type="radio"
                    name="shipping"
                    value="fast"
                    checked={selectedOption === "fast"}
                    onChange={handleOptionSelect}
                  />
                  GHTK
                </label>
                <label className="width_common choose">
                  <input
                    type="radio"
                    name="shipping"
                    value="economical"
                    checked={selectedOption === "economical"}
                    onChange={handleOptionSelect}
                  />
                  VietTellPost
                </label>
              </div>
            </div>
            <div className="checkout_method">
              <div style={{ padding: '20px' }}>
                <h3 className="width_common left">Payment method</h3>
                <p>Cast on delivery</p>
              </div>
            </div>
          </div>
          <div className="payment_body_right">
            <div className="block_check_donhang">
              <div style={{ padding: '20px' }}>
                <h3>Order</h3>
                {/* {selectedCarts.map((cart) => (
                  <CardOrder
                    key={cart.idcart}
                    image={cart.image}
                    name={cart.name}
                    price={cart.price}
                    size={cart.size}
                    num={cart.num}
                    idcake={cart.idcake}
                  />
                ))} */}
             
             <CardComplete
              nameProduct={product?.name || ''}
              colorProduct={"a"}
              price={product?.price || 0}
              Image={product?.thumbnail || ''}
              isChooseNumProduct={product?.product_num|| 1}
              number={product?.product_num|| 1}
              isCancel={false}
              isClose={false}
              key={"2"}
              isFirebase={false}
            />
                      
               
                <div className="donhang_tamtinh">
                  <div className="tamtinh_price">
                  <h3>Tạm tính: {calculateOrderTotal()} VNĐ</h3>
                  </div>
                  <div className="relative">
                    <input
                      className="form-control"
                      type="text"
                      name="tmpVoucherCode"
                      placeholder="Nhập mã Voucher"
                      data-gtm-form-interact-field-id="0"
                      // value={"Giảm " + calculateTotalPrice() * (inputValue / 100) + " VNĐ"}
                    />
                    <button
                      className="btn_chuasudung"
                      type="button"
                      onClick={handleModal}
                    >
                      Chọn voucher
                    </button>
                  </div>
                  <div>
                    <div className="block_total_order width_common ">
                      <div className="thanhtien width_common space_bottom_10">
                        <div className="tamtinh_left left"><h3>Thành tiền:</h3></div>
                        <div className="tamtinh_right right txt_color_2">
                          {/* <h3>{calculateTotalPrice() - (calculateTotalPrice() * (inputValue / 100))} VNĐ</h3> */}
                        </div>
                      </div>
                      <div className="btn_dathang width_common space_bottom_10">
                        <button
                          type="submit"
                          className="btn_site_2"
                          onClick={handleAddOrder}
                        >
                          Đặt Hàng
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {isModalOpen && (
          <div className="modalvoucher">
            <div className="all_voucher">
             
              
            </div>
          </div>
        )}
      </>
    );
  };

  return <ShippingMethod />;
};

export default PaymentOrder;
