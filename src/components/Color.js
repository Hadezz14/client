import React from "react";

const Color = (props) => {
  const {colourData,setColour,selectedColour} = props
  return (
    <>
      <ul className="colors ps-0 ">
        {
          colourData && colourData?.map((item,index) =>{
            const isSelected = selectedColour === item;
            return(
              <li
               onClick={() =>setColour(item)} 
               style={{backgroundColor:item,
                border: isSelected ? "2px solid white" : "none",
                }}
                key={index}>
                
                
              </li>
            )
          })
        }
      </ul>
    </>
  );
};

export default Color;
