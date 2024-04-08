import React, { useState,useEffect } from 'react';
import { doc, setDoc,getDoc,getFirestore, } from 'firebase/firestore';
import { db } from '../../firebase/config'; // Make sure the path is correct
import { TextField, Button } from '@mui/material';
import { Grid, Box } from '@mui/material';
import Coupen from './coupen';


const Coupenmain = () => {
  const [couponCode, setCouponCode] = useState('');
  const [amount, setAmount] = useState('');
  const [limit, setLimit] = useState('');

  const handleCreateCoupon = async (event) => {
    event.preventDefault();

    const db = getFirestore();
    const couponRef = doc(db, 'coupons', couponCode);

    await setDoc(couponRef, {
      amount: Number(amount),
      limit: Number(limit),
      usedBy: []
    });

    alert(`Coupon ${couponCode} created with amount ${amount} and limit ${limit}.`);
  };

  return (
    <div>



<form onSubmit={handleCreateCoupon}>
      <input type="text" value={couponCode} onChange={event => setCouponCode(event.target.value)} placeholder="Coupon Code" required />
      <input type="number" value={amount} onChange={event => setAmount(event.target.value)} placeholder="Amount" required />
      <input type="number" value={limit} onChange={event => setLimit(event.target.value)} placeholder="Limit" required />
      <button type="submit">Create Coupon</button>
    </form>
    </div>
  );
};

export default Coupenmain;












