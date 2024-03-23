import React from 'react'
import Searchbar from '../../components/Searchbar/Searchbar'
import "./Property.css";
import  data  from "../../utils/slider.json";
import PropertyCard from '../../components/Propertycard/PropertyCard';

const Property = () => {
  return (
    <div className='text-white wrapper'>
      <div className='flexColCenter padding innerWidth properties-container'>
       <Searchbar/>
      </div>

      <div className='paddings flexCenter p-16 hover:shadow-orange-950' >
        {
            data.map((card,i)=>(<PropertyCard card={card} key={i}/>))
        }
      </div>

    </div>
  )
}

export default Property