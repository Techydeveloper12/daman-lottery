import React, { useState, useEffect } from 'react';
import { collection, getDocs, deleteDoc, doc, addDoc,setDoc,updateDoc,where,query,getDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import { nanoid } from 'nanoid';
import { getFirestore } from "firebase/firestore";
import { Grid, Card, CardContent, Typography} from '@mui/material';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,Container,Box } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import ReactTree from 'react-treebeard';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const MembersContent = () => {

  const [users, setUsers] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [dailyDeposits, setDailyDeposits] = useState([]);
  const [commissionWallet, setCommissionWallet] = useState(0);
  const [referralCount, setReferralCount] = useState(0);
  const [inviteLink, setInviteLink] = useState('');
  const [userDetailsDialogOpen, setUserDetailsDialogOpen] = useState(false);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  
  useEffect(() => {
    const fetchUsers = async () => {
      const usersCollection = collection(db, 'users');
      const userSnapshots = await getDocs(usersCollection);
      const userList = userSnapshots.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setUsers(userList);
    };

    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, 'users', id));
    setUsers(users.filter(user => user.id !== id));
  };

  

  const handleCreate= async (e) => {
    e.preventDefault();
    const auth = getAuth();
    const db = getFirestore();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const referralLink = `${window.location.origin}/register?ref=${userCredential.user.uid}`;
      const username = `MEMBER${nanoid(6)}`;
      const UID = Math.floor(1000000 + Math.random() * 9000000);
      const referralUid = new URLSearchParams(window.location.search).get('ref');
  
      let walletAmount = 0;
      if(referralUid){
        
        const sharedUserDoc = await getDocs(query(collection(db, 'users')));
        await Promise.all(sharedUserDoc.docs.map(async (docSnapshot) => {
          const user = docSnapshot.data();
          const userRef = doc(db, 'users', docSnapshot.id);
          await updateDoc(userRef, {
            wallet: user.wallet + 50
          });
        }));
  
        walletAmount = 20;
        alert("Invite code applied.");
      }
  
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        email: email,
        wallet: walletAmount,
        username: username,
        UID: UID,
        referralLink: referralLink,
        referral: referralUid,
      });
      alert("Account setup complete.");
  
    
    } catch (error) {
      console.error(error);
      alert("An error occurred while creating your account. Please try again.");
    }
  };
  const handleUserClick = async (id) => {
    const userDoc = await getDoc(doc(db, 'users', id));
    const userData = userDoc.data();
    console.log('User data:', userData);  // Add this line
    setSelectedUser(userData);
  
    // Fetch daily deposits
    const dailyDepositsCollection = collection(db, 'dailyDeposits');
    const dailyDepositsQuery = query(dailyDepositsCollection, where('userId', '==', id));
    const dailyDepositsSnapshots = await getDocs(dailyDepositsQuery);
    const dailyDepositsData = dailyDepositsSnapshots.docs.map(doc => doc.data());
    console.log('Daily deposits data:', dailyDepositsData);  // Add this line
    setDailyDeposits(dailyDepositsData);
  
    // Fetch commission wallet and referral count
    setCommissionWallet(userData.commissionWallet);
    setReferralCount(userData.referralCount);
  
    // Fetch invite link
    setInviteLink(userData.referralLink);
  
    setUserDetailsDialogOpen(true);
  };
  const [searchTerm, setSearchTerm] = useState('');

const handleSearch = (event) => {
  setSearchTerm(event.target.value);
};
const [cursor, setCursor] = useState(null);

const onToggle = (node, toggled) => {
  if (cursor) {
    cursor.active = false;
  }

  node.active = true;

  setCursor(node);
};

function transformReferralsToTreeData(referrals) {
  return referrals.map((referral, index) => ({
    nodeId: `referral-${index}`,
    label: `Referral ${index + 1}`,
    children: [
      { nodeId: `referral-${index}-level`, label: `Level: ${referral.level}` },
      { nodeId: `referral-${index}-totalDeposit`, label: `Total Deposit: ${referral.totalDeposit}` },
      { nodeId: `referral-${index}-userId`, label: `User ID: ${referral.userId}` },
      ...referral.dailyDeposit.map((deposit, depositIndex) => ({
        nodeId: `referral-${index}-deposit-${depositIndex}`,
        label: `Deposit ${depositIndex + 1}: ${deposit.amount}, Date: ${deposit.date}, Level: ${deposit.level}, User ID: ${deposit.userId}`,
      })),
    ],
  }));
}



// Add a function to handle the search input change
const handleSearchChange = (event) => {
  setSearchTerm(event.target.value);
};

  return (
    <div>
    <Container>
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" mt={2}>
      <Grid container spacing={2} alignItems="center">
  <Grid item>
    <Button variant="contained" color="primary" onClick={() => setDialogOpen(true)}>
      Create New User
    </Button>
  </Grid>
  <Grid item>
    {/* Add a TextField for the search input */}
    <TextField
      margin="dense"
      label="Search by UID"
      type="text"
      value={searchTerm}
      onChange={handleSearchChange}
    />
  </Grid>
</Grid>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Email</TableCell>
                <TableCell>UID</TableCell>
                <TableCell>Wallet</TableCell>
                <TableCell>Action</TableCell>
                <TableCell>Active Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* Filter the users list based on the search term */}
              {users.filter(user => String(user.UID).includes(searchTerm)).map((user) => (
                <TableRow key={user.id} onClick={() => handleUserClick(user.id)}>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.UID}</TableCell>
                  <TableCell>{user.wallet}</TableCell>
                  <TableCell>
                    <IconButton edge="end" aria-label="delete" onClick={(e) => { e.stopPropagation(); handleDelete(user.id); }}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell>
                    <FiberManualRecordIcon style={{ color: user.isOnline ? 'green' : 'red' }} />
                  </TableCell>
               </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Dialog
  open={userDetailsDialogOpen}
  onClose={() => setUserDetailsDialogOpen(false)}
  fullScreen={fullScreen}
>
  <DialogTitle>Refferals Details</DialogTitle>
  <DialogContent>
  {selectedUser ? (
    selectedUser.referrals && selectedUser.referrals.length > 0 ? (
      <Grid container spacing={2}>
        {transformReferralsToTreeData(selectedUser.referrals).map((referralNode) => (
          <Grid item xs={12} key={referralNode.nodeId}>
            <Paper elevation={2}>
              <Box p={2}>
                <Typography variant="h6">{referralNode.label}</Typography>
                <Grid container spacing={2}>
                  {referralNode.children.map((childNode) => (
                    <Grid item xs={12} key={childNode.nodeId}>
                      <Typography>{childNode.label}</Typography>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    ) : (
      <Typography>No referrals found</Typography>
    )
  ) : (
    <div>No user selected</div>
  )}
</DialogContent>
  <DialogActions>
    <Button onClick={() => setUserDetailsDialogOpen(false)}>Close</Button>
  </DialogActions>
</Dialog>
          </Box>
      </Container>
    </div>
  );
};

export default MembersContent;