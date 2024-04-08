import React from 'react';
import { Box, Typography } from '@mui/material';

const RowVisualization = ({ row }) => {
  return (
    <Box display="flex" flexDirection="row" alignItems="center">
      <Typography variant="h6">{row.period}</Typography>
      <Box display="flex" flexDirection="row" alignItems="center" ml={2}>
        {Array.from({ length: 10 }, (_, i) => i).map((number) => (
          <Box
            key={number}
            display="flex"
            alignItems="center"
            justifyContent="center"
            width={24}
            height={24}
            borderRadius="50%"
            border={number === row.number ? '2px solid black' : '1px solid gray'}
            ml={1}
          >
            <Typography variant="body2">{number}</Typography>
          </Box>
        ))}
      </Box>
      <Box display="flex" flexDirection="row" alignItems="center" ml={2}>
        {['B', 'S'].map((letter) => (
          <Box
            key={letter}
            display="flex"
            alignItems="center"
            justifyContent="center"
            width={24}
            height={24}
            borderRadius="50%"
            border={letter === row.big_small ? '2px solid black' : '1px solid gray'}
            ml={1}
          >
            <Typography variant="body2">{letter}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default RowVisualization;