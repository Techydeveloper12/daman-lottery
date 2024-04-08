import React , {useState, useEffect} from 'react'
import { collection, getFirestore, query, orderBy, onSnapshot, doc, updateDoc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';

const WithdrawContent = () => {
    const [withdrawalRequests, setWithdrawalRequests] = useState([]);

    useEffect(() => {
      const db = getFirestore();
      const requestRef = collection(db, 'withdrawalRequests');
      const q = query(requestRef, orderBy('timestamp', 'desc'));
      const unsubscribe = onSnapshot(q, async (querySnapshot) => {
        const requests = [];
        for (let docSnapshot of querySnapshot.docs) {
          const userRef = doc(db, 'users', docSnapshot.data().userId);
          const userSnap = await getDoc(userRef);
          requests.push({ id: docSnapshot.id, ...docSnapshot.data(), bankDetails: userSnap.data().bankDetails, usdtDetails: userSnap.data().usdtDetails });
        }
        setWithdrawalRequests(requests);
      });
      return unsubscribe;
    }, []);

    const updateStatus = async (id, amount, userId, status) => {
      const db = getFirestore();
      const requestRef = doc(db, 'withdrawalRequests', id);
      await updateDoc(requestRef, {
        status: status
      });
    
      if (status === 'done') {
        const userRef = doc(db, 'users', userId);
        const userSnap = await getDoc(userRef);
        const user = userSnap.data();
    
        await updateDoc(userRef, {
          wallet: user.wallet - amount
        });
      }
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
    <TableCell>Method</TableCell>
    <TableCell>Time</TableCell>
    <TableCell>Bank Details</TableCell>
    <TableCell>USDT Details</TableCell>
    <TableCell>Action</TableCell>
  </TableRow>
</TableHead>
<TableBody>
  {withdrawalRequests.map((request) => (
    <TableRow key={request.id}>
      <TableCell>{request.username}</TableCell>
      <TableCell>{request.amount}</TableCell>
      <TableCell>{request.status}</TableCell>
      <TableCell>{request.method}</TableCell>
      <TableCell>{request.timestamp.toDate().toString()}</TableCell>
      <TableCell>
  Full Name: {request?.bankDetails?.fullName}<br/>
  Account Number: {request?.bankDetails?.accountNumber}<br/>
  Bank Name: {request?.bankDetails?.bankAccountName}<br/>
  Phone No: {request?.bankDetails?.phoneNo}<br/>
  IFSC Code: {request?.bankDetails?.ifscCode}
</TableCell>
<TableCell>
  USDT Address: {request?.usdtDetails?.walletAddress}<br/>
  Network: {request?.usdtDetails?.network}<br/>
</TableCell>
<TableCell>
  {request.status === 'pending' ? (
    <>
      <Button variant="contained" color="primary" onClick={() => updateStatus(request.id, request.amount, request.userId, 'done')}>
        Mark as Done
      </Button><br/>
      <Button variant="contained" sx={{mt:2,backgroundColor:"red"}}onClick={() => updateStatus(request.id, request.amount, request.userId, 'rejected')}>
        Reject
      </Button>
    </>
  ) : (
    <Button variant="contained" disabled>
      {request.status === 'done' ? "It's Done" : "Rejected"}
    </Button>
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

export default WithdrawContent