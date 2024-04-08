import React, { useState, useEffect } from 'react';
import Mobile from '../Components/Mobile';
import IconButton from '@mui/material/IconButton';
import {Button } from '@mui/material';

import SmsIcon from '@mui/icons-material/Sms';
import DownloadIcon from '@mui/icons-material/Download';
import { Typography,  Card, CardMedia, CardContent,Grid , Box} from '@mui/material';

import { useNavigate } from 'react-router-dom';
import QRCode from 'qrcode.react';
import { doc, getDoc } from "firebase/firestore";
import { db, auth } from '../firebase/config'; // Make sure the path is correct
import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';


const InviteMain= ({ children }) => {
const [invitationLink, setInvitationLink] = useState('');
  useEffect(() => {
    const setVh = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    window.addEventListener('resize', setVh);
    setVh();

    return () => window.removeEventListener('resize', setVh);
  }, []);
  const navigate = useNavigate();
  const navigateToPage2 = () => {
    navigate('/coupen-user'); // Replace '/path-to-page' with the actual path
  };
  const uid = auth.currentUser.uid; 
  useEffect(() => {
    const fetchInvitationLink = async () => {
      try {
        const userRef = doc(db, 'users', uid);
        const userDoc = await getDoc(userRef);
        setInvitationLink(userDoc.data().referralLink);
      } catch (err) {
        console.error('Failed to fetch invitation link: ', err);
      }
    };
  
    fetchInvitationLink();
  }, [uid]);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(invitationLink);
      alert('Invitation link copied to clipboard');
    } catch (err) {
      console.error('Failed to copy invitation link: ', err);
    }
  };

  const handleDownload = () => {
    const div = document.getElementById('divToDownload');
  
    html2canvas(div).then((canvas) => {
      canvas.toBlob((blob) => {
        saveAs(blob, 'invitation.png');
      });
    });
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
                <span style={{ fontWeight: "bold" }}>Invite Link</span>
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

            <div id="divToDownload"
       style={{
        backgroundImage: 'url(assets/images/poster-e8284649.png)',
        backgroundSize: '100% 100%', // Stretch the image to fit the div
        backgroundRepeat: 'no-repeat',
        minHeight: '60vh',
        padding: '20px',
        marginLeft: '25px',
        marginRight: '25px',
        marginTop: '20px',
      }}
        
      
    >
      <Grid container spacing={2}>
        {/* First Row */}
        <Grid item xs={12} sx={{ textAlign: 'center' }}>
          <img src="assets/images/h5setting_20231215032755xgv9.png" width="100" alt="logo" />
        </Grid>
        {/* Second Row */}
        {/* Second Row */}
<Grid container item xs={12} direction="row" justifyContent="center">
  <Grid item xs={6}>
    <Box
      component="div"
      sx={{
        backgroundColor: 'RGB(254,220,133)',
        borderRadius: '30px 0px 30px 0',
        color: 'red',
        fontWeight: 'bold',
        p: 2,
        display: 'inline-block',
        m: 1,
        fontSize:"13px"
      }}
    >
      Fair and justice
    </Box>
  </Grid>
  <Grid item xs={6}>
    <Box
      component="div"
      sx={{
        backgroundColor: 'RGB(254,220,133)',
        borderRadius: '30px 0px 30px 0',
        color: 'red',
        fontWeight: 'bold',
        p: 1,
        display: 'inline-block',
        m: 1,
        fontSize:"13px"
      }}
    >
      Open and transparent
    </Box>
  </Grid>
</Grid>
       {/* Third Row */}
<Grid item xs={12} sx={{ textAlign: 'center' }}>
  <Typography variant="h4" style={{ color: 'white', fontWeight: 'bold' }}>Full Odds Bonus Rates</Typography>
</Grid>
{/* Fourth Row */}
<Grid container item xs={12} spacing={2}>
  <Grid item xs={6}>
    <Box sx={{ border: 1, borderColor: 'white', p: 2 }}>
      <img src="assets/images/downloadinvi.png" alt="image1" />
      <Typography variant="body1" style={{ color: 'white', fontWeight: 'bold',fontSize:"20px" }}>Financial security </Typography>
    </Box>
  </Grid>
  <Grid item xs={6}>
    <Box sx={{ border: 1, borderColor: 'white', p: 2 }}>
      <img src="assets/images/download (18).png" alt="image2" />
      <Typography variant="body1" style={{ color: 'white', fontWeight: 'bold',fontSize:"20px" }}>Quick withdrawl</Typography>
    </Box>
  </Grid>
</Grid>
{/* Fifth Row */}
<Grid item xs={12} sx={{ textAlign: 'center' }}>
  <Typography variant="h6" style={{ color: 'white', fontWeight: 'bold' }}>Permanent commission upto 85%</Typography>
</Grid>
{/* Sixth Row */}
<Grid item xs={12} sx={{ textAlign: 'center' }}>
  <QRCode value={invitationLink} />
</Grid>
      </Grid>
    </div>

    <Grid container spacing={2} sx={{
         marginLeft: 'auto',
        marginRight: 'auto',
        width: '90%',
        marginTop: '20px',
        marginBottom:"150px"}}>
     <Grid item xs={12}>
     <Button variant="contained" fullWidth onClick={handleDownload} style={{ backgroundColor: 'orange' }}>
  Invitation Link
</Button>
</Grid>
      <Grid item xs={12}>
  <Button variant="outlined" fullWidth onClick={handleCopyLink}>
    Copy Invitation Link
  </Button>
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

export default InviteMain;