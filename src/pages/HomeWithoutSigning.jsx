import { DefaultPage1 } from '../components/DefaultPage1';
import DrawerAppBar from '../components/navDefault'
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
    </div>
  )
}

export default HomeWithoutSigning;