import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const SmallBannerSkeletonWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 150px;
  background-color: gray;
  border-radius: 5px;
  margin-bottom: 20px;
`;

const SmallBannerContent = styled.div`
  position: absolute;
  top: 25%;
  left: 10%;
  background-color: rgba(255, 255, 255, 0.27); /* Adjust the alpha value as needed */
  padding: 10px;
  border-radius: 5px;
`;

const SmallBanner = ({ item }) => {
  return (
    <Link to={item ? `/product/${item?._id}` : `#`}>
      <div className="small-banner position-relative">
        {item ? (
          <>
            {item?.images && item.images[0] && (
              <img
                src={item?.images[0].url}
                className="img-fluid rounded-3 small-banner-image"
                alt="small Banner"
              />
            )}
            <SmallBannerContent className="small-banner-content">
              <h4>New</h4>
              <h5>{item?.title}</h5>
            </SmallBannerContent>
          </>
        ) : (
          <SmallBannerSkeletonWrapper />
        )}
      </div>
    </Link>
  );
};

export default SmallBanner;
