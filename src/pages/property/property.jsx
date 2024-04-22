import React from 'react'
import Searchbar from '../../components/Searchbar/Searchbar'
import "./Property.css";
import  data  from "../../utils/slider.json";
import PropertyCard from '../../components/Propertycard/PropertyCard';
import { useStateContext } from "../../context/index";
import { useState,useEffect } from "react";
import Loader from '../../components/Loader/Loader';

const Property = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [properties, setproperties] = useState([]);
  const [filter, setFilter] = useState("");

  const {address,getAllPropertyData,contract}=useStateContext();
  const fetchProperty=async()=>{
  
    setIsLoading(true)
    console.log("Fetching data")
    const data=await getAllPropertyData();
    setproperties(data)
    setIsLoading(false)

   
  }

   
  useEffect(() => {
    if(contract) fetchProperty()
  }, [address,contract])

  if(isLoading){
    return <Loader/>
  }

  return (
    <div className='text-white wrapper'>
      <div className='flexColCenter padding innerWidth properties-container'>
       <Searchbar filter={filter} setFilter={setFilter}/>
      </div>

      <div className='paddings flexCenter p-16 hover:shadow-orange-950' >
        {
            // properties.map((card,i)=>(<PropertyCard card={card} key={i}/>))
            properties.filter((property)=>property.propertyTitle.toLowerCase().includes(filter.toLowerCase())||property.propertyAddress.toLowerCase().includes(filter.toLowerCase())).map((card,i)=>(<PropertyCard card={card} property="property" key={i}/>))
        }
      </div>

    </div>
  )
}

export default Property