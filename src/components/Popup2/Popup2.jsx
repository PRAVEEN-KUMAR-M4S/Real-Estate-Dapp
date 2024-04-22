import React from 'react'
import "./Popup2.css"
import { useState } from "react";
import CreateForm from "../../pages/AddPrpty/CreateForm";
import { useStateContext } from "../../context/index";
import { HashLoader } from "react-spinners";

const Popup2 = (props) => {

    const {
        updateStatusFunction
    } = useStateContext();

    const [toggled, setToggled] = useState(props.status)
    

    const [loading, setLoading] = useState(false);

    const Sellingstatus={
        productId:props.id,
        status:toggled
    }

    

     
      const updatestatusFunction=async()=>{
        setLoading(true);
           await updateStatusFunction(Sellingstatus);
        setLoading(false);
        // window.location.reload();
      }

    return (props.trigger)? (
        <div className='popup'>
            <div className='innerpopup white-glassmorphism text-white'>
                <button onClick={()=>props.settrigger(false)} className='close-btn'>close</button>
                <h1>update Status</h1>
                <div className="w-full mt-[65px] flex flex-col gap-[30px]">
                <div className="flex flex-wrap gap-[40px]">
         <label >Change the Status of the prooperty by toggling the button</label>
         <div>
       <button className={`toggle-btn ${toggled ? "toggled":""}` } onClick={()=>setToggled(!toggled)}>
        <div className='thumb'></div>
       </button>
    </div>
          </div>
          
          
<div className="flex justify-center items-center mt-[40px]">
<button onClick={()=>updatestatusFunction()} className=' font-semibold border-none bg-[#4066ff] p-4 text-white'>{loading? <HashLoader size={25} color='#fff'/>:"submit"}</button>
          </div>
  
                </div>

            </div>
    
        </div>
      ):"";
}

export default Popup2