import React from 'react';
import {  HiLocationMarker} from "react-icons/hi";

const Searchbar = ({filter,setFilter}) => {
  return (
    <div className="flex justify-center items-center search">
            <HiLocationMarker color="var(--blue)" fontSize={25}/>
            <input type="text" placeholder='Search by title/city/country' value={filter} onChange={(e)=>setFilter(e.target.value)}/>
            <button className="button">search</button>
          </div>
  )
}

export default Searchbar