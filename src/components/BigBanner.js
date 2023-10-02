import React from 'react'
import { Link } from 'react-router-dom'

const BigBanner = ({item}) => {
  console.log(item);
  return (
  
  <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",backgroundColor:"#c9c9c9",padding:"5px",borderRadius:"5px"
  }}>
    <div style={{flex:"4"}}>
    {
            item?.images && item.images[0] &&(
               <img
                 src={item?.images[0].url}
                 className="img-fluid rounded-3 banner-image"
                 alt="main banner"
               />
             )
           }
      
    </div>
    <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",width:"100%", borderRadius:"5px"}}>
    <h5>{item?.title}</h5>
      
          <Link to={`/product/${item?._id}`} style={{backgroundColor:"black",color:"white", padding:"8px 15px",borderRadius:"5px",fontSize:"8px",marginBottom:"5px"}}>BUY NOW</Link>
    </div>

    
  </div>
  )
}

export default BigBanner