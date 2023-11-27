import React from "react";
import { Link } from "react-router-dom";
import { BsInstagram } from "react-icons/bs";
import { AiOutlineMail } from "react-icons/ai";
import { BiPhoneCall } from "react-icons/bi";
import { MdOutlineLocationOn } from "react-icons/md";

const Footer = () => {
  return (
    <footer className="py-4 text-white footer-txt">
      <div className="container-xxl">
        <div className="row">
          <div className="col-lg-4 col-md-6 col-sm-12 py-3">
            <h4 className="text-white mb-4">Contact Us</h4>
            <address className="text-white fs-6">
              <MdOutlineLocationOn className="fs-5 me-2" />
              Our location<br />
              Nepal
            </address>
            <a className="mt-3 d-block text-white">
              <BiPhoneCall className="fs-5 me-2" /> 
              Phone<br/>+977 984-9651409
            </a>
            <a
              className="mt-2 d-block mb-0 text-white"
            >
              <AiOutlineMail className="fs-5 me-2" />
              Email<br/>vyam.bdago8@gmail.com
            </a>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-12 py-3">
            <h4 className="text-white mb-4">Quick Links</h4>
            <nav className="footer-nav">
              <Link to="/" className="text-white text-decoration-none">
                Home
              </Link>
              <Link to="/product" className="text-white text-decoration-none">
                Shop
              </Link>
              <Link to="/contact" className="text-white text-decoration-none">
                Contact
              </Link>
            </nav>
          </div>
          <div className="col-lg-4 col-md-12 py-3">
            <h4 className="text-white mb-4">Follow Us</h4>
            <div className="social_icons d-flex gap-3">
              <a className="text-white" href="https://instagram.com/vyam_fitness_apparel?igshid=NzZlODBkYWE4Ng==">
                <BsInstagram className="fs-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
      <footer className="py-2 text-white text-center">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <p className="mb-0">
                &copy; {new Date().getFullYear()} Vyam
              </p>
            </div>
          </div>
        </div>
      </footer>
    </footer>
  );
};

export default Footer;
