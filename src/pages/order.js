import React, { useEffect, useState } from "react";
import Container from "../components/Container";
import BreadCrumb from "../components/BreadCrumb";
import { useDispatch, useSelector } from "react-redux";
import {
  canclemyOrder,
  canclemyOrderItem,
  getOrders,
} from "../features/user/userSlice";

import {
  MDBCard,
  MDBCardBody,
  MDBCardFooter,
  MDBCardHeader,
  MDBCardImage,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";
import { AiOutlineDelete } from "react-icons/ai";
import { ConvertToPound } from "../components/ConvertToPound";

const Order = () => {
  const dispatch = useDispatch();
  const orderState = useSelector((state) => state?.auth?.user?.orders);
  const isLoading = useSelector((state) => state?.auth?.isLoading);

  const [itemremoveDetails, setItemremoveDetails] = useState(null);
  const currency = useSelector((state) => state?.currency?.currency);
  const [convertedPrices, setConvertedPrices] = useState([]);
  const [convertedTotalPrice, setConvertedTotalPrice] = useState([]);
  useEffect(() => {
    const convertPrices = async () => {
      try {
        const conversionPromise = orderState?.map(async (item) => {
          const total = await ConvertToPound(item?.totalPrice);
          const items = await Promise.all(
            item?.orderedItems?.map(async (i) => ConvertToPound(i?.price))
          );
          return { total, items };
        });
        const convertedResults = await Promise.all(conversionPromise);
        setConvertedTotalPrice(convertedResults.map((result) => result.total));
        setConvertedPrices(convertedResults.map((result) => result.items));
      } catch (error) {
        console.error("Converison error:", error);
      }
    };
    convertPrices();
  }, [currency, orderState]);
  useEffect(() => {
    myorders();
  }, []);

  const myorders = () => {
    dispatch(getOrders());
  };

  const cancleOrder = async (orderId, status) => {
    try {
      await dispatch(canclemyOrder({ orderId, status }));
      dispatch(getOrders());
    } catch (error) {
      console.log("Error", error);
    }
  };

  useEffect(() => {
    if (itemremoveDetails !== null) {
      dispatch(
        canclemyOrderItem({
          orderId: itemremoveDetails?.orderId,
          itemId: itemremoveDetails?.itemId,
        })
      );
      dispatch(getOrders());
    }
  }, [itemremoveDetails]);

  return (
    <>
      <BreadCrumb title="My Orders" />
      <>
        <section className="gradient-custom-2 overflow-auto">
          {isLoading ? (
            <div className="loading-spinner-container">
            <div className="loading-spinner"></div>
          </div>
          ) : orderState?.length > 0 ? (
            orderState?.map((item, index) => {
              let statusColorClass = "";
              switch (item.OrderStatus) {
                case "Cancelled":
                  statusColorClass = "text-danger";
                  break;
                case "Pending":
                  statusColorClass = "text-primary"; // Blue
                  break;
                case "Dispatched":
                  statusColorClass = "text-success"; // Green
                  break;
                case "Delivered":
                  statusColorClass = "text-success"; // Green
                  break;
                default:
                  break;
              }
              return (
                <MDBContainer key={index} className="py-2 h-20">
                  <MDBCard
                    className="card-stepper"
                    style={{ borderRadius: "15px" }}
                  >
                    <MDBCardHeader className="p-4">
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <p className="text-muted mb-1">
                            {" "}
                            Order ID:{" "}
                            <span className="fw-bold text-body">
                              {item?._id}
                            </span>
                          </p>
                          <p className="text-muted mb-2">
                            {" "}
                            Total Price:{" "}
                            <span className="fw-bold text-body">
                            £ {item?.totalPrice} | Rs {convertedTotalPrice[index]}
                            </span>
                          </p>
                        </div>
                        <div>
                          <MDBTypography tag="h6" className="mb-0">
                            {" "}
                            <a className={`£{statusColorClass}`}>
                              {item?.OrderStatus}
                            </a>{" "}
                          </MDBTypography>
                        </div>
                      </div>
                    </MDBCardHeader>
                    {item?.orderedItems?.map((i, index) => {
                      return (
                        <MDBCardBody key={index} className="p-4">
                          <div className="d-flex flex-row mb-4 pb-2">
                            <div className="flex-fill">
                              <MDBTypography tag="h6" className="bold">
                                {i?.product?.title}
                              </MDBTypography>
                              <p className="text-muted">
                                {" "}
                                Qt:{i?.quantity} {""}
                                {item?.OrderStatus === "Pending" && (
                                  <AiOutlineDelete
                                    onClick={() => {
                                      setItemremoveDetails({
                                        orderId: item?._id,
                                        itemId: i?._id,
                                      });
                                    }}
                                    className="text-danger"
                                  />
                                )}
                              </p>
                              <MDBTypography tag="h5" className="mb-3">
                                {" "}
                                £{i?.price} | Rs {convertedPrices[index]}
                              </MDBTypography>
                            </div>
                            <div>
                              <MDBCardImage
                                fluid
                                className="align-self-center"
                                src={i?.product?.images[0].url}
                                width="100"
                              />
                            </div>
                          </div>
                        </MDBCardBody>
                      );
                    })}
                    {item?.OrderStatus === "Pending" && (
                      <MDBCardFooter className="p-4">
                        <div className="d-flex justify-content-between">
                          <div className="border-start h-100"></div>
                          <MDBTypography tag="h5" className="fw-normal mb-0">
                            <a
                              className="text-danger"
                              onClick={() => cancleOrder(item?._id, "Cancelled")}
                            >
                              Cancel
                            </a>
                          </MDBTypography>
                          <MDBTypography
                            tag="h5"
                            className="fw-normal mb-0"
                          ></MDBTypography>
                        </div>
                      </MDBCardFooter>
                    )}
                  </MDBCard>
                </MDBContainer>
              );
            })
          ) : (
            <MDBContainer className="py-2 h-20">
              <MDBCard className="card-stepper" style={{ borderRadius: "15px" }}>
                <MDBCardBody className="p-4">
                  <MDBTypography tag="h6" className="mb-0">
                    No any Orders, please browse and shop our products.
                  </MDBTypography>
                </MDBCardBody>
              </MDBCard>
            </MDBContainer>
          )}
        </section>
      </>
    </>
  );
          }

export default Order;
