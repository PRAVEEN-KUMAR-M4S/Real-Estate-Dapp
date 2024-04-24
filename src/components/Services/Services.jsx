import React from 'react'
import { BsShieldFillCheck } from "react-icons/bs";
import { BiSearchAlt } from "react-icons/bi";
import { RiHeart2Fill } from "react-icons/ri";

const ServiceCards=({color,icon,title,subtitle})=>(
  <div className='flex flex-row justify-start items-center white-glassmorphism p-3 m-2 cursor-pointer hover:shadow-2xl'>
   <div className={`w-10 h-10 flex justify-center items-center ${color} rounded-full`}>
    {icon}
   </div>
   <div className='ml-3 flex flex-col text-white flex-1'>
   <h1 className=' text-lg font-semibold'> {title}</h1>
    <p className=' text-sm md:w-9/12'>{subtitle}</p>
   </div>
  </div>
)

const Services = () => {
  return (
    <div className='flex innerWidth md:flex-row flex-col  justify-center items-center '>
      <div className='flex mf:flex-row flex-col justify-between items-center md:p-20 py-11 px-6'>
        <div className='flex flex-1 flex-col justify-start items-start'>
          <h1 className='text-white text-3xl sm:text-5xl text-gradient'>
            Services that we <br/> continue to improve
          </h1>
        </div>

      </div>
      <div className='flex flex-1 flex-col justify-start items-center'>
        <ServiceCards
        color='bg-[#2952E3]'
        title='Security'
        icon={<BsShieldFillCheck fontSize={22} className='text-white'/>}
        subtitle="Security is guarented. We always maintain privacy and the quality of the product."
        />
        <ServiceCards
        color='bg-[#8945F8]'
        title='Best Excahnge rates'
        icon={<BiSearchAlt fontSize={22} className='text-white'/>}
        subtitle="Security is guarented. We always maintain privacy and the quality of the product."
        />
        <ServiceCards
        color='bg-[#F84550]'
        title='Fastest Transactons'
        icon={<RiHeart2Fill fontSize={22} className='text-white'/>}
        subtitle="Security is guarented. We always maintain privacy and the quality of the product."
        />
      </div>
     
    </div>
  )
}

export default Services