import React, { useEffect, useState } from "react";
import ReactStars from "react-rating-stars-component";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";

import Color from "../components/Color";
import { AiOutlineHeart } from "react-icons/ai";
import { Link, useLocation, useNavigate } from "react-router-dom";

import Container from "../components/Container";

import AddHovermenu from "../components/AddHover";
import { useDispatch, useSelector } from "react-redux";
import {
  addRating,
  addToWishlist,
  getAProduct,
} from "../features/products/productSlice";
import { toast } from "react-toastify";
import { addProdToCart, getUserCart } from "../features/user/userSlice";
import { ConvertToPound } from "../components/ConvertToPound";
import { Helmet } from "react-helmet";
import SkeletonSingleProduct from "../components/Skeleton/SkeletonComponents";

const SingleProduct = () => {
  const loading = useSelector((state) => state.product.isLoading);
  const location = useLocation();
  const navigate = useNavigate();
  const getProductId = location.pathname.split("/")[2];
  const dispatch = useDispatch();
  const productState = useSelector((state) => state.product.singleproduct);
  const cartState = useSelector((state) => state.auth.cartProducts);
  const [alreadyAdded, setAlreadyAdded] = useState(false);
  const [colour, setColour] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    dispatch(getAProduct(getProductId));
    dispatch(getUserCart());
    setSelectedImage(null);
  }, []);
  const addToWish = (id) => {
    dispatch(addToWishlist(id));
  };
  console.log(colour);
  const [size, setSelectedSize] = useState(null);
  const uploadCart = () => {
    if (colour === null) {
      toast.error("Please Choose Color");
      return false;
    } else if (size === null) {
      toast.error("Select size");
      return false;
    } else {
      dispatch(
        addProdToCart({
          productId: productState?._id,
          colour,
          price: productState?.price,
          quantity,
          size,
        })
      );
      setTimeout(() => {
        dispatch(getUserCart());
      }, 20);
    }
  };
  const [orderedProduct, setorderedProduct] = useState(true);

  const [star, setStar] = useState(null);
  const [comment, setComment] = useState(null);

  const addRatingtoProduct = () => {
    if (star === null) {
      toast.error("Please add star rating");
      return false;
    } else if (comment === null) {
      toast.error("Please Write Review about the product.");
      return false;
    } else {
      dispatch(
        addRating({ star: star, comment: comment, prodId: getProductId })
      );
      setTimeout(() => {
        dispatch(getAProduct(getProductId));
      }, 100);
    }
    return false;
  };

  const [col, setCol] = useState(6);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 425) {
        setCol(6);
      } else {
        setCol(12);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const authState = useSelector((state) => state.auth);
  const currency = useSelector((state) => state.currency.currency);
  const [converteditemPrice, setConvertedItemPrice] = useState(null);

  useEffect(() => {
    const convertAmt = async () => {
      const convertedPrice = await ConvertToPound(productState?.price);
      setConvertedItemPrice(convertedPrice);
    };
    convertAmt();
  }, [currency, productState]);

  const [selectedImage, setSelectedImage] = useState(
    productState && productState?.images[0]?.url
  );

  return (
    <>
      {loading ? (
        <SkeletonSingleProduct />
      ) : (
        <>
          <Meta title={"Product Name"} />
          <Helmet>
            <title>{productState?.title}</title>
            <meta name="description" content={productState?.description} />
            <link rel="canonical" href="/product/:id" />
          </Helmet>
          <BreadCrumb title="Product Name" />
          <Container class1="main-product-wrapper py-3 home-wrapper-2">
            <div className="row">
              <div className={`col-md-${col}`}>
                <div className="main-product-image">
                  <img
                    src={selectedImage || productState?.images[0]?.url}
                    alt="main product"
                    className=""
                  />
                </div>
                <div className="other-product-images d-flex flex-wrap gap-15 pointer">
                  {productState?.images.map((item, index) => {
                    return (
                      <div
                        key={index}
                        onClick={() => setSelectedImage(item?.url)}
                      >
                        <img
                          src={item?.url}
                          className={`img-fluid ${
                            selectedImage === item?.url ? "selected" : ""
                          } pointer`}
                          alt=""
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className={`col-md-${col}`}>
                <div className="main-product-details">
                  <div className="border-bottom">
                    <h3 className="title">{productState?.title}</h3>
                  </div>
                  <div className="border-bottom ">
                    <p className="price">
                      {/* {
                    currency === "Rs" ? `Rs ${productState?.price}`:`£ ${converteditemPrice}`
                  } */}
                      £ {productState?.price} / Rs {converteditemPrice}
                    </p>
                    <div className="d-flex align-items-center gap-10">
                      <ReactStars
                        count={5}
                        size={24}
                        value={productState?.totalrating}
                        edit={false}
                        activeColor="#ffd700"
                      />
                      <p className="mb-0 t-review">
                        {" "}
                        ({productState?.ratings.length} ){" "}
                      </p>
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

                    {/* <div className="d-flex gap-10 align-items-center my-2">
                  <h3 className="product-heading">Brand :</h3>
                  <p className="product-data">{productState?.Brand}</p>
                </div> */}

                    <div className="d-flex gap-10 align-items-center my-2">
                      <h3 className="product-heading">Category :</h3>
                      <p className="product-data">{productState?.category}</p>
                    </div>
                    <div className="d-flex gap-10 align-items-center my-2">
                      <h3 className="product-heading">Availablity :</h3>
                      <p
                        className={`product-data ${
                          productState?.size.every(
                            (sizeItem) => sizeItem.quantity <= 0
                          )
                            ? "outOfStock"
                            : ""
                        }`}
                      >
                        {productState?.size.every(
                          (sizeItem) => sizeItem.quantity <= 0
                        )
                          ? "Out of Stock"
                          : "In Stock"}
                      </p>
                    </div>
                    <div className="d-flex gap-10 flex-column mt-2 mb-3">
                      <h3 className="product-heading">Size :</h3>
                      <div className="d-flex flex-wrap gap-15">
                        {productState?.size.map((sizeItem, index) => (
                          <span
                            key={index}
                            className={`productSize badge border border-1 bg-white text-dark border-secondary pointer
                            ${size === sizeItem.size ? "selected" : ""}
                            ${sizeItem.quantity <= 0 ? "outOfStock" : ""}
                          `}
                            onClick={() => {
                              if (sizeItem.quantity > 0) {
                                setSelectedSize(sizeItem.size);
                              }
                            }}
                          >
                            {sizeItem.size}{" "}
                            {sizeItem.quantity <= 0 && "(Out of Stock)"}
                          </span>
                        ))}
                      </div>
                      <Link to={"/size-chart"} className="sizeChart pointer">
                        View Size Chart
                      </Link>
                    </div>
                    {
                      <div className="d-flex gap-10 flex-column mt-2 mb-3">
                        <h3 className="product-heading">Color :</h3>
                        <Color
                          setColour={setColour}
                          colourData={productState?.color}
                          selectedColour={colour}
                        />
                      </div>
                    }
                    <div className="d-flex align-items-center gap-15 flex-row mt-2 mb-3">
                      {alreadyAdded === false && (
                        <>
                          <h3 className="product-heading">Quantity :</h3>
                          <div className="">
                            <input
                              type="number"
                              name=""
                              min={1}
                              max={10}
                              className={`form-control ${
                                alreadyAdded ? "w-100" : "w-55"
                              }`}
                              style={{ width: "70px" }}
                              id=""
                              onChange={(e) => setQuantity(e.target.value)}
                              value={quantity}
                            />
                          </div>
                        </>
                      )}
                      <div className={alreadyAdded ? "ms-0" : "ms -5"}>
                        <button
                          className={`button border-0 ${
                            alreadyAdded ? "btn-success" : "btn-primary"
                          }`}
                          type="button"
                          onClick={() => {
                            if (authState?.user === null) {
                              navigate("/login");
                            } else {
                              uploadCart();
                            }
                          }}
                        >
                          {alreadyAdded ? "Go to Cart" : "Add to Cart"}
                        </button>
                      </div>
                    </div>
                    <div className="d-flex align-items-center gap-15">
                      <div>
                        <div
                          onClick={() => {
                            addToWish(productState?._id);
                          }}
                        >
                          <AiOutlineHeart className="fs-5 me-2" /> Add to
                          Wishlist
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Container>
          <Container class1="description-wrapper py-3 home-wrapper-2">
            <div className="row">
              <div className="col-12">
                <h4>Description</h4>
                <div className="bg-white p-3">
                  <p
                    dangerouslySetInnerHTML={{
                      __html: productState?.title,
                    }}
                  ></p>
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
                          value={productState?.totalrating}
                          edit={false}
                          activeColor="#ffd700"
                        />
                        <p className="mb-0">
                          Based on {productState?.ratings.length} Reviews
                        </p>
                      </div>
                    </div>
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
                        onChange={(e) => setStar(e)}
                      />
                    </div>
                    <div
                      className={`mt-md-0 mt-3 ${
                        alreadyAdded ? "d-none" : "d-md-block"
                      }`}
                    >
                      <textarea
                        name=""
                        id=""
                        className="w-100 form-control"
                        cols="30"
                        rows="4"
                        placeholder="Comments"
                        onChange={(e) => {
                          setComment(e.target.value);
                        }}
                      ></textarea>
                    </div>
                    <div className="d-flex justify-content-end mt-3">
                      <button
                        className={`button border-0 ${
                          alreadyAdded ? "btn-success" : "btn-primary"
                        }`}
                        onClick={() => {
                          if (authState?.user === null) {
                            navigate("/login");
                          } else {
                            addRatingtoProduct();
                          }
                        }}
                        type="button"
                      >
                        Submit Review
                      </button>
                    </div>
                  </div>
                  <div className="reviews mt-4">
                    {productState &&
                      productState.ratings?.map((item, index) => {
                        return (
                          <div key={index} className="review">
                            <div className="d-flex gap-10 align-items-center">
                              <h6 className="mb-0">{item?.user}</h6>

                              <ReactStars
                                count={5}
                                size={24}
                                value={item?.star}
                                edit={false}
                                activeColor="#ffd700"
                              />
                            </div>

                            <p className="mt-3">{item?.comment}</p>
                          </div>
                        );
                      })}
                  </div>
                </div>
              </div>
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
            <AddHovermenu />
          </div>
        </>
      )}
    </>
  );
};

export default SingleProduct;
