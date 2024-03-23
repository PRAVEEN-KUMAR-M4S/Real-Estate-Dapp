import React from 'react'
import "./PropertyCard.css";
import { useNavigate } from 'react-router-dom';

const PropertyCard = ({card,property}) => {

  const navigate=useNavigate();
  return (
    <div onClick={()=>navigate(`../${property}/${card.productId}`)} className="blue-glassmorphism r-card">
 
    <img src={card.images} alt="cardimage" />
    
    <span className='flex justify-start mt-3 mb-3  r-price'>
        
        <span style={{color:"#fff"}}>{card.price} </span>
        <span style={{color:"orange"}}>MATIC</span>

        
        
    </span>
 
    <div className='r-content'>
    <h4 className='primaryText'>{card.propertyTitle}</h4>
    <h4 className='secondaryText mt-2'>{card.category}</h4> 
    <h4 className='secondaryText mt-2'>{card.description.slice(0,100)}.....</h4>
    
    </div>
</div>
  )
}

export default PropertyCard