import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import HomeProductCard from "./Products/HomeProductCard";
import { useDispatch } from "react-redux";
import { addToWishlist } from "../features/products/productSlice";

const ProductCarousel = ({ items }) => {
  const dispatch = useDispatch();
  const handleAddToWishlist = (productId) => {
    dispatch(addToWishlist(productId));
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
  return (
    <Carousel responsive={responsive} infinite autoPlay autoPlaySpeed={2000}>
      {items.map((item, index) => {
        <div key={index} className="col-3">
          <HomeProductCard
            item={[items]}
            onAddToWishlist={handleAddToWishlist}
          />
        </div>;
      })}
    </Carousel>
  );
};

export default ProductCarousel;
