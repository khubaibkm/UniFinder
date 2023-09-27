import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function TabPanel(props) {
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
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
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
    <Box className="box"
      sx={{ borderRadius:'10px', flexGrow: 1, bgcolor: '#212529', display: 'flex', height: 600, width: 1200, margin:'auto' }}
    >
      <Tabs
        orientation="vertical"
        value={value}
        onChange={handleChange}
        // aria-label="Vertical tabs example"
        sx={{bgcolor:'transparent', borderRight: 1, borderColor: 'divider' }}
      >
        <Tab className="catItem  catItem1" label={
          <div className='catItemContent'>
            <img src="icons/living.png" alt="Living"/><span>Living</span>
          </div>
        } />
        <Tab className="catItem" label={
          <div className='catItemContent'>
            <img src="icons/food.png" alt="Food"/><span>Food</span>
          </div>
        } />
        <Tab className="catItem" label={
          <div className='catItemContent'>
            <img src="icons/shopping.png" alt="Shopping"/><span className='labelShop'>Shopping</span>
          </div>
        } />
        <Tab className="catItem catItem4" label={
          <div className='catItemContent'>
            <img src="icons/emergency.png" alt="Emergency"/><span className='labelEmer'>Emergency</span>
          </div>
        } />
      </Tabs>
      <TabPanel className="catContent" value={value} index={0}>
      <h3>Living</h3>
      {/* <div className='catdiv'>
        <h2>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eos, animi.</h2><br /><br />
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Enim unde, a animi ad id eveniet, at dolorem velit tempore quibusdam ipsum quisquam ea tenetur exercitationem ab molestiae ullam fuga. Ad.</p></div> */}
      </TabPanel>
      <TabPanel className="catContent" value={value} index={1}>
      <h3>Food</h3>
      {/* <div className='catdiv'>
        <h2>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eos, animi.</h2><br /><br />
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Enim unde, a animi ad id eveniet, at dolorem velit tempore quibusdam ipsum quisquam ea tenetur exercitationem ab molestiae ullam fuga. Ad.</p></div> */}
      </TabPanel>
      <TabPanel className="catContent" value={value} index={2}>
      <h3>Shopping</h3>
      {/* <div className='catdiv'>
        <h2>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eos, animi.</h2><br /><br />
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Enim unde, a animi ad id eveniet, at dolorem velit tempore quibusdam ipsum quisquam ea tenetur exercitationem ab molestiae ullam fuga. Ad.</p></div> */}
      </TabPanel>
      <TabPanel className="catContent" value={value} index={3}>
      <h3>Emergency</h3>
      {/* <div className='catdiv'>
        <h2>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eos, animi.</h2><br /><br />
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Enim unde, a animi ad id eveniet, at dolorem velit tempore quibusdam ipsum quisquam ea tenetur exercitationem ab molestiae ullam fuga. Ad.</p></div> */}
      </TabPanel>
    </Box>
  );
}