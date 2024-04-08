import React, { useEffect} from 'react'
import Mobile from '../Components/Mobile';
import IconButton from '@mui/material/IconButton';
import SmsIcon from '@mui/icons-material/Sms';
import DownloadIcon from '@mui/icons-material/Download';
import { Typography,  Card, CardMedia, CardContent,Grid , Box} from '@mui/material';
import { useState } from 'react';
import { getFirestore, doc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const Coupenmainuser = ({ children }) => {

  useEffect(() => {
    const setVh = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    window.addEventListener('resize', setVh);
    setVh();

    return () => window.removeEventListener('resize', setVh);
  }, []);

  const [couponCode, setCouponCode] = useState('');

  const handleApplyCoupon = async (event) => {
    event.preventDefault();

    const db = getFirestore();
    const auth = getAuth();
    const user = auth.currentUser;

    const couponRef = doc(db, 'coupons', couponCode);
    const couponSnap = await getDoc(couponRef);

    if (!couponSnap.exists()) {
      alert('Invalid coupon code.');
      return;
    }

    const coupon = couponSnap.data();

    if (coupon.usedBy.includes(user.uid)) {
      alert('You have already used this coupon code.');
      return;
    }

    if (coupon.usedBy.length >= coupon.limit) {
      alert('This coupon code has reached its limit.');
      return;
    }

    await updateDoc(couponRef, {
      usedBy: arrayUnion(user.uid)
    });
    const userRef = doc(db, 'users', user.uid);
    const userSnap = await getDoc(userRef);
    const userData = userSnap.data();

    await updateDoc(userRef, {
      wallet: userData.wallet + coupon.amount
    });

    alert(`Successfully applied the coupon code. ${coupon.amount} has been added to your wallet.`);
  };

 
  return (
    <div>
      <Mobile>
        <Box
          display="flex"
          flexDirection="column"
          height="calc(var(--vh, 1vh) * 100)"
          position="relative"
        >
          <Box flexGrow={1}>


            <Grid
              container
              alignItems="center"
              justifyContent="space-between"
              sx={{
                position: 'sticky',
                top: 0,
                zIndex: 1000,
                backgroundColor: 'rgb(249,94,93)',
                padding: '8px 16px',
                color: 'white'
                
              }}
            >
              <Grid item xs={6} textAlign="left">
                <span style={{ fontWeight: "bold" }}>Redeem </span>
              </Grid>
              <Grid item xs={6} textAlign="right">
                <IconButton color="inherit">
                  <SmsIcon />
                </IconButton>
                <IconButton color="inherit">
                  <DownloadIcon />
                </IconButton>
              </Grid>
            </Grid>

            {/* //content */}


             <Box sx={{ backgroundColor: 'rgb(249,94,93)', padding: 2 }}>
    <img src="assets/images/gift-0e49be1a.png" alt="coupon" style={{ width: '100%' }} />
      <Box sx={{ backgroundColor: 'white', padding: 2, borderRadius: 1 }}>
      <Typography variant="body1" gutterBottom align="left">
  Hi
</Typography>
<Typography variant="body1" gutterBottom align="left">
  We have a gift for you
</Typography>
<Typography variant="body1" gutterBottom align="left">
  Please Enter the Coupon Code
</Typography>
        <form
          onSubmit={handleApplyCoupon}
          style={{
            display: 'flex',
            flexDirection: 'column',
            marginTop: '20px',
            width: '95%',
            marginLeft: '10px',
          }}
        >

<TextField
            value={couponCode}
            onChange={(event) => setCouponCode(event.target.value)}
            placeholder="Coupon Code"
            required
            variant="outlined"
            style={{ marginBottom: '10px' }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ backgroundColor: 'rgb(249,94,93)', '&:hover': { backgroundColor: 'rgb(249,94,93)' } }}
          >
            Apply Coupon
          </Button>
        </form>
      </Box>
    </Box>
            
            {/* content end */}
          </Box>


          
{children}

        </Box>
      </Mobile>
    </div>
  )
}

export default Coupenmainuser;