import React, { useEffect, useState } from 'react';
import Mobile from '../Components/Mobile';
import IconButton from '@mui/material/IconButton';
import { collection, getDocs, doc } from 'firebase/firestore';
import { db, auth } from '../firebase/config'; // Make sure the path is correct
import SmsIcon from '@mui/icons-material/Sms';
import DownloadIcon from '@mui/icons-material/Download';
import { Typography, Card, CardMedia, CardContent, Grid, Box,CardHeader } from '@mui/material';
import BetHistory from '../Pages/DepositHistory';
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';

const BetHistoryMain = ({ children }) => {
  async function getUserBets(uid) {
    const userRef = doc(db, 'users', uid);
    const betHistoryRef = collection(userRef, 'betHistory');
    const betHistorySnapshot = await getDocs(betHistoryRef);
    const bets = betHistorySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return bets;
  }

  const [bets, setBets] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    const fetchBets = async () => {
      const userBets = await getUserBets(auth.currentUser.uid);
      setBets(userBets);
    };

    fetchBets();
  }, []);

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };
  const navigate = useNavigate();
  const filteredBets = bets.filter(bet => {
    const betDate = new Date(bet.timestamp.seconds * 1000);
    const selectedDateObj = new Date(selectedDate);
    return betDate.getFullYear() === selectedDateObj.getFullYear() &&
      betDate.getMonth() === selectedDateObj.getMonth() &&
      betDate.getDate() === selectedDateObj.getDate();
  });
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
                color: 'white',
              }}
            >
              <Grid item xs={6} textAlign="left">
                <span style={{ fontWeight: 'bold' }}>Bet History</span>
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

         
            <input
  type="date"
  value={selectedDate}
  onChange={handleDateChange}
  style={{
    width: '95%',
    padding: '10px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    boxSizing: 'border-box',
    marginTop: '10px',
  }}
/>
{/* Content */}
{/* Content */}
<Grid container spacing={2} sx={{ padding: '16px' }}>
  {filteredBets.slice().reverse().map((bet, index) => ( // Slice and reverse the array
    <Grid item xs={12} key={bet.id}>
      <Card sx={{ borderRadius: '15px', padding: '10px', backgroundColor: 'RGB(255,255,255)' }}>
        <CardHeader
          title={`Bet #${bets.length - index}`}
          titleTypographyProps={{ align: 'left', variant: 'body2' }}
          style={{ backgroundColor: 'rgb(249,94,93)', color: 'white', height: '10px', lineHeight: '40px' }}
        />
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={3} style={{ backgroundColor: 'RGB(241,243,255)', marginTop: '10px',padding:"10px" }}>
              <Typography variant="caption">Period ID:</Typography>
            </Grid>
            <Grid item xs={9} style={{ textAlign: 'right', backgroundColor: 'RGB(241,243,255)', marginTop: '10px',padding:"10px" }}>
              <Typography variant="caption">{bet.periodId}</Typography>
            </Grid>
            <Grid item xs={3} style={{ backgroundColor: 'RGB(241,243,255)', marginTop: '10px',padding:"10px" }}>
              <Typography variant="caption">Time:</Typography>
            </Grid>
            <Grid item xs={9} style={{ textAlign: 'right', backgroundColor: 'RGB(241,243,255)', marginTop: '10px',padding:"10px" }}>
              <Typography variant="caption">{new Date(bet.timestamp.seconds * 1000).toLocaleString()}</Typography>
            </Grid>
            <Grid item xs={3} style={{ backgroundColor: 'RGB(241,243,255)', marginTop: '10px',padding:"10px" }}>
              <Typography variant="caption">Total Bet:</Typography>
            </Grid>
            <Grid item xs={9} style={{ textAlign: 'right', backgroundColor: 'RGB(241,243,255)', marginTop: '10px', color: 'red',padding:"10px" }}>
  <Typography variant="caption">₹{bet.totalBet}</Typography>
</Grid>
            {/* Add more rows as needed */}
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  ))}
</Grid>
{/* Content End */}
{/* Content End */}


          </Box>
          {children}
        </Box>
      </Mobile>
    </div>
  );
};

export default BetHistoryMain;
