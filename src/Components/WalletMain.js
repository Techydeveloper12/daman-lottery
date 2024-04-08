import React, { useEffect } from 'react'
import Mobile from '../Components/Mobile';
import IconButton from '@mui/material/IconButton';
import { doc, onSnapshot } from 'firebase/firestore';
import SmsIcon from '@mui/icons-material/Sms';
import DownloadIcon from '@mui/icons-material/Download';
import {  Typography, Button,Grid , Box} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { db,auth } from '../firebase/config'; // Make sure the path is correct
import { CircularProgress} from '@mui/material';



const WalletMain = ({ children }) => {

  useEffect(() => {
    const setVh = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    window.addEventListener('resize', setVh);
    setVh();

    return () => window.removeEventListener('resize', setVh);
  }, []);

  const [userData, setUserData] = React.useState(null);
  const mainWalletBalance = 0; // Example balance for main wallet
  const thirdPartyWalletBalance = 0; // Example balance for third party wallet
  const progressMainWallet = (mainWalletBalance / 10000) * 100; // Calculate progress for main wallet
  const progressThirdPartyWallet = (thirdPartyWalletBalance / 10000) * 100; // Calculate progress for third party wallet

  const uid = auth.currentUser.uid; // Get the current user's UID

useEffect(() => {
  const unsubscribe = onSnapshot(doc(db, 'users', uid), (doc) => {
    const data = doc.data();
    data.lastLogin = data.lastLogin.toDate(); // Convert Firestore Timestamp to JavaScript Date
    setUserData(data);
  });

  

  return () => unsubscribe();
}, [uid]);

const navigate = useNavigate();
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
                backgroundImage: 'linear-gradient(90deg, rgb(250,93,92) 0%, rgb(254,148,137) 100%)',
                padding: '8px 16px',
                color: 'white'
              }}
            >
              <Grid item xs={6} textAlign="left">
                <span style={{ fontWeight: "bold" }}>Wallet </span>
              </Grid>
              <Grid item xs={6} textAlign="right">
              <IconButton color="inherit" onClick={() => navigate('/messages')}>
  <SmsIcon />
</IconButton>
                <IconButton color="inherit">
                  <DownloadIcon />
                </IconButton>
              </Grid>
            </Grid>


          <Grid container spacing={2} sx={{   backgroundImage: 'linear-gradient(90deg, rgb(250,93,92) 0%, rgb(254,148,137) 100%)', height:"250px"}}>
      {/* First Row */}
    
      {/* Second Row */}
      <Grid item xs={12}>
        <img src="assets/images/wallets-55b46543.png" alt="Placeholder" width={50} height={50} />
      </Grid>
      {/* Third Row */}
      <Grid item xs={12}>
    <Typography variant="body1" color={"white"}>{`\u20B9${userData?.wallet || 0}`}</Typography>
    <Typography variant="caption" color={"white"}>Total balance</Typography>
  </Grid>
      {/* Fourth Row */}
     
      {/* Fifth Row */}
      <Grid item xs={6}>
    <Typography variant="h6" color={"white"}>{`\u20B9${userData?.wallet || 0}`}</Typography>
    <Typography variant="body1" color={"white"}>Total Amount</Typography>
  </Grid>
  <Grid item xs={6} sx={{marginBottom:"50px"}}>
    <Typography variant="h6" color={"white"}>{`\u20B9${userData?.wallet || 0}`}</Typography>
    <Typography variant="body1" color={"white"}>Total Deposit Amount</Typography>
  </Grid>
    </Grid>

    <Grid container sx={{ boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                marginLeft: 'auto',
                marginRight: 'auto',
                maxWidth: '95%',
                backgroundColor: "#FFFFFF",
                borderRadius:"20px",
                transform: 'translateY(-15px)' }}
               >
 {/* First Grid */}
<Grid item xs={6} mt={2}>
  <Box position="relative" display="inline-flex">
    <CircularProgress variant="determinate" value={100} size={80} sx={{ color: '#D8D8D8' }} />
    <CircularProgress variant="determinate" value={progressMainWallet} size={80} sx={{ color: 'rgb(249,94,93)', position: 'absolute' }} />
    <Box
      top={0}
      left={0}
      bottom={0}
      right={0}
      position="absolute"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Typography variant="caption" component="div" color="text.secondary">
        {`${Math.round(progressMainWallet)}%`}
      </Typography>
    </Box>
  </Box>
  <Typography variant="body1">Main Wallet</Typography>
  <Typography variant="h6">{`\u20B9${userData?.wallet || 0}`}</Typography>
</Grid>
<Grid item xs={6} mt={2}>
  <Box position="relative" display="inline-flex">
    <CircularProgress variant="determinate" value={100} size={80} sx={{ color: '#D8D8D8' }} />
    <CircularProgress variant="determinate" value={progressThirdPartyWallet} size={80} sx={{ color: 'rgb(249,94,93)', position: 'absolute' }} />
    <Box
      top={0}
      left={0}
      bottom={0}
      right={0}
      position="absolute"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Typography variant="caption" component="div" color="text.secondary">
        {`${Math.round(progressThirdPartyWallet)}%`}
      </Typography>
    </Box>
  </Box>
  <Typography variant="body1">3rd Party Wallet</Typography>
  <Typography variant="h6">{`₹${thirdPartyWalletBalance}`}</Typography>
</Grid>
  {/* Second Grid */}
  <Grid item xs={12} mt={2}>
    <Button variant="contained" sx={{backgroundColor:"rgb(249,94,93)",borderRadius:"20px" ,width:"80%"}} fullWidth>Main wallet transfer</Button>
  </Grid>
  {/* Third Grid */}
  <Grid container item xs={12} spacing={2} mt={2}>
    <Grid item xs={3} onClick={() => navigate('/recharge')}>
      <img src="assets/images/download (14).png" alt="1" width={50} height={50} />
      <Typography variant="subtitle1">Deposit </Typography>
    </Grid>
    <Grid item xs={3} onClick={() => navigate('/withdraw')}>
      <img src="assets/images/download (15).png" alt="2"  width={50} height={50} />
      <Typography variant="subtitle1">Withdraw</Typography>
    </Grid>
    <Grid item xs={3} onClick={() => navigate('/deposit-history')}>
      <img src="assets/images/rechargeHistory-195824c7.png" alt=" 3"   width={50} height={50}/>
      <Typography variant="subtitle1">Deposit history</Typography>
    </Grid>
    <Grid item xs={3} onClick={() => navigate('/withdraw-history')}>
      <img src="assets/images/withdrawHistory2-840eb5de.png" alt="4"   width={50} height={50}/>
      <Typography variant="subtitle1">Withdraw History</Typography>
    </Grid>
  </Grid>
</Grid>


            {/* content end */}
          </Box>


          
{children}

        </Box>
      </Mobile>
    </div>
  )
}

export default WalletMain;