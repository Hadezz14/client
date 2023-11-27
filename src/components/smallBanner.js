import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const SmallBannerWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 250px;
  background-color: #f4f4f4;
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 20px;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }

  .small-banner-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 10px;
  }
`;

const SmallBannerContent = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
  color: #fff;
  padding: 20px;
  border-radius: 0 0 10px 10px;
  text-align: center;
  transition: opacity 0.3s ease-in-out;

  h4 {
    font-size: 18px;
    margin-bottom: 5px;
    font-weight: bold;
  }

  h5 {
    font-size: 18px;
    font-weight: normal;
    line-height: 1.2;
    color: wheat;
  }
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
      <SmallBannerWrapper className="small-banner position-relative">
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
              <h4>New Arrival</h4>
              <h5>{item?.title}</h5>
            </SmallBannerContent>
          </>
        ) : (
          <div className="skeleton-placeholder"></div>
        )}
      </SmallBannerWrapper>
    </Link>
  );
};

export default SmallBanner;
