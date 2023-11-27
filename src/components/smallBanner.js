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
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.50); /* Adjust the alpha value as needed */
  padding: 10px;
  border-radius: 5px;
  width: 100%;

  @media (max-width: 767px) {
    font-size:12px;
    padding: 5px;
  }

  @media (min-width: 768px) and (max-width: 991px) {
    font-size:14px;
  }

  @media (min-width: 992px) and (max-width: 1199px) {
    font-size:18px;
  }

  @media (min-width: 1200px) {
    width: 100%; /* Adjust as needed */
  }
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
