import React, { useState,useEffect } from 'react';
import { doc, setDoc,getDoc } from 'firebase/firestore';
import { db } from '../../firebase/config'; // Make sure the path is correct
import { TextField, Button } from '@mui/material';
import { Grid, Box } from '@mui/material';


const LevelContent = () => {
    const [percentages, setPercentages] = useState({
        level1: '',
        level2: '',
        level3: '',
        level4: '',
        level5: '',
      });
    
      useEffect(() => {
        const fetchPercentages = async () => {
          const docRef = doc(db, 'referralPercentages', 'percentages');
          const docSnap = await getDoc(docRef);
    
          if (docSnap.exists()) {
            setPercentages(docSnap.data());
          } else {
            console.log('No such document!');
          }
        };
    
        fetchPercentages();
      }, []);

  const handleInputChange = (event) => {
    setPercentages({
      ...percentages,
      [event.target.name]: event.target.value,
    });
  };

  const handleButtonClick = async () => {
    const docRef = doc(db, 'referralPercentages', 'percentages'); // Replace with your collection name and document ID

    try {
      await setDoc(docRef, percentages);
      console.log("Document written with ID: ", docRef.id);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <div>
  


<Grid container spacing={2} sx={{marginLeft:"20px"}}>
  <Grid item xs={12}>
    <Box mt={2}>
      <TextField
        value={percentages.level1}
        onChange={handleInputChange}
        name="level1"
        label="Level 1 Percentage"
        variant="outlined"
      />
    </Box>
  </Grid>
  <Grid item xs={12}>
    <Box mt={2}>
      <TextField
        value={percentages.level2}
        onChange={handleInputChange}
        name="level2"
        label="Level 2 Percentage"
        variant="outlined"
      />
    </Box>
  </Grid>
  <Grid item xs={12}>
    <Box mt={2}>
      <TextField
        value={percentages.level3}
        onChange={handleInputChange}
        name="level3"
        label="Level 3 Percentage"
        variant="outlined"
      />
    </Box>
  </Grid>
  <Grid item xs={12}>
    <Box mt={2}>
      <TextField
        value={percentages.level4}
        onChange={handleInputChange}
        name="level4"
        label="Level 4 Percentage"
        variant="outlined"
      />
    </Box>
  </Grid>
  <Grid item xs={12}>
    <Box mt={2}>
      <TextField
        value={percentages.level5}
        onChange={handleInputChange}
        name="level5"
        label="Level 5 Percentage"
        variant="outlined"
      />
    </Box>
  </Grid>
  <Grid item xs={12}>
    <Box mt={2}>
      <Button onClick={handleButtonClick} variant="contained" color="primary">
        Save 
      </Button>
    </Box>
  </Grid>
</Grid>
    </div>
  );
};

export default LevelContent;