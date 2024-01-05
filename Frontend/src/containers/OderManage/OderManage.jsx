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
import axios from 'axios';
import ReactPaginate from 'react-paginate';

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
    


    const [currentPage, setCurrentPage] = useState(0);
    const [bill, setBill] = useState([]);
    const [listOrder, setListOrder] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const itemsPerPage = 5;

    useEffect(() => {
        console.log("user_infor: ",userInfo);

        if (userInfo && userInfo.orders && userInfo.orders.length > 0) {
            const OnProcessPro = userInfo.orders.map((order) => {
                if (order.status === "pending") {
                    return order.orderDetails;
                }


                return "";
            });
            setOnProcess(OnProcessPro);




        }
       

    }, [userInfo]);

    useEffect(() => {
        console.log("user_infor: ",userInfo);
        if (userInfo && userInfo.orders && userInfo.orders.length > 0) {
            const successPro = userInfo.orders.map((order) => {
                if (order.status === "delivered") {
                    return order.orderDetails;
                }

                return "";
            });
            setSuccess(successPro);



        }

    }, [userInfo]);
    useEffect(() => {
        console.log("user_infor: ",userInfo);
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


    const handlePageClick = ({ selected }) => {
        const newPage = selected ; // Pagination starts from 0, but your API seems to start from 1
        setCurrentPage(newPage);
        const apiUrl = `http://localhost:8080/api/v1/orders/get-orders-by-keyword?page=${newPage}&limit=10`;
        fetchData(apiUrl);
      };
    
      const fetchData = async (url) => {
        try {
          const response = await axios.get(url, {
            headers: {
              accept: '*',
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjUsImVtYWlsIjoicXV5dHJhbjA4MDEyMDAyQGdtYWlsLmNvbSIsInN1YiI6InF1eXRyYW4wODAxMjAwMkBnbWFpbC5jb20iLCJleHAiOjE3MDcwMzU3MjN9.TpWQAdif_tlgyPbAK-nb7S25ZO3H8v-CZDbI_7skdSM',
            },
          });
       
          setListOrder(response.data.orders);
          setCurrentPage(0); // Reset current page to 0 after fetching new data
          const totalPages = response.data.totalPages || 0;
          setPageCount(totalPages);
          console.log("total_page:", totalPages);
        } catch (error) {
          console.error('There was an error!', error);
        }
    
      };
    
        const handleStatusChange = (status) => {
          const keyword = status.toLowerCase();
          let apiUrl;
          console.log("keyword",keyword);
          if(keyword=="all orders"){
            apiUrl = `http://localhost:8080/api/v1/orders/get-orders-by-keyword?page=0&limit=10`;
          }
          else{
            apiUrl = `http://localhost:8080/api/v1/orders/get-orders-by-keyword?page=0&limit=10&keyword=${keyword}`;
          }
          fetchData(apiUrl);
        };
    
        useEffect(() => {
          const   apiUrl = `http://localhost:8080/api/v1/orders/user/${userInfo.id}`;
          fetchData(apiUrl);
          console.log("listOrder: ",listOrder);
        }, []); // Initial data fetching
    
    

      

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
                                    <MDBIcon fas icon='clock' className='me-2' /> All Orders
                                </MDBTabsLink>
                            </MDBTabsItem>
                            <MDBTabsItem>
                                <MDBTabsLink onClick={() => handleIconsClick('tab2')} active={iconsActive === 'tab2'}>
                                    <MDBIcon fas icon='clock' className='me-2' /> Pending
                                </MDBTabsLink>
                            </MDBTabsItem>
                            <MDBTabsItem>
                                <MDBTabsLink onClick={() => handleIconsClick('tab3')} active={iconsActive === 'tab3'}>
                                    <MDBIcon fas icon='check-double' className='me-2' /> Approved
                                </MDBTabsLink>
                            </MDBTabsItem>
                            <MDBTabsItem>
                                <MDBTabsLink onClick={() => handleIconsClick('tab4')} active={iconsActive === 'tab4'}>
                                    <MDBIcon fas icon='ban' className='me-2' /> Delivered
                                </MDBTabsLink>
                            </MDBTabsItem>
                            <MDBTabsItem>
                                <MDBTabsLink onClick={() => handleIconsClick('tab5')} active={iconsActive === 'tab5'}>
                                    <MDBIcon fas icon='ban' className='me-2' /> Cancelled
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
             <ReactPaginate
                previousLabel={'previous'}
                nextLabel={'next'}
                breakLabel={'...'}
                pageCount={pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageClick}
                containerClassName={'pagination'}
                activeClassName={'active'}
            />
        </>
    );
};

export default OderManage;