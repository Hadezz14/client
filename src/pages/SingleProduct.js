import React, { useEffect, useState } from "react";
import ReactStars from "react-rating-stars-component";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import ProductCard from "../components/ProductCard";
import ReactImageZoom from "react-image-zoom";
import Color from "../components/Color";
import { AiOutlineHeart } from "react-icons/ai";
import { useLocation, useNavigate } from "react-router-dom";

import Container from "../components/Container";

import AddHovermenu from "../components/AddHover";
import { useDispatch, useSelector } from "react-redux";
import { addRating, getAProduct } from "../features/products/productSlice";
import { toast } from "react-toastify";
import { addProdToCart, getUserCart } from "../features/user/userSlice";

const SingleProduct = () => {
  const [colour,setColour] = useState(null)
  const [quantity,setQuantity] = useState(1)
  const [alreadyAdded,setAlreadyAdded] = useState(false);
  const location  = useLocation();
  const navigate = useNavigate();
  const getProductId = location.pathname.split("/")[2]
  const dispatch = useDispatch();
  const productState = useSelector((state) => state.product.singleproduct)
  const cartState = useSelector((state) => state.auth.cartProducts)
 
  useEffect(() =>{
    dispatch(getAProduct(getProductId))
    dispatch(getUserCart())
  },[])

  // useEffect(() =>{
  //   for (let index = 0; index < cartState.length; index++) {
  //     if(getProductId === cartState[index]?.productId?._id){
  //       setAlreadyAdded(true);
  //     } 
  //   }
  // })

  
  // const productSizes = ["S", "M", "L", "XL", "XXL"];
  // const [selectedSize, setSelectedSize] = useState(null);
  const uploadCart = () =>{
      if (colour === null){
        toast.error("Please Choose Color")
        return false
      }
      else{
        dispatch(addProdToCart({
          productId:productState?._id,
          colour,
          // size:selectedSize,
          price:productState?.price,
          quantity,
        }))
        dispatch(getUserCart())
      }
  }

  const props = {
    width: 594,
    height: 600,
    zoomWidth: 600,

    img: productState?.images[0].url ? productState?.images[0].url : "../images/vyamtshirt.png",
  };

  const [orderedProduct, setorderedProduct] = useState(true);
  
  const [star,setStar] = useState(null);
  const [comment,setComment] = useState(null);
  
  const addRatingtoProduct =() =>{
    if(star === null){
      toast.error("Please add star rating")
      return false
    }
    else if(comment === null){
      toast.error("Please Write Review about the product.")
      return false
    }
    else {
      dispatch(addRating({star:star,comment:comment,prodId:getProductId}))
      setTimeout(() =>{
        dispatch(getAProduct(getProductId))
      },100);
    }
    return false
  }

  
  return (
    <>
      <Meta title={"Product Name"} />
      <BreadCrumb title="Product Name" />
      <Container class1="main-product-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-6">
            <div className="main-product-image">
              <div>
                <ReactImageZoom {...props} />
              </div>
            </div>
            <div className="other-product-images d-flex flex-wrap gap-15">
                {productState?.images.map((item,index) =>{
                    return <div>
                    <img src={item?.url}
                    className="img-fluid"
                    alt=""
                  />
                    </div>
                })}
            </div>
          </div>
          <div className="col-6">
            <div className="main-product-details">
              <div className="border-bottom">
                <h3 className="title">
                  {productState?.title}
                </h3>
              </div>
              <div className="border-bottom py-3">
                <p className="price">Rs {productState?.price}</p>
                <div className="d-flex align-items-center gap-10">
                  <ReactStars
                    count={5}
                    size={24}
                    value={productState?.totalratings}
                    edit={false}
                    activeColor="#ffd700"
                  />
                  <p className="mb-0 t-review">( 2 Reviews )</p>
                </div>
                <a className="review-btn" href="#review">
                  Write a Review
                </a>
              </div>
              <div className=" py-3">
                <div className="d-flex gap-10 align-items-center my-2">
                  <h3 className="product-heading">Type :</h3>
                  <p className="product-data">Active ware</p>
                </div>
                <div className="d-flex gap-10 align-items-center my-2">
                  <h3 className="product-heading">Brand :</h3>
                  <p className="product-data">{productState?.Brand}</p>
                </div>
                <div className="d-flex gap-10 align-items-center my-2">
                  <h3 className="product-heading">Category :</h3>
                  <p className="product-data">{productState?.category}</p>
                </div>
                <div className="d-flex gap-10 align-items-center my-2">
                  <h3 className="product-heading">Availablity :</h3>
                  <p className="product-data">In Stock</p>
                </div>
                {/* <div className="d-flex gap-10 flex-column mt-2 mb-3">
                  <h3 className="product-heading">Size :</h3>
                  <div className="d-flex flex-wrap gap-15">
                    {
                      productSizes.map((size,index) =>{
                        <span 
                          key={index}
                          className={`badge border border-1 bg-white text-dark border-secondary
                            ${selectedSize === size ? "selected":""}
                          `}
                          onClick={()=>setSelectedSize(size)}
                          >
                          {size}
                        </span>
                      })
                    }
                    
                  </div>
                </div> */}
                {
                  alreadyAdded === false && <>
                  <div className="d-flex gap-10 flex-column mt-2 mb-3">
                  <h3 className="product-heading">Color :</h3>
                  <Color setColour = {setColour} colourData ={productState?.color} selectedColour={colour}/>

                </div>
                  </>
                }
                <div className="d-flex align-items-center gap-15 flex-row mt-2 mb-3">
                  {
                    alreadyAdded === false && <>
                    <h3 className="product-heading">Quantity :</h3>
                  <div className="">
                    <input
                      type="number"
                      name=""
                      min={1}
                      max={10}
                      className="form-control"
                      style={{ width: "70px" }}
                      id=""
                      onChange={(e)=> setQuantity(e.target.value)}
                      value={quantity}
                    />
                  </div>
                    </>
                  }
                  <div className={alreadyAdded?"ms-0":"ms -5"}>
                    <button
                      className="button border-0"
                      // data-bs-toggle="modal"
                      // data-bs-target="#staticBackdrop"
                      type="button"
                      onClick={() =>{alreadyAdded? navigate('/cart'):uploadCart()}}
                    >
                      {alreadyAdded ? "Go to Cart" :"Add to Cart"}
                    </button>
                    
                  </div>
                </div>
                <div className="d-flex align-items-center gap-15">
                  <div>
                    <a href="">
                      <AiOutlineHeart className="fs-5 me-2" /> Add to Wishlist
                    </a>
                  </div>
                </div>
                {/* <div className="d-flex gap-10 flex-column  my-3">
                  <h3 className="product-heading">Shipping & Returns :</h3>
                  <p className="product-data">
                    Free shipping and returns available on all orders! <br /> We
                    ship all US domestic orders within
                    <b>5-10 business days!</b>
                  </p>
                </div> */}
                
              </div>
            </div>
          </div>
        </div>
      </Container>
      <Container class1="description-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h4>Description</h4>
            <div className="bg-white p-3">
              <p dangerouslySetInnerHTML={{
                __html:productState?.title,
              }}>
      
              </p>
            </div>
          </div>
        </div>
      </Container>
      <Container class1="reviews-wrapper home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 id="review">Reviews</h3>
            <div className="review-inner-wrapper">
              <div className="review-head d-flex justify-content-between align-items-end">
                <div>
                  <h4 className="mb-2">Customer Reviews</h4>
                  <div className="d-flex align-items-center gap-10">
                    <ReactStars
                      count={5}
                      size={24}
                      value={4}
                      edit={false}
                      activeColor="#ffd700"
                    />
                    <p className="mb-0">Based on 2 Reviews</p>
                  </div>
                </div>
                {orderedProduct && (
                  <div>
                    <a className="text-dark text-decoration-underline" href="">
                      Write a Review
                    </a>
                  </div>
                )}
              </div>
              <div className="review-form py-4">
                <h4>Write a Review</h4>
                
                  <div>
                    <ReactStars
                      count={5}
                      size={24}
                      value={4}
                      edit={true}
                      activeColor="#ffd700"
                      onChange={(e) =>
                      setStar(e)}
                    />
                  </div>
                  <div>
                    <textarea
                      name=""
                      id=""
                      className="w-100 form-control"
                      cols="30"
                      rows="4"
                      placeholder="Comments"
                      onChange={(e) =>{
                        setComment(e.target.value)
                      }}
                    ></textarea>
                  </div>
                  <div className="d-flex justify-content-end mt-3">
                    <button className="button border-0" onClick={addRatingtoProduct} type="button" >Submit Review</button>
                  </div>
                
              </div>
              <div className="reviews mt-4">
                {
                  productState && productState.ratings?.map((item,index) =>{
                    return(
                      <div key={index} className="review">
                  <div className="d-flex gap-10 align-items-center">
                    {/* <h6 className="mb-0">{item?.}</h6> */}
                    <ReactStars
                      count={5}
                      size={24}
                      value={item?.star}
                      edit={false}
                      activeColor="#ffd700"
                    />
                  </div>
                  <p className="mt-3">
                    {item?.comment}
                  </p>
                </div>
                    )
                  })
                }
              </div>
            </div>
          </div>
        </div>
      </Container>
      <Container class1="popular-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">Our Popular Products</h3>
          </div>
        </div>
        <div className="row">
          <ProductCard />
        </div>
      </Container>

      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <AddHovermenu/>
      </div>
    </>
  );
};

export default SingleProduct;
