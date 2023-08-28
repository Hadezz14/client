import React from 'react'
import Meta from '../components/Meta'
import BreadCrumb from '../components/BreadCrumb'
import Container from '../components/Container'
import order from '../images/order-confirmed.png';
import { Link } from 'react-router-dom';
const OrderConformation = () => {
  return (
    <>
    <Meta title={"Order Confirm"}/>
    <BreadCrumb title="Order Confirm" />
    <Container>
          <Link to={"/product"}> 
          <img src={order}/>
          </Link>        
    </Container>
    </>
  )
}

export default OrderConformation