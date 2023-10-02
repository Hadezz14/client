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
              <h4>Cancelling a Contract Under the Consumer Contracts Regulations</h4>
              <p>
                If you’re a customer in the UK or EEA, you get 14 days to cancel your contract with us. This two-week period starts from the day after you receive your order (or from the day after you receive the last item of your order). You’ll need to write to us with notice of your cancellation – just fill out this form where you’ll also find details on how to return your item(s).
              </p>
              <p>
                There are a couple of other ways to cancel your contract with us. You’ll find these alternative methods below:
              </p>
              <ul>
                <li>Email us: </li>
                <li>Write to us via post: </li>
              </ul>
              <p>
                If you’re cancelling your contract with us but have already received your order, you’ll need to return the item(s) to us, see how to do this below. You'll then receive a full refund as per the policy above. Please note, we cannot offer refunds on swimwear and lingerie if the hygiene seal is not in place or has been broken.
              </p>
              <p>
                All returns are quality checked – items should be returned in a new and unused condition with labels attached and wherever possible sent back in the original packaging. Refunds will not be given if they do not comply with our returns policy.
              </p>
              <h4>How to Return an Item</h4>
              <h5>Faulty Goods</h5>
              <p>
                We’re really sorry to hear that you’ve received an item that’s not in perfect condition. So that we can get this fixed for you please head over to our Contact Us section.
              </p>
              <p>
                To help us get this fixed for you ASAP, when you first contact us please include the following information:
              </p>
              <ul>
                <li>Your name</li>
                <li>Order number</li>
                <li>Product name and code</li>
                <li>Picture of the fault</li>
                <li>Description of the fault</li>
              </ul>
              <p>
                If you contact us via the 'Contact Us' form please have an image of the faulty item ready for when you receive a reply as you won’t be able to attach the image on the form just yet.
              </p>
              <h4>How Long Does It Take to Process My Return?</h4>
              <p>
                Please note we've extended our returns to 28 days so a typical refund may take longer than usual. Customers will receive a refund within 14 days of us receiving the item(s) or, in the event that we do not receive your returned item(s), within 14 days of you providing us with proof of return via one of our chosen carriers. It could then take up to 7 additional days for the refund to make its way through the banking system. If you paid for your order with a gift card, store credit, or a voucher, a replacement to the value of the refund will be issued minus the cost of £1.99 for returning the item to us. If we receive your return outside of the returns policy timeframe, you may receive your refund as a voucher. This will be emailed to you within 24 hours.
              </p>
              <p>
                We’ll be sure to keep you updated and send you an email as soon as your parcel arrives back at our warehouse, and again when we have processed your refund. If you choose to return via any method other than one of our chosen carriers (options given when arranging a return via our portal above), you will remain responsible for the item(s) until we receive them, and we will not be liable for providing a refund if we do not receive your item(s).
              </p>
              <p>
                Unfortunately, we don't offer an exchange facility. Simply return your item(s) and reorder for a replacement. Your refund will be processed once we've received your unwanted items.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </>
  )
}

export default ExchangePolicy