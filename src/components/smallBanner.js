import React from 'react'
import { Link } from 'react-router-dom'

const SmallBanner = ({item}) => {
  return (
    <Link to={`/product/${item?._id}`}>
          <div className="small-banner position-relative">
          {item?.images && item.images[0] && (
            <img
              src={item?.images[0].url}
              className="img-fluid rounded-3 small-banner-image"
              alt='small Banner'   
            />
          )}
          <div className="small-banner-content position-absolute">
            <h4>Best Deal</h4>
            <h5>{item?.title}</h5>
            
          </div>
        </div>
          </Link>
  )
}

export default SmallBanner