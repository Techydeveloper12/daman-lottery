import React, { useState } from 'react';
import { doc, getDoc,collection,query,where,getDocs, collectionGroup } from 'firebase/firestore';
import { db } from '../../firebase/config'; // Make sure the path is correct
import { TextField, Button, List, ListItem, ListItemText } from '@mui/material';

const SearchMain = () => {
    const [searchInput, setSearchInput] = useState('');

    // Function for handling search input changes
    const handleSearchInputChange = (event) => {
      setSearchInput(event.target.value);
    };
    
    // Function for performing the search operation
    const searchByUid = async () => {
        const usersRef = collectionGroup(db, 'users'); // Search within all 'users' collections
        
        const q = query(usersRef, where('UID', '==', searchInput.trim())); // Look for a document where UID equals to the search input
        
        const querySnapshot = await getDocs(q);
        
        if (!querySnapshot.empty) { // If we found a user
          querySnapshot.forEach((doc) => {
            const userData = doc.data(); // Here is your user data
            
            console.log(userData); // Replace this line with the way you want to display your data
          });
        } else {
          alert('User with the given UID not found.');
        }
      };
  return (
    <div>
     <TextField 
  value={searchInput} 
  onChange={handleSearchInputChange} 
  placeholder="Enter user UID" 
/>
<Button onClick={searchByUid}>Search</Button>
    </div>
  );
};

export default SearchMain;