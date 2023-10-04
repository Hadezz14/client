import React from 'react'
import BreadCrumb from '../components/BreadCrumb'
import Container from '../components/Container'
import Meta from '../components/Meta'

const ExchangePolicy = () => {
  return (
    <>
      <Meta title={"Term And Conditions"} />
      <BreadCrumb title="Exchange & Return Policy" />
      <Container className="policy-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <div className="policy">
              <h2>Return Policy</h2>
              <p>
                If you are a customer in the UK 
                or European Economic Area (EEA),
                you get 14 calendar days to cancel 
                your order because you have changed 
                your mind. This cancellation period 
                starts from the day you have received 
                all of the items in your order.
              </p>
              <p>
                If you receive faulty goods,
                you may also have a right 
                to return these goods and 
                to ask us to repair or 
                replace them or get a refund.
              </p>
              <ul>
                <li>Items must be returned within 28 days of receipt.</li>
                <li>Items must be unworn, unwashed and unused with the original labels still attached.</li>
                <li>Underwear and swimwear can only be returned if the hygiene seal has not been removed.</li>
                <li>Shoes must be tried on indoors.</li>
              </ul>
              <p>
              Where we suspect fraudulent activity, including but not limited to circumstances where there are suspicious claims relating to orders having been placed, but not received, or if we suspect that you are returning items after they have been used or worn, or items returned do not match what you ordered, we reserve the right to withhold refunds and block your account (and any associated accounts) from placing orders in future. If this happens to you and you think we’ve made a mistake, you can Contact Us and we will discuss the matter with you further.
              </p>
              
              <h4>How to Return an Item</h4>
              <h5>Faulty Goods</h5>
              <p>
                We’re really sorry to hear that you’ve received an item that’s not in perfect condition. So that we can get this fixed for you please head over to our Contact Us section.
              </p>
              <p>
                For an exchange or refund, you can contact the courier service through which you received the product.              
                </p>
              
            </div>
          </div>
        </div>
      </Container>
    </>
  )
}

export default ExchangePolicy