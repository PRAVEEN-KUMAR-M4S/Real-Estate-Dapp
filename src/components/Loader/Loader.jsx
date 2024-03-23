import React from 'react'
import { PuffLoader } from "react-spinners";

const Loader = () => {
  return (
    <div className='wrapper flexCenter' style={{height:"60vh"}}>
    <PuffLoader
    height="80"
    color='#4066ff'
    aria-label='puff-loader'
    />

</div>
  )
}



export default Loader