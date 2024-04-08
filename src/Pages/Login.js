import React, { useState} from 'react';
import Mobile from '../Components/Mobile';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Drawer from '@mui/material/Drawer';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import TranslateIcon from '@mui/icons-material/Translate';
import FlagIcon from '@mui/icons-material/Flag';
import ReactCountryFlag from 'react-country-flag';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import FormLabel from '@mui/material/FormLabel';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LockIcon from '@mui/icons-material/Lock';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import { RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {auth,db } from '../firebase/config';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { doc, updateDoc, serverTimestamp } from 'firebase/firestore';


const Login = () => {

  

  const [openDrawer, setOpenDrawer] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [tabValue, setTabValue] = useState(0);
  const [showPassword, setShowPassword] = useState(false);

  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language);
    setOpenDrawer(false);
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };


const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const navigate = useNavigate();

const handleEmailLogin = async (event) => {
  event.preventDefault();
  const auth = getAuth();

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    // Signed in 

    // Update the last login time in Firestore
    await updateDoc(doc(db, 'users', userCredential.user.uid), {
      lastLogin: serverTimestamp(),
    });

    // You can fetch user data from Firestore here if needed

    // Redirect to the main screen
    navigate('/');
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    if (errorCode === 'auth/user-not-found') {
      alert('There is no user record corresponding to this email. The user may have been deleted.');
    } else if (errorCode === 'auth/wrong-password') {
      alert('The password is invalid for the given email, or the account corresponding to the email does not have a password set.');
    } else {
      alert(errorMessage);
    }
    // ..
  }
};


const handleregister = async () => {
  // Signup logic here...

  // After successful signup, redirect to the login page
  navigate('/register');
};

  return (
    <div>
      <Mobile>
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
          <Grid item xs={4} textAlign="left">
            <IconButton sx={{ marginLeft: '-8px' }} color="inherit">
              <ArrowBackIcon />
            </IconButton>
          </Grid>
          <Grid item xs={4} textAlign="center">
            <span style={{ fontWeight: "bold" }}>MC </span>
          </Grid>
          <Grid item xs={4} textAlign="right">
            <IconButton onClick={() => setOpenDrawer(true)} color="inherit">
              <TranslateIcon />
              {selectedLanguage && (
                <>
                  {selectedLanguage === 'EN' && <FlagIcon component="span" fontSize="small" sx={{ marginLeft: '4px' }} />}
                  {selectedLanguage === 'HN' && <FlagIcon component="span" fontSize="small" sx={{ marginLeft: '4px' }} />}
                  <span>{selectedLanguage}</span>
                </>
              )}
            </IconButton>
          </Grid>
        </Grid>
        <Drawer anchor="bottom" open={openDrawer} onClose={() => setOpenDrawer(false)}>
          <Grid container justifyContent="space-around" alignItems="center" sx={{ padding: '16px' }}>
            <Button onClick={() => handleLanguageSelect('EN')}>
              <ReactCountryFlag countryCode="US" svg />
              EN
            </Button>
            <Button onClick={() => handleLanguageSelect('HN')}>
              <ReactCountryFlag countryCode="IN" svg />
              HN
            </Button>
          </Grid>
        </Drawer>
        <Grid
        container
        justifyContent="flex-start"
        alignItems="flex-start"
        sx={{
          backgroundColor: 'rgb(249,94,93)',
          padding: '16px',
          color: 'white',
          minHeight: 'fit-content'
        }}
        direction="column"
      >
       <Typography variant="h5">Login</Typography>
<Typography variant="subtitle2">Please login with your phone number or email </Typography>

        
        
      </Grid>
      <Grid
        container
        justifyContent="flex-start"
        alignItems="flex-start"
        sx={{
          backgroundColor: '#F7F8FF',
          padding: '16px',
          color: 'white',
          minHeight: 'fit-content'
        }}
      >
        <Grid item xs={12}  sx={{ marginBottom: '50px' }} >
          <form onSubmit={handleEmailLogin}>
          <Tabs 
  value={tabValue} 
  onChange={handleTabChange} 
  TabIndicatorProps={{ style: { backgroundColor: tabValue === 0 ? '#FF7172' : 'grey' } }}
>
  <Tab 
    icon={<EmailIcon style={{ color: tabValue === 0 ? 'rgb(249,94,93)' : 'grey' }} />} 
    label="Email Login" 
    style={{ color: tabValue === 0 ? '#FF7172' : 'grey' }}
  />
  <Tab 
    icon={<PhoneIcon style={{ color: tabValue === 1 ? 'rgb(249,94,93)' : 'grey' }} />} 
    label="Login with Phone" 
    style={{ color: tabValue === 1 ? '#FF7172' : 'grey' }}
  />
</Tabs>
            <TabPanel value={tabValue} index={0}>
            <Box display="flex" alignItems="center" mt={2}>
                <EmailIcon sx={{color:"rgb(249,94,93)"}} />
                <FormLabel>Email</FormLabel>
              </Box>
              <TextField
                label="Email"
                fullWidth
                variant="outlined"
                margin="normal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                sx={{ backgroundColor: '#FFFFFF' }}
                InputProps={{
                    style: { borderRadius: "10px" }
                  }}
                
              />
            </TabPanel>
            <TabPanel value={tabValue} index={1}>
            <Box display="flex" alignItems="center" mt={2}>
                <PhoneIcon sx={{color:"Rrgb(249,94,93)"}}/>
                <FormLabel>Phone Number</FormLabel>
              </Box>
              <TextField
                label="Phone Number"
                fullWidth
                variant="outlined"
                margin="normal"
                
                sx={{ backgroundColor: '#FFFFFF' }}
                InputProps={{
                    style: { borderRadius: "10px" }
                  }}
              />
            </TabPanel>
            <Box display="flex" alignItems="center" mt={2}>
                <LockIcon sx={{color:"Rrgb(249,94,93)"}}/>
                <FormLabel>Please enter Password</FormLabel>
              </Box>
            <TextField
              label="Password"
              type={showPassword ? 'text' : 'password'}
              fullWidth
              variant="outlined"
              margin="normal"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{ backgroundColor: '#FFFFFF' }}
              InputProps={{
                style: { borderRadius: "10px" },
                endAdornment: (
                  <IconButton onClick={handleShowPassword} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                ),
              }}
            />
              
            <Box sx={{ display: 'flex', alignItems: 'center', margin: '16px 0 8px' }}>
            <RadioGroup row >
  <FormControlLabel 
    value="remember" 
    control={<Radio />} 
    label="Remember Password " 
    labelPlacement="end"
    style={{ color: 'black' }}

  />
</RadioGroup>
              
            </Box>
            <Button variant="contained" fullWidth type='submit' style={{ marginBottom: '8px',backgroundColor:"rgb(249,94,93)" ,borderRadius:"300px",fontWeight: "bold" }}>
              Log in
            </Button>
            <Button onClick={handleregister} variant="outlined" color="primary" fullWidth style={{ borderRadius:"300px",borderColor:"rgb(249,94,93)"}}>
  
  <span style={{ color: 'rgb(249,94,93)',marginLeft:"3px",fontWeight: "bold", }}> Register</span>
</Button>

          </form>
        </Grid>
        <Grid
  container
  justifyContent="flex-start"
  alignItems="flex-start"
  sx={{
    backgroundColor: '#F7F8FF',
    padding: '16px',
    color: 'white',
    minHeight: 'fit-content'
  }}
>
  {/* Your form grid code */}
</Grid>

<Grid
  container
  direction="column"
  alignItems="center"
  justifyContent="center"
  sx={{ padding: '16px' }}
>
  <SupportAgentIcon style={{ fontSize: 60, color: 'rgb(249,94,93)' }} />
  <Typography variant="subtitle1" style={{ color: 'black', marginBottom:"150px" }}>Customer Service</Typography>
</Grid>



      </Grid>

    
    </Mobile>
    </div>
  );
};

const TabPanel = ({ children, value, index }) => {
  return (
    <div role="tabpanel" hidden={value !== index} id={`tabpanel-${index}`}>
      {value === index && (
        <Box sx={{ p: 0 }}>
          {children}
        </Box>
      )}
    </div>
  );
};


export default Login;
