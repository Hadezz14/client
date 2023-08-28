import React from 'react'
import { Link } from 'react-router-dom'

const BigBanner = () => {
  return (
    <div className="main-banner position-relative ">
    <img
      src="../images/vyamtshirt.png"
      className="img-fluid rounded-3"
      alt="main banner"
    />
    <div className="main-banner-content position-absolute">
      <h4>Active ware</h4>
      <h5>Black T-shirt</h5>
      
      <Link to={'/product'} className="button">BUY NOW</Link>
    </div>
  </div>
  )
}

export default BigBanner