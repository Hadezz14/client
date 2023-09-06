import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import tshirt from "../images/vyamtshirt.png";
import Container from "../components/Container";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as yup from 'yup';
import { applyDisCoupne, clearCart, clearUserCart, createUserOrder } from "../features/user/userSlice";
import { getAllCoupon } from "../features/coupon/couponSlice";

const shippingschema = yup.object({
  firstName: yup.string().required("Frist Name is Required"),
  lastName: yup.string().required("Last Name is Required"),
  address: yup.string().required("Address details are Required"),
  city: yup.string().required("City is Required"),
  pincode: yup.number().required("Pincode Number is Required"),   
});
 
const Checkout = () => {
  // React.useEffect(() =>{
  //   dispatch(getAllCoupon())
  // },[])

  const dispatch = useDispatch();
  const navigate =useNavigate();
  const orderState = useSelector((state) => state.auth.order)
  
  const cartState = useSelector((state) => state.auth.cartProducts)
  const userId = useSelector((state) =>state.auth.user._id);
 
  const [totalAmount,setTotalAmount] = useState(null);
  const [discountAmount,setDiscountamt] = useState(null);
 useEffect(() =>{
    let sum = 0;
    for (let index = 0; index < cartState?.length; index++) {
      sum = sum+(Number(cartState[index].quantity)*cartState[index].price)
      if((cartState[index].productId.discount)){
        let discount = Number((sum*(cartState[index].productId.discount)/100))
        setDiscountamt(discount);
      }
      setTotalAmount(sum)
    }
  },[cartState])
  const formik = useFormik({
    initialValues: { 
      shippingInfo:{
        firstName: "",
        lastName: "",
        address: "",
        city: "",
        other: "",
        pincode: "", 
      },
      totalPrice: 0,
    },
    // validationSchema: shippingschema,
    onSubmit: async (values) => {
     
      const orderedItems = cartState.map((item) =>({
        product: item.productId._id,
        color: item.productId.color[0],
        quantity: item.quantity,
        price: item.price,
      }))
      const orderData ={
        shippingInfo:{...values.shippingInfo},
        orderedItems: orderedItems,
        totalPrice: totalAmount,
        totalPriceAfterDiscount:totalAmount,
      };
      try {
        await dispatch(createUserOrder(orderData));
        
        // if(orderState.success === true){
        //   navigate("/order-confirm")
        //   dispatch(clearUserCart(userId))
        // }
        
      } catch (error) {
        console.error("Error creating order:", error);
      }
      
    }
  });

  useEffect(() => {
    if ( orderState !== null) {
      dispatch(clearUserCart(userId));
      navigate("/order-confirm");
    }
  }, [orderState]);

  // const [coupon,setCoupon] = useState("");
  
  // const [showInput, setShowInput] = useState(false);

  // const couponState = useSelector((state) => state.coupon.coupons)
  // console.log(couponState);
  // const handleApplyCoupon = () => {
  //   setShowInput(true);
  //   dispatch(applyDisCoupne(coupon))
  // };

  

  return (
    <>
      <Container class1="checkout-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-7">
            <div className="checkout-left-data">
              <h3 className="website-name">Check Out</h3>
              <nav
                style={{ "--bs-breadcrumb-divider": ">" }}
                aria-label="breadcrumb"
              >
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link className="text-dark total-price" to="/cart">
                      Cart
                    </Link>
                  </li>
                  &nbsp; /&nbsp;
                  <li
                    className="breadcrumb-ite total-price active"
                    aria-current="page"
                  >
                    Information
                  </li>
                  &nbsp; /
                  <li className="breadcrumb-item total-price active">
                    Shipping
                  </li>
                  &nbsp; /
                  <li
                    className="breadcrumb-item total-price active"
                    aria-current="page"
                  >
                    Payment
                  </li>
                </ol>
              </nav>
          
              <h4 className="mb-3">Shipping Address</h4>
              <form 
                onSubmit={formik.handleSubmit}
                action=""
                className="d-flex gap-15 flex-wrap justify-content-between"
                >
                
                <div className="flex-grow-1">
                  <input
                    type="text"
                    placeholder="First Name"
                    className="form-control"
                    name="shippingInfo.firstName"
                    value={formik.values.shippingInfo.firstName}
                    onChange={(event) => formik.handleChange(event)}
                    onBlur={formik.handleBlur("shippingInfo.firstName")}
                  />
                  <div className="error ms-2 my-1">
                      {
                        formik.touched.shippingInfo?.firstName  && formik.errors.shippingInfo?.firstName
                      }
                  </div>
                </div>
                <div className="flex-grow-1">
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="form-control"
                    name="shippingInfo.lastName"
                    value={formik.values.shippingInfo.lastName}
                    onChange={(event) => formik.handleChange(event)}
                    onBlur={formik.handleBlur("shippingInfo.lastName")}
                  />
                  <div className="error ms-2 my-1">
                      {
                        formik.touched.shippingInfo?.lastName && formik.errors.shippingInfo?.lastName
                      }
                  </div>
                </div>
                <div className="w-100">
                  <input
                    type="text"
                    placeholder="Address"
                    className="form-control"
                    name="shippingInfo.address"
                    value={formik.values.shippingInfo.address}
                    onChange={(event) => formik.handleChange(event)}
                    onBlur={formik.handleBlur("shippingInfo.address")}
                  />
                  <div className="error ms-2 my-1">
                      {
                        formik.touched.shippingInfo?.address && formik.errors.shippingInfo?.address
                      }
                  </div>
                </div>
                <div className="w-100">
                  <input
                    type="text"
                    placeholder="Apartment, Suite ,etc"
                    className="form-control"
                    name="shippingInfo.other"
                    value={formik.values.shippingInfo.other}
                    onChange={(event) => formik.handleChange(event)}
                    onBlur={formik.handleBlur("shippingInfo.other")}
                  />
          
                </div>
                <div className="flex-grow-1">
                  <input
                    type="text"
                    placeholder="City"
                    className="form-control"
                    name="shippingInfo.city"
                    value={formik.values.shippingInfo.city}
                    onChange={(event) => formik.handleChange(event)}
                    onBlur={formik.handleBlur("shippingInfo.city")}
                  />
                  <div className="error ms-2 my-1">
                      {
                        formik.touched.shippingInfo?.city && formik.errors.shippingInfo?.city
                      }
                  </div>
                </div>
                
                <div className="flex-grow-1">
                  <input
                    type="text"
                    placeholder="Zipcode"
                    className="form-control"
                    name="shippingInfo.pincode"
                    value={formik.values.shippingInfo.pincode}
                    onChange={(event) => formik.handleChange(event)}
                    onBlur={formik.handleBlur("shippingInfo.pincode")}
                  />
                  <div className="error ms-2 my-1">
                      {
                        formik.touched.shippingInfo?.pincode && formik.errors.shippingInfo?.pincode
                      }
                  </div>
                </div>
                <div className="w-100">
                  <div className="d-flex justify-content-between align-items-center">
                    <Link to="/cart" className="text-dark">
                      <BiArrowBack className="me-2" />
                      Return to Cart
                    </Link>
                    
                    <button className="button" type="submit">Order</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="col-5">
            <div className="border-bottom py-4">
              {
                cartState && cartState?.map((item,index) =>{
                  return(
                    <div className="d-flex gap-10 mb-2 align-align-items-center">
                <div className="w-75 d-flex gap-10">
                  <div className="w-25 position-relative">
                    <span
                      style={{ top: "-10px", right: "2px" }}
                      className="badge bg-secondary text-white rounded-circle p-2 position-absolute"
                    >
                      {item?.quantity}
                    </span>
                    <img height={100} width={100} src={item?.productId.images[0].url} alt="product" />
                  </div>
                  <div>
                    <h5 className="total-price">{item?.productId?.title}</h5>
                    <p className="total-price">{item?.colour?.title}</p>
                  </div>
                </div>
                <div className="flex-grow-1">
                  <h5 className="total">Rs {item?.price * item?.quantity}</h5>
                </div>
              </div>
                  )
                })
              }
              
            </div>
            <div className="border-bottom py-4">
              <div className="d-flex justify-content-between align-items-center">
                <p className="total">Subtotal</p>
                <p className="total-price">Rs {totalAmount?totalAmount : "0"}</p>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <p className="mb-0 total">Shipping</p>
                <p className="mb-0 total-price">Rs 100</p>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <p className="mb-0 total">Discount</p>
                <p className="mb-0 total-price">Rs {discountAmount?discountAmount:"0"}</p>
              </div>
            </div>
            <div className="d-flex justify-content-between align-items-center border-bootom py-4">
              <h4 className="total">Total</h4>
              <h5 className="total-price">Rs {(totalAmount-discountAmount) ? (totalAmount-discountAmount) + 100 : "0"}</h5>
            </div>
            <Link to="/product" className="button">
                      Continue to Shop
                    </Link>
          </div>
          {/* <div className="py-5">
      {showInput ? (
        <div>
          <input
            type="text"
            placeholder="Enter Coupon Code"
            value={coupon}
            onChange={(e) => setCoupon(e.target.value)}
          />
          <button className="button" onClick={() => handleApplyCoupon()}>
            Apply Coupon
          </button>
        </div>
      ) : (
        <button className="button" onClick={() => handleApplyCoupon()}>
          Apply Coupon
        </button>
      )}
    </div> */}
        </div>
      </Container>
    </>
  );
}

export default Checkout;
