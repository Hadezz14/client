import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";

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
const StyledCard = styled(Card)`
  width: 100%;
  height: 300px;
  @media (min-width: 600px) {
    max-width: 320px;
  }
  @media (min-width: 760px) and (max-width: 1440px) {
    max-width: 50%;
  }
  @media (min-width: 1440px) {
    max-width: 70%;
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
        height:"500px",
        textAlign: "center"
      }}
    >
      {item? (
        <Link to={`/product/${item?._id}`}>

        <div style={{ flex: "4" }}>
          {item?.images && item.images[0] && (
            
            <img
              src={item?.images[0].url}
              className="img-fluid rounded-3 banner-image"
              alt="main banner"
            />
          )}
        </div>
        </Link>
      ) : (
        <BigBannerSkeletonWrapper />
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
              fontSize: "15px",
              marginBottom: "10px",
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
