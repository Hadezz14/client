import React from "react";
import Container from "../components/Container";
import { services } from "../utils/Data";
import Carosal from "../components/Carosal";
import NewArivals from "../components/Products/NewArivals";
import Feedbacks from "../components/Feedbacks";
import SmallBanner from "../components/smallBanner";
import BigBanner from "../components/BigBanner";

const Home = () => {
  return (
    <>
      <Container class1="home-wrapper-1 py-5">
        <div className="row">
          <div className="col-6"> 
           <BigBanner/>
          </div>
          <div className="col-6">
            <div className="d-flex flex-wrap gap-10 justify-content-between align-items-center">    
              <SmallBanner/>
              <SmallBanner/>
            </div>
          </div>
        </div>
      </Container>
      <Container class1="home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div className="servies d-flex align-items-center justify-content-between">
              {services?.map((i, j) => {
                return (
                  <div className="d-flex align-items-center gap-15" key={j}>
                    <img src={i.image} alt="services" />
                    <div>
                      <h6>{i.title}</h6>
                      <p className="mb-0">{i.tagline}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
      
      <NewArivals/>
      <Carosal/>
      <Feedbacks/>
    </>
  );
};

export default Home;
