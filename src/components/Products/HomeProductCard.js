import React, { useEffect, useState } from "react";
import ReactStars from "react-rating-stars-component";
import { Link, useNavigate } from "react-router-dom";
import wish from "../../images/wish.svg";
import addcart from "../../images/add-cart.svg";
import view from "../../images/view.svg";
import styled from "styled-components";
import { ConvertToPound } from "../ConvertToPound";
import SkeletonProductCard from "../Skeleton/SkeletonProductCard";

const DiscountBanner = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  background-color: var(--color-bf4800);
  color: white; // Set the text color for the banner
  padding: 5px 10px; // Adjust the padding as needed
  border-radius: 10px 0 0 0; // Add a border radius to the top right corner
  font-size: 12px; // Adjust the font size as needed
`;

const ProductCardWrapper = styled.div`
  background-color: white;
  border-radius: 10px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: space-between; // Adjust the layout
  margin-bottom: 2rem;

 

  @media (max-width: 820px) {
    flex-direction: column;
    align-items: center;

  }


  @media (max-width: 768px) {
    align-items: center;
    overflow: hidden;
  }
`;

const ImageContainer = styled.div`
  width: 50%; // Set image container to 50% width
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 10px 10px 29px;

  @media (max-width: 1024px) {
    width: 100%;
  }

`;

const ProductDetails = styled.div`
  width: 100%; // Set product details to 50% width
  padding: 10px;

  @media (max-width: 520px) {
    width: 100%;
  }
  h6 {
    color: var(--color-bf4800);
    font-size: 13px;
  }
  h5 {
    font-size: 19px;
    color: var(--color-1c1c1b);
  }
  p.price {
    font-size: 16px;
    color: var(--color-1c1c1b);
  }
  p.description {
    font-size: 16px;
    color: var(--color-777777);
    padding: 10px 20px 0px 0px;
    margin-top: 3rem;
  }

  @media (max-width: 820px) {
    width: 100%;
    text-align: center;

    // .react-stars{
    //   margin-left: 40%;
    //   margin-top: 15px;
    // }
    .star-rating-wrapper {
      display: flex;
      justify-content: center;
    }
  }
`;

const HomeProductCard = ({ item, onAddToWishlist }) => {
  const navigate = useNavigate();

  const convert = async (price) => {
    return await ConvertToPound(price);
  };

  const [converted, setConverted] = useState([]);
  useEffect(() => {
    const conversionPromise = item.map((i) => convert(i?.price));

    Promise.all(conversionPromise)
      .then((convertedPrices) => setConverted(convertedPrices))
      .catch((error) => console.error("Conversion error", error));
  }, [item]);
  return (
    <>
      {item ? (
        item.map((item, index) => (
          <ProductCardWrapper key={item._id}>
            <ImageContainer>
              {item.discount && (
                <DiscountBanner>Save {item.discount} %</DiscountBanner>
              )}
              <Link to={`/product/${item._id}`}>
                {item.images && item.images[0] && (
                  <img
                    src={item.images[0].url}
                    alt="product"
                    style={{ width: "500px", height: "450px", objectFit: "contain" }}
                  />
                )}
              </Link>
            </ImageContainer>
            <ProductDetails>
              <Link to={`/product/${item._id}`}>
                <h5 className="home-product-title">{item.title}</h5>
                <div className="star-rating-wrapper">
                <ReactStars
                  count={5}
                  size={24}
                  value={item.totalrating}
                  edit={false}
                  activeColor="#ffd700"
                />
              </div>
              
              <p className="description"
                  dangerouslySetInnerHTML={{ __html: item?.description }}
                ></p>
                <p style={{color: "black", marginTop: "1.5rem", fontWeight: "500", fontSize: "16px"}}>Click to view Product</p>
              </Link>
              </ProductDetails>
          </ProductCardWrapper>
        ))
      ) : (
        <SkeletonProductCard />
      )}
    </>
  );
};

export default HomeProductCard;