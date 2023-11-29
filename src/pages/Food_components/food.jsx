import React from 'react'
import DrawerAppBarCat from '../../components/navCat'
import "./food.css";
import Footer from '../../components/footer';

const Food = () => {
  return (
    <div className='food'>
      <DrawerAppBarCat/>
      <div className="food-heading">
        <p style={{ marginBottom: "13px", fontSize: "13px" }}>
          CHECK OUT OUR LISTINGS
        </p>
        <p style={{ lineHeight: 1.3, fontSize: "30px" }}>
          Explore the Food <br />
          Categories.
        </p>
      </div>

      
      <div id="contact us">
          <Footer />
        </div> 
      </div>
  )
}

export default Food