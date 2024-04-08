import React, { useEffect, useState } from 'react';
import Mobile from '../Components/Mobile';
import IconButton from '@mui/material/IconButton';
import SmsIcon from '@mui/icons-material/Sms';
import DownloadIcon from '@mui/icons-material/Download';
import { Typography,  Card, CardMedia, CardContent,Grid , Box,CardHeader} from '@mui/material';
import { collection, getDocs, query, where, orderBy,doc } from "firebase/firestore";
import { db ,auth} from "../firebase/config"; // Import your Firestore instance
import Transaction from '../Pages/Transaction';
import { DataGrid } from '@mui/x-data-grid';
import {getDoc } from 'firebase/firestore';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Select, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';


const CommisionDetailsMain = ({ children }) => {
  
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
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const userRef = doc(db, 'users', uid);
      const userSnap = await getDoc(userRef);
      const user = userSnap.data();

      setUserData(user);
    };

    fetchUserData();
  }, [uid]);

  const [selectedGame, setSelectedGame] = useState('Lottery');
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
                backgroundColor: 'rgb(249,94,93)',
                padding: '8px 16px',
                color: 'white'
                
              }}
            >
              <Grid item xs={6} textAlign="left">
                <span style={{ fontWeight: "bold" }}>Commision Details</span>
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

            <Select sx={{mt:1,width:"95%"}} fullWidth
  value={selectedGame}
  onChange={(event) => setSelectedGame(event.target.value)}
>
<MenuItem value={'All'}>All</MenuItem>
  <MenuItem value={'Lottery'}>Lottery</MenuItem>
  <MenuItem value={'K3 Game'}>Slots</MenuItem>
  <MenuItem value={'Casino'}>Casino</MenuItem>
  <MenuItem value={'PVC'}>PVC</MenuItem>
</Select>


            <Card sx={{ borderRadius: '15px', padding: '10px', backgroundColor: '#f5f5f5', marginTop: '16px' }}>
  <CardHeader
    title="Lottery"
    titleTypographyProps={{ align: 'center', variant: 'h6' }}
    style={{ backgroundColor: 'rgb(249,94,93)', color: 'white', height: '40px', lineHeight: '40px' }}
  />
  <CardContent>
    <Grid container spacing={2}>
      {Array.from({ length: 5 }, (_, i) => i + 1).map(level => (
        <React.Fragment key={level}>
          <Grid item xs={6} style={{ backgroundColor: 'RGB(247,248,255)', marginTop: '10px',padding:"10px" }}>
            <Typography variant="caption">Level {level}:</Typography>
          </Grid>
          <Grid item xs={6} style={{ textAlign: 'right', backgroundColor: 'RGB(247,248,255)', marginTop: '10px', color: 'red',padding:"10px" }}>
          <Typography variant="caption">₹{userData && userData[`commissionLevel${level}`] ? userData[`commissionLevel${level}`] : 0}</Typography>
          </Grid>
        </React.Fragment>
      ))}
    </Grid>
  </CardContent>
</Card>
           
            {/* content end */}
          </Box>


          
{children}

        </Box>
      </Mobile>
    </div>
  )
}

export default CommisionDetailsMain;