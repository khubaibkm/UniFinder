import React from 'react'
import DrawerAppBarCat from '../../components/navCat'
import Footer from '../../components/footer'
import "./shopping.css";


const Shopping = () => {
  return (
    <div className='shopping'>
      <DrawerAppBarCat/>      
      <div className="shop-heading">
        <p style={{ marginBottom: "13px", fontSize: "13px" }}>
          CHECK OUT OUR LISTINGS
        </p>
        <p style={{ lineHeight: 1.3, fontSize: "30px" }}>
          Explore the Shopping <br />
          Categories.
        </p>
      </div>

      
      <div id="contact us">
          <Footer />
        </div> 
    </div>
  )
}

export default Shopping