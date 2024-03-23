import React from 'react'
import { useState } from "react";
import { useStateContext } from "../../context/index";
import { checkImage } from "../../../utility/utils";
import { ethers } from "ethers";
import { PacmanLoader } from "react-spinners";
import CreateForm from './CreateForm';



const Addprpty = () => {

  const {address,createPropertyFunction}=useStateContext();


  const [loading, setLoading] = useState(false);


  const [form, setForm] = useState({
    propertyTitle:"",
    description:"",
    category:"",
    price:"",
    images:"",
    propertyAddress:""

  })

  const handleChangeForm=(feildname,e)=>{
    setForm({...form,[feildname]:e.target.value})
  }

  // const options = [
  //   { value: 'House', label: 'House' },
  //   { value: 'Rent', label: 'Rent' },
  //   { value: 'Office', label: 'Office' }
  // ]




  const handleSubmit=async(e)=>{
    e.preventDefault();

    checkImage(form.images,async(exists)=>{
      if(exists){
        setLoading(true)
        await createPropertyFunction({
          ...form,
          price:ethers.utils.parseUnits(form.price,18)
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
  //   <div className='flex justify-center items-center flex-col gap-5'>
  //   <h1>create property</h1>
  //   <form onSubmit={handleSubmit}>
  //     <div>
  //       <input type="text" placeholder="propertyTitle" onChange={(e)=>handleChangeForm("propertyTitle",e)} />
  //     </div>
  //     <div>
  //       <input type="text" placeholder="description" onChange={(e)=>handleChangeForm("description",e)} />
  //     </div>
  //     <div>
  //       <input type="text" placeholder="category" onChange={(e)=>handleChangeForm("category",e)} />
  //     </div>
  //     <div>
  //       <input type="number" placeholder="price"   step="0.0001" onChange={(e)=>handleChangeForm("price",e)} />
  //     </div>
  //     <div>
  //       <input type="url" placeholder="images" onChange={(e)=>handleChangeForm("images",e)} />
  //     </div>
  //     <div>
  //       <input type="text" placeholder="propertyAddress" onChange={(e)=>handleChangeForm("propertyAddress",e)} />
  //     </div>
  //     <button type="submit" >submit</button>
  //   </form>
  // </div>
  
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
            labelName="Price *"
            placeholder="MATIC 0.50"
            inputType="number"
            value={form.target}
            handleChange={(e)=>handleChangeForm("price",e)}
          />

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

export default Addprpty