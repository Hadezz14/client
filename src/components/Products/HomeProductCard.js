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
  left:0;
  background-color: var(--color-bf4800); 
  color: white; // Set the text color for the banner
  padding: 5px 10px; // Adjust the padding as needed
  border-radius: 10px 0 0 0; // Add a border radius to the top right corner
  font-size: 12px; // Adjust the font size as needed
`;

const ProductCardWrapper = styled.div`
  padding: 15px;
  background-color: white;
  border-radius: 10px;
  overflow: hidden;
  width: 91%;
  bordr-left:20px;
  margin-left:40px;
  display: flex;
  flex-direction: row;
  align-items: center;
  @media (max-width:576px){
    padding: 10px;
  }
`;

const ProductDetails = styled.div`
  h6 {
    color: var(--color-bf4800);
    font-size: 13px;
  }
  h5 {
    font-size: 15px;
    color: var(--color-1c1c1b);
  }
  p.price {
    font-size: 16px;
    color: var(--color-1c1c1b);
  }
  p.description {
    font-size: 13px;
    color: var(--color-777777);
    margin-right: 20px;
  }
`;

const ActionBar = styled.div`
  position: absolute;
  top: 50%;
  right: -23px;
  transform: translateY(-50%);
  transition: 0.3s;
`;

const WishlistIcon = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
`;

const HomeProductCard = ({item,onAddToWishlist}) => {
    
  const navigate = useNavigate();
  
  const convert = async(price) =>{
    return await ConvertToPound(price);
  };

  const [converted,setConverted] = useState([]);
  useEffect(() =>{
    
      const conversionPromise = item.map((i) => convert(i?.price));

      Promise.all(conversionPromise)
        .then((convertedPrices) => setConverted(convertedPrices))
        .catch((error) => console.error("Conversion error", error));

    
  },[item])
        return (
          <>
          {
            item? (item?.map((item,index)=>{
              return(
                  <ProductCardWrapper key={item._id}>
          <div className="home-product-card">
            {
              item?.discount &&
              <DiscountBanner>Save {item?.discount} %</DiscountBanner>
            }
            <WishlistIcon>
              <button
                className="border-0 bg-transparent"
                onClick={(e) => {
                  onAddToWishlist(item?._id);
                }}
              >
                <img src={wish} alt="wishlist" />
              </button>
            </WishlistIcon>
            <Link to={`/product/${item?._id}`}>
              <div style={{height:"200px",width:"200px",objectFit:"contain" }}>
              {item?.images && item.images[0] && (
                  <img
                    src={item?.images[0].url}
                    className="home-product-image"
                    alt="product image"
                  />
                )}
              </div>
            </Link>
            <ProductDetails>
              <Link to={`/product/${item?._id}`}>
                <h5 className="home-product-title">{item?.title}</h5>
              </Link>
              <ReactStars
                count={5}
                size={20}
                value={item?.totalrating}
                edit={false}
                activeColor="#ffd700"
              />
              <p className="price">
                
              {/* {
                  currency === "Rs" ? `Rs ${item?.price}`:`£${converted[index]}`
                } */}
                £ {item?.price} / Rs {converted[index]}
                </p>
            </ProductDetails>
            <ActionBar>
              <div className="d-flex flex-column gap-15">
                <button className="border-0 bg-transparent">
                  <img
                    onClick={() => navigate("/product/" + item?._id)}
                    src={view}
                    alt="view"
                  />
                </button>
                <button className="border-0 bg-transparent">
                  <img
                    onClick={() => navigate("/cart")}
                    src={addcart}
                    alt="addcart"
                  />
                </button>
              </div>
            </ActionBar>
          </div>
        </ProductCardWrapper>
              )
          })):(
            <SkeletonProductCard/>
          )
          }
          </>
        );
    };

export default HomeProductCard;