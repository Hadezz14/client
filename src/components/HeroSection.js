import { NavLink } from "react-router-dom";
import styled from "styled-components";
import hero_img from "../images/vyamtshirt.png";
import { MDBBtn } from "mdb-react-ui-kit";
import { Link } from 'react-router-dom';
import { useEffect, useRef } from "react";
import Typed from 'typed.js';



const HeroSection = () => {
  const el = useRef(null);

  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: ["Elevate your fitness, embody the GOAT spirit. Unleash greatness with our exclusive fitness-focused clothing, blending style and performance. At VyamStore, we're committed to empowering your journey towards peak performance. Be the GOAT - Where Style Meets Strength, and every workout becomes a step towards your greatest version"], // Add your text here
      typeSpeed: 10,
      startDelay: 500,
    });

    return () => {
      typed.destroy();
    };
  }, []);
  return (
    <Wrapper>
      <div className="container">
        <div className="grid grid-two-column">
          <div className="hero-section-data">
            <p className="intro-data">Welcome to </p>
            <h1> Vyam Store </h1>
            <p ref={el}></p>
            <NavLink>
              <Link to="/product">
                <MDBBtn color="primary" style={{marginTop: "10px", width:"300px"}}>Shop Now</MDBBtn>
              </Link>            
            </NavLink>
          </div>
          {/* our homepage image  */}
          <div className="hero-section-image">
            <figure>
              <img
                src={hero_img}
                alt="hero-section-photo"
                className="img-style"
              />
            </figure>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  padding: 0;

  .grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10rem;
  }

  img {
    width: 17rem;
    height: 4rem;
  }

  .hero-section-data {
    p {
      margin: 2rem 0;
      text-align: justify;
    }

    h1 {
      text-transform: capitalize;
      font-weight: bold;
    }

    .intro-data {
      margin-bottom: 0;
    }
  }

  .hero-section-image {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  figure {
    position: relative;
    margin-top: 2rem;

    &::after {
      content: "";
      width: 60%;
      height: 80%;
      background-color: #807d7e;
      position: absolute;
      left: 45%;
      top: -1rem;
      z-index: -1;
    }
  }
  .img-style {
    width: 100%;
    height: auto;
  }

  @media (max-width: 435px) {
    .grid {
      grid-template-columns: 1fr;
      gap: 6rem;
    }
    .hero-section-image {
      width: 75%;
      height: 50%;
      justify-content: center;
      align-items: center;
    }

    figure::after {
      content: "";
      width: 80%;
      height: 100%;
      left: 30%;
      top: 10%;
      bottom: 10%;
    }
  }
`;

export default HeroSection;
