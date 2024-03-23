import React from 'react'
import "./get.css"

function Get() {
  return (
    <section className='g-wrapper lg:m-0 ml-3 mr-3'>
        <div className="pb-4 innerWidth white-glassmorphism g-contaner">
          <div className="flexColCenter inner-container">
            <span className='primaryText'>Get started with Homyz</span>
            <span className='secondaryText '>You can Buy the wide varities of properties available here</span>
            <span className='secondaryText'>You can connect to the Dapp by pressing the connect button below</span>
            <button type='button' className='bg-[#2952e3] px-5 my-5 py-3 rounded-full text-white hover:bg-[#2546bd] font-semibold cursor-pointer text-base'>Connect Wallet</button>
          </div>
          
        </div>
    </section>
  )
}

export default Get