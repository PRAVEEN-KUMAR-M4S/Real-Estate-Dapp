import React from 'react'
import { useState } from "react";
import CreateForm from "../AddPrpty/CreateForm";
import { useStateContext } from "../../context/index";
import { useLocation } from "react-router-dom";
import { checkImage } from "../../../utility/utils";
import { PacmanLoader } from "react-spinners";
import axios from "axios";
const UpdateProperty = () => {

    const {pathname}=useLocation();

    const id=pathname.split("/").slice(-1)[0]

    const {address,updatePropertyFunction,}=useStateContext();
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState(null);
    const [displayImg,setDisplayImg] = useState(null);
    const [fileName, setFileName] = useState("Uploade Image")


    


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

      const handleSubmit=async()=>{
        setLoading(true)
        const{
          propertyTitle,
          description,
          category,
          images,
          propertyAddress
        }=form;
      
        console.log(propertyTitle,
          description,
          category,
     
          images,
          propertyAddress);
      
          if(images||propertyTitle||category||description){
            await updatePropertyFunction({
              ...form,
            });
            setLoading(false);
      
          }else{
            console.log("provide the details");
          }
      }


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
        src="../../hero-image.png"
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