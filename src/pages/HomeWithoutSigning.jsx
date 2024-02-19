import { DefaultPage1 } from '../components/DefaultPage1';
import DrawerAppBar from '../components/navDefault'
import { DefaultCategories } from '../components/DefaultCategories'
import Review from '../components/review'
import Footer from '../components/footer'
import { useEffect } from 'react';
import "./HomeWithoutSigning.css";

const HomeWithoutSigning = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className='homeWithoutSiging'>
      <DrawerAppBar />
      <div id="home">
          <DefaultPage1 />
        </div>
        <div id="categories">
          <DefaultCategories />
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

export default HomeWithoutSigning;