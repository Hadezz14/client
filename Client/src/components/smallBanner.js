import React from 'react'

const SmallBanner = () => {
  return (
    <div className="small-banner position-relative">
    <img
      src="../images/Blacktshirt.png"
      className="img-fluid rounded-3"
      alt="main banner"
    />
    <div className="small-banner-content position-absolute">
      <h4>Best Deal</h4>
      <h5>Black T-shirt</h5>
      
    </div>
  </div>
  )
}

export default SmallBanner