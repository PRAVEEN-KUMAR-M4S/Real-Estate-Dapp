import {  useContext,createContext,useState,useEffect} from "react";
import { useAddress,useContract,useContractWrite,useMetamask,useContractRead,useContractEvents,useDisconnect,useSigner,useConnectionStatus, getContract } from "@thirdweb-dev/react";
import { ethers } from "ethers";


const StateContext=createContext();

 export const StateContextProvider=({children})=>{
const address=useAddress()
const connect=useMetamask()
const disconnect=useDisconnect()
const connectionStatus=useConnectionStatus()
const signer=useSigner()

const [userBlance, setUserBlance] = useState()


const { contract } = useContract("0xF21cEF9fE968ef502f026e877416b4b5B97ac27b");
const { mutateAsync: listProperty} = useContractWrite(contract, "listProperty")


console.log(contract);

const createPropertyFunction = async (form) => {
    console.log(form)
    const{propertyTitle,
    description,
    category,
    price,
    images,
    propertyAddress}=form;


  try {
    const data = await listProperty({ args: [address, price, propertyTitle, category, images, propertyAddress, description] });
    console.info("contract call successs", data);
   
  } catch (err) {
    console.error("contract call failure", err);
  }
}

const getAllPropertyData=async()=>{
    try {
        const properties=await contract.call("getAllProperty")

        console.log(properties);


        const balance= await signer?.getBalance();
        const userBlance= address ? ethers.utils.formatEther(balance?.toString()) : "";
        setUserBlance(userBlance);




        const parsedProperties=properties.map((property,i)=>({
          
            owner:property.owner,
            productId:property.productID.toNumber(),
            price:ethers.utils.formatEther(property.price),
            propertyTitle:property.properttitle,
            images :property.image,
            category:property.category,
            propertyAddress :property.propertyAddress,
            description :property.description,
            isSelling:property.isSelling,
            reviewers:property.reviewers,
            reviews:property.reviews
        }))

       

      

        return parsedProperties;

       
    } catch (error) {
        
    }
}

const { mutateAsync: updateProperty, isLoading:updatePropertyLoading } = useContractWrite(contract, "updateProperty")

  const updatePropertyFunction = async (form) => {
    console.log(form);
    const{productId,
        propertyTitle,
        description,
        category,
        images,
        propertyAddress}=form;

        
    try {
      const data = await updateProperty({ args: [address, productId, propertyTitle, category, images, propertyAddress, description] });
      console.info("contract call successs", data);
    } catch (err) {
      console.error("contract call failure", err);
    }
  }

  const { mutateAsync: updatePrice, isLoading:updatePriceLoading } = useContractWrite(contract, "updatePrice")

  const updatePriceFunction = async (form) => {
    const{productId,price}=form;
    console.log(form);
    try {
      const data = await updatePrice({ args: [address, productId, ethers.utils.parseEther(price)] });
      console.info("contract call successs", data);
    } catch (err) {
      console.error("contract call failure", err);
    }
  }

  const updateStatusFunction = async (Sellingstatus) => {
    const{productId,status}=Sellingstatus;
    console.log(Sellingstatus);
    try {
      const data = await contract.call("updateStatus", [address, productId, status])
      console.info("contract call successs", data);
    } catch (err) {
      console.error("contract call failure", err);
    }
  }


  const { mutateAsync: buyProperty, isLoading:buyLoading } = useContractWrite(contract, "buyProperty")

  const buyPropertyFunction = async (buying) => {
    const{productId,amount}=buying

    const money=ethers.utils.parseEther(amount);



    try {
      // const data = await buyProperty({ 
      //   args: [productId,address],value:money
      //   });
      const data = await contract.call("buyProperty", [productId],{value:money})
      console.info("contract call successs", data);

      console.info("contract call successs", data);
    } catch (err) {
      console.error("contract call failure", err);
    }
  }

  const { mutateAsync: addReview, isLoading:reviewLoading } = useContractWrite(contract, "addReview")

  const reviewFunction = async (form) => {
    const{productId,rating,comment}=form
    console.log(form);

    try {
      const data = await addReview({ args: [productId, rating, comment, address] });
      console.info("contract call successs", data);
    } catch (err) {
      console.error("contract call failure", err);
    }
  }

  const { mutateAsync: likeReview, isLoading:likeLoading } = useContractWrite(contract, "likeReview")

  const likeReviewFunction = async (form) => {
    const{productId,reviewIndex}=form
    try {
      const data = await likeReview({ args: [productId, reviewIndex, address] });
      console.info("contract call successs", data);
    } catch (err) {
      console.error("contract call failure", err);
    }
  }
   

  const highestRatedFunction=()=>{
    try {
      const { data:highestRated, isLoading:highestRatedLoading } = useContractRead(contract, "highestRated")
            return highestRated,highestRatedLoading;
    } catch (error) {
      console.log("contract call failure", error);
    }
  }
  
  const fetProductReviewFunction=async(productId)=>{
    try {
        const getProductreview = await contract.call( "getProductreview", [productId]);

        const parsedReviews=getProductreview?.map((review,i)=>({
          reviewer:review.reviewer,
          likes:review.likes.toNumber(),
          comment:review.comment,
          rating:review.rating,
          productid:review.productid.toNumber()
        }));

        return parsedReviews;
    } catch (error) {
        console.log("Cannot get the review",error);
        
    }
    
  }

  const getPropertyFunction=async(id)=>{
    const productID=id*1
    try {
      const  propertyItem = await contract.call("getProperty", [productID])
      const property={
        productID:propertyItem?.[0].toNumber(),
        owner:propertyItem?.[1],
        title:propertyItem?.[3],
        category:propertyItem?.[4],
        description:propertyItem?.[7],
        price:ethers.utils.formatEther(propertyItem?.[2].toString()),
        address:propertyItem?.[6],
        images:propertyItem?.[5],
        isSelling:propertyItem?.[10]
      };
      return property;
    } catch (error) {
      console.log("Cannot get the property",error);
    }
  }

  const getUserPropertiesFunction=async()=>{
    try {
      const properties = await contract.call("getUserProperties", [address])
      const parsedUserproperties=properties.map((property,i)=>({
            owner:property.owner,
            productId:property.productID.toNumber(),
            price:ethers.utils.formatEther(property.price.toString()),
            title:property.properttitle,
            images :property.image,
            category:property.category,
            propertyAddress :property.propertyAddress,
            description :property.description,
            reviewers:property.reviewers,
            reviews:property.reviews
      }))
      return parsedUserproperties;
    } catch (error) {
      console.log("Cannot get the property",error);
    }
  }

  const getUserreviewFunction=()=>{
    try {
      const { data:getUserreview } = useContractRead(contract, "getUserreview", [address])
      return getUserreview;
    } catch (error) {
      console.log("Cannot get the property",error);
    }
  }

  const totalPropertyFunction=()=>{
    try {
      const { data:totalProperty} = useContractRead(contract, "propertyIndex")
      return totalProperty.toNumber();
    } catch (error) {
      console.log("Cannot get the property",error);
    }
  }

  const totalReviewFunction=()=>{
    try {
      const { data:totalReview} = useContractRead(contract, "reviewsCounter")
      return totalReview.toNumber();
    } catch (error) {
      console.log("Cannot get the review",error);
    }
  }





  const { data: event } = useContractEvents(contract, "PropertyListed")



return(
    <StateContext.Provider value={{address,connect,contract,createPropertyFunction,getAllPropertyData,
      updatePropertyFunction,updatePriceFunction,buyPropertyFunction,updateStatusFunction,reviewFunction,likeReviewFunction,fetProductReviewFunction,getPropertyFunction,
      getUserPropertiesFunction,getUserreviewFunction,totalPropertyFunction,totalReviewFunction,highestRatedFunction,
      disconnect,connectionStatus,userBlance}}>
{children}
    </StateContext.Provider>
)
}

export const useStateContext=()=>useContext(StateContext)

