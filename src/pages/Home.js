import React, { useEffect } from "react";
import Container from "../components/Container";
import { services } from "../utils/Data";
import SmallBanner from "../components/smallBanner";
import BigBanner from "../components/BigBanner";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../features/products/productSlice";
import { useNavigate } from "react-router-dom";
import { addToWishlist } from "../features/products/productSlice";
import HomeProductCard from "../components/Products/HomeProductCard";
import { useState } from "react";
import { getOrders } from "../features/user/userSlice";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import HeroSection from "../components/HeroSection";

const Home = () => {
  const productState = useSelector((state) => state.product.product);
  console.log(productState);
  const loading = useSelector((state) => state.product.isLoading);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    getProducts();
  }, []);
  const getProducts = () => {
    dispatch(getAllProducts());
  };
  useEffect(() => {
    myorders();
  }, []);
  const myorders = () => {
    dispatch(getOrders());
  };
  const handleAddToWishlist = (productId) => {
    dispatch(addToWishlist(productId));
  };
  const firstFourProducts = productState.slice(0, 4);
  const latestProduct = productState.slice(0, 2);

  const [col, setCol] = useState(12);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 425) {
        setCol(12);
      } else if (window.innerWidth <= 900) {
        setCol(6);
      } else {
        setCol(3);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const renderProducts = () => {
    if (window.innerWidth >= 1024) {
      return firstFourProducts;
    } else {
      return latestProduct;
    }
  };
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  const sortedProducts = productState
    .slice()
    .sort((a, b) => b.totalrating - a.totalrating);
  const featuredProducts = sortedProducts.slice(0, 8);

  return (
    <>
      <HeroSection />
      <Container class1="home-wrapper-1 py-3">
        <div className="row ">
          <h3 className="section-heading text-center font-weight-bold">
            Lastest Products in the Collection
          </h3>
          <div className="row py-4 small-bannerDiv">
            {renderProducts()?.map((item, index) => (
              <div className="col-12 col-xs-12 col-md-6 col-lg-3" key={index}>
                <div className="d-flex flex-column gap-10 justify-content-between align-items-center smallBannerGap">
                  <SmallBanner item={item} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
      <Container class1="home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <div className="servies d-flex align-items-center justify-content-between">
              {services?.map((i, j) => {
                return (
                  <div className="service-item" key={j}>
                    <img src={i.image} alt="services" />
                    <div>
                      <h6>{i.title}</h6>
                      <p className="mb-0">{i.tagline}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
      {featuredProducts && (
        <Container class1="featured-wrapper py-3 home-wrapper-2">
          <h3 className="section-heading text-center font-weight-bold">
            Highest Rated Products
          </h3>
          <div className="row">
            <div className="col-12">
              <div className="productRow">
                <Carousel
                  autoPlay
                  autoPlaySpeed={2000}
                  responsive={responsive}
                  infinite
                  showDots={true}
                  arrows={false}
                >
                  {featuredProducts?.map((item, index) => (
                    <HomeProductCard
                      key={index}
                      item={[item]}
                      onAddToWishlist={handleAddToWishlist}
                    />
                  ))}
                </Carousel>
              </div>
            </div>
          </div>
        </Container>
      )}
    </>
  );
};

export default Home;
