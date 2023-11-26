import React from "react";
import { Link } from "react-router-dom";
import { BsFacebook, BsGithub, BsYoutube, BsInstagram } from "react-icons/bs";

const Footer = () => {
  return (
    <>
      <footer className="py-4">
        <div className="container-xxl">
          <div className="row">
            <div className="col-4 py-3">
              <h4 className="text-white mb-4">Contact Us</h4>
              <div>
                <address className="text-white fs-6">
                  Our location<br />
                  Nepal
                </address>
                <a
                  
                  className="mt-3 d-block mb-1 text-white"
                >
                  Phone<br/>+977 984-9651409
                </a>
                <a
                 
                  className="mt-2 d-block mb-0 text-white"
                >
                  Email<br/>vyam.bdago8@gmail.com
                </a>
                <div className="social_icons d-flex align-items-center gap-30 mt-4">
                  <a className="text-white" href="#">
                    <BsFacebook className="fs-4" />
                  </a>
                  <a className="text-white" href="#">
                    <BsInstagram className="fs-4" />
                  </a>
                </div>
              </div>
            </div>
            <div className="col-3 py-3">
              <h4 className="text-white mb-4">Account</h4>
              <div className="footer-link d-flex flex-column">
                <Link className="text-white py-2 mb-1">About Us</Link>
                <Link className="text-white py-2 mb-1">Faq</Link>
                <Link className="text-white py-2 mb-1">Contact</Link>
              </div>
            </div>
           
          </div>
        </div>
      </footer>
      <footer className="py-4">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <p className="text-center mb-0 text-white">
                &copy; {new Date().getFullYear()}; Vyam
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
