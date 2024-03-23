import React from 'react'
import {  Accordion,AccordionItem,AccordionItemButton,AccordionItemHeading,AccordionItemPanel,AccordionItemState} from "react-accessible-accordion";
import { MdOutlineArrowDownward } from "react-icons/md";
import "./Value.css"
import data from "../../utils/accordion";
const Value=()=> {
  return (
   <section className="v-wrapper">
    <div className="paddings innerWidth flex lg:flex-row flex-col justify-center items-center v-container">
      <div className="v-left">
        <div className="img-container">
          <img src="./value.png" alt="value" />
        </div>
      </div>
      <div className="flexColStart v-right lg:mt-0 mt-4">
        <span className='orangeText'>Our value</span>
        <span className='primaryText'>Value we give to you</span>
        <span className='secondaryText'>We belive a good blance to live can make your life better
          <br/>
          We always ready to help by providing the best services for you
        </span>
        <Accordion allowMultipleExpanded={false} preExpanded={[0]} className='Accordian'>
           {
            data.map((item,i)=>{
             return(
              <AccordionItem className='Accord-item blue-glassmorphism' key={i} uuid={i}>
                <AccordionItemHeading>
                  <AccordionItemButton className='flexCenter accordian-Button'>
                    <div className='flexCenter icon'>{item.icon}</div>
                    <span className='primaryText'>{item.heading}</span>
                    <div className='flexCenter icon'>
                    <MdOutlineArrowDownward size={20}/>
                    </div>
                  </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel className='p-2'>
                  <p className='secondaryText'>{item.detail}</p>
                </AccordionItemPanel>

              </AccordionItem>
             )
             })
           }

        </Accordion>
      </div>
    </div>
   </section>
  )
}

export default Value