import React from 'react'
import "./Popup.css"
import { useState } from "react";
import CreateForm from "../../pages/AddPrpty/CreateForm";
import { useStateContext } from "../../context/index";

const Popup = (props) => {

    const {
        updatePriceFunction
    } = useStateContext();

    const [loading, setLoading] = useState(false);

    //UPDATE PRICE
    const [updatePropertyPrice, setUpdatePropertyPrice] = useState({
        productId:props.id,
        price:""
  
      });

      const handleChangeForm=(feildname,e)=>{
        setUpdatePropertyPrice({...updatePropertyPrice,[feildname]:e.target.value})
      }
  
      const handleSubmit=async(e)=>{
        e.preventDefault();
        setLoading(true);
           await updatePriceFunction({
          ...updatePropertyPrice,
          productId:props.id
        });
        setLoading(false);
        // window.location.reload();
      }

    return (props.trigger)? (
        <div className='popup'>
            <div className='innerpopup white-glassmorphism text-white'>
                <button onClick={()=>props.settrigger(false)} className='close-btn'>close</button>
                <h1>update Price</h1>
                <form onSubmit={handleSubmit} className="w-full mt-[65px] flex flex-col gap-[30px]">
                <div className="flex flex-wrap gap-[40px]">
          <CreateForm 
            labelName="Price *"
            placeholder="MATIC 0.50"
            inputType="number"
            value={updatePropertyPrice.target}
            handleChange={(e)=>handleChangeForm("price",e)}
          />
          </div>
          
<div className="flex justify-center items-center mt-[40px]">
<button type='submit' className=' font-semibold border-none bg-[#4066ff] p-4 text-white'>Submit</button>
          </div>

                </form>

            </div>
    
        </div>
      ):"";
}

export default Popup