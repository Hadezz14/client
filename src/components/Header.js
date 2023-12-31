import React, { useEffect, useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { AiFillHeart, AiOutlineLogout, AiOutlineUser } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import cart from "../images/cart.svg";
import menu from "../images/menu.svg";
import logo from "../images/Vyamlogo2.png";
import { useDispatch, useSelector } from "react-redux";
import { handleLogout } from "../utils/axiosConfig";
import { toggleCurrency } from "../features/currency/currencySlice";
import styled from "styled-components";

const ResponsiveNavLink = styled(NavLink)`
  font-size: 14px;

  @media (max-width: 576px) {
    font-size: 12px;
  }
  @media (max-width: 375px) {
    font-size: 10px;
  }
`;

const Header = () => {
  const dispatch = useDispatch();
  const cartState = useSelector((state) => state?.auth?.cartProducts);
  const authState = useSelector((state) => state.auth);

  const [showMenu, setShowMenu] = useState(false);
  const [showButton, setShowButton] = useState(false);


  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    handleLogout();
    window.location.reload();
    navigate("/login");
  };

  const currency = useSelector((state) => state.currency.currency);

  const handleCurrencyToggle = () => {
    dispatch(toggleCurrency());
  };

  useEffect(() => {
    const handleResize = () => {
      setShowButton(window.innerWidth <= 520);
    };
  
    // Attach the event listener when the component mounts
    window.addEventListener("resize", handleResize);
  
    // Initialize the state based on the initial screen size
    handleResize();
  
    // Detach the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const closeMenuOnOutsideClick = (event) => {
      // Check if the click is outside the menu and not the hamburger button
      if (
        showMenu &&
        event.target.closest(".hamburger-menu") === null &&
        event.target.closest(".hamburger") === null
      ) {
        setShowMenu(false);
      }
    };

    // Attach the event listener when the component mounts
    document.addEventListener("click", closeMenuOnOutsideClick);

    // Detach the event listener when the component unmounts
    return () => {
      document.removeEventListener("click", closeMenuOnOutsideClick);
    };
  }, [showMenu])

  return (
    <>
      <header className="header-upper py-3" style={{ marginTop: "0" }}>
        <div className="container">
          <div className="row align-items-center justify-content-between">
            <div className="col-md-3 col-6 text-center mb-3 mb-md-0">
              <Link to={"/"} className="text-white">
                <img className="logo" src={logo} alt="Logo" />
              </Link>
            </div>

            <div className="headMenu col-md-9 col-6">
              <div className="header-upper-links d-flex align-items-center justify-content-end gap-3">
                <Link
                  to="/wishlist"
                  className="d-flex align-items-center text-white"
                >
                  <AiFillHeart color="black" size={30} />
                  <p className="mb-0 header-txt ms-2">
                    Favourite
                    <br />
                    wishlist
                  </p>
                </Link>

                <Link
                  to={authState?.user === null ? "/login" : ""}
                  className="d-flex align-items-center text-white mx-2"
                >
                  <AiOutlineUser color="black" size={30} />
                  <p className="mb-0">
                    {authState?.user === null
                      ? "Log in My Account"
                      : `Welcome ${authState?.user?.firstname}`}
                  </p>
                </Link>

                <Link
                  to="/cart"
                  className="cart d-flex align-items-center text-white"
                >
                  <img src={cart} alt="cart" width="30" />
                  <span className="badge0">
                    {cartState?.length ? cartState?.length : 0}
                  </span>
                </Link>

                {authState?.user !== null && (
                  // Render the Logout link when a user is logged in
                  <Link
                    to="#"
                    onClick={handleLogoutClick}
                    className="d-flex align-items-center text-white mx-2"
                  >
                    <AiOutlineLogout color="black" size={30} />
                  </Link>
                )}
              </div>
            </div>
            <button className="hamburger bg-none" onClick={toggleMenu}>
              <GiHamburgerMenu />
              <span className="badge1">
                {cartState?.length ? cartState?.length : 0}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Hamburger menu */}
      {showMenu && (
        <div className="hamburger-menu">
          <Link to="/wishlist" className="d-flex align-items-center text-white">
            <AiFillHeart color="white" size={30} />
            <p className="mb-0 header-txt ms-2">Favourite wishlist</p>
          </Link>
          
          <Link to="/cart" className="d-flex align-items-center text-white">
            <img src={cart} alt="cart" width="30" />
            <span className="badge0">
              {cartState?.length ? cartState?.length : 0}
            </span>
          </Link>
          {authState?.user !== null && (
            // Render the Logout link when a user is logged in
            <Link
              to="#"
              onClick={handleLogoutClick}
              className="d-flex align-items-center text-white mx-2"
            >
              <AiOutlineLogout color="white" size={27} /> Logout
            </Link>
          )}
        </div>
      )}

      <header className="header-bottom py-3">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="menu-bottom d-flex align-items-center justify-content-between">
                <div className="dropdown">
                  <button
                    className="btn btn-secondary dropdown-toggle bg-transparent border-0 gap-15 d-flex align-items-center"
                    type="button"
                    id="dropdownMenuButton1"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <img src={menu} alt="menu" />
                  </button>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuButton1"
                  >
                    <li>
                      <Link className="dropdown-item text-white" to="/">
                        Home
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item text-white" to="/product">
                        Our Store
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item text-white" to="/orders">
                        My Orders
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item text-white" to="/contact">
                        Contact
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="dropdown-item text-white"
                        to="/return-policy"
                      >
                        Exchange policy
                      </Link>
                    </li>
                  </ul>
                </div>

                <div className="menu-links">
                  <div className="d-flex align-items-center gap-15">
                    <ResponsiveNavLink className="navtxt" to="/">
                      Home
                    </ResponsiveNavLink>
                    <ResponsiveNavLink className="navtxt" to="/product">
                      Our Store
                    </ResponsiveNavLink>
                    <ResponsiveNavLink className="navtxt" to="/orders">
                      My Order
                    </ResponsiveNavLink>
                    <ResponsiveNavLink className="navtxt" to="/contact">
                      Contact
                    </ResponsiveNavLink>
                    <ResponsiveNavLink className="navtxt" to="/return-policy">
                      Exchange policy
                    </ResponsiveNavLink>
                 
                  </div>
                </div>
                {showButton && (
                  <Link
                  to={authState?.user === null ? "/login" : ""}
                  className="d-flex align-items-center text-white mx-2"
                >
                  <AiOutlineUser color="white" size={20} />
                  <p className="mb-0">
                    {authState?.user === null
                      ? "Log in"
                      : `Welcome ${authState?.user?.firstname}`}
                  </p>
                </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
