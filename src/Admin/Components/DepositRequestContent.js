import React, { useEffect, useState } from 'react'
import { doc, onSnapshot, collection, query, getDoc, updateDoc, getFirestore, addDoc, serverTimestamp, where, orderBy } from 'firebase/firestore';
import { db, auth } from '../../firebase/config'; // Make sure the path is correct
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';

const DpositRequstContent = () => {
  const [depositRequests, setDepositRequests] = useState([]);
  useEffect(() => {
    const depositRef = collection(db, 'depositRequests');
    const q = query(depositRef, orderBy('timestamp', 'desc'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const requests = [];
      querySnapshot.forEach((doc) => {
        requests.push({ id: doc.id, ...doc.data() });
      });
      setDepositRequests(requests);
    });
    return unsubscribe;
  }, []);

  const approveDepositRequest = async (request) => {
    const requestRef = doc(db, 'depositRequests', request.id);
    await updateDoc(requestRef, {
      status: 'approved'
    });
  
    const userRef = doc(db, 'users', request.userId);
    const userSnap = await getDoc(userRef);
    const user = userSnap.data();
    await updateDoc(userRef, {
      wallet: Number(user.wallet || 0) + Number(request.amount),
      hasDeposited: true // Update hasDeposited field
    });
    

     // Add a transaction for the deposit
  const transactionsRef = collection(userRef, 'transactions');
  await addDoc(transactionsRef, {
    type: 'deposit',
    amount: Number(request.amount),
    timestamp: serverTimestamp()
  });


    // Commission system starts here
    if (user.referral) {
      let currentUser = user;
      let level = 1;
      while (currentUser.referral && level <= 5) {
        const referrerRef = doc(db, 'users', currentUser.referral);
        const referrerSnap = await getDoc(referrerRef);
        const referrer = referrerSnap.data();
  
        // Calculate commission based on level
        let commission = 0;
        if (!user.hasDeposited) { // Only calculate commission if user has not deposited before
          switch (level) {
            case 1:
              commission = request.amount * 0.5; // 50% commission for level 1
              break;
            case 2:
              commission = request.amount * 0.4; // 40% commission for level 2
              break;
            case 3:
              commission = request.amount * 0.3; // 30% commission for level 3
              break;
            case 4:
              commission = request.amount * 0.2; // 20% commission for level 4
              break;
            case 5:
              commission = request.amount * 0.1; // 10% commission for level 5
              break;
            default:
              commission = 0;
          }
        }
  
       // Update referrer's commission
const totalCommission = Number(referrer.totalCommission || 0) + commission;
await updateDoc(referrerRef, {
  totalCommission: totalCommission,
  totalCommissionDirect: Number(referrer.totalCommissionDirect || 0) + (level === 1 ? commission : 0),
  totalCommissionTeam: Number(referrer.totalCommissionTeam || 0) + (level > 1 ? commission : 0),
  thisWeekCommission: Number(referrer.thisWeekCommission || 0) + commission,
  firstDepositsDirect: Number(referrer.firstDepositsDirect || 0) + (level === 1 ? 1 : 0),
  firstDepositsTeam: Number(referrer.firstDepositsTeam || 0) + (level > 1 ? 1 : 0),
  wallet: Number(referrer.wallet || 0) + commission // Add total commission to wallet
});

// Add a transaction for the commission if the user has deposited
if (!user.hasDeposited) {
  const referrerTransactionsRef = collection(referrerRef, 'transactions');
  await addDoc(referrerTransactionsRef, {
    type: 'commission',
    amount: commission,
    level: level,
    timestamp: serverTimestamp()
  });
}
 // Find referral object
referrer.referrals = referrer.referrals || []; // Initialize referrals as an empty array if it's undefined
const referralIndex = referrer.referrals.findIndex(referral => referral.userId === currentUser.UID);
if (referralIndex !== -1) {
  // Update referral object
  referrer.referrals[referralIndex].totalDeposit = Number(referrer.referrals[referralIndex].totalDeposit || 0) + Number(request.amount);
  referrer.referrals[referralIndex].totalCommissionReceived = Number(referrer.referrals[referralIndex].totalCommissionReceived || 0) + commission; // Add totalCommissionReceived field
  referrer.referrals[referralIndex].totalBetAmount = Number(referrer.referrals[referralIndex].totalBetAmount || 0); // Add totalBetAmount field
  referrer.referrals[referralIndex].dailyDeposit.push({
    date: new Date().toISOString().split('T')[0], // Get current date in YYYY-MM-DD format
    amount: request.amount,
    level: level, // Add level
    userId: user.UID, // Add user ID
    totalCommissionReceived: commission, // Initialize totalCommissionReceived field
    totalBetAmount: 0, // Initialize totalBetAmount field
  });
} else {
  // Add new referral object
  referrer.referrals.push({
    userId: user.UID, // Use currentUser.UID instead of request.userId
    level: level,
    totalDeposit: Number(request.amount),
   
    dailyDeposit: [{
      date: new Date().toISOString().split('T')[0], // Get current date in YYYY-MM-DD format
      amount: request.amount,
      level: level, // Add level
      userId: user.UID ,// Add user ID
      totalCommissionReceived: commission, // Initialize totalCommissionReceived field
      totalBetAmount: 0, // Initialize totalBetAmount field
    }]
  });
}

// Update referrer document
await updateDoc(referrerRef, {
  referrals: referrer.referrals
});
        // Move to next level
        currentUser = referrer;
        level++;
      }
    }
  };

  const failDepositRequest = async (request) => {
    const requestRef = doc(db, 'depositRequests', request.id);
    await updateDoc(requestRef, {
      status: 'failed'
    });
  };
  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>User ID</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>UTR</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {depositRequests.map((request) => (
              <TableRow key={request.id}>
                <TableCell>{request.username}</TableCell>
                <TableCell>{request.amount}</TableCell>
                <TableCell>{request.status}</TableCell>
                <TableCell>{request.utr}</TableCell>
                <TableCell>
  {request.status === 'pending' && (
    <>
      <Button variant="contained" fullWidth color="primary" onClick={() => approveDepositRequest(request)}>
        Approve
      </Button>
      <Button variant="contained" fullWidth sx={{backgroundColor:"red"}} color="secondary" onClick={() => failDepositRequest(request)}>
        Fail
      </Button>
    </>
  )}
</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default DpositRequstContent