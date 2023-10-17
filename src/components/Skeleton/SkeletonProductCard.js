import React from 'react'
import styled from 'styled-components'

const SkeletonProductCardWrapper = styled.div`
    padding: 15px;
    background-color: white;
    border-radius: 10px;
    overflow: hidden;
    width: 100%;
    height: 450px; 
    margin-bottom: 20px;
`;

const SkeletonProductImage = styled.div`
  height: 270px;
  background-color: gray;
`;
const SkeletonProductDetails = styled.div`
  margin-top: 20px;
  div {
    height: 20px;
    background-color: gray; 
    margin-bottom: 10px;
  }
`;
const SkeletonProductCard = () => {
  return (
    <SkeletonProductCardWrapper>
      <SkeletonProductImage />
      <SkeletonProductDetails>
        <div></div>
        <div></div>
        <div></div>
      </SkeletonProductDetails>
    </SkeletonProductCardWrapper>
  )
}

export default SkeletonProductCard