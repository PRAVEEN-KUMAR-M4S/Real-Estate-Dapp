export const checkImage=(url,callback)=>{
    const img=new Image();
    img.src=url;

    if(img.complete) callback(true)
    
    img.onload=()=>callback(true)
    img.onerror=()=>callback(false)
}

export const getTopCreators=(creators)=>{
     const finalCreator=[];

     const finalResult=creators.reduce((index,currentValue)=>{
        (index[currentValue.owner]=index[currentValue.owner]||[]).push(currentValue);

        return index
     },{});

     Object.entries(finalResult).forEach((item)=>{
        const owner=item[0]
        const total=item[1]
        .map((Newitem)=>Number(Newitem.price))
        .reduce((PreviousVaue,currentValue)=>PreviousVaue+currentValue,0);

        finalCreator.push({owner,total});
     });
     return finalCreator;
}

export const shortenAddress=(address)=>`${address.slice(0,7)}...${address.slice(address.length-7)}`