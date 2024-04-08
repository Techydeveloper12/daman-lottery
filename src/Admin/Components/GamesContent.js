import React, { useState, useEffect } from 'react';
import { Grid, Typography, Box, List, ListItem, Select, MenuItem } from '@mui/material';


const GamesContent = () => {
  const [data, setData] = useState({
    "1min": { sums: {}, periodId: "" },
    "3min": { sums: {}, periodId: "" },
    "5min": { sums: {}, periodId: "" },
    "10min": { sums: {}, periodId: "" }
  });
  
  // State for storing the selected timer
  const [selectedTimer, setSelectedTimer] = useState("1min");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://bannerfr5.online/bets/');
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 1000); // Update data every second

    return () => clearInterval(interval); // Cleanup
  }, []);

  return (
    <>
      <Box display="flex" justifyContent="center" mt={2}>
        <Select
          value={selectedTimer}
          onChange={(e) => setSelectedTimer(e.target.value)}
        >
          <MenuItem value="1min">1min</MenuItem>
          <MenuItem value="3min">3min</MenuItem>
          <MenuItem value="5min">5min</MenuItem>
          <MenuItem value="10min">10min</MenuItem>
        </Select>
      </Box>

      <Grid container spacing={2} mt={1}>
        <Grid item xs={12} sm={12}>
          <Box p={2}  display="flex" flexDirection="column" alignItems="center" justifyContent="center" mx={2}>
            <Typography variant="h6">{selectedTimer}</Typography>
            <Typography variant="body1">Period ID: {data[selectedTimer].periodId}</Typography>
            <Typography variant="body1">Total Bet Amount</Typography>
            <Box display="flex" flexDirection='row' flexWrap='wrap'>
              {Object.entries(data[selectedTimer].sums).map(([sumKey, sumValue]) => (
                <Box key={sumKey} m={1} p={2} bgcolor="#f0f0f0">
                  <Typography>{sumKey}: {sumValue}</Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default GamesContent;
