import React from 'react'

import styled from 'styled-components';

const BigBannerSkeleton = styled.div`
  width: 100%;
  height: 300px;
  background-color: #f0f0f0;
`;
const SmallBannerSkeleton = styled.div`
  width: 100px;
  height: 100px;
  background-color: #f0f0f0;
`;

const HomeProductCardSkeleton = styled.div`
  width: 100%;
  height: 400px;
  background-color: #f0f0f0;
`;

const SkeletonProductDetailsWrapper = styled.div`
  width: 100%;
  height: 100px;
  background-color: gray;
  border-radius: 5px;
  margin: 20px;
`;
const SkeletoncontentWrapper = styled.div`
justify-content: center;
height:80%;
width: 80%;
`;


const SkeletonProductImagesWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  border-radius: 5px;
  margin: 20px;
`;

const SkeletonProductBigImage = styled.div`
  width: 80%;
  height: 200px;
  background-color: gray;
  border-radius: 5px;
  margin: 20px
`;

const SkeletonProductImage = styled.div`
  width: 50px;
  height: 50px;
  background-color: gray;
  border-radius: 5px;
`;
const SkeletonDetailsWrapper = styled.div`
  width: 80%;
  height: 100px;
  border-radius: 5px;
  margin: 20px;
`;
const SkeletonDetail1 = styled.div`
  width: 75%;
  height: 10px;
  background-color: gray;
  margin: 5px;
`;
const SkeletonDetail2 = styled.div`
  width: 50%;
  height: 10px;
  background-color: gray;
  margin: 5px;
`;

const SkeletonReviewsWrapper = styled.div`
  width: 80%;
  height: 100px;
  background-color: gray;
  border-radius: 5px;
  margin: 20px;
`;

const SkeletonSingleProduct = () => {
  return (
    <>
    <SkeletoncontentWrapper>
    <SkeletonProductBigImage />
    <SkeletonProductImagesWrapper>
      <SkeletonProductImage />
      <SkeletonProductImage />
    </SkeletonProductImagesWrapper>
    <SkeletonDetailsWrapper>
      <SkeletonDetail1/>
      <SkeletonDetail1/>
      <SkeletonDetail1/>
      <SkeletonDetail2/>
      <SkeletonDetail2/>
      <SkeletonDetail2/>
      <SkeletonDetail2/>
    </SkeletonDetailsWrapper>
    <SkeletonReviewsWrapper/>
    </SkeletoncontentWrapper>
    
    </>
  );
};

export default SkeletonSingleProduct;



