import React, { useEffect, useState } from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";

import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import Container from "../components/Container";
import { useDispatch, useSelector } from "react-redux";
import {
  clearUserCart,
  deleteCartProduct,
  getUserCart,
  updateCartProduct,
} from "../features/user/userSlice";
import emptyCart from "../images/empty-cart.jpg";
import { ConvertToPound } from "../components/ConvertToPound";
const Cart = () => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getUserCart());
  }, []);

  const [productUpdateDetail, setProductUpdateDetail] = useState(null);
  const [totalAmount, setTotalAmount] = useState(null);
  const useCartState = useSelector((state) => state.auth.cartProducts);

  const userId = useSelector((state) => state.auth.user._id);

  useEffect(() => {
    if (productUpdateDetail !== null) {
      dispatch(
        updateCartProduct({
          cartItemId: productUpdateDetail?.cartItemId,
          quantity: productUpdateDetail?.quantity,
        })
      );
      setTimeout(() => {
        dispatch(getUserCart());
      }, 200);
    }
  }, [productUpdateDetail]);

  const deleteACartProduct = (id) => {
    dispatch(deleteCartProduct(id));
    setTimeout(() => {
      dispatch(getUserCart());
    }, 200);
  };

  const currency = useSelector((state) => state.currency.currency);
  const [convertedPrices, setConvertedPrices] = useState([]);
  const [convertedSubtotal, setConvertedSubTotal] = useState(null);

  useEffect(() => {
    let subTotal = 0;
    for (let index = 0; index < useCartState?.length; index++) {
      subTotal +=
        Number(useCartState[index].quantity) * useCartState[index].price;
    }
    setTotalAmount(subTotal);

    const conversionPrmoiseTotal = [ConvertToPound(subTotal)];
    Promise.all(conversionPrmoiseTotal)
      .then((converted) => {
        setConvertedSubTotal(converted[0]);
      })
      .catch((error) => console.error("Conversion error:", error));
    const conversionPromise = useCartState?.map((item) =>
      ConvertToPound(item?.price)
    );
    Promise.all(conversionPromise)
      .then((conversionPrices) => {
        setConvertedPrices(conversionPrices);
      })
      .catch((error) => console.error("Conversion error", error));
  }, [currency, useCartState]);
  return (
    <>
      <Meta title={"Cart"} />
      <BreadCrumb title="Cart" />
      <Container class1="cart-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            {useCartState?.length === 0 ? (
              <div className="text-center">
                <p>Your cart is empty. Add items to start shopping!</p>
                <img src={emptyCart} alt="Emptry Cart" className="img-fluid" />
              </div>
            ) : (
              <div>
                <div className="cart-header py-3 d-flex justify-content-between align-items-center">
                  <h4 className="cart-col-1">Product</h4>
                  <h4 className="cart-col-2">Price</h4>
                  <h4 className="cart-col-3">Quantity</h4>
                  <h4 className="cart-col-4">Total</h4>
                </div>
                {useCartState &&
  useCartState?.map((item, index) => {
    if (item?.productId !== null) {
      return (
        <div
          key={index}
          className="cart-data py-3 mb-3 d-flex justify-content-between align-items-center"
          >
          <div className="cart-col-1 gap-15 d-flex align-items-center">
            <div className="w-25">
              {item?.productId.images &&
                item.productId.images[0] && (
                  <img
                    src={item?.productId.images[0].url}
                    className="img-fluid"
                    alt="product image"
                  />
                )}
            </div>
            <div className="w-75">
              <div>
                <p>{item?.productId.title}</p>
              </div>
              <div className="d-flex gap-2">
                <p>Color:</p>
                <ul className="colors ps-0">
                  {item?.productId.color.map((color, index) => (
                    <li
                      key={index}
                      style={{ backgroundColor: color }}
                    ></li>
                  ))}
                </ul>
              </div>
              <p>Size: {item?.size}</p>
            </div>
          </div>
          <div className="cart-col-2">
            <div className="price">
              £ {item?.price}
            </div>
            <p>|</p>
            <div className="nepaliPrice">
            Rs {convertedPrices[index]}
            </div>
          </div>
          <div className="cart-col-3 d-flex align-items-center gap-20">
            <div>
              <input
                className="form-control styled-input"
                type="number"
                min={1}
                max={10}
                value={
                  productUpdateDetail?.quantity
                    ? productUpdateDetail?.quantity
                    : item?.quantity
                }
                onChange={(e) => {
                  setProductUpdateDetail({
                    cartItemId: item?._id,
                    quantity: e.target.value,
                  });
                }}
                disabled
                // style={{ width: '48px', textAlign: 'center' }} 
              />
            </div>
            <div style={{ marginLeft: '10px' }}>
  <AiFillDelete
    onClick={() => {
      deleteACartProduct(item?._id);
    }}
    className="text-danger dlt-product"
  />
</div>

          </div>
          <div className="cart-col-4">
            <div className="price">
              £ {item?.price * item?.quantity}
            </div>
            <p>|</p>
            <div className="nepaliPrice">
            Rs {convertedPrices[index] * item?.quantity}
            </div>
          </div>
        </div>
      );
    }
    return null;
  })}


                {useCartState &&
                  useCartState?.map((item, index) => {
                    if (item?.productId === null) {
                      return (
                        <div className="text-center">
                          <p>
                            {" "}
                            Another Product you have added doesn't exist Please
                            Clear the cart to continue !
                          </p>

                          <button
                            className="button"
                            onClick={() => dispatch(clearUserCart(userId))}
                          >
                            Clear Cart
                          </button>
                        </div>
                      );
                    }
                    return null;
                  })}
                <div className="col-20 py-10 mt-2">
                  <div className="d-flex justify-content-between align-items-baseline">
                    {(totalAmount !== null || totalAmount !== 0) && (
                      <div className="d-flex flex-column ">
                        <h4>
                          SubTotal:
                          {/* {
                    currency === "Rs" ? `Rs ${totalAmount}`:`£ ${convertedSubtotal}`
                  } */}
                          £ {totalAmount} / Rs {convertedSubtotal}
                        </h4>
                        <p>Taxes and shipping calculated at checkout</p>
                      </div>
                    )}
                    <Link to="/checkout" className="button">
                      Checkout
                    </Link>
                  </div>
                </div>
              </div>
            )}
            <Link to="/product" className="button ">
              Continue To Shopping
            </Link>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Cart;
