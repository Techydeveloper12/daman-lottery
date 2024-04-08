import React, { useEffect,useState, useRef} from 'react'
import Mobile from '../Components/Mobile';
import IconButton from '@mui/material/IconButton';
import SmsIcon from '@mui/icons-material/Sms';
import DownloadIcon from '@mui/icons-material/Download';
import { Box, Typography, Button,Grid,TextField, List, ListItem, ListItemText} from '@mui/material';
import { doc, onSnapshot, collection, addDoc,serverTimestamp,query,where,getDocs,orderBy,getFirestore,getDoc,increment,updateDoc } from 'firebase/firestore';
import { db, auth } from '../firebase/config'; // Make sure the path is correct
import RefreshIcon from '@mui/icons-material/Refresh';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import Alert from '@mui/material/Alert';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import axios from 'axios';


const PromotionMain = ({ children }) => {

  useEffect(() => {
    const setVh = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    window.addEventListener('resize', setVh);
    setVh();

    return () => window.removeEventListener('resize', setVh);
  }, []);

  const [remainingTime, setRemainingTime] = useState(300); // 5 minutes in seconds
  const timerRef = useRef(null);
  const [amount, setAmount] = useState('');

  const handleButtonClick = (value) => {
    setAmount(value);
  };

  const handleInputChange = (event) => {
    setAmount(event.target.value);
  };
  const [walletData, setWalletData] = useState(0);
  const [openDepositDialog, setOpenDepositDialog] = useState(false);
  const [utr, setUtr] = useState('');
  const [utrAlert, setUtrAlert] = useState(false);
  const [duplicateUtrAlert, setDuplicateUtrAlert] = useState(false);
  const [depositRequests, setDepositRequests] = useState([]);
  const handleUtrChange = (event) => {
    setUtr(event.target.value);
  };

  const [paymentMode, setPaymentMode] = useState('UPI x QR');
  const [userData, setUserData] = React.useState(null);

const uid = auth.currentUser.uid; // Get the current user's UID
  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, 'users', uid), (doc) => {
      const data = doc.data();
      data.lastLogin = data.lastLogin.toDate(); // Convert Firestore Timestamp to JavaScript Date
      setUserData(data);
    });
  
    return () => unsubscribe();
  }, [uid]);

  const sendDepositRequest = async () => {
    if (!utr) {
      setUtrAlert(true);
      return;
    }
    const depositRef = collection(db, 'depositRequests');
    const q = query(depositRef, where('utr', '==', utr));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      setDuplicateUtrAlert(true);
      return;
    }
    const userRef = doc(db, 'users', auth.currentUser.uid);
    const userSnap = await getDoc(userRef);
    if (!userSnap.exists()) {
      // Handle the error here. For example, you could throw an error or return.
      console.error('No user found with the current user ID');
      return;
    }
    const user = userSnap.data();
    await addDoc(depositRef, {
      userId: auth.currentUser.uid,
      username: user.username,
      amount: amount,
      status: 'pending',
      timestamp: serverTimestamp(),
      utr: utr
    });

  

    setOpenDepositDialog(false);
  };
 
  useEffect(() => {
    const depositRef = collection(db, 'depositRequests');
    const q = query(depositRef, where('userId', '==', auth.currentUser.uid), orderBy('timestamp', 'desc'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const requests = [];
      querySnapshot.forEach((doc) => {
        requests.push({ id: doc.id, ...doc.data() });
      });
      setDepositRequests(requests);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    const db = getFirestore();
    const userRef = doc(db, 'users', auth.currentUser.uid);
    const unsubscribe = onSnapshot(userRef, (doc) => {
      if (doc.exists()) {
        setWalletData(doc.data().wallet);
      }
    });
    return unsubscribe;
  }, []);

  
  useEffect(() => {
    if (openDepositDialog) {
      timerRef.current = setInterval(() => {
        setRemainingTime((time) => time - 1);
      }, 1000);
    } else {
      clearInterval(timerRef.current);
      setRemainingTime(300);
    }

    return () => clearInterval(timerRef.current);
  }, [openDepositDialog]);

  useEffect(() => {
    if (remainingTime === 0) {
      setOpenDepositDialog(false);
    }
  }, [remainingTime]);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };


  const [paymentUrl, setPaymentUrl] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userRef = doc(db, 'users', auth.currentUser.uid);
    const userSnap = await getDoc(userRef);
    if (!userSnap.exists()) {
      // Handle the error here. For example, you could throw an error or return.
      console.error('No user found with the current user ID');
      return;
    }
    const user = userSnap.data();
        const response = await axios.post('https://bannerfr5.online/makePayment', { am: amount, userId: auth.currentUser.uid,user: user.username,});
        if (response.data.respCode === 'SUCCESS' && response.data.payInfo) {
            setPaymentUrl(response.data.payInfo);
            window.location.href = response.data.payInfo;
        } else {
            alert('Payment request failed. Please try again Or Wrong Details.');
        }
    } catch (error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.error('Server Error:', error.response.data);
            console.error('Status Code:', error.response.status);
            console.error('Response Headers:', error.response.headers);
        } else if (error.request) {
            // The request was made but no response was received
            console.error('No response received:', error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.error('Error:', error.message);
        }
        alert('Payment request failed. Please try again Or Wrong Details.');
    }
};

const [upiId, setUpiId] = useState('');
const [usdtWalletAddress, setUsdtWalletAddress] = useState('');

// Fetch UPI ID and USDT Wallet Address from Firestore
useEffect(() => {
  const fetchData = async () => {
    const docRef = doc(db, 'config', 'main');
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setUpiId(docSnap.data().upiId);
      setUsdtWalletAddress(docSnap.data().usdtWalletAddress);
    } else {
      console.log('No such document!');
    }
  };

  fetchData();
}, []);
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
                <span style={{ fontWeight: "bold" }}>Deposit</span>
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

           
           
            <Grid
      container
      mt={2}
      style={{
        backgroundImage: `url('assets/images/TotalAssetsBg-f72f7084.png')`,
        borderRadius: 8,
        padding: 16,
        backgroundSize: 'cover',
        width: '97%',
        marginLeft: 'auto',
        marginRight: 'auto',
      }}
    >
      <Grid container item alignItems="center">
        <Grid item xs={3}  align="center">
          <img src="assets/images/download (16).png" alt="Your Image" style={{ maxWidth: '20%' }} />
        </Grid>
        <Grid item xs={9}>
          <Typography variant="body1" sx={{color:"white"}} align="left">Balance</Typography>
        </Grid>
      </Grid>
      <Grid container item alignItems="center">
        <Grid item xs={4}>
          <Typography variant="body1"  sx={{color:"white"}} align="center"> ₹{walletData}</Typography>
        </Grid>
        <Grid item xs={8} style={{ textAlign: 'left' }}>
          <IconButton>
            <RefreshIcon style={{color:"white"}} />
          </IconButton>
        </Grid>
      </Grid>
      <Grid container item alignItems="center" style={{ marginTop: 16 }}>
        <Grid item xs={3}>
          <img src="assets/images/cip-a09b4c1d.png" alt="Your Image" style={{ maxWidth: '100%' }} />
        </Grid>
        <Grid item xs={9}>
          <Typography variant="body1"  sx={{color:"white"}} align="right"></Typography>
        </Grid>
      </Grid>
    </Grid>


    <Grid container spacing={1}  mt={0} style={{
     width: '97%',
     marginLeft: 'auto',
     marginRight: 'auto',
}}>
  {['USDT', 'UPI x QR', 'UPIxPAYTM'].map((mode) => (
    <Grid item xs={4} key={mode}>
      <div 
        style={{ 
          backgroundColor: paymentMode === mode ? 'rgb(249,94,93)' : 'white', 
          borderRadius: 8, 
          padding: 16 ,
          boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' 
        }}
        onClick={() => setPaymentMode(mode)}
      >
        <img src={`assets/images/${mode}.png`} alt={mode} style={{ display: 'block', margin: '0 auto', maxWidth: '50%', borderRadius: '50%' }} />
        <Typography variant="caption" align="center" style={{ marginTop: 8 }}>{mode}</Typography>
      </div>
    </Grid>
  ))}
</Grid>

    <Grid container spacing={1} mt={1} style={{
         width: '97%',
         marginLeft: 'auto',
         marginRight: 'auto',
         boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',backgroundColor:"white", borderRadius:"10px"}}>
      <Grid container item alignItems="center">
        <Grid item xs={4}>
          <img src="assets/images/download (5).png" alt="Your Image" style={{ maxWidth: '25%' }} />
        </Grid>
        <Grid item xs={8}>
          <Typography variant="h6" align="left">Deposit Amount</Typography>
        </Grid>
      </Grid>
      <Grid container item spacing={2}>
        {[500, 5000, 10000].map((value) => (
          <Grid item xs={4} key={value}>
            <Button
              variant="contained"
              onClick={() => handleButtonClick(value)}
              style={{ width: '100%' }}
             
            >
              {value.toLocaleString()} ₹
            </Button>
          </Grid>
        ))}
      </Grid>
      <Grid container item spacing={2}>
        {[20000, 50000, 100000].map((value) => (
          <Grid item xs={4} key={value}>
            <Button
              variant="contained"
              onClick={() => handleButtonClick(value)}
              style={{ width: '100%' }}
             
            >
              {value.toLocaleString()} ₹
            </Button>
          </Grid>
        ))}
      </Grid>
      <Grid container item alignItems="center">
        <Grid item xs={12}>
          <TextField
            label="Enter Amount"
            variant="outlined"
            fullWidth
            value={amount}
            onChange={handleInputChange}
            style={{marginTop:"5px"}}
            InputProps={{
            
            }}
           
          />
<Button 
  variant='contained' 
  style={{marginTop:"5px",marginBottom:"5px",borderRadius:"10px"}} 
  fullWidth 
  onClick={(e) => {
    e.preventDefault();
    if (paymentMode === 'UPIxPAYTM') {
      handleSubmit(e);
    } else {
      setOpenDepositDialog(true);
    }
  }}
>
  Deposit
</Button>        </Grid>
      </Grid>
    </Grid>
    <div> {paymentUrl && <a href={paymentUrl}>Proceed to Payment</a>}</div>
   
    <Grid container direction="column" mt={1} alignItems="center" style={{
         width: '97%',
         marginLeft: 'auto',
         marginRight: 'auto',
         boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',borderRadius:"10px"}}>
      <Grid item>
        <Typography variant="subtitle1" align="center">Recharge Instruction</Typography>
      </Grid>
      <Grid item>
        <List>
          <ListItem>
            <ListItemText primary="If the transfer time is up, please fill out the deposit form again." />
          </ListItem>
          <ListItem>
            <ListItemText primary="The transfer amount must match the order you created, otherwise the money cannot be credited successfully." />
          </ListItem>
          <ListItem>
            <ListItemText primary="If you transfer the wrong amount, our company will not be responsible for the lost amount!" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Note: do not cancel the deposit order after the money has been transferred." />
          </ListItem>
        </List>
      </Grid>
    </Grid>


    <Dialog 
 open={openDepositDialog} 
 disableBackdropClick
 disableEscapeKeyDown
>
      <DialogTitle>Deposit</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <Typography variant="h6">Remaining Time</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="h6" align="right" style={{ color: 'red' }}>
              {Math.floor(remainingTime / 60)}:{remainingTime % 60 < 10 ? '0' : ''}{remainingTime % 60}
            </Typography>
          </Grid>
          {paymentMode === 'UPI x QR' && (
            <>
             
              <Grid item xs={12}>
              <Typography variant="body1">
                UPI ID: {upiId}
                <IconButton onClick={() => copyToClipboard({upiId})}>
                  <FileCopyIcon />
                </IconButton>
              </Typography>
            </Grid>
              <Grid item xs={12}>
                <TextField
                  name="utr"
                  label="UTR"
                  value={utr}
                  onChange={handleUtrChange}
                />
              </Grid>
            </>
          )}
          {paymentMode === 'USDT' && (
            <>
             
              <Grid item xs={12}>
              <Typography variant="body1">
                USDT Wallet Address: {usdtWalletAddress}
                <IconButton onClick={() => copyToClipboard({usdtWalletAddress})}>
                  <FileCopyIcon />
                </IconButton>
              </Typography>
            </Grid>
            <Grid item xs={12}>
      <Typography variant="caption">
        Conversion Rate: 1 USDT = 83.42 INR
      </Typography>
    </Grid>
              <Grid item xs={12}>
                <TextField
 name="utr"
 label="UTR"
 value={utr}
 onChange={handleUtrChange}
/>
</Grid>
</>
)}
{paymentMode === 'UPIxPAYTM' && (
<Grid item xs={12}>
<Typography variant="body1">Currently this payment option is not available.</Typography>
</Grid>
)}
{utrAlert && (
<Grid item xs={12}>
<Alert severity="error">Please enter the UTR.</Alert>
</Grid>
)}
{duplicateUtrAlert && (
<Grid item xs={12}>
<Alert severity="error">This UTR has already been used.</Alert>
</Grid>
)}
</Grid>
</DialogContent>
<DialogActions>
<Button onClick={sendDepositRequest}>Send Request</Button>
</DialogActions>
</Dialog>

<TableContainer component={Paper}>
  <Table>
    <TableHead>
      <TableRow>
        <TableCell>Amount</TableCell>
        <TableCell>Status</TableCell>
        <TableCell>UTR</TableCell>
        <TableCell>Time</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {depositRequests.map((request) => (
        <TableRow key={request.id}>
          <TableCell>{request.amount}</TableCell>
          <TableCell>{request.status}</TableCell>
          <TableCell>{request.utr}</TableCell>
          <TableCell>{request.timestamp ? request.timestamp.toDate().toString() : 'N/A'}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</TableContainer>
            {/* content end */}
          </Box>


          
{children}

        </Box>
      </Mobile>
    </div>
  )
}

export default PromotionMain;