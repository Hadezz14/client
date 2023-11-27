import React, { useEffect, useState } from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import Container from "../components/Container";
import product from '../images/vyamtshirt.png'
import { useDispatch, useSelector } from "react-redux";
import { getUserProductWishlist } from "../features/user/userSlice";
import { addToWishlist } from "../features/products/productSlice";
import { ConvertToPound } from "../components/ConvertToPound";

const Wishlist = () => {
  const dispatch = useDispatch();
  useEffect(() =>{
    getWishlistFromDb();
  },[]);

  const getWishlistFromDb =()=>{
    dispatch(getUserProductWishlist());
  };
  const wishlistState = useSelector((state) => state.auth.wishlist.wishlist)
  const isLoading = useSelector((state) => state?.auth?.isLoading);

  
  
  const removeFormWishlist =(id) =>{ 
    dispatch(addToWishlist(id));
    setTimeout(()=>{
      dispatch(getUserProductWishlist());
    },300);
}
const convert = async(price) =>{
  return await ConvertToPound(price);
};
const [converted,setConverted] = useState([]);
useEffect(() =>{
  const conversionPromise = wishlistState?.map((i) =>convert(i?.price));
  Promise.all(conversionPromise) 
  .then((convertedPrices)=> setConverted(convertedPrices)) 
  .catch((error) =>{console.error("Conversion errro", error)});
},[wishlistState])
 
  return (
    <>
      <Meta title={"Wishlist"} />
      <BreadCrumb title="Wishlist" />
      <Container class1="wishlist-wrapper home-wrapper-2 py-5">
      {isLoading ? (
           <div className="loading-spinner-container">
           <div className="loading-spinner"></div>
         </div>
        ) : wishlistState?.length > 0 ?  (
        <div className="row">
          {
            wishlistState?.map((item,index) =>{
              return(
                <div className="col-3" key={index}>
                <div className="wishlist-card position-relative">
                  <img
                    onClick={() =>{
                      removeFormWishlist(item?._id);
                    }}
                    src="images/cross.svg"
                    alt="cross"
                    className="position-absolute cross img-fluid"
                  />
                  <div className="wishlist-card-image">
                    <img
                      src={
                        item?.images[0].url 
                          ? item?.images[0].url
                          : {product}
                      }
                      className="img-fluid w-100"
                      alt="watch"
                    />
                  </div>
                  <div className="py-3 px-3">
                    <h5 className="title">
                      {item?.title}
                    </h5>
                    <h6 className="price"> £ {item?.price} | Rs {converted[index]}</h6>
                  </div>
                </div>
              </div>
              );
            })}
          </div>
          ) : (
            <div>No any products added to wishlist. Please browse through our products.</div>
        )}
      </Container>
    </>
  );
};

export default Wishlist;
