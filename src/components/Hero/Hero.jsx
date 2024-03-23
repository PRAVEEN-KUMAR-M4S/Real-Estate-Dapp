import React from 'react'
import "./Hero.css";
import "../../index.css";
import CountUp  from "react-countup";
import { motion } from "framer-motion";
import Searchbar from '../Searchbar/Searchbar';

function Hero() {
  return (
    <section className="hero-wrapper">
      <div className="paddings innerWidth flexCenter hero-container">
        <div className="flexColStart hero-left">
          <div className="Title-hero">
            <div className='orange-circle'/>
            <motion.h1 initial={{y:"4rem",opacity:0}} animate={{y:"0",opacity:1}} transition={{duration:4,type:"spring"}} className='font-bold'>Discover<br/> Most Suitable<br/> Property</motion.h1>
          </div>
          <div className="flexColStart hero-des">
            <span className='secondaryText'>Finad a variety of properties that suit you very easily</span>
            <h3  className='secondaryText'>Forget all difficulties in finding a residence for you</h3>
          </div>
          <Searchbar/>
          <div className='stats flex justify-center items-center'>
            <div className="stat flex flex-col justify-center items-center">  
            <span>
              <CountUp start={0} end={40}/>
              <span>+</span>
            </span>
              <span className='secondaryText'>Premium Product</span>
            </div>
            <div className="stat flex flex-col justify-center items-center">  
            <span>
              <CountUp start={0} end={60}/>
              <span>+</span>
            </span>
              <span className='secondaryText'>Happy Customer</span>
            </div>
            

          </div>
        </div>
        <motion.div 
        initial={{x:"10rem",opacity:0}} animate={{x:"0",opacity:1}} transition={{duration:4,type:"spring"}}
         className="flexCenter hero-right">
           <div className="img-container">
            <img src="./hero-image.png" alt="hero-image"/>
           </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero