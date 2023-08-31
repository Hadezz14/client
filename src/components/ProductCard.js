// import React from "react";
// import ReactStars from "react-rating-stars-component";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import wish from "../images/wish.svg";
// import tshirt2 from "../images/vyamtshirt.png";
// import addcart from "../images/add-cart.svg";
// import view from "../images/view.svg";
// import { useDispatch } from "react-redux";
// import { addToWishlist } from "../features/products/productSlice";

// const ProductCard = (props) => {
//   const {data, grid} = props;
//   const dispatch = useDispatch();
//   let location = useLocation();
//   const navigate = useNavigate();
 
//   const addToWish =(id) =>{
//     dispatch(addToWishlist(id));
//   };

//   return (
//     <>
//       {data?.map((item,index) => {
//         return(
//           <div
//             key={index}
//             className={` ${
//               location.pathname === "/product" ? `gr-${grid}` : "col-3"
//             } `}
//           >
        
//           <div
//           className="product-card position-relative"
//         >
//           <div className="wishlist-icon position-absolute">
//             <button 
//               className="border-0 bg-transparent" 
//               onClick={(e) =>{
//                 addToWish(item?._id);
//               }}>
//               <img src={wish} alt="wishlist" />
//             </button>
//           </div>
//           <Link
//              to={`/product/${item._id}`}
//           >
//           <div className="product-image">
//           {
//             item?.images && item.images[0]&&(
//             <img src={item?.images[0].url} className="img-fluid" alt="product image" />
//               )
//           }
//           <img src={item?.images[0].url} className="img-fluid" alt="product image" />
//           </div>
//           </Link>
//           <div className="product-details">
//             <h6 className="brand">{item?.brand}</h6>
//             <Link
//               to={`/product/${item._id}`}
//             > 
//             <h5 className="product-title">
//              {item?.title}
//             </h5>
//             </Link>
            
//             <ReactStars
//               count={5}
//               size={24}
//               value={item?.totalrating.toString()}
//               edit={false}
//               activeColor="#ffd700"
//             />
//             <p className={`description ${grid === 12 ? "d-block" : "d-none"}`}
//               dangerouslySetInnerHTML={{__html:item?.description }}
//             >
//             </p>
//             <p className="price">Rs {item?.price}</p>
//           </div>
//           <div className="action-bar position-absolute">
//             <div className="d-flex flex-column gap-15">
//               <button className="border-0 bg-transparent">
//                 <img onClick={()=>navigate("/product/"+item?._id)} src={view} alt="view" />
//               </button>
//               <button className="border-0 bg-transparent">
//                 <img onClick={() => navigate("/cart")} src={addcart} alt="addcart" />
//               </button>
              
//             </div>
//           </div>
//         </div>
//       </div>
//         )
//       })}  
//     </>
//   );
// };

// export default ProductCard;


import React from "react";
import ReactStars from "react-rating-stars-component";
import { Link, useLocation, useNavigate } from "react-router-dom";
import wish from "../images/wish.svg";
import addcart from "../images/add-cart.svg";
import view from "../images/view.svg";
import { useDispatch } from "react-redux";
import { addToWishlist } from "../features/products/productSlice";
import styled from "styled-components"; // Import styled-components

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
    object-fit: contain;
    width: 100%;
    height: 100%;
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

const ProductCard = (props) => {
  const { data, grid } = props;
  const dispatch = useDispatch();
  let location = useLocation();
  const navigate = useNavigate();

  const addToWish = (id) => {
    dispatch(addToWishlist(id));
  };

  return (
    <>
      {data?.map((item, index) => {
        return (
          <ProductCardWrapper
            key={index}
            className={` ${
              location.pathname === "/product" ? `gr-${grid}` : "col-3"
            } `}
          >
            <div className="product-card position-relative">
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
                <ProductImage>
                  {item?.images && item.images[0] && (
                    <img
                      src={item?.images[0].url}
                      className="img-fluid productcard-img"
                      alt="product image"
                    />
                  )}
                </ProductImage>
              </Link>
              <ProductDetails>
                <h6 className="brand">{item?.brand}</h6>
                <Link to={`/product/${item._id}`}>
                  <h5 className="product-title">{item?.title}</h5>
                </Link>
                <ReactStars
                  count={5}
                  size={20}
                  value={item?.totalrating.toString()}
                  edit={false}
                  activeColor="#ffd700"
                />
                <p
                  className={`description ${
                    grid === 12 ? "d-block" : "d-none"
                  }`}
                  dangerouslySetInnerHTML={{ __html: item?.description }}
                ></p>
                <p className="price">Rs {item?.price}</p>
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
      })}
    </>
  );
};

export default ProductCard;
