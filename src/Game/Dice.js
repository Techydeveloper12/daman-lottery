import React from 'react';
import { Grid, Box, Typography } from '@mui/material';
import Image1 from './path/to/image1.jpg';
import Image2 from './path/to/image2.jpg';
// Import all 16 images

const MyComponent = () => {
  const images = [
    { src: Image1, label: '1', factor: '207.36X' },
    { src: Image2, label: '2', factor: '69.12X' },
    { src: Image3, label: '3', factor: '34.56X' },
    { src: Image4, label: '4', factor: '23.04X' },
    { src: Image5, label: '5', factor: '17.28X' },
    { src: Image6, label: '6', factor: '13.824X' },
    { src: Image7, label: '7', factor: '11.52X' },
    { src: Image8, label: '8', factor: '9.6X' },
    { src: Image9, label: '9', factor: '8.192X' },
    { src: Image10, label: '10', factor: '6.912X' },
    { src: Image11, label: '11', factor: '5.76X' },
    { src: Image12, label: '12', factor: '4.608X' },
    { src: Image13, label: '13', factor: '3.84X' },
    { src: Image14, label: '14', factor: '3.072X' },
    { src: Image15, label: '15', factor: '2.304X' },
    { src: Image16, label: '16', factor: '1.92X' },
    // Add the remaining 14 image objects
  ];

  return (
    <Grid container spacing={2}>
      {images.map((image, index) => (
        <Grid item key={index}>
          <Box position="relative">
            <Box
              component="img"
              src={image.src}
              alt={`Image ${index + 1}`}
              width={60}
              height={60}
            />
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                color: index % 2 === 0 ? 'green' : 'red',
                fontSize: '1.2rem',
                fontWeight: 'bold',
              }}
            >
              {image.label}
            </Box>
            <Typography variant="body2" align="center">
              {image.factor}
            </Typography>
          </Box>
        </Grid>
      ))}
      <Grid item>
        <Typography variant="body1" color="orange">
          Big
        </Typography>
        <Typography variant="body2" color="orange">
          1.92X
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant="body1" color="blue">
          Small
        </Typography>
        <Typography variant="body2" color="blue">
          1.92X
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant="body1" color="red">
          Odd
        </Typography>
        <Typography variant="body2" color="red">
          1.92X
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant="body1" color="green">
          Even
        </Typography>
        <Typography variant="body2" color="green">
          1.92X
        </Typography>
      </Grid>
    </Grid>
  );
};

export default MyComponent;