import React from 'react'
import "./Collection.css";


const Collections = ({housing,rental,office,commercial}) => {
  return (
<section className="r-wrapper">
       <div className="paddings innerWidth r-container">
        <div className="r-head flexColStart">
            <span className='orangeText' >Collections</span>
            <span className='primaryText'>Popular Collections</span>

        </div>

        <div>
        <div className="tab-nav-bar">
            <div className="tab-navigation">
                
                <ul className="tab-menu ">
                    <li className="menu-items ">House</li>
                    <li className="menu-items">Rental</li>
                    <li className="menu-items">Office</li>
                    <li className="menu-items">Commercial</li>

                </ul>
            </div>
        </div>
        </div>

        </div>
        </section>
  )
}

export default Collections