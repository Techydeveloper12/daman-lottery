import React, { useEffect, useState } from 'react';
import Mobile from '../Components/Mobile';
import IconButton from '@mui/material/IconButton';
import SmsIcon from '@mui/icons-material/Sms';
import DownloadIcon from '@mui/icons-material/Download';
import { Typography, Grid, Box,cardActionAreaClasses,CardHeader,CardContent,Card ,Tooltip,TextField,Button,MenuItem,Select,FormControl,InputLabel} from '@mui/material';

import { db ,auth} from "../firebase/config"; // Import your Firestore instance
import Transaction from '../Pages/Transaction';
import { DataGrid } from '@mui/x-data-grid';
import { doc, getDoc } from 'firebase/firestore';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import CopyToClipboard from 'react-copy-to-clipboard';
import FileCopyIcon from '@mui/icons-material/FileCopy';


const SubordinateDataMain = ({ children }) => {
  
  useEffect(() => {
    const setVh = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    window.addEventListener('resize', setVh);
    setVh();

    return () => window.removeEventListener('resize', setVh);
  }, []);
 
 
  const uid = auth.currentUser.uid;
  const [dailyDeposits, setDailyDeposits] = useState([]);
  const fetchUserData = async () => {
    const userRef = doc(db, 'users', uid);
    const userSnap = await getDoc(userRef);
    const user = userSnap.data();
  
    if (user && user.referrals) { // Check if user and user.referrals are defined
      // Get all daily deposits
      const allDeposits = user.referrals.flatMap(referral => referral.dailyDeposit);
  
      setDailyDeposits(allDeposits);
    }
  };
  
  fetchUserData();

  const [searchTerm, setSearchTerm] = useState('');
  const [searchDate, setSearchDate] = useState('');
const [searchLevel, setSearchLevel] = useState('');
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
                <span style={{ fontWeight: "bold" }}>Subordinate Data</span>
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

         
           {/* Content */}
           <Grid container spacing={2} sx={{ padding: '16px' }}>
  <Grid item xs={6} sm={6}>
    <TextField
      value={searchTerm}
      onChange={event => setSearchTerm(event.target.value)}
      label="Search User ID"
      variant="outlined"
      fullWidth
    />
  </Grid>
  <Grid item xs={6} sm={6}>
    <Button variant="contained" sx={{height:"55px"}} color="primary" onClick={() => setSearchTerm('')} fullWidth>
      Clear
    </Button>
  </Grid>
  <Grid item xs={6} sm={6}>
    <TextField
      value={searchDate}
      onChange={event => setSearchDate(event.target.value)}
      label="Search Date"
      variant="outlined"
      type="date"
      InputLabelProps={{
        shrink: true,
      }}
      fullWidth
    />
  </Grid>
  <Grid item xs={6} sm={6}>
    <FormControl variant="outlined" fullWidth>
      <InputLabel id="level-label">Select Level</InputLabel>
      <Select
        labelId="level-label"
        value={searchLevel}
        onChange={event => setSearchLevel(event.target.value)}
        label="Select Level"
        fullWidth
      >
        <MenuItem value=""><em>None</em></MenuItem>
        <MenuItem value={1}>1</MenuItem>
        <MenuItem value={2}>2</MenuItem>
        <MenuItem value={3}>3</MenuItem>
        <MenuItem value={4}>4</MenuItem>
        <MenuItem value={5}>5</MenuItem>
      </Select>
    </FormControl>
  </Grid>
</Grid>
<Grid container spacing={2} sx={{ padding: '16px' }}>
{dailyDeposits.filter(deposit => 
  deposit.userId.toString().includes(searchTerm) &&
  deposit.date.includes(searchDate) &&
  deposit.level.toString().includes(searchLevel)
).map((deposit, index) => (

  <Grid item xs={12} key={index}>
    <Card sx={{ borderRadius: '15px', padding: '10px', backgroundColor: 'RGB(255,255,255)' }}>
    <CardHeader
  title={
    <Box display="flex" alignItems="center">
      <Typography variant="body2" component="span">{`${index + 1} - User ID: ${deposit.userId}`}</Typography>
      <CopyToClipboard text={deposit.userId}>
        <Tooltip title="Copy User ID">
          <IconButton>
            <FileCopyIcon style={{color:"white",fontSize:"15px"}}/>
          </IconButton>
        </Tooltip>
      </CopyToClipboard>
    </Box>
  }
  titleTypographyProps={{ align: 'left' }}
  style={{ backgroundColor: 'rgb(249,94,93)', color: 'white', height: '10px', lineHeight: '40px' }}
/>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={3} style={{ backgroundColor: 'RGB(241,243,255)', marginTop: '10px',padding:"10px" }}>
              <Typography variant="caption">Date:</Typography>
            </Grid>
            <Grid item xs={9} style={{ textAlign: 'right', backgroundColor: 'RGB(241,243,255)', marginTop: '10px',padding:"10px" }}>
              <Typography variant="caption">{deposit.date}</Typography>
            </Grid>
            <Grid item xs={3} style={{ backgroundColor: 'RGB(241,243,255)', marginTop: '10px',padding:"10px" }}>
              <Typography variant="caption">Amount:</Typography>
            </Grid>
            <Grid item xs={9} style={{ textAlign: 'right', backgroundColor: 'RGB(241,243,255)', marginTop: '10px', color: 'red',padding:"10px" }}>
              <Typography variant="caption">₹{deposit.amount}</Typography>
            </Grid>
            <Grid item xs={4} style={{ backgroundColor: 'RGB(241,243,255)', marginTop: '10px',padding:"10px" }}>
              <Typography variant="caption">Bet Amount:</Typography>
            </Grid>
            <Grid item xs={8} style={{ textAlign: 'right', backgroundColor: 'RGB(241,243,255)', marginTop: '10px', color: 'red',padding:"10px" }}>
  <Typography variant="caption">₹{deposit.totalBetAmount || 0}</Typography>
</Grid>
            <Grid item xs={4} style={{ backgroundColor: 'RGB(241,243,255)', marginTop: '10px',padding:"10px" }}>
              <Typography variant="caption">Commission:</Typography>
            </Grid>
            <Grid item xs={8} style={{ textAlign: 'right', backgroundColor: 'RGB(241,243,255)', marginTop: '10px', color: 'red',padding:"10px" }}>
  <Typography variant="caption">₹{deposit.totalCommissionReceived || 0}</Typography>
</Grid>
            <Grid item xs={3} style={{ backgroundColor: 'RGB(241,243,255)', marginTop: '10px',padding:"10px" }}>
              <Typography variant="caption">Level:</Typography>
            </Grid>
            <Grid item xs={9} style={{ textAlign: 'right', backgroundColor: 'RGB(241,243,255)', marginTop: '10px',padding:"10px" }}>
              <Typography variant="caption">{deposit.level}</Typography>
            </Grid>
           
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  ))}
</Grid>
{/* Content End */}
           
            {/* content end */}
          </Box>


          
{children}

        </Box>
      </Mobile>
    </div>
  )
}

export default SubordinateDataMain;