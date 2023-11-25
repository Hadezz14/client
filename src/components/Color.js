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
                onClick={() => setColour(item)}
                style={{
                  backgroundColor: item,
                  border: isSelected ? "2px solid black" : "none",
                  boxShadow: isSelected ? "0 0 5px rgba(0, 0, 0, 0.7)" : "none",
                }}
                key={index}
              ></li>
            )
          })
        }
      </ul>
    </>
  );
};

export default Color;
