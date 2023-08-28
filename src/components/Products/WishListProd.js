import React from 'react'
import Container from '../Container'
import product from '../../images/vyamtshirt.png'
const WishListProd = () => {
  return (
    <Container class1="wishlist-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-3">
            <div className="wishlist-card position-relative">
              <img
                src="images/cross.svg"
                alt="cross"
                className="position-absolute cross img-fluid"
              />
              <div className="wishlist-card-image">
                <img
                  src={product}
                  className="img-fluid w-100"
                  alt="watch"
                />
              </div>
              <div className="py-3 px-3">
                <h5 className="title">
                  Black T-shirt
                </h5>
                <h6 className="price">$ 100</h6>
              </div>
            </div>
          </div>
          
          
        </div>
      </Container>
  )
}

export default WishListProd