import "./ProductPage.css";
import Header from "../../components/header/header";
import aboutUsImage from "../../assets/aboutus.png";
import { Footer } from "../../components/footer/footer";
import Headerproduct from "../../components/Headerproduct/Headerproduct";
import Productdetail from "../../components/productdetail/productdetail";
import React, { useState, useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import axios from "axios";
import { useLocation } from 'react-router-dom';


const ProductPage = () => {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [TileProduct,setTitleProduct]=useState();
    const [apiEndpoint, setApiEndpoint] = useState("http://localhost:8080/api/products");
    const location = useLocation();
    const isselectsee = location?.state?.isselectsee;
    const [selectedButton, setSelectedButton] = useState(null);
    useEffect(() => {
       
        axios.get(`${apiEndpoint}?page=${currentPage}&size=6`)
            .then(response => {
                setProducts(response.data.content);
                setTotalPages(response.data.totalPages);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }, [currentPage, apiEndpoint]);

    const [product, setProduct] = useState(0);
    const [expandedProduct, setExpandedProduct] = useState(null); // New state for expanded product

    const handleButtonClick = (buttonName) => {
        setSelectedButton(buttonName);
        switch (buttonName) {
            case 'Best-seller':
                setApiEndpoint("http://localhost:8080/api/products/best-sellers");
                break;
            case 'Discount':
                setApiEndpoint("http://localhost:8080/api/products/sales");
                break;
            case 'Low-price':
                setApiEndpoint("http://localhost:8080/api/products/low-price");
                break;
            case 'High-price':
                setApiEndpoint("http://localhost:8080/api/products/high-price");
                break;
            default:
                setApiEndpoint("http://localhost:8080/api/products");
        }
    };

    const handleFilterCategoryName = (categoryName) => {
        setApiEndpoint(`http://localhost:8080/api/products/category/${categoryName}`)
    }
    const handleSelectProduct = (selectedIndexed, e) => {
        setProduct(selectedIndexed);
        setExpandedProduct(selectedIndexed);
    };
    const handleExpandProduct = (selectedIndexed) => {
        if (expandedProduct === selectedIndexed) {
            setExpandedProduct(null); // Collapse the expanded product if clicked again
        } else {
            setExpandedProduct(selectedIndexed); // Expand the clicked product
        }
    };
    useEffect(() => {
        if (isselectsee !== null) {
            setSelectedButton(isselectsee);
            console.log("bestseller test", isselectsee);
        }
    }, []);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    let startPage, endPage;
    if (currentPage <= 1) {
        startPage = 0;
        endPage = 2;
    } else if (currentPage + 1 >= totalPages) {
        startPage = totalPages - 3;
        endPage = totalPages - 1;
    } else {
        startPage = currentPage - 1;
        endPage = currentPage + 1;
    }
    const pageNumbers = [...Array((endPage + 1) - startPage).keys()].map(i => startPage + i);


    return (
        <>
            <Header />
            <div className="Wrapper-HeaderProduct-ProductPage">
                <Carousel activeIndex={product} onSelect={handleSelectProduct} >
                   
                    <Carousel.Item >
                        <div className='Wrapper-Product-page'>
                            <div className="wrapper-header-product">
                                <Headerproduct
                                    background={require("../../assets/Blush.png")}
                                    nameProduct="Blush"
                                    expanded={expandedProduct === 0}
                                    onClick={() => {handleExpandProduct(0);
                                        setTitleProduct("Blush");}}
                                />
                            </div>
                            <div className="wrapper-header-product">
                                <Headerproduct
                                    background={require("../../assets/Cleanser.jpg")}
                                    nameProduct="Cleanser"
                                    expanded={expandedProduct === 1}
                                    onClick={() => { handleExpandProduct(1);
                                            setTitleProduct("Powder");}}
                                />
                            </div>
                            <div className="wrapper-header-product">
                                <Headerproduct
                                    background={require("../../assets/Eye.png")}
                                    nameProduct="Eyeshadow"
                                    expanded={expandedProduct === 2}
                                    onClick={() => {handleExpandProduct(2);
                                        setTitleProduct("Eyeshadow");}}
                                />
                            </div>
                            <div className="wrapper-header-product">
                                <Headerproduct
                                    background={require("../../assets/Toner.jpg")}
                                    nameProduct="Toner"
                                    expanded={expandedProduct ===3}
                                    onClick={() => {
                                        handleExpandProduct(3);
                                        setTitleProduct("Toner");
                                      }}
                                />
                            </div>
                        </div>
                    </Carousel.Item >
                    <Carousel.Item >
                        <div className='Wrapper-Product-page'>
                            <div className="wrapper-header-product">
                                <Headerproduct
                                    background={require("../../assets/Lips.png")}
                                    nameProduct="Liptick"
                                    expanded={expandedProduct === 4}
                                    onClick={() => {handleExpandProduct(4);
                                        handleFilterCategoryName("Lipstick");
                                        setTitleProduct("Lipstick");}}
                                />
                            </div>
                            <div className="wrapper-header-product">
                                <Headerproduct
                                    background={require("../../assets/Powder.jpg")}
                                    nameProduct="Powder"
                                    expanded={expandedProduct === 5}
                                    onClick={() => { handleExpandProduct(5);
                                            handleFilterCategoryName("Powder");
                                            setTitleProduct("Powder");}}
                                />
                            </div>
                            <div className="wrapper-header-product">
                                <Headerproduct
                                    background={require("../../assets/EyeLine.jpg")}
                                    nameProduct="Eyeliner"
                                    expanded={expandedProduct === 6}
                                    onClick={() => {handleExpandProduct(6);
                                        setTitleProduct("Eyeliner");}}
                                />
                            </div>
                            <div className="wrapper-header-product">
                                <Headerproduct
                                    background={require("../../assets/Primer.png")}
                                    nameProduct="Primer"
                                    expanded={expandedProduct === 7}
                                    onClick={() => {
                                        handleExpandProduct(7);
                                        setTitleProduct("Primer");
                                      }}
                                />
                            </div>
                        </div>
                    </Carousel.Item >
                </Carousel>
            </div>
            <div className='Productpage-Branner'>
                <div className='nameBanner'>{TileProduct}</div>
            </div>
            <div className="Wrapper-Tool">
                <div className="Fillter-By"> Fillter by</div>
                <div className="wrapper-Button-Fillter">
                    <button className={`bt ${selectedButton === 'All' ? 'selected' : ''}`}
                        onClick={() => handleButtonClick('All')}>All</button>
                    <button className={`bt ${selectedButton === 'Best-seller' ? 'selected' : ''}`}
                        onClick={() => handleButtonClick('Best-seller')}>Best Seller</button>
                    <button className={`bt ${selectedButton === 'Discount' ? 'selected' : ''}`}
                        onClick={() => handleButtonClick('Discount')}>Discount</button>
                    <button className={`bt ${selectedButton === 'Low-price' ? 'selected' : ''}`}
                        onClick={() => handleButtonClick('Low-price')}>Low Price</button>
                    <button className={`bt ${selectedButton === 'High-price' ? 'selected' : ''}`}
                        onClick={() => handleButtonClick('High-price')}>High Price</button>
                </div>
                {/* <div className="Wrapper-Search-Fillter">
                    <i class="fillter fas fa-search"></i>
                    <input className="Search-Fillter"/>                   
                    
                    
                </div> */}


            </div>
            <div className="Wrapper-Product-detail">
                {products.map(product => (
                    <div className="Product-detail">
                       <Productdetail  nameProduct={product.name} description={product.description} price={product.price} image={product.image} productId={product.id} sales={product.sales}/>
                        </div>
                ))}
            </div>


            <div className="Wrapper-Pagniation">
                <nav aria-label="Page navigation example">
                    <ul className="pagination">
                        <li className="page-item">
                            <a className="page-link" href="#" aria-label="Previous" onClick={() => handlePageChange(currentPage > 0 ? currentPage - 1 : 0)}>
                                <span aria-hidden="true">&laquo;</span>
                            </a>
                        </li>
                        {pageNumbers.map(number => (
                            <li className={`page-item ${currentPage === number ? 'active' : ''}`} key={number}>
                                <a className="page-link" href="#" onClick={() => handlePageChange(number)}>{number + 1}</a>
                            </li>
                        ))}
                        <li className="page-item">
                            <a className="page-link" href="#" aria-label="Next" onClick={() => handlePageChange(currentPage + 1 < totalPages ? currentPage + 1 : totalPages - 1)}>
                                <span aria-hidden="true">&raquo;</span>
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>

            <Footer />
           
        </>
    );
};

export default ProductPage;