import React from 'react'
import Meta from '../components/Meta'
import BreadCrumb from '../components/BreadCrumb'
import Container from '../components/Container'
import errorimg from '../images/error404.png'
import { Link } from 'react-router-dom'
const Errorpage = () => {
  return (
    <>
    <Meta title={"Error page"}/>
    <BreadCrumb title ={"Error page"}/>
    <Container>
        <div>
            <Link to={"/"}>
            <img className='errorimg' src={errorimg}/>
            </Link>
        </div>
    </Container>
    </>
    
  )
}

export default Errorpage