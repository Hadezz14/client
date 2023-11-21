import React, { useEffect, useState } from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import ProductCard from "../components/ProductCard";
import Container from "../components/Container";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../features/products/productSlice";
import { Helmet } from "react-helmet";

const OurStore = () => {
  const [grid, setGrid] = useState(12);
  const productState = useSelector((state) => state.product.product) || [];
  const dispatch = useDispatch();
  useEffect(() => {
    getProducts();
  },[])
  
  const getProducts = () => {
    dispatch(getAllProducts());
  };

  const totalproducts = productState.length;

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >=1024) {
        setGrid(3);
      } else if (window.innerWidth <= 1024 && window.innerWidth >=768 ){
        setGrid(6);
      }
      else{
        setGrid(12);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  
  return (
    <>
      <Meta title={"Our Store"} />
      <Helmet>
        <title>Explore Premium Gymwear and Sportswear at Vyam Store</title>
        <meta name="description" content="Discover an extensive collection of high-quality gymwear and sportswear. Shop a wide range of athletic apparel designed for peak performance and style."/>
        <link rel="canonical" href="/product"/>
      </Helmet>
      <BreadCrumb title="Our Store" />
      <Container class1="store-wrapper home-wrapper-2 py-5">
        <div className="row">
          
          <div className="col-12">
            <div className="filter-sort-grid mb-4">
              <div className="d-flex justify-content-between align-items-center">
               
                <div className="d-flex align-items-center gap-10">
                  <p className="totalproducts mb-0">{totalproducts}Products</p>
                  <div className="d-flex gap-10 align-items-center grid">
                    <img
                      onClick={() => {
                        setGrid(6);
                      }}
                      src="images/gr2.svg"
                      className="d-block img-fluid"
                      alt="grid"
                    />

                    <img
                      onClick={() => {
                        setGrid(12);
                      }}
                      src="images/gr.svg"
                      className="d-block img-fluid"
                      alt="grid"
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="products-list pb-5">
              <div className={`row gr-8`}>
                  {
                    productState.map((item,index) =>(
                      <div key={index} className={`col-3 gr-${grid}`}>
                        <ProductCard data={[item]} grid ={grid}  />
                      </div>
                    ))
                  }
                
                    
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}

export default OurStore;
