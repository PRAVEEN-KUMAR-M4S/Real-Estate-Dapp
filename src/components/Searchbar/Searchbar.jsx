import React from 'react';
import {  HiLocationMarker} from "react-icons/hi";

const Searchbar = () => {
  return (
    <div className="flex justify-center items-center search">
            <HiLocationMarker color="var(--blue)" fontSize={25}/>
            <input type="text" />
            <button className="button">search</button>
          </div>
  )
}

export default Searchbar