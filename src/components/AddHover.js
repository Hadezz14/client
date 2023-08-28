import React from 'react'
import tshrit from "../images/vyamtshirt.png";
import { Link } from 'react-router-dom';

const AddHovermenu = () => {
    const closeModal = () => {};
    return (
    <div className="modal-dialog modal-dialog-centered ">
          <div className="modal-content">
            <div className="modal-header py-0 border-0">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body py-0">
              <div className="d-flex align-items-center">
                <div className="flex-grow-1 w-50">
                  <img src={tshrit} className="img-fluid" alt="product imgae" />
                </div>
                <div className="d-flex flex-column flex-grow-1 w-50">
                  <h6 className="mb-3">Black Tshirt</h6>
                  <p className="mb-1">Quantity: 1</p>
                  <p className="mb-1">Color: Black</p>
                  <p className="mb-1">Size: XL</p>
                </div>
              </div>
            </div>
            <div className="modal-footer border-0 py-0 justify-content-center gap-30">
              <Link to={"/cart"} >
              <button type="button" className="button" data-bs-dismiss="modal">
                View My Cart
              </button>
              </Link>
              <Link to={"/checkout"} >
              <button type="button" className="button signup">
                Checkout
              </button>
              </Link>
        
            </div>
            <div className="d-flex justify-content-center py-3">
              <Link
                className="text-dark"
                to="/product"
                onClick={() => {
                  closeModal();
                }}
              >
                Continue To Shopping
              </Link>
            </div>
          </div>
        </div>
  )
}

export default AddHovermenu