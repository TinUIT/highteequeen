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
import {API_BASE_URL} from "../../api/config"

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
    const [isAccepted, setIsAccepted] = useState(Array(0).fill(false));
    const [isCancel, setIsCancel] = useState(Array(0).fill(false));
    


    const [currentPage, setCurrentPage] = useState(0);
    const [listOrder, setListOrder] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const itemsPerPage = 5;



    const handlePageClick = ({ selected }) => {
        const newPage = selected ; // Pagination starts from 0, but your API seems to start from 1
        setCurrentPage(newPage);
        const apiUrl = `${API_BASE_URL}/orders/user/${userInfo.id}?page=${newPage}&limit=10`;
        
        fetchData(apiUrl);
    };
    
      const fetchData = async (url) => {    
        try {
          const response = await axios.get(url, {
            headers: {
              accept: '*',
              Authorization: `Bearer ${userInfo.token}`,
            },
          });
       
          setListOrder(response.data.orders);
          console.log("listOrder: ",listOrder);
          setCurrentPage(0); // Reset current page to 0 after fetching new data
          const totalPages = response.data.totalPages || 0;
          setPageCount(totalPages);
          console.log(response.data.orders);
        
          console.log("total_page:", totalPages);
        } catch (error) {
          console.error('There was an error!', error);
        }
      };
    
        const handleStatusChange = (status, value) => {

            if (value === iconsActive) {
                return;
            }

            setIconsActive(value);
            const keyword = status.toLowerCase();
            let apiUrl;
            console.log("keyword",keyword);
            if(keyword=="all orders"){
                apiUrl = `${API_BASE_URL}/orders/user/${userInfo.id}?page=0&limit=10`;
            }
            else{
                apiUrl = `${API_BASE_URL}/orders/user/${userInfo.id}?keyword=${keyword}&page=0&limit=10`;
            }
          fetchData(apiUrl);
        };
        const handleUpdateStatus = async (orderId, userId, status_update) => {
            try {
              const apiUrl = `${API_BASE_URL}/v1/orders/${orderId}/status`;
          
              // Use the Authorization header with the user's token
              const headers = {
                accept: 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
                'Content-Type': 'application/json',
              };
          
              // Set the new status to "delivered" and provide the user_id
              const requestData = {
                status: status_update,
                user_id: userId,
              };
          
              // Update the local state immediately
              const updatedListOrder = [...listOrder];
              updatedListOrder[orderId - 1].status = status_update; // Assuming orderId is 1-indexed
              setListOrder(updatedListOrder);
          
              // Update the local isAccepted state accordingly
              const newIsAccepted = [...isAccepted];
              newIsAccepted[orderId - 1] = true; // Assuming orderId is 1-indexed
              setIsAccepted(newIsAccepted);
          
              // Make the API request
              const response = await axios.put(apiUrl, requestData, { headers });
              console.log('Order successfully accepted:', response.data);
            } catch (error) {
              console.error('Error accepting order:', error);
            }
          };
    
        useEffect(() => {
          const   apiUrl = `${API_BASE_URL}/orders/user/${userInfo.id}?page=0&limit=10`;
      
          fetchData(apiUrl);
          console.log("user_id: ",userInfo.id);
        }, [userInfo.id]); // Initial data fetching
    
    const handleLogout = () => {
        localStorage.removeItem('user-info');
        setUserInfo("");
        setOpenModal(false);
        window.location.href = "/";
    };
    const getImageUrl = (imageName) => {
        console.log(`${API_BASE_URL}/products/images/${imageName}`)
        return `${API_BASE_URL}/products/images/${imageName}`;
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
                                <MDBTabsLink onClick={() =>  handleStatusChange('All orders','tab1')} active={iconsActive === 'tab1'}>
                                    <MDBIcon fas icon='clock' className='me-2' /> All Orders
                                </MDBTabsLink>
                            </MDBTabsItem>
                            <MDBTabsItem>
                                <MDBTabsLink onClick={() =>  handleStatusChange('Pending','tab2') } active={iconsActive === 'tab2'}>
                                    <MDBIcon fas icon='clock' className='me-2' /> Pending
                                </MDBTabsLink>
                            </MDBTabsItem>
                            <MDBTabsItem>
                                <MDBTabsLink onClick={() =>  handleStatusChange('Approved','tab3')} active={iconsActive === 'tab3'}>
                                    <MDBIcon fas icon='check-double' className='me-2' /> Approved
                                </MDBTabsLink>
                            </MDBTabsItem>
                            <MDBTabsItem>
                                <MDBTabsLink onClick={() =>  handleStatusChange('Delivered','tab4')} active={iconsActive === 'tab4'}>
                                    <MDBIcon fas icon='ban' className='me-2' /> Delivered
                                </MDBTabsLink>
                            </MDBTabsItem>
                            <MDBTabsItem>
                                <MDBTabsLink onClick={() =>  handleStatusChange('Cancelled','tab5')} active={iconsActive === 'tab5'}>
                                    <MDBIcon fas icon='ban' className='me-2' /> Cancelled
                                </MDBTabsLink>
                            </MDBTabsItem>
                        </MDBTabs>

                        <MDBTabsContent>
       
                            <MDBTabsPane show={iconsActive === 'tab1'}>
                            {listOrder.length === 0 ? (
                                <div>No orders in the All Orders category.</div>
                            ) : (
                                listOrder.map((order) => (
                                    <div className="all_purchase">
                                        <div className="ruler_status" key={order.id}>
                                            {/* Display order information */}
                                            <div id="id">
                                                <div id="id_inf">Mã số đơn hàng: {order.id} </div>
                                            </div>
                                            <div id="tradeDate">
                                                <div id="tradeDate_inf"> Ngày đặt hàng: {`${order.order_date[2]} / ${order.order_date[1]} / ${order.order_date[0]}`}</div>
                                            </div>
                                            <div id="status">
                                                <div id="status_inf"> Trạng thái: {order.status}</div>
                                            </div>
                                            <div>
                                                <button id="btn_detail">
                                                    Xem chi tiết <i className="fa-solid fa-arrow-right"></i>
                                                </button>
                                            </div>
                                        </div>
                                        <div className="order_product">
                                            {order.order_details && order.order_details.length > 0 && (
                                                order.order_details.map((orderDetail) => (
                                                    <CardComplete
                                                        nameProduct={orderDetail.product.name}
                                                        colorProduct={orderDetail.color}
                                                        price={orderDetail.price}
                                                        
                                                        Image={orderDetail.product.thumbnail}
                                                        // image={getImageUrl(orderDetail.product.thumbnail)} 
                                                        isChooseNumProduct={orderDetail.numberOfProducts}
                                                        number={orderDetail.numberOfProducts}
                                                        isCancel={false}
                                                        isClose={false}
                                                        key={orderDetail.id}
                                                        isFirebase={false}
                                                    />
                                                ))
                                            )}
                                        </div>
                                        <div className="all_total_user">
                                            <h3> All total: {order.total_money}</h3>

                                            {order.status === 'pending' && (
                                                <div className="button_deny">
                                                    <button onClick={() =>handleUpdateStatus(order.id,order.user_id,'cancelled')}>Cancel</button>
                                                </div>
                                            )}
                                        </div>
                                       
                                    </div>
                               
                                ))
                            )}

                            </MDBTabsPane>

                            <MDBTabsPane show={iconsActive === 'tab2'}>
                            {listOrder.length === 0 ? (
                                <div>No orders in the All Orders category.</div>
                            ) : (
                                listOrder.map((order) => (
                                    <div className="all_purchase">

                                   
                                    <div className="ruler_status" key={order.id}>
                                        {/* Display order information */}
                                        <div id="id">
                                            <div id="id_inf">Mã số đơn hàng: {order.id} </div>
                                        </div>
                                        <div id="tradeDate">
                                            <div id="tradeDate_inf"> Ngày đặt hàng: {`${order.order_date[2]} / ${order.order_date[1]} / ${order.order_date[0]}`}</div>
                                        </div>
                                        <div id="status">
                                            <div id="status_inf"> Trạng thái: {order.status}</div>
                                        </div>
                                        <div>
                                            <button id="btn_detail">
                                                Xem chi tiết <i className="fa-solid fa-arrow-right"></i>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="order_product">
                                        {order.order_details && order.order_details.length > 0 && (
                                            order.order_details.map((orderDetail) => (
                                                <CardComplete
                                                    nameProduct={orderDetail.product.name}
                                                    colorProduct={orderDetail.color}
                                                    price={orderDetail.price}
                                                   
                                                    Image={orderDetail.product.thumbnail} 
                                                    isChooseNumProduct={orderDetail.numberOfProducts}
                                                    number={orderDetail.numberOfProducts}
                                                    isCancel={false}
                                                    isClose={false}
                                                    key={orderDetail.id}
                                                    isFirebase={false}
                                                />
                                            ))
                                        )}
                                    </div>
                                    <div className="all_total_user">
                                        <h3> All total: {order.total_money}</h3>
                                        {order.status === 'pending' && (
                                                <div className="button_deny">
                                                    <button onClick={() =>handleUpdateStatus(order.id,order.user_id,'cancelled')}>Cancel</button>
                                                </div>
                                            )}
                                    </div>
                                   
                                    </div>
                               
                                ))
                            )}
                            </MDBTabsPane>

                            <MDBTabsPane show={iconsActive === 'tab3'}>
                            {listOrder.length === 0 ? (
                                <div>No orders in the All Orders category.</div>
                            ) : (
                                listOrder.map((order) => (
                                    <div className="all_purchase">

                                   
                                    <div className="ruler_status" key={order.id}>
                                        {/* Display order information */}
                                        <div id="id">
                                            <div id="id_inf">Mã số đơn hàng: {order.id} </div>
                                        </div>
                                        <div id="tradeDate">
                                            <div id="tradeDate_inf"> Ngày đặt hàng: {`${order.order_date[2]} / ${order.order_date[1]} / ${order.order_date[0]}`}</div>
                                        </div>
                                        <div id="status">
                                            <div id="status_inf"> Trạng thái: {order.status}</div>
                                        </div>
                                        <div>
                                            <button id="btn_detail">
                                                Xem chi tiết <i className="fa-solid fa-arrow-right"></i>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="order_product">
                                        {order.order_details && order.order_details.length > 0 && (
                                            order.order_details.map((orderDetail) => (
                                                <CardComplete
                                                    nameProduct={orderDetail.product.name}
                                                    colorProduct={orderDetail.color}
                                                    price={orderDetail.price}
                                                    Image={orderDetail.product.thumbnail}
                                                   
                                                    isChooseNumProduct={orderDetail.numberOfProducts}
                                                    number={orderDetail.numberOfProducts}
                                                    isCancel={false}
                                                    isClose={false}
                                                    key={orderDetail.id}
                                                    isFirebase={false}
                                                />
                                            ))
                                        )}
                                    </div>
                                    <div className="all_total_user">
                                        <h3> All total: {order.total_money}</h3>

                                    </div>
                                   
                                    </div>
                               
                                ))
                            )}
                            </MDBTabsPane>
                            <MDBTabsPane show={iconsActive === 'tab4'}>
                            {listOrder.length === 0 ? (
                                <div>No orders in the All Orders category.</div>
                            ) : (
                                listOrder.map((order) => (
                                    <div className="all_purchase">

                                   
                                    <div className="ruler_status" key={order.id}>
                                        {/* Display order information */}
                                        <div id="id">
                                            <div id="id_inf">Mã số đơn hàng: {order.id} </div>
                                        </div>
                                        <div id="tradeDate">
                                            <div id="tradeDate_inf"> Ngày đặt hàng: {`${order.order_date[2]} / ${order.order_date[1]} / ${order.order_date[0]}`}</div>
                                        </div>
                                        <div id="status">
                                            <div id="status_inf"> Trạng thái: {order.status}</div>
                                        </div>
                                        <div>
                                            <button id="btn_detail">
                                                Xem chi tiết <i className="fa-solid fa-arrow-right"></i>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="order_product">
                                        {order.order_details && order.order_details.length > 0 && (
                                            order.order_details.map((orderDetail) => (
                                                <CardComplete
                                                    nameProduct={orderDetail.product.name}
                                                    colorProduct={orderDetail.color}
                                                    price={orderDetail.price}
                                                    
                                                    Image={orderDetail.product.thumbnail}
                                                    isChooseNumProduct={orderDetail.numberOfProducts}
                                                    number={orderDetail.numberOfProducts}
                                                    isCancel={false}
                                                    isClose={false}
                                                    key={orderDetail.id}
                                                    isFirebase={false}
                                                />
                                            ))
                                        )}
                                    </div>
                                    <div className="all_total_user">
                                        <h3> All total: {order.total_money}</h3>

                                    </div>
                                   
                                </div>
                                ))
                            )}
                            </MDBTabsPane>

                            <MDBTabsPane show={iconsActive === 'tab5'}>
                            {listOrder.length === 0 ? (
                                <div>No orders in the All Orders category.</div>
                            ) : (
                                listOrder.map((order) => (
                                    <div className="all_purchase">

                                   
                                    <div className="ruler_status" key={order.id}>
                                        {/* Display order information */}
                                        <div id="id">
                                            <div id="id_inf">Order Id: {order.id} </div>
                                        </div>
                                        <div id="tradeDate">
                                            <div id="tradeDate_inf"> date: {`${order.order_date[2]} / ${order.order_date[1]} / ${order.order_date[0]}`}</div>
                                        </div>
                                        <div id="status">
                                            <div id="status_inf"> Status: {order.status}</div>
                                        </div>
                                        <div>
                                            <button id="btn_detail">
                                                See detail <i className="fa-solid fa-arrow-right"></i>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="order_product">
                                        {order.order_details && order.order_details.length > 0 && (
                                            order.order_details.map((orderDetail) => (
                                                <CardComplete
                                                    nameProduct={orderDetail.product.name}
                                                    colorProduct={orderDetail.color}
                                                    price={orderDetail.price}
                                                    Image={orderDetail.product.thumbnail}
                                                    isChooseNumProduct={orderDetail.numberOfProducts}
                                                    number={orderDetail.numberOfProducts}
                                                    isCancel={false}
                                                    isClose={false}
                                                    key={orderDetail.id}
                                                    isFirebase={false}
                                                />
                                            ))
                                        )}
                                    </div>
                                    <div className="all_total_user">
                                        <h3> All total: {order.total_money}</h3>

                                    </div>
                                   
                                </div>
                               
                                ))
                            )}
                            </MDBTabsPane>
                            <div className="order_user_page">
                                <ReactPaginate
                                    breakLabel="..."
                                    nextLabel="next >"
                                    onPageChange={handlePageClick}
                                    pageRangeDisplayed={5}
                                    pageCount={pageCount}
                                    previousLabel="< previous"
                                    
                                    pageClassName="page-item"
                                    pageLinkClassName="page-link"
                                    previousClassName="page-item"
                                    previousLinkClassName="page-link"
                                    nextClassName="page-item"
                                    nextLinkClassName="page-link"
                                    breakClassName="page-item"
                                    breakLinkClassName="page-link"
                                    containerClassName="pagination"
                                    activeClassName="active"
                                    />
                            </div>
                            

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