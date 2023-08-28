import React, { useEffect, useState } from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import ProductCard from "../components/ProductCard";
import Color from "../components/Color";
import Container from "../components/Container";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../features/products/productSlice";

const OurStore = () => {
  const [grid, setGrid] = useState(4);
  const productState = useSelector((state) => state.product.product) || [];
  const dispatch = useDispatch();
  useEffect(() => {
    getProducts();
  },[])
  
  const getProducts = () => {
    dispatch(getAllProducts());
  };
  const totalproducts = productState.length;
  const [selectedSorting, setSelectedSorting] = useState("manual");
  const sortedProducts = [...productState];
  if (selectedSorting === "title-ascending") {
    sortedProducts.sort((a, b) => a.title.localeCompare(b.title));
  } else if (selectedSorting === "title-descending") {
    sortedProducts.sort((a, b) => b.title.localeCompare(a.title));
  } else if (selectedSorting === "price-ascending") {
    sortedProducts.sort((a, b) => a.price - b.price);
  } else if (selectedSorting === "price-descending") {
    sortedProducts.sort((a, b) => b.price - a.price);
  } else if (selectedSorting === "created-ascending") {
    sortedProducts.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
  } else if (selectedSorting === "created-descending") {
    sortedProducts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  // const [selectedCategory, setSelectedCategory] = useState("");
  // const uniqueCategores = [...new Set(productState.map(product =>product.category))];
  
  // const filteredProducts = selectedCategory
  //   ? productState.filter(product => product.category === selectedCategory)
  //   : productState;
  
  return (
    <>
      <Meta title={"Our Store"} />
      <BreadCrumb title="Our Store" />
      <Container class1="store-wrapper home-wrapper-2 py-5">
        <div className="row">
          {/* <div className="col-3">
            <div className="filter-card mb-3">
              <h3 className="filter-title">Shop By Categories</h3>
              <div>
                <ul className="ps-0">
                  {
                    uniqueCategores.map((category,index) =>(
                      <li key={index}
                        onClick={() => setSelectedCategory(category)}
                        style={{ cursor: "pointer" }}
                      >{category}</li>
                    ))
                  }
                  
                </ul>
              </div>
            </div>
            <div className="filter-card mb-3">
              <h3 className="filter-title">Filter By</h3>
              <div>
                <h5 className="sub-title">Availablity</h5>
                <div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id=""
                    />
                    <label className="form-check-label" htmlFor="">
                      In Stock 
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id=""
                    />
                    <label className="form-check-label" htmlFor="">
                      Out of Stock
                    </label>
                  </div>
                </div>
                <h5 className="sub-title">Price</h5>
                <div className="d-flex align-items-center gap-10">
                  <div className="form-floating">
                    <input
                      type="email"
                      className="form-control"
                      id="floatingInput"
                      placeholder="From"
                    />
                    <label htmlFor="floatingInput">From</label>
                  </div>
                  <div className="form-floating">
                    <input
                      type="email"
                      className="form-control"
                      id="floatingInput1"
                      placeholder="To"
                    />
                    <label htmlFor="floatingInput1">To</label>
                  </div>
                </div>
                <h5 className="sub-title">Colors</h5>
                <div>
                  <Color />
                </div>
                <h5 className="sub-title">Size</h5>
                <div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="color-1"
                    />
                    <label className="form-check-label" htmlFor="color-1">
                      S (2)
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="color-2"
                    />
                    <label className="form-check-label" htmlFor="color-2">
                      M (2)
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
          <div className="col-12">
            <div className="filter-sort-grid mb-4">
              <div className="d-flex justify-content-between align-items-center">
                {/* <div className="d-flex align-items-center gap-10">
                  <p className="mb-0 d-block" style={{ width: "100px" }}>
                    Sort By:
                  </p>
                  <select
                    value={selectedSorting} // Bind to the selectedSorting state
                    onChange={(e) => setSelectedSorting(e.target.value)} // Update the selectedSorting state
                    className="form-control form-select"
                  >
                    
                    <option value="title-ascending">Alphabetically, A-Z</option>
                    <option value="title-descending">
                      Alphabetically, Z-A
                    </option>
                    <option value="price-ascending">Price, low to high</option>
                    <option value="price-descending">Price, high to low</option>
                    <option value="created-ascending">Date, old to new</option>
                    <option value="created-descending">Date, new to old</option>
                  </select>
                </div> */}
                <div className="d-flex align-items-center gap-10">
                  <p className="totalproducts mb-0">{totalproducts}Products</p>
                  <div className="d-flex gap-10 align-items-center grid">
                    <img
                      onClick={() => {
                        setGrid(3);
                      }}
                      src="images/gr4.svg"
                      className="d-block img-fluid"
                      alt="grid"
                    />
                    <img
                      onClick={() => {
                        setGrid(4);
                      }}
                      src="images/gr3.svg"
                      className="d-block img-fluid"
                      alt="grid"
                    />
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
            {/* <div className="products-list pb-5">
              <div className="d-flex gap-10 flex-wrap">
                {sortedProducts.map((product, index) => (
                  <ProductCard key={index} data={product} grid={grid} />
                ))}
              </div>
            </div> */}
            <div className="products-list pb-5">
              <div className="d-flex gap-10 flex-wrap">
                      
                
                    <ProductCard data={productState} grid ={grid}  />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default OurStore;
