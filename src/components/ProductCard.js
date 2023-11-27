import React, { useEffect, useState } from "react";
import ReactStars from "react-rating-stars-component";
import { Link, useLocation, useNavigate } from "react-router-dom";
import wish from "../images/wish.svg";
import addcart from "../images/add-cart.svg";
import view from "../images/view.svg";
import { useDispatch, useSelector } from "react-redux";
import { addToWishlist } from "../features/products/productSlice";
import styled from "styled-components"; 
import { ConvertToPound } from "./ConvertToPound";
import SkeletonProductCard from "./Skeleton/SkeletonProductCard";

const DiscountBanner = styled.div`
  position: absolute;
  top: 0;
  left:0;
  background-color: var(--color-bf4800); // Set the background color for the banner
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
  width: 100%;
  position: relative;
  margin-bottom: 20px;

`;

const ProductImage = styled.div`
  height: 270px;
  img {
    object-fit: cover;
    width: 150px;
    height: 200px;
  }

  @media (max-width: 425px) {
    height: 200px;
  }

  @media (max-width: 375px) {
    height: 180px;
  }

  @media (max-width: 320px) {
    height: 160px;
  }
`;

const ProductDetails = styled.div`
  h6 {
    color: var(--color-bf4800);
    font-size: 13px;
    @media (max-width: 425px) {
      font-size: 12px;
    }

    @media (max-width: 375px) {
      font-size: 11px;
    }

    @media (max-width: 320px) {
      font-size: 10px;
    }
  }
  h5 {
    font-size: 15px;
    color: var(--color-1c1c1b);
    @media (max-width: 425px) {
      font-size: 14px;
    }

    @media (max-width: 375px) {
      font-size: 12px;
    }

    @media (max-width: 320px) {
      font-size: 11px;
    }
  }
  p.price {
    font-size: 16px;
    color: var(--color-1c1c1b);
    @media (max-width: 425px) {
      font-size: 14px;
    }

    @media (max-width: 375px) {
      font-size: 12px;
    }

    @media (max-width: 320px) {
      font-size: 10px;
    }
  }
  p.dis {
    font-size: 13px;
    color: var(--color-777777);
    margin-right: 20px;

    @media (max-width: 425px) {
      font-size: 12px;
    }

    @media (max-width: 375px) {
      font-size: 8px;
      display:none !important;
    }
    @media(max-width: 320px){
      display:none !important;
    }

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
  @media(max-width:375px){
    position: relative;
    left:98%;
  
  }
`;

const ProductCard = (props) => {
  const { data, grid } = props;
  const dispatch = useDispatch();
  let location = useLocation();
  const navigate = useNavigate();

  const addToWish = (id) => {
    dispatch(addToWishlist(id));
  };

  const currency = useSelector((state) => state.currency.currency)
  const convert = async(price) =>{
    return await ConvertToPound(price);
  };

  const [converted,setConverted] = useState([]);

  useEffect(() =>{
    
      const conversionPromise = data.map((item) => convert(item?.price));

      Promise.all(conversionPromise)
        .then((convertedPrices) => setConverted(convertedPrices))
        .catch((error) => console.error("Conversion error", error));

    
  },[currency,data])

  return (
    <>
    {data ?(
      data?.map((item, index) => {
        return (
          <ProductCardWrapper
            key={index}
            className={` ${
              location.pathname === "/product" ? `gr-${grid}` : "col-3"
            } `}
          >
            <div className="product-card position-relative">
            {
                item?.discount &&
                <DiscountBanner>Save {item?.discount} %</DiscountBanner>
              }
              
              <Link to={`/product/${item._id}`}>
                <ProductImage>
                  {item?.images && item.images[0] && (
                    <img
                      src={item?.images[0].url}
                      alt="product image"
                    />
                  )}
                </ProductImage>
              </Link>
              
              <ProductDetails>
              <WishlistIcon>
                <button
                  className="border-0 bg-transparent"
                  onClick={(e) => {
                    addToWish(item?._id);
                  }}
                >
                  <img src={wish} alt="wishlist" />
                </button>
              </WishlistIcon>
                <Link to={`/product/${item._id}`}>
                  <h5 className="product-title">{item?.title}</h5>
                </Link>
                <ReactStars
                  count={5}
                  size={12}
                  value={item?.totalrating}
                  edit={false}
                  activeColor="#ffd700"
                />
                <p
                  className={`dis ${
                    grid === 12 ? "d-block" : "d-none"
                  }`}
                  dangerouslySetInnerHTML={{ __html: item?.description }}
                ></p>
                
                <p className="price">
                  £ {item?.price} <br/> Rs {converted[index]}      
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
        );
      })
    ):(
      <SkeletonProductCard/>
    )}
      
    </>
  );
};

export default ProductCard;
