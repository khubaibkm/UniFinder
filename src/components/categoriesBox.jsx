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
    <Box
      sx={{ borderRadius:'10px', flexGrow: 1, bgcolor: '#212529', display: 'flex', height: 600, width: 1200, margin:'auto' }}
    >
      <Tabs
        orientation="vertical"
        value={value}
        onChange={handleChange}
        // aria-label="Vertical tabs example"
        sx={{bgcolor:'transparent', borderRight: 1, borderColor: 'divider' }}
      >
        <Tab className="catItem" label={
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
            <img src="icons/shopping.png" alt="Shopping"/><span>Shopping</span>
          </div>
        } />
        <Tab className="catItem" label={
          <div className='catItemContent'>
            <img src="icons/emergency.png" alt="Emergency"/><span>Emergency</span>
          </div>
        } />
      </Tabs>
      <TabPanel value={value} index={0}>
        Item One
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
      <TabPanel value={value} index={3}>
        Item Four
      </TabPanel>
    </Box>
  );
}