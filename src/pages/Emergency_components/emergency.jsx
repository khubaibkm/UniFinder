import React from 'react'
import DrawerAppBarCat from '../../components/navCat'
import Footer from '../../components/footer'
import "./emergency.css"

const Emergency = () => {
  return (
    <div className='emergency'>
      <DrawerAppBarCat/>
      <div className="emer-heading">
        <p style={{ marginBottom: "13px", fontSize: "13px" }}>
          CHECK OUT OUR LISTINGS
        </p>
        <p style={{ lineHeight: 1.3, fontSize: "30px" }}>
          Explore the Emergency <br />
          Categories.
        </p>
      </div>

      
      <div id="contact us">
          <Footer />
        </div>
    </div>
  )
}

export default Emergency