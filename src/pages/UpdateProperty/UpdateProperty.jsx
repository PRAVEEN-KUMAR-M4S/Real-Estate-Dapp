import React from 'react'
import { useState } from "react";
import CreateForm from "../AddPrpty/CreateForm";
import { useStateContext } from "../../context/index";
import { useLocation } from "react-router-dom";
import { checkImage } from "../../../utility/utils";
import { PacmanLoader } from "react-spinners";
const UpdateProperty = () => {

    const {pathname}=useLocation();

    const id=pathname.split("/").slice(-1)[0]

    const {address,updatePropertyFunction}=useStateContext();
    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        productId:id,
        propertyTitle:"",
        description:"",
        category:"",
        images:"",
        propertyAddress:""
    
      })

      const handleChangeForm=(feildname,e)=>{
        setForm({...form,[feildname]:e.target.value})
      }

      const handleSubmit=async(e)=>{
        e.preventDefault();
        checkImage(form.images,async(exists)=>{
            if(exists){
              setLoading(true)
              await updatePropertyFunction({
                ...form,productId:id,
                
              })
      
              setLoading(false)
            }else{
              alert("Please provide a valid image")
              setForm({...form, images:""});
      
            }
          })
        }
        if(loading){
            return (
              <div className='wrapper flexCenter' style={{height:"60vh"}}>
              <PacmanLoader
              height="80"
              color='#4066ff'
             
              />
          
          </div>
            )
          }



  return (
    <div className='paddings innerWidth'>
    <div className="blue-glassmorphism flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-8">
  <div className="flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#3a3a43] rounded-[10px]">
    <h1 className="font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-white">Create Property</h1>
  </div>
  <form onSubmit={handleSubmit} className="w-full mt-[65px] flex flex-col gap-[30px]">
  <div className="flex flex-wrap gap-[40px]">
    <CreateForm labelName="Property Name *"
            placeholder="Sky line"
            inputType="text"
            value={form.propertyTitle}
            handleChange={(e)=>handleChangeForm("propertyTitle",e)}/>
            <CreateForm labelName="Image *"
            placeholder="URL"
            inputType="url"
            value={form.images}
            handleChange={(e)=>handleChangeForm("images",e)}/>
  </div>
  <CreateForm 
            labelName="Description *"
            placeholder="Write your review"
            isTextArea
            value={form.description}
            handleChange={(e)=>handleChangeForm("description",e)}
          />

<div className="flex flex-wrap gap-[40px]">
          
<CreateForm 
            labelName="Category *"
            placeholder="category"
            inputType="text"
            value={form.category}
            handleChange={(e)=>handleChangeForm("category",e)}
          />

          
          
        </div>

        <CreateForm 
            labelName="Address *"
            placeholder="propertyAddress"
            inputType="text"
            value={form.propertyAddress}
            handleChange={(e)=>handleChangeForm("propertyAddress",e)}
          />

<div className="flex justify-center items-center mt-[40px]">
<button type='submit' className=' font-semibold border-none bg-[#4066ff] p-4 text-white'>Submit</button>
          </div>


  </form>
  </div>
  </div>
  )
}

export default UpdateProperty