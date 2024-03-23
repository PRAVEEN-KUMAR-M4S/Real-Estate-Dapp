import React from 'react'
import { SwiperSlide,Swiper,useSwiper } from "swiper/react";
import 'swiper/css'
import './Residencies.css'
import  data from "../../utils/slider.json";
import { silderSettings } from "../../utils/common";
import PropertyCard from '../Propertycard/PropertyCard';
import { PuffLoader } from "react-spinners";
import Loader from '../Loader/Loader';


const Residencies=({properties,isLoading})=> {
    if(isLoading){
        return (<Loader/>)
    }
  return (
    <section className="r-wrapper">
       <div className="paddings innerWidth r-container">
        <div className="r-head flexColStart">
            <span className='orangeText' >Best Choices</span>
            <span className='primaryText'>Popular Residencies</span>

        </div>
 
        <Swiper {...silderSettings}>
            <SwiperButton/>
        {
            properties.slice(0,8).map((card,i)=>(
                <SwiperSlide key={i}>
                    <PropertyCard card={card} property="property"/>
                </SwiperSlide>
            ))
        }</Swiper>
       </div>
    </section>
  )
}

export default Residencies

const SwiperButton=()=>{
    const swiper=useSwiper()
    return(
        <div className="flexCenter r-button">
            <button onClick={()=>swiper.slidePrev()}>&lt;</button>
            <button onClick={()=>swiper.slideNext()}>&gt;</button>
        </div>
    )
}