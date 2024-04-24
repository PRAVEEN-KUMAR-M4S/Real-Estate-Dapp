import React from 'react'
import { useStateContext } from "../../context/index";
import { useState,useEffect } from "react";
import { useLocation } from "react-router-dom";
import { HashLoader } from "react-spinners";
import { AiFillHeart } from 'react-icons/ai';
import { FaRegUser } from "react-icons/fa";
import "./Details.css"
import { shortenAddress } from "../../../utility/utils";
import Loader from '../../components/Loader/Loader';
import { MdLocationPin } from 'react-icons/md';
import Comment from '../../components/Comment/Comment';
import Map from "../../components/Map/Map";
import { useNavigate } from 'react-router-dom';
import  Popup  from '../../components/Popup/Popup';
import Popup2 from "../../components/Popup2/Popup2";

const Details = () => {
  const navigate=useNavigate();

  const {pathname}=useLocation()



  const id=pathname.split("/").slice(-1)[0]

  const update=pathname.split("/").slice(1)[0]






  const [buttonClick, setButtonClick] = useState(false);

  const [updateButton, setUpdateButton] = useState(false);

    const [property, setProperty] = useState();
    const [parsedReviews, setParsedReviews] = useState();
    const [properties, setProperties] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [updatePriceLoading, setUpdatePriceLoading] = useState(false);
    const [commentLoading, setCommentLoading] = useState(false);
    const [buyPropertyLoading, setBuyPropertyLoading] = useState(false);

    const {
        address,contract,updatePriceFunction,buyPropertyFunction,reviewFunction,likeReviewFunction,fetProductReviewFunction,getPropertyFunction,getAllPropertyData,
    } = useStateContext();

    const fetctProperty=async()=>{

      const data=await getPropertyFunction(id);
      const dataReview=await fetProductReviewFunction(id);
      const dataProperties=await getAllPropertyData();
      setProperty(data);
      
      setProperties(dataProperties);
      setParsedReviews(dataReview);
      setIsLoading(false);

    }
   
    


    

    useEffect(() => {

      if(contract) fetctProperty();
    }, [address,contract])

  //  console.log(property)

    //ADD REVIEW
    const [review, setReview] = useState({
      productId:"",
      rating:4,
      comment:""

    });

    const handleFormFeildChange = (fieldName,e) =>{

      setReview({...review,[fieldName]:e.target.value})
    }

    const createReview = async()=>{
      setCommentLoading(true);
  
      const data=await reviewFunction({
        ...review,productId:property?.productID
      })
      setCommentLoading(false);
      window.location.reload();
    
    }

    //LIKE REVIEW
    const [likereview, setLikereview] = useState({
      productId:"",
      reviewIndex:"",
    })

    const likereviewcall = async ()=>{
        const data=await likeReviewFunction({
          ...likereview,
          productId:property.productId
        });
        window.location.reload();
    }

    //BUY PRODUCT
    const buying={
      productId:property?.productID,
      amount:property?.price
    }



    const buyingProperty = async()=>{
      setBuyPropertyLoading(true);
      const data= await buyPropertyFunction(buying);
      setBuyPropertyLoading(false);
      window.location.reload();
    }

    //UPDATE PRICE
    const [updatePropertyPrice, setUpdatePropertyPrice] = useState({
      productId:property?.productId,
      price:""

    });

    const updatepropertyPrice = async()=>{
      setUpdatePriceLoading(true);
         await updatePriceFunction({
        ...updatePropertyPrice,
        productId:property?.productId
      });
      setUpdatePriceLoading(false);
      window.location.reload();
    }

    const link='Qmb467ZPvAqpytuqzYwF15ncs8Km5bt57cmYBp3CaaKUeP';




    if(isLoading){
      return (
<Loader/>
      )
  }

//   if(buyPropertyLoading){
//     return(
//       <div className='wrapper flexCenter' style={{height:"60vh"}}>
   
// </div>
//     )
//   }



  const homeaddress=property?.address.split(",").slice(0)[0];
  const city=property?.address.split(",").slice(0)[1];
  const country=property?.address.split(",").slice(-1)[0];

  
    
  return (
    <div className='wrapper'>
      <div className="flexColStart paddings innerWidth property-container">
        
        <div className="like-container">
          <AiFillHeart size={24} color='white'/>
        </div>

        <img src={`https://brown-neighbouring-nightingale-766.mypinata.cloud/ipfs/${property?.images}`} sizes='100vw' />

        <div className="flexCenter property-details">
          <div className="flexColStart justify-center  left blue-glassmorphism p-6">

            <div className="flexStart head">
              <span className='primaryText'>{property?.title}</span>
              <span className='orangeText' style={{fontSize:'1.5rem'}}>{property?.price} ETH</span>
            </div>
            <div className="flexStart owner gap-4">
              <FaRegUser size={25} color='#fff'/>
              <span className='secondaryText' style={{fontSize:'20px'}}>{shortenAddress(property?.owner)}</span>
            </div>
            <span className="secondaryText" style={{fontSize:'18px',textAlign:'justify'}}>ID : {property?.productID}</span>
            <span className="secondaryText" style={{fontSize:'18px',textAlign:'justify'}}>Category : {property?.category}</span>
            <span className="secondaryText" style={{fontSize:'18px',textAlign:'justify'}}>Status : {property?.isSelling?"For sale":"not for sale"}</span>
            <span className="secondaryText" style={{fontSize:'16px',textAlign:'justify'}}>Description : {property?.description}</span>

            <div className='flexStart'>
              <MdLocationPin size={26} color='#fff'/>
              <span className='secondaryText font-semibold' style={{fontSize:"16px"}}>{property?.address}</span>
            </div>
           {property?.isSelling? <button className='button' onClick={()=>buyingProperty()}>{buyPropertyLoading?<div className='flexCenter'><HashLoader size={25} color='#fff'/></div>:address == property?.owner ? "You can't buy your own property" : address == null ? "please connect":"buy now"}</button>:<button className='button'>Not for sale</button>}
           {
            update == "updateproperty" && address == property?.owner ? <button className='button' onClick={()=>navigate(`../formdetails/${property?.productID}`)}>Update Property Details</button>:null
           }
           
            {
            update == "updateproperty" && address == property?.owner ? <button className='button' onClick={()=>setButtonClick(true)}>Update Property Price</button>:null
           }
            {
            update == "updateproperty" && address == property?.owner ? <button className='button' onClick={()=>setUpdateButton(true)}>Update Property Status</button>:null
           }

            

          </div>
          <div className='right blue-glassmorphism p-6 '>
           <div className="flexColStart">
            <span className='orangeText' >Comments</span>
        </div>
      <div className='justify-between items-center'>
       <Comment parsedReviews={parsedReviews}/>
        <textarea name="" id=""    rows="8" onChange={(e)=>handleFormFeildChange("comment",e)} className='comment border-[1px] w-full'></textarea>
        <button className='button' onClick={()=>createReview()}>{commentLoading? <HashLoader size={25} color='#fff'/>:"Add Comment"}</button>
       </div>
        {/* <Map homeaddress={homeaddress} city={city} country={country}/> */}
          </div>
          
        </div>

        <div className='flexCenter map-details  blue-glassmorphism p-5'>
        <div className="flexStart">
            <span className='orangeText' >Map</span>
        </div>
        <Map homeaddress={homeaddress} city={city} country={country}/>
        </div>
        
        
         
        <Popup trigger={buttonClick} id={id} settrigger={setButtonClick}/>


        <Popup2 trigger={updateButton} id={id} status={property?.isSelling} settrigger={setUpdateButton}/>

      </div>
    </div>
  )
}

export default Details