import React, { useEffect } from "react";
import Container from "../components/Container";
import { services } from "../utils/Data";
import Carosal from "../components/Carosal";
import Feedbacks from "../components/Feedbacks";
import SmallBanner from "../components/smallBanner";
import BigBanner from "../components/BigBanner";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../features/products/productSlice";
import NewArivals from "../components/Products/NewArivals";
import ReactStars from "react-rating-stars-component";
import { Link, useLocation, useNavigate } from "react-router-dom";
import wish from "../images/wish.svg";
import tshirt2 from "../images/vyamtshirt.png";
import addcart from "../images/add-cart.svg";
import view from "../images/view.svg";
import { addToWishlist } from "../features/products/productSlice";

const Home = () => {
  const productState = useSelector((state) => state.product.product);
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() =>{
    getProducts();
  },[]);
  const getProducts =() =>{ 
    dispatch(getAllProducts());
  }
  const addToWish = (id) =>{
    dispatch(addToWishlist(id));
  };
  return (
    <>
      <Container class1="home-wrapper-1 py-5">
        <div className="row">
          <div className="col-6"> 
           <BigBanner/>
          </div>
          <div className="col-6">
            <div className="d-flex flex-wrap gap-10 justify-content-between align-items-center">    
              <SmallBanner/>
              <SmallBanner/>
            </div>
          </div>
        </div>
      </Container>
      <Container class1="home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div className="servies d-flex align-items-center justify-content-between">
              {services?.map((i, j) => {
                return (
                  <div className="d-flex align-items-center gap-15" key={j}>
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
      
      <Container class1="featured-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">New Arival</h3>
          </div>
          <div className="row">
          
            {productState &&
              productState?.map((item,index) =>{
                
                  return(
                    <div key={index} className={"col-3"}>
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
            ) })}
          </div>
        </div>
      </Container>
      {/* <Carosal/>
      <Feedbacks/> */}
    </>
  );
};

export default Home;
