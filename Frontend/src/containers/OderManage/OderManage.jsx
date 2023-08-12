import Header from "../../components/header/header";
import "./OderManage.css";

import { Footer } from "../../components/footer/footer";
import Avartar from "../../assets/avatar.png";

import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import CardComplete from "../../components/CardComplete/CardComplete";
import Product from "../../assets/product.png";
import ProfileUser from "../../components/Profile-User/ProfileUser";
import Modal from "../../components/Modal/Modal";


import {
    MDBIcon,
    MDBTabs,
    MDBTabsItem,
    MDBTabsLink,
    MDBTabsContent,
    MDBTabsPane
} from 'mdb-react-ui-kit';





function OderManage() {
    const [isMobile, setIsMobile] = useState(false);
    const [iconsActive, setIconsActive] = useState('tab1');
    const [userInfo, setUserInfo] = useState(JSON.parse(localStorage.getItem('user-info')));
    const [openModal, setOpenModal] = useState(false);
    const CheckoutProduct = useState(userInfo ? userInfo : "");
    const [OnProcess, setOnProcess] = useState([]);
    const [Success, setSuccess] = useState([]);
    const [Cancel, setCancel] = useState([]);

    useEffect(() => {


        if (userInfo && userInfo.orders && userInfo.orders.length > 0) {
            const OnProcessPro = userInfo.orders.map((order) => {
                if (order.status === "on-process") {
                    return order.orderDetails;
                }


                return "";
            });
            setOnProcess(OnProcessPro);




        }

    }, [userInfo]);

    useEffect(() => {
        if (userInfo && userInfo.orders && userInfo.orders.length > 0) {
            const successPro = userInfo.orders.map((order) => {
                if (order.status === "success") {
                    return order.orderDetails;
                }

                return "";
            });
            setSuccess(successPro);



        }

    }, [userInfo]);
    useEffect(() => {
        if (userInfo && userInfo.orders && userInfo.orders.length > 0) {
            const CancelsPro = userInfo.orders.map((order) => {
                if (order.status === "deny") {
                    return order.orderDetails;
                }

                return "";
            });
            setCancel(CancelsPro);



        }

    }, [userInfo]);




    const handleLogout = () => {
        localStorage.removeItem('user-info');
        setUserInfo("");
        setOpenModal(false);
        window.location.href = "/";
    };
    const dataExample = [
        {
            title: "Half n Half Water Glow Season 2",
            colorProduct: "Pink",
            price: "$150",
            product: Avartar,
            isChooseNumber: false,


        },
        {
            title: "Black Rouge Real Strawberry Milk Toner",
            colorProduct: "Pink",
            price: "$200",
            product: Avartar,
            isChooseNumber: false,
        },
        {
            title: "Triple Layer Eye Palette",
            colorProduct: "01 Blossom Forest",
            price: "$180",
            product: Avartar,
            isChooseNumber: false,
        },
    ];



    useEffect(() => {
        if (!userInfo) {
            window.location.href = "/";

        }
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 765);
        };

        handleResize();

        window.addEventListener("resize", handleResize);
        //  console.log("TestCheckout",  (OnProcess[0])[0].image)



        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [userInfo]);
    const handleIconsClick = (value) => {
        if (value === iconsActive) {
            return;
        }

        setIconsActive(value);
    };

    return (
        <>
            <Header />
            <div className="Body-ProfilePage">
                <ProfileUser></ProfileUser>
                <div className={`Info-person ${isMobile ? "hide-text" : ""}`}>
                    <div className="Category-account">
                        <Link to="/profile">
                            <div className=" Tab My-Account-Oder">
                                <i class="icon-p far fa-user"></i><div className="repone">My Account</div></div></Link>
                        <Link to="/favoritepd"><div className="Tab Favorite-Product">
                            <i class="icon-p far fa-heart"></i><div className="repone">Favorite Product</div></div></Link>
                        <div className="Tab Oder-management-Tab-Choose">
                            <i class="icon-p fas fa-tasks"></i><div className="repone">Order management</div></div>
                        <div className="Tab Log-out" onClick={() => setOpenModal(true)}><i class="icon-p fas fa-sign-out"></i>
                            <div className="repone">Log out</div></div>

                    </div>
                    <div className="wrapper-body-oder">
                        <MDBTabs className='mb-3'>
                            <MDBTabsItem>
                                <MDBTabsLink onClick={() => handleIconsClick('tab1')} active={iconsActive === 'tab1'}>
                                    <MDBIcon fas icon='clock' className='me-2' /> On Process
                                </MDBTabsLink>
                            </MDBTabsItem>
                            <MDBTabsItem>
                                <MDBTabsLink onClick={() => handleIconsClick('tab2')} active={iconsActive === 'tab2'}>
                                    <MDBIcon fas icon='check-double' className='me-2' /> Success
                                </MDBTabsLink>
                            </MDBTabsItem>
                            <MDBTabsItem>
                                <MDBTabsLink onClick={() => handleIconsClick('tab3')} active={iconsActive === 'tab3'}>
                                    <MDBIcon fas icon='ban' className='me-2' /> Cancle
                                </MDBTabsLink>
                            </MDBTabsItem>
                        </MDBTabs>

                        <MDBTabsContent>
                            <MDBTabsPane show={iconsActive === 'tab1'}>
                                {OnProcess.length === 0 ? (
                                    <div>No orders in the On Process category.</div>
                                ) : (
                                    OnProcess.map((order) => (
                                        order && order[0] ? (
                                            <CardComplete
                                                nameProduct={order[0].productName}
                                                colorProduct={order[0].colorProduct}
                                                price={order[0].price}
                                                Image={order[0].image}
                                                isChooseNumProduct={order.isChooseNumProduct}
                                                number={order[0].quantity}
                                                isCancel={false}
                                                isClose={false}
                                                key={order.orderId}
                                                isFirebase={true}
                                                
                                            />
                                        ) : null
                                    ))
                                )}
                            </MDBTabsPane>

                            <MDBTabsPane show={iconsActive === 'tab2'}>
                                {Success.length === 0 ? (
                                    <div>No orders in the Success category.</div>
                                ) : (
                                    Success.map((order) => (
                                        order && order[0] ? (
                                            <CardComplete
                                                nameProduct={order[0].productName}
                                                colorProduct={order[0].colorProduct}
                                                price={order.price}
                                                Image={order[0].image}
                                                isChooseNumProduct={order.isChooseNumProduct}
                                                number={order[0].quantity}
                                              
                                                isClose={false}
                                                key={order.orderId}
                                                isFirebase={true}
                                            />
                                        ) : null
                                    ))
                                )}
                            </MDBTabsPane>

                            <MDBTabsPane show={iconsActive === 'tab3'}>
                                {Cancel.length === 0 ? (
                                    <div>No orders in the Cancel category.</div>
                                ) : (
                                    Cancel.map((order) => (
                                        order && order[0] ? (
                                            <CardComplete
                                                nameProduct={order[0].productName}
                                                colorProduct={order[0].colorProduct}
                                                price={order.price}
                                                Image={order[0].image}
                                                isChooseNumProduct={order.isChooseNumProduct}
                                                number={order[0].quantity}
                                               
                                                isClose={false}
                                                key={order.orderId}
                                                isFirebase={true}
                                                
                                            />
                                        ) : null
                                    ))
                                )}
                            </MDBTabsPane>

                        </MDBTabsContent>

                    </div>


                </div>

            </div>

            <Footer />
            <Modal
                openModal={openModal}
                content="Do you want to log out ?"
                onCancel={() => setOpenModal(false)}
                onYes={handleLogout}
            ></Modal>
        </>
    );
};

export default OderManage;