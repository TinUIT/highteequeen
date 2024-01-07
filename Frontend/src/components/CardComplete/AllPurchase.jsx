// All_Purchase.jsx

import React, { useState, useEffect } from "react";
import NavbarOrders from "../components/NavbarOrders";
import SideMenu from "../components/SideMenu";
import { OrdersData } from "../components/OrdersData";
import { collection, getDocs, doc, query, where, updateDoc } from 'firebase/firestore/lite';
import { db } from "../firebase";
import { UserAuth } from "../context/AuthContext";
import CardOrder from "../components/CardOrder";
import "./AllPurchase.css";

function All_Purchase({ orderId,productId, date, month, year, status, nameProduct, price, imageUrl, quantity, onRemove, isChooseNumber, number=0, isClose, isCancel,isFirebase,Image }) {

  const defaultStyle = {
    backgroundColor: "",
    color: ""
  };

  const hoverStyle = {
    backgroundColor: "#8F3C02",
    color: "white"
  };

  const [style2, setStyle2] = useState(defaultStyle);


  return (
    <div className="MyOrders">
      <div className="leftSide">
        <SideMenu />
      </div>
      <div className="rightSide">
        <NavbarOrders />
        <div className="all_purchase">
              <div className="row">
                <div className="ruler_status">
                  <div id="id">
                    <div id="id_inf">Mã số đơn hàng: {orderId} </div>
                  </div>
                  <div id="tradeDate">
                    <div id="tradeDate_inf"> Ngày đặt hàng: {date} / {month} / {year}</div>
                  </div>
                  <div id="status">
                    <div id="status_inf"> Trạng thái: {status}</div>
                  </div>
                  <div>
                    <button id="btn_detail" style={style2} onClick={() => handleUpdatestatus(event, order.idorder, 'Xác nhận')}>
                      Xem chi tiết <i className="fa-solid fa-arrow-right"></i>
                    </button>
                  </div>
                </div>
                <div className="detail_purchase">
                  {orderCarts.map((cart) => (
                    <CardOrder
                      key={cart.productId}
                      image={cart.image}
                      name={cart.nameProduct}
                      price={cart.price}
                      size={cart.size}
                      num={cart.num}
                      idcake={cart.idcake}
                    />
                  ))}
                  <div className="col3">
                    <div className="AllPrice"> Tổng giá đơn hàng: {order.allPrice} (VND)</div>
                  </div>
                </div>
              </div>
        
        </div>
      </div>
    </div>
  );
}

export default All_Purchase;
