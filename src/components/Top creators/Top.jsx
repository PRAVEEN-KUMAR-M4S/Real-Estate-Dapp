import React from 'react'
import { shortenAddress } from "../../../utility/utils";
import Loader from '../Loader/Loader';

const Card=({owner,total})=>{
    return(
        <div className='blue-glassmorphism m-4 flex 2xl:min-w-[450px] sm:min-w-[270px] sm:max-w-[300px] p-3 rounder-md hover:shadow-2xl'>
                <div className='flex gap-8 items-center w-full mt-3'>
                  <div className='bg-[#111] h-20 w-20 rounded-full '/>
                   <div className=' text-white'>
                    <h1>{shortenAddress(owner)}</h1>
                    <h1>Value : {total}</h1>
                   </div>
                </div>
                </div>
    )
}

function Top({creators,isLoading}) {
  if(isLoading){
    return (<Loader/>)
  }
  return (
    <section className="t-wrapper">
        <div className="paddings innerWidth t-container">
            <div className="t-head">
            <span className='orangeText' >Top Creators</span>
            </div>
            <div className='flex flex-wrap justify-center items-center mt-10'>
        {creators.map((card,i)=>(
          <Card key={i} {...card}/>
        ))}
      </div>
        </div>
    </section>
  )
}

export default Top