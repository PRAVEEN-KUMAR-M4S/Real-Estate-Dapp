import React from 'react';
import Searchbar from '../../components/Searchbar/Searchbar';
import "./Property.css";
import data from "../../utils/slider.json";
import PropertyCard from '../../components/Propertycard/PropertyCard';
import { useStateContext } from "../../context/index";
import { useState, useEffect } from "react";
import Loader from '../../components/Loader/Loader';

const Property = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [properties, setProperties] = useState([]);
  const [filter, setFilter] = useState("");

  const { address, getAllPropertyData, contract } = useStateContext();

  const fetchProperty = async () => {
    setIsLoading(true);
    console.log("Fetching data");
    const data = await getAllPropertyData();
    setProperties(data);
    setIsLoading(false);
  }

  useEffect(() => {
    if (contract) fetchProperty();
  }, [address, contract])

  if (isLoading) {
    return <Loader />
  }

  const filteredProperties = properties.filter((property) =>
    property.propertyTitle.toLowerCase().includes(filter.toLowerCase()) ||
    property.propertyAddress.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className='text-white wrapper'>
      <div className='flexColCenter padding innerWidth properties-container'>
        <Searchbar filter={filter} setFilter={setFilter} />
      </div>

      <div className='paddings flexCenter p-16 hover:shadow-orange-950' >
        {filteredProperties.length > 0 ? (
          filteredProperties.map((card, i) => (
            <PropertyCard card={card} property="property" key={i} />
          ))
        ) : (
          <div className="no-results flex flex-col items-center">
            <img src="./1713855105505.png" alt="No results found" className='h-72' />
            <p className="text-gray-500 mt-4 text-xl font-bold">No results found</p>
          </div>
        )}
      </div>

    </div>
  );
}

export default Property;
