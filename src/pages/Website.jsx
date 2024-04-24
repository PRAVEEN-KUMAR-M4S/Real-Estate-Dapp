import React from 'react'
import Header from '../components/Header/Header';
import Hero from '../components/Hero/Hero';
import "../App.css"
import Comapny from '../components/Companies/Comapny';
import "../index.css";
import Residencies from '../components/Resedencies/Residencies';
import Value from '../components/Value/Value';
import { useStateContext } from "../context/index";
import { useState,useEffect } from "react";
import { MdElectricScooter } from 'react-icons/md';
import { getTopCreators } from "../../utility/utils";
import Get from '../components/get started/get';
import  Footer  from '../components/Footer';
import Top from "../components/Top creators/Top";
import Collections from '../components/Collections/Collections';
import Services from '../components/Services/Services';


const Website = () => {
    const [isLoading, setIsLoading] = useState(false)
  const [properties, setproperties] = useState([]);

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

  const housing=[]
  const rental=[]
  const office=[]
  const commercial=[]

 console.log(properties)

  if(!isLoading){
     properties.map((ele,i)=>{
      if(ele.category === 'housing'){
        housing.push(ele)
      }else if(ele.category === 'rental'){
        rental.push(ele)
      }else if(ele.category === 'office'){
        office.push(ele)
      }else if(ele.category === 'commercial'){
        commercial.push(ele)
      }
     }
     );
  }

  const creators=getTopCreators(properties)
  console.log(creators)
  return (
    <div className='App'>
  <div className='gradient-bg-welcome'>
<div>
  <div className="white-gradient"/>
    
    <Hero/>
    </div>
    <Comapny />
    <Residencies properties={properties} isLoading={isLoading}/>
    </div>
    <div className='gradient-bg-services'>
      <Value/>
      {/* <Services/> */}
      <Top creators={creators} isLoading={isLoading}/>
      <Get/>
    
      
    
    </div>
    
    </div>
  )
}

export default Website 