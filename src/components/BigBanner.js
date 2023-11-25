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
    <>
      {item ? (
        <StyledCard sx={{ maxWidth: 320 }}>
          <CardActionArea>
            <CardMedia
              component="img"
              sx={{ height: 165 }}
              image={item?.images[0].url}
              alt="img"
            />
            <CardContent>
              <Typography gutterBottom variant="body2" component="div">
                {item?.title}
              </Typography>
              <Button size="small" color="primary">
                <Link to={`/product/${item?._id}`}>Buy Now</Link>
              </Button>
            </CardContent>
          </CardActionArea>
        </StyledCard>
      ) : (
        <BigBannerSkeletonWrapper />
      )}
    </>
  );
};

export default BigBanner;
