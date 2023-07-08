import React from "react";
import { Link } from "react-router-dom";

const FeedCard = () => {
  return (
    <div className="blog-card">
      <div className="card-image">
        <img src="images/blog-1.jpg" className="img-fluid w-100" alt="blog" />
      </div>
      <div className="blog-content">
        <p className="date">1 Dec, 2022</p>
        <h5 className="title">Feed Back</h5>
        <p className="desc">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque quaerat
          accusamus officia
        </p>
        
      </div>
    </div>
  );
};

export default FeedCard;
