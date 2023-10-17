import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const BigBannerSkeletonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: gray;
  padding: 5px;
  border-radius: 5px;
  width: 100%;
  height: 300px; /* Set a fixed height for the skeleton banner */
  margin-bottom: 20px;
  div {
    height: 20px;
    background-color: gray; 
    margin-bottom: 10px;
  }
`;
const BigBanner = ({ item }) => {

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#c9c9c9",
        padding: "5px",
        borderRadius: "5px",
      }}
    >
      {item? (
        <div style={{ flex: "4" }}>
          {item?.images && item.images[0] && (
            <img
              src={item?.images[0].url}
              className="img-fluid rounded-3 banner-image"
              alt="main banner"
            />
          )}
        </div>
      ) : (
        <BigBannerSkeletonWrapper/>
      )}

      {item && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            borderRadius: "5px",
          }}
        >
          <h5>{item?.title}</h5>

          <Link
            to={`/product/${item?._id}`}
            style={{
              backgroundColor: "black",
              color: "white",
              padding: "8px 15px",
              borderRadius: "5px",
              fontSize: "8px",
              marginBottom: "5px",
            }}
          >
            BUY NOW
          </Link>
        </div>
      )}
    </div>
  );
};

export default BigBanner;
