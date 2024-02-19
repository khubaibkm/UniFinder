import React from 'react'
import { Page1 } from '../../components/page1'
import { Categories } from '../../components/categories'
import Review from '../../components/review'
import DrawerAppBar from '../../components/nav'
import { useEffect } from 'react';
import "./home.css";
import Footer from '../../components/footer'

const Home = () => { 
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className='home'>
      <DrawerAppBar />
           <div id="home">
          <Page1 />
        </div>
        <div id="categories">
          <Categories />
        </div>
        <div id="reviews">
          <Review />
        </div> 
        <div id="contact us">
          <Footer />
        </div> 
    </div>
  )
}

export default Home