import React, { useEffect,useState} from 'react'
import Mobile from './Mobile';
import IconButton from '@mui/material/IconButton';
import SmsIcon from '@mui/icons-material/Sms';
import DownloadIcon from '@mui/icons-material/Download';
import { Box, Typography, Button,Grid,TextField, List, ListItem, ListItemText} from '@mui/material';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import PeopleIcon from '@mui/icons-material/People';
import { doc, onSnapshot, collection, query, getDoc,updateDoc,getFirestore,addDoc,serverTimestamp,where,orderBy } from 'firebase/firestore';
import { db, auth } from '../firebase/config'; // Make sure the path is correct
import RefreshIcon from '@mui/icons-material/Refresh';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';


const WithDrawMain = ({ children }) => {

  useEffect(() => {
    const setVh = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    window.addEventListener('resize', setVh);
    setVh();

    return () => window.removeEventListener('resize', setVh);
  }, []);


  const [amount, setAmount] = useState('');

  const handleButtonClick = (value) => {
    setAmount(value);
  };

  const handleInputChange = (event) => {
    setAmount(event.target.value);
  };
  const [walletData, setWalletData] = useState(0);
  const [userWithdrawalRequests, setUserWithdrawalRequests] = useState([]);
  const [existingBankDetails, setExistingBankDetails] = useState(null);
  const [openBankDialog, setOpenBankDialog] = useState(false);
  const [bankAccountName, setBankAccountName] = useState('');
  const [withdrawalMethod, setWithdrawalMethod] = useState('Bank Card');
  const [existingUsdtDetails, setExistingUsdtDetails] = useState(null);


  const [bankDetails, setBankDetails] = useState({
    fullName: '',
    accountNumber: '',
    phoneNo: '',
    ifscCode: '',
    bankAccountName: ''
  });

  const [usdtDetails, setUsdtDetails] = useState({
    walletAddress: '',
    network: ''
  });
// Modify the handleBankDetailsChange function to handle changes to the USDT details as well
const handleBankDetailsChange = (event) => {
  if (withdrawalMethod === 'Bank Card') {
    setBankDetails({
      ...bankDetails,
      [event.target.name]: event.target.value
    });
  } else {
    setUsdtDetails({
      ...usdtDetails,
      [event.target.name]: event.target.value
    });
  }
};

// Modify the saveBankDetails function to save the USDT details as well
const saveDetails = async () => {
  const db = getFirestore();
  const userRef = doc(db, 'users', auth.currentUser.uid);

  if (withdrawalMethod === 'Bank Card') {
    if (existingBankDetails) {
      alert('Bank details have already been saved and cannot be modified.');
      return;
    }

    await updateDoc(userRef, {
      bankDetails: bankDetails
    });
    setExistingBankDetails(bankDetails);
  } else {
    // Save the USDT details here
    // You might want to add some validation checks before saving the details
    await updateDoc(userRef, {
      usdtDetails: usdtDetails
    });
    // Update the existing USDT details here
    setExistingUsdtDetails(usdtDetails);
  }

  setOpenBankDialog(false);
  alert('Details are saved');
};

  useEffect(() => {
    const fetchBankDetails = async () => {
      const db = getFirestore();
      const userRef = doc(db, 'users', auth.currentUser.uid);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        setExistingBankDetails(userSnap.data().bankDetails);
      }
    };
    fetchBankDetails();
  }, []);

  const sendWithdrawalRequest = async () => {
    if (walletData < 100) {
      alert('Your wallet amount must be more than 100 to send a withdrawal request.');
      return;
    }
  
    const db = getFirestore();
    const requestRef = collection(db, 'withdrawalRequests');
  
    const userRef = doc(db, 'users', auth.currentUser.uid);
    const userSnap = await getDoc(userRef);
    const user = userSnap.data();
    await addDoc(requestRef, {
      userId: auth.currentUser.uid,
      username: user.username,
      amount: amount,
      status: 'pending',
      timestamp: serverTimestamp(),
      method: withdrawalMethod // Add the withdrawal method here
    });
  };

  useEffect(() => {
    const db = getFirestore();
    const requestRef = collection(db, 'withdrawalRequests');
    const q = query(requestRef, where('userId', '==', auth.currentUser.uid), orderBy('timestamp', 'desc'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const requests = [];
      querySnapshot.forEach((doc) => {
        requests.push({ id: doc.id, ...doc.data() });
      });
      setUserWithdrawalRequests(requests);
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
    const fetchUsdtDetails = async () => {
      const db = getFirestore();
      const userRef = doc(db, 'users', auth.currentUser.uid);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        setExistingUsdtDetails(userSnap.data().usdtDetails);
      }
    };
    fetchUsdtDetails();
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
                <span style={{ fontWeight: "bold" }}>Withdraw</span>
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
          <Typography variant="body1" sx={{color:"white"}} align="left">Avilable Balance</Typography>
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
      <Grid item xs={4}>
        <div 
         onClick={() => setWithdrawalMethod('Bank Card')}
         style={{ backgroundColor:withdrawalMethod === 'Bank Card' ? 'rgb(249,94,93)' : 'white', borderRadius: 8, padding: 16 ,boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }}>
          <img src="assets/images/WithBeforeImgIcon2_20231215045210hewa.png" alt="Image 1" style={{ display: 'block', margin: '0 auto', maxWidth: '50%', borderRadius: '50%' }} />
          <Typography variant="caption" align="center" style={{ marginTop: 8 }}>Bank Card</Typography>
        </div>
      </Grid>
      <Grid item xs={4}>
        <div   onClick={() => setWithdrawalMethod('USDT')} style={{ backgroundColor: withdrawalMethod === 'USDT' ? 'rgb(249,94,93)' : 'white', borderRadius: 8, padding: 16, boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }}>
          <img src="assets/images/USDT.png" alt="Image 2" style={{ display: 'block', margin: '0 auto', maxWidth: '50%', borderRadius: '50%' }} />
          <Typography variant="caption" align="center" style={{ marginTop: 8 }}>USDT</Typography>
        </div>
      </Grid>
      
     
    </Grid>

    <Grid container spacing={1} mt={1} style={{
         width: '97%',
         marginLeft: 'auto',
         marginRight: 'auto',
         boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',backgroundColor:"white", borderRadius:"10px"}}>
      
      <Grid item xs={12}>
        <div style={{ backgroundColor: 'white', borderRadius: 8, padding: 16, boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }}>
          <img src="/assets/images/download (17).png" onClick={() => setOpenBankDialog(true)} alt="Image 2" style={{ display: 'block', margin: '0 auto', maxWidth: '20%', borderRadius: '50%' }} />
          <Typography variant="caption"   align="center" style={{ marginTop: 8 }}>ADD BANK ACCOUNT DETAILS</Typography>
          <Button onClick={() => {
  if (!existingBankDetails) {
    alert('Please first fill bank details');
  } else {
    setBankDetails(existingBankDetails); 
    setOpenBankDialog(true);
  }
}}>Show Details</Button>
        </div>
      </Grid>
      <Grid container item alignItems="center">
        <Grid item xs={12}>
          <TextField
            label="Please Enter Amount"
            variant="outlined"
            fullWidth
            value={amount}
            onChange={handleInputChange}
            style={{marginTop:"5px"}}
            InputProps={{
            
            }}
           
          />
<Button variant='contained' style={{marginTop:"5px",marginBottom:"5px",borderRadius:"10px",backgroundColor:"rgb(249,94,93)"}} fullWidth onClick={sendWithdrawalRequest}>Withdraw</Button>        </Grid>
      </Grid>
    </Grid>

    <Grid container direction="column" mt={1} alignItems="center" style={{
        }}>
   
      <Grid item>
        <List>
          <ListItem>
            <ListItemText primary="Withdrawl History" />
          </ListItem>
          
        </List>
      </Grid>
    </Grid>


    
    <Dialog open={openBankDialog} onClose={() => setOpenBankDialog(false)}>
    <DialogTitle>{withdrawalMethod === 'Bank Card' ? 'Add Bank Details' : 'Add USDT Details'}</DialogTitle>
  <DialogContent>
  {withdrawalMethod === 'Bank Card' ? (
    <>
  <TextField
  name="fullName"
  label="Full Name"
  value={bankDetails.fullName}
  onChange={handleBankDetailsChange}
  margin="normal"
/>
<TextField
  name="accountNumber"
  label="Account Number"
  value={bankDetails.accountNumber}
  onChange={handleBankDetailsChange}
  margin="normal"
/>
<TextField
  name="phoneNo"
  label="Phone No"
  value={bankDetails.phoneNo}
  onChange={handleBankDetailsChange}
  margin="normal"
/>
<TextField
  name="ifscCode"
  label="IFSC Code"
  value={bankDetails.ifscCode}
  onChange={handleBankDetailsChange}
  margin="normal"
/>
<TextField
  name="bankAccountName"
  label="Bank Account Name"
  value={bankDetails.bankAccountName}
  onChange={handleBankDetailsChange}
  margin="normal"
/>
</>
  ) : (
    <>
  <TextField
  name="walletAddress"
  label="Wallet Address"
  value={existingUsdtDetails ? existingUsdtDetails.walletAddress : ''}
  onChange={handleBankDetailsChange}
  margin="normal"
/>
<TextField
  name="network"
  label="Network (TRC or ETH)"
  value={existingUsdtDetails ? existingUsdtDetails.network : ''}
  onChange={handleBankDetailsChange}
  margin="normal"
/>
  </>
  )}
  </DialogContent>
  
  <DialogActions>
  {(withdrawalMethod === 'Bank Card' && existingBankDetails) || (withdrawalMethod === 'USDT' && existingUsdtDetails) ? (
    <Button onClick={() => setOpenBankDialog(false)}>Cancel</Button>
  ) : (
    <Button onClick={saveDetails}>Save</Button>
  )}
</DialogActions>
</Dialog>

<TableContainer>
  <Table>
    <TableHead>
      <TableRow>
        <TableCell>Amount</TableCell>
        <TableCell>Status</TableCell>
        <TableCell>Timestamp</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {userWithdrawalRequests.map((request) => (
        <TableRow key={request.id}>
          <TableCell>{request.amount}</TableCell>
          <TableCell>{request.status}</TableCell>
          <TableCell>{request.timestamp ? request.timestamp.toDate().toString() : 'N/A'}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</TableContainer>         {/* content end */}
          </Box>


          
{children}

        </Box>
      </Mobile>
    </div>
  )
}

export default WithDrawMain;