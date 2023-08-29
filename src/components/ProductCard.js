import React from "react";
import ReactStars from "react-rating-stars-component";
import { Link, useLocation, useNavigate } from "react-router-dom";
import wish from "../images/wish.svg";
import tshirt2 from "../images/vyamtshirt.png";
import addcart from "../images/add-cart.svg";
import view from "../images/view.svg";
import { useDispatch } from "react-redux";
import { addToWishlist } from "../features/products/productSlice";

const ProductCard = (props) => {
  const {data, grid} = props;
  const dispatch = useDispatch();
  let location = useLocation();
  const navigate = useNavigate();
 
  const addToWish =(id) =>{
    dispatch(addToWishlist(id));
  };

  return (
    <>
      {data?.map((item,index) => {
        return(
          <div
            key={index}
            className={` ${
              location.pathname === "/product" ? `gr-${grid}` : "col-3"
            } `}
          >
        
          <div
          className="product-card position-relative"
        >
          <div className="wishlist-icon position-absolute">
            <button 
              className="border-0 bg-transparent" 
              onClick={(e) =>{
                addToWish(item?._id);
              }}>
              <img src={wish} alt="wishlist" />
            </button>
          </div>
          <div className="product-image">
          {
            item?.images && item.images[0]&&(
            <img src={item?.images[0].url} className="img-fluid" alt="product image" />
              )
          }
          <img src={item?.images[0].url} className="img-fluid" alt="product image" />
          </div>
          <div className="product-details">
            <h6 className="brand">{item?.brand}</h6>
            <Link
              to={`/product/${item._id}`}
            > 
            <h5 className="product-title">
             {item?.title}
            </h5>
            </Link>
            
            <ReactStars
              count={5}
              size={24}
              value={item?.totalrating.toString()}
              edit={false}
              activeColor="#ffd700"
            />
            <p className={`description ${grid === 12 ? "d-block" : "d-none"}`}
              dangerouslySetInnerHTML={{__html:item?.description }}
            >
            </p>
            <p className="price">Rs {item?.price}</p>
          </div>
          <div className="action-bar position-absolute">
            <div className="d-flex flex-column gap-15">
              <button className="border-0 bg-transparent">
                <img onClick={()=>navigate("/product/"+item?._id)} src={view} alt="view" />
              </button>
              <button className="border-0 bg-transparent">
                <img onClick={() => navigate("/cart")} src={addcart} alt="addcart" />
              </button>
              
            </div>
          </div>
        </div>
      </div>
        )
      })}  
    </>
  );
};

export default ProductCard;
