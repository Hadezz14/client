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
  
  const handleAddToWishlist = (productId) => {
    dispatch(addToWishlist(productId));
  };
  const firstFourProducts = productState.slice(0, 4);
  const latestProduct = productState.slice(0,2);

  const [col,setCol] = useState(12);
  useEffect(() =>{
    const handleResize =() =>{
      if(window.innerWidth <= 425){
        setCol(12)
      }
      else if(window.innerWidth <=768){
        setCol(6)
      }
      else{
        setCol(3)
      }
    };
    window.addEventListener("resize",handleResize);
    return ()=>{
      window.removeEventListener("resize",handleResize)
    }
  },[])
  


  return (
    <>
      <Container class1="home-wrapper-1 py-3">
        <div className="row">
          {
            latestProduct?.map((item,index) =>(
              <div key={index} className="col-6"> 
                <BigBanner
                  item ={item}
                /> 
              </div>
            ))
          }
          <div className="row py-4">
          {
            firstFourProducts?.map((item,index) =>(
              <div className={`col-3`}>
            
            <div className="d-flex flex-wrap gap-10 justify-content-between align-items-center">    
              <SmallBanner
                item ={item}
              />
              </div>
            
          </div>
            ))
          }
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
      
      <Container class1="featured-wrapper py-3 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">New Arival</h3>
            <div className="row">
              {/* <HomeProductCard/> */}
            {
              firstFourProducts?.map((item,index) =>(
                <div key={index} className={`col-${col}`}>
             
                  <HomeProductCard
                    item={[item]}
                   onAddToWishlist={handleAddToWishlist} 
                  />
                  </div>
                  
               
              ))}
          </div>
          </div>
          
        </div>
      </Container>
    </>
  );
};

export default Home;
