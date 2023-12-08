import React from "react";

const Color = ({ colourData, setColour, selectedColour }) => {
  const handleColorClick = (color) => {
    setColour((prevColor) => (prevColor === color ? null : color));
  };
  return (
    <>
      <ul className="colors ps-0 ">
        {colourData &&
          colourData?.map((item, index) => {
            const isSelected = selectedColour === item;
            return (
              <li
                key={index}
                // onClick={() => setColour(isSelected ? null : item)}
                onClick={() => handleColorClick(item)}
                style={{
                  backgroundColor: item,
                  border: isSelected ? "2px solid black" : "none",
                  boxShadow: isSelected ? "0 0 5px rgba(0, 0, 0, 0.7)" : "none",
                }}
              ></li>
            );
          })}
      </ul>
    </>
  );
};

export default Color;
