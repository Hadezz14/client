import React from 'react'
import Container from './Container'
import FeedCard from './FeedCard'

const Feedbacks = () => {
  return (
    <Container class1="blog-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">Feed Backs</h3>
          </div>
        </div>
        <div className="row">
          <div className="col-3">
            <FeedCard/>
          </div>
          <div className="col-3">
          <FeedCard/>
          </div>
          <div className="col-3">
          <FeedCard/>
          </div>
          <div className="col-3">
          <FeedCard/>
          </div>
        </div>
      </Container>
  )
}

export default Feedbacks