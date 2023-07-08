import React from "react";
import ReactStars from "react-rating-stars-component";
import { Link, useLocation } from "react-router-dom";
import wish from "../images/wish.svg";
import tshirt1 from "../images/Blacktshirt.png";
import tshirt2 from "../images/vyamtshirt.png";
import addcart from "../images/add-cart.svg";
import view from "../images/view.svg";

const ProductCard = (props) => {
  const { grid, data } = props;
  
  let location = useLocation();

  return (
    <>
      {data?.map((item,index) => {
        return(
          <div
            key={index}
            className={` ${
              location.pathname == "/product" ? `gr-${grid}` : "col-3"
            } `}
          >
        <Link
          to={`${
            location.pathname == "/"
              ? "/product/:id"
              : location.pathname == "/product/:id"
              ? "/product/:id"
              : ":id"
          }`}
          className="product-card position-relative"
        >
          <div className="wishlist-icon position-absolute">
            <button className="border-0 bg-transparent">
              <img src={wish} alt="wishlist" />
            </button>
          </div>
          <div className="product-image">
            <img src={tshirt1} className="img-fluid" alt="product image" />
            <img src={tshirt2} className="img-fluid" alt="product image" />
          </div>
          <div className="product-details">
            <h6 className="brand">{item?.brand}</h6>
            <h5 className="product-title">
             {item?.title}
            </h5>
            <ReactStars
              count={5}
              size={24}
              value={4}
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
              <Link to={"/product/:id"} ><button className="border-0 bg-transparent">
                <img src={view} alt="view" />
              </button>
              </Link>

              <Link to={"/cart"}>
              <button className="border-0 bg-transparent">
                <img src={addcart} alt="addcart" />
              </button>
              </Link>
              
            </div>
          </div>
        </Link>
      </div>
        )
      })}  
    </>
  );
};

export default ProductCard;
