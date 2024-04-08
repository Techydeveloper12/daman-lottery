import React, { useState } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Grid, Box,Container,  } from '@mui/material';
import { doc, setDoc } from 'firebase/firestore';
import { db, auth } from '../../firebase/config'; // Make sure the path is correct

const SalaryContent = () => {
    const [username, setUsername] = useState('');
    const [salaryAmount, setSalaryAmount] = useState('');
    const [salaryFrequency, setSalaryFrequency] = useState('');
  
    const handleSubmit = async (event) => {
      event.preventDefault();
  
      try {
        await axios.post('https://bannerfr5.online/salary', {
          username,
          salaryAmount: Number(salaryAmount),
          salaryFrequency: Number(salaryFrequency),
        });
  
        alert('Salary entry created successfully!');
      } catch (error) {
        console.error(error);
        alert('An error occurred while creating the salary entry.');
      }
    };

const [upiIdInput, setUpiIdInput] = useState('');
const [usdtWalletAddressInput, setUsdtWalletAddressInput] = useState('');

// Handle form submission
// Handle form submission
const handleSubmit2 = async (event) => {
  event.preventDefault();

  const docRef = doc(db, 'config', 'main');
  await setDoc(docRef, {
    upiId: upiIdInput,
    usdtWalletAddress: usdtWalletAddressInput
  }, { merge: true });
};
  return (
    <div>
    <Grid
      container
      direction="column"
     
      alignItems="center"
      style={{ minHeight: '100vh', marginTop: '30px' }}
    >
      <Box 
        component="form" 
        onSubmit={handleSubmit} 
        display="flex" 
        flexDirection="column" 
        gap={2}
      >
        <TextField
          label="Username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          required
        />
        <TextField
          label="Salary Amount"
          type="number"
          value={salaryAmount}
          onChange={(event) => setSalaryAmount(event.target.value)}
          required
        />
        <TextField
          label="Salary Frequency (in days)"
          type="number"
          value={salaryFrequency}
          onChange={(event) => setSalaryFrequency(event.target.value)}
          required
        />
        <Button type="submit" variant='contained'>Create Salary Entry</Button>
      </Box>
      <Container component="main" maxWidth="xs" style={{ marginTop: '10px' }}>
      <form onSubmit={handleSubmit2} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="upiId"
          label="UPI ID"
          name="upiId"
          autoComplete="upiId"
          autoFocus
          value={upiIdInput}
          onChange={e => setUpiIdInput(e.target.value)}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="usdtWalletAddress"
          label="USDT Wallet Address"
          id="usdtWalletAddress"
          autoComplete="usdtWalletAddress"
          value={usdtWalletAddressInput}
          onChange={e => setUsdtWalletAddressInput(e.target.value)}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          style={{ margin: '24px 0 16px' }}
        >
          Update
        </Button>
      </form>
    </Container>
    </Grid>
    </div>
  );
};

export default SalaryContent;