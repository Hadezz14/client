import React from 'react'
import tshirt from "../images/Blacktshirt.png"
import { Link } from 'react-router-dom'

const BigBanner = ({item}) => {
  console.log(item);
  return (
    <>
      <div className="main-banner position-relative ">
           <div>
          {
            item?.images && item.images[0] &&(
              // console.log(item?.images[0].public_id)
              <img
                src={item?.images[0].url}
                className="img-fluid rounded-3 banner-image"
                alt="main banner"
              />
            )
          }
    <div className="main-banner-content position-absolute">
      {/* <h4>{item?.price}</h4> */}
      <h5>{item?.title}</h5>
      
      <Link to={`/product/${item?._id}`}className="button">BUY NOW</Link>
    </div>
        </div>
  </div>
    </>
  )
}

export default BigBanner