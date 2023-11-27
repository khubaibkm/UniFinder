import React from 'react'
import "./aboutUs.css"
import DrawerAppBarCat from './navCat';
import { useEffect } from 'react';

const AboutUs = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className='main'>
      <DrawerAppBarCat/>
        <h1 className='abouth1'>aboutUs</h1>
        <h3 className='abouth3'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consequuntur et accusantium animi nihil maiores nulla rem nemo fuga placeat quibusdam maxime est, reprehenderit libero nesciunt iste. Blanditiis perspiciatis quo cum fugit quibusdam rem ea.</h3>
    </div>
  )
}

export default AboutUs