import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@mui/icons-material/Home';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import DiamondIcon from '@mui/icons-material/Diamond';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const BottomNavigationArea = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [value, setValue] = useState(location.pathname);

  useEffect(() => {
    setValue(location.pathname);
  }, [location.pathname]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    navigate(newValue);
  };

  return (
    <BottomNavigation
      value={value}
      onChange={handleChange}
      showLabels
      style={{
        position: 'fixed',
        bottom: 0,
      
        backgroundImage: 'url(/assets/images/tabBarBg-301df93c.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '10px 0',
        backgroundColor: 'transparent',
        marginLeft: '-5px',
      }}
    >
  <BottomNavigationAction
  label="Home"
  value="/"
  icon={
    value === '/' ? 
    <img src="assets/images/home-r-0e9d3a12.png" alt="Home" style={{ width: '35px' }} /> :
    <img src="assets/images/home-3e6a9291.png" alt="Home" style={{ width: '35px' }} />
  }
  style={{ color: value === '/' ? '#FB9201' : 'black' }}
/>
<BottomNavigationAction
  label="Activity"
  value="/activity"
  icon={
    value === '/activity' ? 
    <img src="assets/images/activity-r-8eb2eaaa.png" alt="Activity" style={{ width: '35px' }} /> :
    <img src="assets/images/activity-bb37b07c (1).png" alt="Activity" style={{ width: '35px' }} />
  }
  style={{ color: value === '/activity' ? '#FB9201' : 'black' }}
/>
<BottomNavigationAction
  label="Promotion"
  value="/promotion"
  icon={
    value === '/promotion' ? 
    <img src="assets/images/promotionBg-d4b9ecd6.png" alt="Promotion" style={{ width: '45px' }} /> :
    <img src="assets/images/promotionBg-d4b9ecd6.png" alt="Promotion" style={{ width: '45px' }} />
  }
  style={{
    color: value === '/promotion' ? '#FB9201' : 'black',
    transform: 'scale(1.3)',
    marginTop: '-10px',
  }}
/>
<BottomNavigationAction
  label="Wallet"
  value="/wallet"
  icon={
    value === '/wallet' ? 
    <img src="assets/images/wallet-r-5ca037e5.png" alt="Wallet" style={{ width: '35px' }} /> :
    <img src="assets/images/wallet-dd37d20a (1).png" alt="Wallet" style={{ width: '35px' }} />
  }
  style={{ color: value === '/wallet' ? '#FB9201' : 'black' }}
/>
<BottomNavigationAction
  label="Account"
  value="/account"
  icon={
    value === '/account' ? 
    <img src="assets/images/main-r-d2aeb055.png" alt="Account" style={{ width: '35px' }} /> :
    <img src="assets/images/main-53f64122.png" alt="Account" style={{ width: '35px' }} />
  }
  style={{ color: value === '/account' ? '#FB9201' : 'black' }}
/>
    </BottomNavigation>
  );
};

export default BottomNavigationArea;