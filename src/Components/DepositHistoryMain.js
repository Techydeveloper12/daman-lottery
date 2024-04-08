import React, { useEffect,useState} from 'react'
import Mobile from '../Components/Mobile';
import IconButton from '@mui/material/IconButton';
import SmsIcon from '@mui/icons-material/Sms';
import DownloadIcon from '@mui/icons-material/Download';
import { Box, Typography, Button,Grid,TextField, List, ListItem, ListItemText,Card,CardContent,CardHeader} from '@mui/material';
import { doc, onSnapshot, collection, addDoc,serverTimestamp,query,where,getDocs,orderBy,getFirestore,getDoc } from 'firebase/firestore';
import { db, auth } from '../firebase/config'; // Make sure the path is correct
import RefreshIcon from '@mui/icons-material/Refresh';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';


const DepositHistoryMain= ({ children }) => {

  useEffect(() => {
    const setVh = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    window.addEventListener('resize', setVh);
    setVh();

    return () => window.removeEventListener('resize', setVh);
  }, []);
  const [depositRequests, setDepositRequests] = useState([]);
  
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
 
  
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const filteredRequests = depositRequests.filter(request => {
    const requestDate = new Date(request.timestamp.seconds * 1000);
    return requestDate.toISOString().split('T')[0] === selectedDate;
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
                <span style={{ fontWeight: "bold" }}>Deposit History</span>
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
            {/* //content */}
            {filteredRequests.map((request) => (
  <Grid container item xs={12} spacing={1} key={request.id}>
  <Card style={{ width: 'calc(100% - 20px)', marginBottom: '10px', borderRadius: '15px', marginLeft: '15px', marginRight: '10px', marginTop:"20px" }}>
      <CardHeader title="Deposit" style={{ backgroundColor: 'RGB(253,150,1)',color:"white" }} />
      <CardContent style={{ backgroundColor: 'RGB(247,248,255)' }}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Grid container justifyContent="space-between">
              <Typography variant="subtitle1">Amount</Typography>
              <Typography variant="body1">{request.amount}</Typography>
            </Grid>
            <Grid container justifyContent="space-between">
              <Typography variant="subtitle1">Status</Typography>
              <Typography variant="body1">{request.status}</Typography>
            </Grid>
            <Grid container justifyContent="space-between">
              <Typography variant="subtitle1">UTR</Typography>
              <Typography variant="body1">{request.utr}</Typography>
            </Grid>
            <Grid container justifyContent="space-between">
              <Typography variant="subtitle1">Time</Typography>
              <Typography variant="body1">
  {request.timestamp 
    ? `${request.timestamp.toDate().toLocaleDateString()} ${request.timestamp.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
    : 'N/A'}
</Typography>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  </Grid>
))}   
            {/* content end */}
          </Box>


          
{children}

        </Box>
      </Mobile>
    </div>
  )
}

export default DepositHistoryMain;