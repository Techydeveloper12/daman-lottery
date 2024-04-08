import React, { useEffect, useState } from 'react';
import Mobile from '../Components/Mobile';
import IconButton from '@mui/material/IconButton';
import SmsIcon from '@mui/icons-material/Sms';
import DownloadIcon from '@mui/icons-material/Download';
import { Typography, CardMedia, CardContent,Grid , Box,Paper,Select, MenuItem, FormControl, InputLabel, Card, CardHeader,} from '@mui/material';
import { collection, getDocs, query, where, orderBy,doc } from "firebase/firestore";
import { db ,auth} from "../firebase/config"; // Import your Firestore instance
import Transaction from '../Pages/Transaction';
import { DataGrid } from '@mui/x-data-grid';





const TransactionHistoryMain = ({ children }) => {
  
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
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      const userRef = doc(db, 'users', uid);
      const transactionsRef = collection(userRef, 'transactions');
      const transactionsQuery = query(transactionsRef, orderBy('timestamp', 'desc'));
      const transactionsSnap = await getDocs(transactionsQuery);

      const transactionsData = transactionsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setTransactions(transactionsData);
    };

    fetchTransactions();
  }, [uid]);
  const [filter, setFilter] = useState('');

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const filteredTransactions = transactions.filter(transaction => {
    const transactionDate = new Date(transaction.timestamp.seconds * 1000);
    return transactionDate.toISOString().split('T')[0] === selectedDate;
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
                color: 'white'
                
              }}
            >
              <Grid item xs={6} textAlign="left">
                <span style={{ fontWeight: "bold" }}>Transaction History</span>
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



            <FormControl variant="outlined" style={{ marginBottom: '20px', marginTop: '10px',width:"95%",}} fullWidth>
  <InputLabel id="filter-label">All</InputLabel>
  <Select
    value={filter}
    onChange={handleFilterChange}
    label="All"
  >
    <MenuItem value="all">All</MenuItem>
    <MenuItem value={'deposit'}>Deposit</MenuItem>
    <MenuItem value={'withdrawal'}>Withdrawal</MenuItem>
    <MenuItem value={'commission'}>Agent Commission</MenuItem>
    <MenuItem value={'bet'}>Bet</MenuItem>
    <MenuItem value={'wingo'}>Wingo</MenuItem>
    <MenuItem value={'bonus'}>Deposit Gift</MenuItem>
    <MenuItem value={'bonus'}>Sign Up bonus</MenuItem>
    <MenuItem value={'salary'}>Salary</MenuItem>
  </Select>
</FormControl>

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
                margin: '10px 0',
              }}
            />
<Grid container spacing={1} sx={{width:"98%", marginLeft:"auto",marginRight:"auto",marginBottom:"100px"}}>
{filteredTransactions.filter(transaction => filter === 'all' || transaction.type === filter).map((transaction, index) => (
    <Grid item xs={12} sm={12} md={12} key={index}>
      <Card style={{ borderRadius: '1px', padding: '10px', backgroundColor: 'RGB(255,255,255)' }}>
      <CardHeader
  title={transaction.type.toUpperCase()}
  titleTypographyProps={{ align: 'left', variant: 'body2' }}
  style={{ backgroundColor: 'rgb(249,94,93)', color: 'white', height: '10px', lineHeight: '40px' }}
/>
<CardContent>
  <Grid container>
    <Grid item xs={3} style={{ backgroundColor: 'RGB(241,243,255)', marginTop: '10px',padding:"10px" }}>
      <Typography variant="caption">Amount:</Typography>
    </Grid>
    <Grid item xs={9} style={{ textAlign: 'right', backgroundColor: 'RGB(241,243,255)', color: 'red', marginTop: '10px',padding:"10px" }}>
      <Typography variant="caption">₹{transaction.amount}</Typography>
    </Grid>
    {transaction.commissionType && (
      <>
        <Grid item xs={3} style={{ backgroundColor: 'RGB(241,243,255)', marginTop: '10px',padding:"10px" }}>
          <Typography variant="caption">Level:</Typography>
        </Grid>
        <Grid item xs={9} style={{ textAlign: 'right', backgroundColor: 'RGB(241,243,255)', marginTop: '10px',padding:"10px" }}>
          <Typography variant="caption">{transaction.commissionType}</Typography>
        </Grid>
      </>
    )}
    <Grid item xs={3} style={{ backgroundColor: 'RGB(241,243,255)', marginTop: '10px',padding:"10px" }}>
      <Typography variant="caption">Time:</Typography>
    </Grid>
    <Grid item xs={9} style={{ textAlign: 'right', backgroundColor: 'RGB(241,243,255)', marginTop: '10px',padding:"10px" }}>
      <Typography variant="caption">{transaction.timestamp.toDate().toLocaleString()}</Typography>
    </Grid>
  </Grid>
</CardContent>
      </Card>
    </Grid>
  ))}
</Grid>
            {/* content end */}
          </Box>


          
{children}

        </Box>
      </Mobile>
    </div>
  )
}

export default TransactionHistoryMain;