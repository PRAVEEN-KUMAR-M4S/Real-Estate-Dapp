import React from 'react'
import { useState } from "react";
import { useStateContext } from "../../context/index";
import { checkImage } from "../../../utility/utils";
import { ethers } from "ethers";
import { PacmanLoader } from "react-spinners";
import CreateForm from './CreateForm';
import axios from "axios";



const Addprpty = () => {

  const {address,createPropertyFunction}=useStateContext();


  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [displayImg,setDisplayImg] = useState(null);
  const [fileName, setFileName] = useState("Uploade Image")


  // const onImageChaged=(event)=>{
  //   if(event.target.files && event.target.files[0]){
  //     setFile(URL.createObjectURL(event.target.files[0]));
  //   }  
  // }

  const uploadToPinata=async()=>{
    setFileName("Image Uploading.....")
    if(file){
      try {
        const formData=new FormData();
        formData.append("file",file);
        const response =await axios({
          method:"post",
          url:"https://api.pinata.cloud/pinning/pinFileToIPFS",
          data:formData,
          headers:{
              pinata_api_key:"a0e61b440be70aa06542",
              pinata_secret_api_key:"feb62f6be96468f95b21cfea7fbce976bd4e8a882faae194b10ed9b608848fe9",
              "Content-Type":"multipart/form-data"
          }

        })
        const imageUrl=response.data.IpfsHash;
        setForm({...form,images:imageUrl});

        alert("Successfully Image Uploaded");
        setFileName("Uploaded...")
   
      } catch (error) {
        alert("Unable to uplade to the IPFS")        
      }
    }
  }

  const retriveHash=(event)=>{

    const data=event.target.files[0];
    const reader=new window.FileReader();
    reader.readAsArrayBuffer(data);
    reader.onloadend=()=>{
          setFile(event.target.files[0]);
          if(event.target.files && event.target.files[0]){
            setDisplayImg(URL.createObjectURL(event.target.files[0]))
          }
          event.preventDefault();
        }


  }


  // const gettingData = (e)=>{
  //   const data=e.target.files[0];
  //   const reader=new window.FileReader();
  //   reader.readAsArrayBuffer(data);
  //   reader.onloadend=()=>{
  //     setFile(e.target.files[0].name)
  //     e.preventDefault();
  //   }
  // }


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

const handleSubmit=async()=>{
  setLoading(true)
  const{
    propertyTitle,
    description,
    category,
    price,
    images,
    propertyAddress
  }=form;

  console.log(propertyTitle,
    description,
    category,
    price,
    images,
    propertyAddress);

    if(images||propertyTitle||price||category||description){
      await createPropertyFunction({
        ...form,
        price:ethers.utils.parseUnits(form.price,18)
      });
      setLoading(false);

    }else{
      console.log("provide the details");
    }
}


  // const handleSubmit=async(e)=>{
  //   e.preventDefault();

  //   checkImage(form.images,async(exists)=>{
  //     if(exists){
  //       setLoading(true)
       
  //       console.log(form)

  //       setLoading(false);
  //       window.location.reload();
  //     }else{
  //       alert("Please provide a valid image")
  //       setForm({...form, images:""});

  //     }
  //   })
  // }
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
            {/* <CreateForm labelName="Image *"
            placeholder="URL"
            inputType="url"
            value={form.images}
            handleChange={(e)=>handleChangeForm("images",e)}/> */}
  </div>
  <div className="relative w-64">
  <div className="h-100 bg-gray-100 rounded-lg flex flex-col justify-between">
    <div className="flex items-center p-2">
      <label htmlFor="fileInput" className="cursor-pointer flex items-center px-4 py-2 bg-gray-800 text-white rounded-md">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 mr-2 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 15l5-5m0 0l-5-5m5 5H7"
          />
        </svg>
        Choose Image
      </label>
      <input
        id="fileInput"
        type="file"
        className="hidden"
        onChange={retriveHash}
      />
    </div>
    {displayImg ? (
      <img
        src={displayImg}
        alt="image"
        className="w-48 h-auto max-h-48 object-contain mx-auto"
      />
    ) : (
      <img
        src="./hero-image.png"
        alt="placeholder"
        className="w-48 h-auto max-h-48 object-contain mx-auto"
      />
    )}
    <button
      onClick={uploadToPinata}
      className="w-full bg-blue-500 text-white py-2 rounded-b-lg hover:bg-blue-600"
    >
      {fileName}
    </button>
  </div>
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