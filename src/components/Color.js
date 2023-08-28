import React from "react";

const Color = (props) => {
  const {colourData,setColour} = props
  return (
    <>
      <ul className="colors ps-0">
        {
          colourData && colourData?.map((item,index) =>{
            return(
              <li onClick={() =>setColour(item)} style={{backgroundColor:item}} key={index}></li>
            )
          })
        }
      </ul>
    </>
  );
};

export default Color;
