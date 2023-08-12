import './Homepage.css';
import Header from '../../components/header/header';
import { Footer } from '../../components/footer/footer'
import HorizontalScroll from 'react-scroll-horizontal';
import Background1 from '../../assets/Background.png';
import Background2 from '../../assets/Banner Official Launching 1.png';
import Background3 from '../../assets/Banner-Homepage-Website-COMING-SOON 1.png';
import Background4 from '../../assets/2313x1089 1.png';
import ProductLayout from '../../components/productlayout/productlayout';
import Carousel from 'react-bootstrap/Carousel';
import React, { useState, useEffect } from "react";
import Productdetail from '../../components/productdetail/productdetail';
import axios from "axios";
import { Link } from 'react-router-dom';
import IMGPro1 from '../../assets/ImageP1.png'
import IMGPro2 from '../../assets/ImageP2.png'
import IMGPro3 from '../../assets/ImageP3.png'
import IMGPro4 from '../../assets/ImageP4.png'
import IMGPro5 from '../../assets/PorelessPowderClassicIvory.jpg'
import IMGPro6 from '../../assets/oncealerPurplle.jpg'
import IMGPro7 from '../../assets/PressedPowder.jpg'
import ImgPro8 from '../../assets/EraserConcealer.jpg'
const data = [
    {
      title:"BLACK ROUGE V5",
      img:IMGPro1
    },
    {
        title:"BLACK ROUGE V6",
        img:IMGPro2
    },
    {
        title:"HALF N HALF",
        img:IMGPro3
    },
   {
        title:"AIR FIT VELVET TINT",
        img:IMGPro4
   },
   
  ];
  const data2 = [
    {
        titlep2:"MATTE PORELES",
        imgp2:IMGPro5
      },
      {
          titlep2:"CONCEALER PURPLLE",
          imgp2:IMGPro6
      },
      {
          titlep2:"PRESSED POWDER",
          imgp2:IMGPro7
      },
     {
          titlep2:"ERASER CONCEALER",
          imgp2:ImgPro8
     },
  ];
  

function Homepage() {
    const [index, setIndex] = useState(0);
    const [product, setProduct] = useState(0);
    const [Saleproduct, setSaleProduct] = useState(0);
    const [BestSellerproduct, setBestSellerproduct] = useState(0);
    const [BestBrandrproduct, setBestBrandproduct] = useState(0);
    const [isselectsee, setisSelectSee] = useState(null);


    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };
    const handleSelectProduct = (selectedIndexed, e) => {
        setProduct(selectedIndexed);
    };
    const handleSaleproduct = (selected, e) => {
        setSaleProduct(selected);
    };
    const handleBestSellerproduct = (selectedBest, e) => {
        setBestSellerproduct(selectedBest);
    };
    const handleBestBrandproduct = (selectedBestBrand, e) => {
        setBestBrandproduct(selectedBestBrand);
    };

    const [products, setProducts] = useState([]);
    const [bestSeller, setBestSeller] = useState([]);
    const [bestBrand, setBestBrand] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8080/api/products/sales/top8")
            .then(response => {
                setProducts(response.data);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }, []);

    useEffect(() => {
        axios.get("http://localhost:8080/api/products/best-sellers/top4")
            .then(response => {
                setBestSeller(response.data);
                console.log("test", response.data);

            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }, []);

    useEffect(() => {
        axios.get("http://localhost:8080/api/products/best-brand")
            .then(response => {
                setBestBrand(response.data);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }, []);

    useEffect(() => {
        console.log("Best seller:" + bestSeller);
    }, [bestSeller]);

    useEffect(() => {
        console.log("product:" + product);
    }, [product]);

    return (
        <div>
            <Header className="fixed-top"></Header>


            <Carousel activeIndex={index} onSelect={handleSelect}>
                <Carousel.Item interval={2000}>
                    <img
                        className="d-block w-100"
                        src={Background1}
                        alt="First slide"
                    />

                </Carousel.Item>
                <Carousel.Item interval={2000}>
                    <img
                        className="d-block w-100"
                        src={Background2}
                        alt="Second slide"
                    />

                </Carousel.Item >
                <Carousel.Item interval={2000}>
                    <img
                        className="d-block w-100"
                        src={Background3}
                        alt="Third slide"
                    />


                </Carousel.Item>
                <Carousel.Item interval={2000}>
                    <img
                        className="d-block w-100"
                        src={Background4}
                        alt="Four slide"
                    />
                </Carousel.Item>
            </Carousel>
            <div className='Backgroud-Product'>
                <div className='NewArrival'>NEW ARRIVALS</div>
                <Carousel activeIndex={product} onSelect={handleSelectProduct} className='fix-high'>
                    <Carousel.Item >
                        <div className='Wrapper-Product'>

                       {data.map((item)=>( <ProductLayout
                       imgProduct={item.img}
                       nameProduct={item.title}

                       ></ProductLayout>))}
                           

                        </div>

                    </Carousel.Item>
                    <Carousel.Item >
                        <div className='Wrapper-Product'>
                        {data2.map((item)=>( <ProductLayout
                       imgProduct={item.imgp2}
                       nameProduct={item.titlep2}

                       ></ProductLayout>))}

                        </div> 

                    </Carousel.Item >
                    
                </Carousel>

            </div>
            <div className='Banner'>
                <div className='nameBanner'>Sale off</div>
                <a className='SeeAll'>See all</a></div>
            <div className="wrap-Sale-Product">

                <Carousel activeIndex={Saleproduct} onSelect={handleSaleproduct}>
                    <Carousel.Item >
                        <div className='Sale-Product'>
                            {products.slice(0, 4).map(product => (
                                <Productdetail nameProduct={product.name} description={product.description} price={product.price} image={product.image} productId={product.id} sales={product.sales} />


                            ))}
                        </div>
                    </Carousel.Item>
                    <Carousel.Item >
                        <div className='Sale-Product'>
                            {products.slice(4, 8).map(product => (
                                <Productdetail nameProduct={product.name} description={product.description} price={product.price} image={product.image} productId={product.id} sales={product.sales} />

                            ))}
                        </div>
                    </Carousel.Item>

                </Carousel>

            </div>
            <div className='Banner'>
                <div className='nameBanner'>Best Seller</div>
                <div className='SeeAll' onClick={() => setisSelectSee('Best-seller')}>
                    <Link to={{
                        pathname: '/product',
                        state: { isselectsee: 'Best-seller' },
                    }}>See all</Link>
                </div>
            </div>
            <div className="wrap-Sale-Product">
                <Carousel activeIndex={BestSellerproduct} onSelect={handleBestSellerproduct}>
                    <Carousel.Item >
                        <div className='Sale-Product'>
                            {bestSeller.slice(0, 4).map(product => (
                                <Productdetail nameProduct={product.name} description={product.description} price={product.price} image={product.image} productId={product.id} sales={product.sales} />
                            ))}
                        </div>
                    </Carousel.Item>
                    <Carousel.Item >
                        <div className='Sale-Product'>
                            {bestSeller.slice(4, 8).map(product => (
                                <Productdetail nameProduct={product.name} description={product.description} price={product.price} image={product.image} productId={product.id} sales={product.sales} />
                            ))}
                        </div>
                    </Carousel.Item>
                </Carousel>
            </div>
            <div className='Banner'>
                <div className='nameBanner'>Best Brand</div>
                {/* <a className='SeeAll'>See all</a> */}
            </div>
            <div className="wrap-Sale-Product">
                <Carousel activeIndex={BestBrandrproduct} onSelect={handleBestBrandproduct}>

                    <Carousel.Item >
                        <div className='Sale-Product'>
                            {bestBrand.slice(0, 4).map(product => (
                                <Productdetail nameProduct={product.name} description={product.description} price={product.price} image={product.image} productId={product.id} sales={product.sales} />
                            ))}
                        </div>
                    </Carousel.Item>
                    <Carousel.Item >
                        <div className='Sale-Product'>
                            {bestBrand.slice(4, 8).map(product => (
                                <Productdetail nameProduct={product.name} description={product.description} price={product.price} image={product.image} productId={product.id} sales={product.sales} />
                            ))}
                        </div>
                    </Carousel.Item>
                </Carousel>
            </div>







            <Footer />
        </div>
    );
}
export default Homepage;