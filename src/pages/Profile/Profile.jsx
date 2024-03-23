import React from 'react'
import { useState,useEffect } from "react";
import "./Profile.css"
import { SwiperSlide,Swiper,useSwiper } from "swiper/react";
import {SiEthereum} from 'react-icons/si';
import {BsInfoCircle} from 'react-icons/bs';
import { useStateContext } from "../../context/index";
import { shortenAddress } from "../../../utility/utils";
import { useBalance } from "@thirdweb-dev/react";
import { silderSettings } from "../../utils/common";
import PropertyCard from "../../components/Propertycard/PropertyCard";
import Loader from "../../components/Loader/Loader";

const Profile = () => {
  const {address,getUserPropertiesFunction,contract}=useStateContext();
const {data,} = useBalance();
  
const [isLoading, setIsLoading] = useState(false);
const [properties, setProperties] = useState([]);
const [author, setAuthor] = useState([]);

const fetchProperty=async()=>{
  setIsLoading(true);
  const data = await getUserPropertiesFunction();

  setProperties(data);
  setIsLoading(false);
}



useEffect(() => {
  if(contract) fetchProperty();
}, [address,contract]);


if(isLoading){
  return(<Loader/>);
}

  return (
    <section className='p-wrapper '>
      <div className="paddings innerWidth "> 
        <div className="paddings  gap-3  p-container flex flex-col  items-center">
       <img src="../../user.jpg" alt="user" className=' h-32 w-32 rounded-full ' />
      
       <div className='p-3 flex justify-end items-start md:ml-7 flex-col rounded-xl h-52 sm:w-96 w-full my-5 eth-card white-glassmorpism'>
  <div className='flex flex-col justify-between h-full w-full'>
    <div className='flex justify-between items-start'>
      <div className='w-10 h-10 border-2 rounded-full flex justify-center items-center border-white'>
        <SiEthereum color='#fff' fontSize={24}/>

      </div>
      <BsInfoCircle color='#fff' fontSize={20}/>
    </div>
    <div className='flex justify-between'>
       <div className=' text-black'>
      <p className=' font-semibold text-base'>{shortenAddress(address == null?"xxxxx.....xxxx":address)}</p>
      <p className='font-semibold text-lg'>Ethereum</p>
    </div>
    <p className=' font-semibold text-base'>{data?.displayValue.slice(0,5)}</p>
    </div>
   
  </div>
 </div>

       </div>
       <div className="flexColStart">
            <span className='orangeText' >Owner</span>
            <span className='primaryText'>Property Owned</span>

        </div>
        
        <Swiper {...silderSettings}>
            <SwiperButton/>
        {
            properties?.map((card,i)=>(
                <SwiperSlide key={i}>
                    <PropertyCard card={card} property="updateproperty"/>
                </SwiperSlide>
            ))
        }</Swiper>
        </div>
      
       
    </section>
  )
}

export default Profile


const SwiperButton=()=>{
  const swiper=useSwiper()
  return(
      <div className="flexCenter r-button">
          <button onClick={()=>swiper.slidePrev()}>&lt;</button>
          <button onClick={()=>swiper.slideNext()}>&gt;</button>
      </div>
  )
}