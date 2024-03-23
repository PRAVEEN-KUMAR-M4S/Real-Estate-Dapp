import React from 'react'
import { shortenAddress } from "../../../utility/utils";

const Card=({reviewer,likes,comment})=>{
  return(
    <div className='blue-glassmorphism m-4 flex 2xl:min-w-[450px] sm:min-w-[270px] sm:max-w-[300px] p-3 rounder-md hover:shadow-2xl'>
    <div className='flex gap-8 items-center w-full mt-3'>
      {/* <div className='bg-[#111] h-10 w-10 rounded-full '/> */}
      <img src="../user.jpg" alt="user" className='h-10 w-10 rounded-full ' />
       <div className=' text-white w-9/12'>
        <h1 className='primaryText font-light' style={{fontSize:"18px"}}>{shortenAddress(reviewer)}</h1>
        <h1>{comment}</h1>
       </div>
    </div>
    </div>
  )
}


const Comment = ({parsedReviews}) => {



  return (
    <section className="t-wrapper">
        <div className="paddings innerWidth t-container">
            <div className='flex flex-wrap justify-center items-center mt-3'>
        {parsedReviews.map((card,i)=>(
          <Card key={i} {...card}/>
        ))}
      </div>
        </div>
    </section>
  )
}



export default Comment