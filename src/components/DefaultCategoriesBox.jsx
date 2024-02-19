import * as React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function DefaultTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 5 }}>
          <Typography component="div">{children}</Typography>
        </Box>
      )}
    </div>
  );
}

DefaultTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

export default function VerticalTabs() {
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box className="box" sx={{ borderRadius: '10px', flexGrow: 1, bgcolor: '#212529', display: 'flex', height: 600, width: 1200, margin: 'auto' }}>
      <Tabs
        orientation="vertical"
        value={value}
        onChange={handleChange}
        sx={{ bgcolor: 'transparent', borderRight: 1, borderColor: 'divider' }}
      >
        <Tab className="catItem catItem1" label={
          <div className='catItemContent'>
            <img src="icons/living.png" alt="Living" /><span>Living</span>
          </div>
        } />
        <Tab className="catItem" label={
          <div className='catItemContent'>
            <img src="icons/food.png" alt="Food" /><span>Food</span>
          </div>
        } />
        <Tab className="catItem" label={
          <div className='catItemContent'>
            <img src="icons/shopping.png" alt="Shopping" /><span className='labelShop'>Shopping</span>
          </div>
        } />
        <Tab className="catItem catItem4" label={
          <div className='catItemContent'>
            <img src="icons/emergency.png" alt="Emergency" /><span className='labelEmer'>Emergency</span>
          </div>
        } />
      </Tabs>

      <DefaultTabPanel className="catContent" value={value} index={0}>
        <h3>One of the most Trending Livings Right now!</h3>
        <div className='catdiv'>
          <div className="text-container">
            <p>Explore various housing options, including on-campus hostels and off-campus apartments. Find the perfect place to call home during your academic journey Discover essential services like gym, internet, etc. Also, choose your living based on your affordability.</p>
            <Link to="signup">
              <button className="catbtn">Explore More</button>
            </Link>
          </div>
          <img className='catImg' src="https://templatemo.com/templates/templatemo_564_plot_listing/assets/images/tabs-image-01.jpg" alt="" />
        </div>
      </DefaultTabPanel>

      <DefaultTabPanel className="catContent" value={value} index={1}>
        <h3>Top Famous Restaurants category is here</h3>
        <div className='catdiv'>
          <div className="text-container">
            <p>
Discover a variety of restaurants and cafes nearby, serving quick bites to sit-down meals. Whether you love meat or prefer vegetarian or vegan options, there&apos;s something for everyone in the diverse local food scene. </p>
            <Link to="signup">
              <button className="catbtn">Explore More</button>
            </Link>
          </div>
          <img className='catImg' src="/cat2.jpg" alt="" />
        </div>
      </DefaultTabPanel>

      <DefaultTabPanel className="catContent" value={value} index={2}>
        <h3>One of the Trending Shopping List!</h3>
        <div className='catdiv'>
          <div className="text-container">
            <p>
Shop for everything you need at nearby malls and budget-friendly retail spots. Cook up a storm in your own kitchen with ingredients from local supermarkets and grocery stores. Explore fresh produce and unique items at nearby markets..</p>
            <Link to="signup">
              <button className="catbtn">Explore More</button>
            </Link>
          </div>
          <img className='catImg' src="/cat3.jpg" alt="" />
        </div>
      </DefaultTabPanel>

      <DefaultTabPanel className="catContent" value={value} index={3}>
        <h3>Check Out Emergency and Safety Choices!</h3>
        <div className='catdiv'>
          <div className="text-container">
            <p>Stay healthy with nearby hospitals, clinics, and pharmacies. Explore on-campus health services. In emergencies, use local emergency rides for quick transport. Prioritize your well-being with accessible and reliable healthcare options in the community.</p>
            <Link to="signup">
              <button className="catbtn">Explore More</button>
            </Link>
          </div>
          <img className='catImg' src="/cat4.jpg" alt="" />
        </div>
      </DefaultTabPanel>
    </Box>
  );
}
