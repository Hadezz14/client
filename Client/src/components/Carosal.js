import React from 'react'
import Marquee from 'react-fast-marquee'
import CorosalContainer from './CarosalContainer'
import tshirt from '../images/vyamtshirt.png';
const Carosal = () => {
  return (
    <CorosalContainer className="marque-wrapper home-wrapper-2 py-2" style={{height: '10px'}}>
        <div className="row">
          <div className="col-sm-12 ">
            <div className="marquee-inner-wrapper card-wrapper">
              <Marquee className="d-flex">
              <div className="carosal-image">
                <img src={tshirt} className="img-fluid" alt="product image" />
                </div>
                <div className="carosal-image">
                <img src={tshirt} className="img-fluid" alt="product image" />
                </div>
                <div className="carosal-image">
                <img src={tshirt} className="img-fluid" alt="product image" />
                </div>
                <div className="carosal-image">
                <img src={tshirt} className="img-fluid" alt="product image" />
                </div>
                <div className="carosal-image">
                <img src={tshirt} className="img-fluid" alt="product image" />
                </div>
                <div className="carosal-image">
                <img src={tshirt} className="img-fluid" alt="product image" />
                </div>
                <div className="carosal-image">
                <img src={tshirt} className="img-fluid" alt="product image" />
                </div>
              </Marquee>
            </div>
          </div>
        </div>
      </CorosalContainer>
  )
}

export default Carosal