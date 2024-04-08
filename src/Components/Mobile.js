import React, { useEffect } from 'react';
import { Box, Container, useMediaQuery } from '@mui/material';

const Mobile = ({ children }) => {
  useEffect(() => {
    // Disable scrolling on the document body
    document.body.style.overflow = 'hidden';

    return () => {
      // Enable scrolling on the document body when the component unmounts
      document.body.style.overflow = 'auto';
    };
  }, []);

  const isSmallScreen = useMediaQuery('(max-width:600px)');

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      bgcolor="grey"
    >
      <Container
        maxWidth={isSmallScreen ? false : 'xs'}
        sx={{
          height: '100vh',
          overflow: 'hidden', // Hide scrollbar in the main container
          position: 'relative',
          padding: 0, // Remove default padding
          margin: 0, // Remove default margin
          width: '100%', // Full width on small screens
          maxWidth: '100%', // Full width on small screens
        }}
      >
       <Box
  bgcolor="RGB(247,248,255)"
  textAlign="center"
  minHeight="100%"
  maxHeight="100vh"
  width="100%" // Full width on small screens
  paddingX={0} // Remove padding from left and right sides
  sx={{
    overflowY: 'auto', // Enable scrolling in the inner box
    '&::-webkit-scrollbar': {
      display: 'none', // Hide scrollbar in the inner box
    },
    wordWrap: 'break-word', // Break the word and wrap onto the next line
  }}
>
  {children}

</Box>
      </Container>
    </Box>
  );
};

export default Mobile;