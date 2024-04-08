import React, { useEffect} from 'react'
import Mobile from '../Components/Mobile';
import IconButton from '@mui/material/IconButton';
import SmsIcon from '@mui/icons-material/Sms';
import DownloadIcon from '@mui/icons-material/Download';
import { Typography,  Card, CardMedia, CardContent,Grid , Box,Paper} from '@mui/material';
import { useState } from 'react';
import { getFirestore, doc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
const InvitationRulesMain = ({ children }) => {

  useEffect(() => {
    const setVh = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    window.addEventListener('resize', setVh);
    setVh();

    return () => window.removeEventListener('resize', setVh);
  }, []);
  const rows = [
    { stars: 'L0', coins: 0, goldCoins: 0, teamRanking: '0' },
    { stars: 'L1', coins: '500K', goldCoins: '100K', teamRanking: '100k' },
    { stars: 'L2', coins: '1,000K', goldCoins: '200K', teamRanking: '500k' },
    { stars: 'L3', coins: '2.5M', goldCoins: '500K', teamRanking: '700k' },
    { stars: 'L4', coins: '3.5M', goldCoins: '700K', teamRanking: '700k' },
    { stars: 'L5', coins: '5M', goldCoins: '1,000K', teamRanking: '1000k' },
    { stars: 'L6', coins: '10M', goldCoins: '2M', teamRanking: '2M' },
    { stars: 'L7', coins: '100M', goldCoins: '20M', teamRanking: '20M' },
    { stars: 'L8', coins: '500M', goldCoins: '100M', teamRanking: '100M' },
    { stars: 'L9', coins: '1,000M', goldCoins: '200M', teamRanking: '200M' },
    { stars: 'L10', coins: '1,500M', goldCoins: '300M', teamRanking: '300M' },
  ];
 
  const rows2 = [
    { stars: 1, tier1: '0.64%', tier2: '0.18%', tier3: '0.054%', tier4: '0' },
    { stars: 2, tier1: '0.7%', tier2: '0.245%', tier3: '0.0858%', tier4: '0' },
    { stars: 3, tier1: '0.75%', tier2: '0.2812%', tier3: '0.1054%', tier4: '0.1' },
    { stars: 4, tier1: '0.8%', tier2: '0.32%', tier3: '0.128%', tier4: '0.2' },
    { stars: 5, tier1: '0.85%', tier2: '0.3612%', tier3: '0.1534%', tier4: '0.3' },
    { stars: 6, tier1: '0.9%', tier2: '0.405%', tier3: '0.1822%', tier4: '0.4' },
    { stars: 7, tier1: '1%', tier2: '0.5%', tier3: '0.25%', tier4: '0' },
    { stars: 8, tier1: '1.1%', tier2: '0.605%', tier3: '0.3328%', tier4: '0' },
    { stars: 9, tier1: '1.2%', tier2: '0.72%', tier3: '0.432%', tier4: '0.5' },
    { stars: 10, tier1: '1.3%', tier2: '0.845%', tier3: '0.5492%', tier4: '0' },
    { stars: 11, tier1: '1.4%', tier2: '0.98%', tier3: '0.684%', tier4: '0.6' },
  ];

  const rows3 = [
    { stars: 1, tier1: '0.3%', tier2: '0.09%', tier3: '0.027%', tier4: '0.0' },
    { stars: 2, tier1: '0.35%', tier2: '0.1225%', tier3: '0.0429%', tier4: '0.1' },
    { stars: 3, tier1: '0.375%', tier2: '0.1404%', tier3: '0.0527%', tier4: '0.0' },
    { stars: 4, tier1: '0.4%', tier2: '0.16%', tier3: '0.0664%', tier4: '0.0' },
    { stars: 5, tier1: '0.425%', tier2: '0.1804%', tier3: '0.0764%', tier4: '0.0' },
    { stars: 6, tier1: '0.45%', tier2: '0.2025%', tier3: '0.0911%', tier4: '0.1' },
    { stars: 7, tier1: '0.5%', tier2: '0.25%', tier3: '0.125%', tier4: '0.0' },
    { stars: 8, tier1: '0.55%', tier2: '0.3025%', tier3: '0.1644%', tier4: '0.0' },
    { stars: 9, tier1: '0.6%', tier2: '0.36%', tier3: '0.216%', tier4: '0.1' },
    { stars: 10, tier1: '0.65%', tier2: '0.4225%', tier3: '0.2746%', tier4: '0.1' },
    { stars: 11, tier1: '0.7%', tier2: '0.49%', tier3: '0.343%', tier4: '0.2' },
  ];

  const rows4 = [
    { stars: 1, tier1: '0.3%', tier2: '0.09%', tier3: '0.027%', tier4: '0.0' },
    { stars: 2, tier1: '0.35%', tier2: '0.1225%', tier3: '0.0429%', tier4: '0.1' },
    { stars: 3, tier1: '0.375%', tier2: '0.1404%', tier3: '0.0527%', tier4: '0.0' },
    { stars: 4, tier1: '0.4%', tier2: '0.16%', tier3: '0.0664%', tier4: '0.0' },
    { stars: 5, tier1: '0.425%', tier2: '0.1804%', tier3: '0.0764%', tier4: '0.0' },
    { stars: 6, tier1: '0.45%', tier2: '0.2025%', tier3: '0.0911%', tier4: '0.1' },
    { stars: 7, tier1: '0.5%', tier2: '0.25%', tier3: '0.125%', tier4: '0.0' },
    { stars: 8, tier1: '0.55%', tier2: '0.3025%', tier3: '0.1644%', tier4: '0.0' },
    { stars: 9, tier1: '0.6%', tier2: '0.36%', tier3: '0.216%', tier4: '0.1' },
    { stars: 10, tier1: '0.65%', tier2: '0.4225%', tier3: '0.2746%', tier4: '0.1' },
    { stars: 11, tier1: '0.7%', tier2: '0.49%', tier3: '0.343%', tier4: '0.2' },
  ];

  const rows5 = [
    { stars: 1, tier1: '0.3%', tier2: '0.09%', tier3: '0.027%', tier4: '0.0' },
    { stars: 2, tier1: '0.35%', tier2: '0.1225%', tier3: '0.0429%', tier4: '0.1' },
    { stars: 3, tier1: '0.375%', tier2: '0.1404%', tier3: '0.0527%', tier4: '0.0' },
    { stars: 4, tier1: '0.4%', tier2: '0.16%', tier3: '0.0664%', tier4: '0.0' },
    { stars: 5, tier1: '0.425%', tier2: '0.1804%', tier3: '0.0764%', tier4: '0.0' },
    { stars: 6, tier1: '0.45%', tier2: '0.2025%', tier3: '0.0911%', tier4: '0.1' },
    { stars: 7, tier1: '0.5%', tier2: '0.25%', tier3: '0.125%', tier4: '0.0' },
    { stars: 8, tier1: '0.55%', tier2: '0.3025%', tier3: '0.1644%', tier4: '0.0' },
    { stars: 9, tier1: '0.6%', tier2: '0.36%', tier3: '0.216%', tier4: '0.1' },
    { stars: 10, tier1: '0.65%', tier2: '0.4225%', tier3: '0.2746%', tier4: '0.1' },
    { stars: 11, tier1: '0.7%', tier2: '0.49%', tier3: '0.343%', tier4: '0.2' },
  ];
  return (
    <div>
      <Mobile>
        <Box
          display="flex"
          flexDirection="column"
          height="calc(var(--vh, 1vh) * 100)"
          position="relative"
        >
          <Box flexGrow={1}>


            <Grid
              container
              alignItems="center"
              justifyContent="space-between"
              sx={{
                position: 'sticky',
                top: 0,
                zIndex: 1000,
                backgroundColor: 'rgb(249,94,93)',
                padding: '8px 16px',
                color: 'white'
                
              }}
            >
              <Grid item xs={6} textAlign="left">
                <span style={{ fontWeight: "bold" }}>Invite rules</span>
              </Grid>
              <Grid item xs={6} textAlign="right">
                <IconButton color="inherit">
                  <SmsIcon />
                </IconButton>
                <IconButton color="inherit">
                  <DownloadIcon />
                </IconButton>
              </Grid>
            </Grid>

            {/* //content */}
           
            {/* content end */}
          </Box>

          <Box sx={{ maxWidth:"90%", mx: 'auto', mt: 4 }}>
      
        <Typography variant="h5" gutterBottom sx={{color:"orange"}}>
        [Promotion partner] program
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
        This activity is valid for a long time


        </Typography>

        <Box sx={{ my: 2, border: '1px solid orange', p: 2 }}>
          <Typography variant="body1" gutterBottom>
            01
          </Typography>
          <Typography variant="body2" gutterBottom>
          There are 4 subordinate levels in inviting friends, if A invites B, then B is a level 1 subordinate of A. If B invites C, then C is a level 1 subordinate of B and also a level 2 subordinate of A. If C invites D, then D is a level 1 subordinate of C, at the same time a level 2 subordinate of B and also a level 3 subordinate of A.          </Typography>
        </Box>

        <Box sx={{ my: 2, border: '1px solid orange', p: 2 }}>
          <Typography variant="body1" gutterBottom>
            02
          </Typography>
          <Typography variant="body2" gutterBottom>
          When inviting friends to register, you must send the invitation link provided or enter the invitation code manually so that your friends become your level 1 subordinates.

</Typography>
        </Box>

        <Box sx={{ my: 2, border: '1px solid orange', p: 2 }}>
          <Typography variant="body1" gutterBottom>
            03
          </Typography>
          <Typography variant="body2" gutterBottom>
          The invitee registers via the inviter's invitation code and completes the deposit, shortly after that the commission will be received immediately

</Typography>
        </Box>

        <Box sx={{ my: 2, border: '1px solid orange', p: 2 }}>
          <Typography variant="body1" gutterBottom>
            04
          </Typography>
          <Typography variant="body2" gutterBottom>
          The calculation of yesterday's commission starts every morning at 01:00. After the commission calculation is completed, the commission is rewarded to the wallet and can be viewed through the commission collection record.

</Typography>
        </Box>
        <Box sx={{ my: 2, border: '1px solid orange', p: 2 }}>
          <Typography variant="body1" gutterBottom>
            05
          </Typography>
          <Typography variant="body2" gutterBottom>
            The calculation of yesterday's commission starts every morning at 01:00. After the commission calculation is completed, the commission is rewarded to the wallet and can be viewed through the commission collection record.
          </Typography>
        </Box>
      
    </Box>

    <Grid>
    <TableContainer component={Paper}>
  <Table>
  <TableHead>
  <TableRow style={{backgroundColor:"orange",color:"white"}}>
    <TableCell style={{ border: '1px solid orange',color:"white" }}>Lvl</TableCell>
    <TableCell style={{ border: '1px solid orange',color:"white" }} align="right">Team Number</TableCell>
    <TableCell style={{ border: '1px solid orange',color:"white" }} align="right">Team Building</TableCell>
    <TableCell style={{ border: '1px solid orange',color:"white" }} align="right">Team Deposit</TableCell>
  </TableRow>
</TableHead>
<TableBody>
  {rows.map((row) => (
    <TableRow key={row.stars}>
      <TableCell style={{ border: '1px solid orange' }} component="th" scope="row" sx={{ color: 'orange' }}>
        {row.stars}
      </TableCell>
      <TableCell style={{ border: '1px solid orange' }} align="right">{row.coins}</TableCell>
      <TableCell style={{ border: '1px solid orange' }} align="right">{row.goldCoins}</TableCell>
      <TableCell style={{ border: '1px solid orange' }} align="right">{row.teamRanking}</TableCell>
    </TableRow>
  ))}
</TableBody>
  </Table>
</TableContainer>
    </Grid>

    <Box sx={{ maxWidth:"90%", mx: 'auto', mt: 4 }}>
      <Paper >
       

        <Box sx={{ my: 2, border: '1px solid orange', p: 2 }}>
          <Typography variant="body1" gutterBottom>
            06
          </Typography>
          <Typography variant="body2" gutterBottom>
          The commission percentage depends on the membership level. The higher the membership level, the higher the bonus percentage. Different game types also have different payout percentages.           </Typography>
        </Box>

        
      </Paper>
    </Box>
    <Grid  >
    
    <TableContainer  component={Paper}>
  <Table>
  <TableHead>
  <TableRow style={{backgroundColor:"orange",color:"white"}}>
    <TableCell style={{ border: '1px solid orange',color:"white" }}>Lvl</TableCell>
    <TableCell style={{ border: '1px solid orange',color:"white" }} align="right">Tier 1</TableCell>
    <TableCell style={{ border: '1px solid orange',color:"white" }} align="right">Tier 2</TableCell>
    <TableCell style={{ border: '1px solid orange',color:"white" }} align="right">Tier 3</TableCell>
    <TableCell style={{ border: '1px solid orange',color:"white" }} align="right">Tier 4</TableCell>
  </TableRow>
</TableHead>
<TableBody>
  {rows2.map((rows2) => (
    <TableRow key={rows2.stars}>
      <TableCell style={{ border: '1px solid orange',color:"orange" }} component="th" scope="row">
        {rows2.stars}
      </TableCell>
      <TableCell style={{ border: '1px solid orange' }} align="right">{rows2.tier1}</TableCell>
      <TableCell style={{ border: '1px solid orange' }} align="right">{rows2.tier2}</TableCell>
      <TableCell style={{ border: '1px solid orange' }} align="right">{rows2.tier3}</TableCell>
      <TableCell style={{ border: '1px solid orange' }} align="right">{rows2.tier4}</TableCell>
    </TableRow>
  ))}
</TableBody>
  </Table>
</TableContainer>
    </Grid>

    <Grid sx={{mt:4}}>
    
    <TableContainer component={Paper}>
  <Table>
  <TableHead>
  <TableRow style={{backgroundColor:"orange"}}>
    <TableCell style={{ border: '1px solid orange',color:"white" }}>Lvl</TableCell>
    <TableCell style={{ border: '1px solid orange',color:"white" }} align="right">Tier 1</TableCell>
    <TableCell style={{ border: '1px solid orange',color:"white" }} align="right">Tier 2</TableCell>
    <TableCell style={{ border: '1px solid orange',color:"white" }} align="right">Tier 3</TableCell>
    <TableCell style={{ border: '1px solid orange',color:"white" }} align="right">Tier 4</TableCell>
  </TableRow>
</TableHead>
<TableBody>
  {rows3.map((row) => (
    <TableRow key={row.stars}>
      <TableCell style={{ border: '1px solid orange' }} component="th" scope="row">
        {row.stars}
      </TableCell>
      <TableCell style={{ border: '1px solid orange' }} align="right">{row.tier1}</TableCell>
      <TableCell style={{ border: '1px solid orange' }} align="right">{row.tier2}</TableCell>
      <TableCell style={{ border: '1px solid orange' }} align="right">{row.tier3}</TableCell>
      <TableCell style={{ border: '1px solid orange' }} align="right">{row.tier4}</TableCell>
    </TableRow>
  ))}
</TableBody>
  </Table>
</TableContainer>
    </Grid>

    <Grid sx={{mt:4}}>
    
    <TableContainer component={Paper}>
  <Table>
  <TableHead>
  <TableRow style={{backgroundColor:"orange"}}>
    <TableCell style={{ border: '1px solid orange',color:"white" }}>Lvl</TableCell>
    <TableCell style={{ border: '1px solid orange',color:"white" }} align="right">Tier 1</TableCell>
    <TableCell style={{ border: '1px solid orange',color:"white" }} align="right">Tier 2</TableCell>
    <TableCell style={{ border: '1px solid orange',color:"white" }} align="right">Tier 3</TableCell>
    <TableCell style={{ border: '1px solid orange',color:"white" }} align="right">Tier 4</TableCell>
  </TableRow>
</TableHead>
<TableBody>
  {rows4.map((row) => (
    <TableRow key={row.stars}>
      <TableCell style={{ border: '1px solid orange' }} component="th" scope="row">
        {row.stars}
      </TableCell>
      <TableCell style={{ border: '1px solid orange' }} align="right">{row.tier1}</TableCell>
      <TableCell style={{ border: '1px solid orange' }} align="right">{row.tier2}</TableCell>
      <TableCell style={{ border: '1px solid orange' }} align="right">{row.tier3}</TableCell>
      <TableCell style={{ border: '1px solid orange' }} align="right">{row.tier4}</TableCell>
    </TableRow>
  ))}
</TableBody>
  </Table>
</TableContainer>
    </Grid>

    <Grid sx={{mt:4,}}>
    
    <TableContainer component={Paper}>
  <Table>
  <TableHead>
  <TableRow style={{backgroundColor:"orange"}}>
    <TableCell style={{ border: '1px solid orange',color:"white" }}>Lvl</TableCell>
    <TableCell style={{ border: '1px solid orange',color:"white" }} align="right">Tier 1</TableCell>
    <TableCell style={{ border: '1px solid orange',color:"white" }} align="right">Tier 2</TableCell>
    <TableCell style={{ border: '1px solid orange',color:"white" }} align="right">Tier 3</TableCell>
    <TableCell style={{ border: '1px solid orange',color:"white" }} align="right">Tier 4</TableCell>
  </TableRow>
</TableHead>
<TableBody>
  {rows5.map((row) => (
    <TableRow key={row.stars}>
      <TableCell style={{ border: '1px solid orange' }} component="th" scope="row">
        {row.stars}
      </TableCell>
      <TableCell style={{ border: '1px solid orange' }} align="right">{row.tier1}</TableCell>
      <TableCell style={{ border: '1px solid orange' }} align="right">{row.tier2}</TableCell>
      <TableCell style={{ border: '1px solid orange' }} align="right">{row.tier3}</TableCell>
      <TableCell style={{ border: '1px solid orange' }} align="right">{row.tier4}</TableCell>
    </TableRow>
  ))}
</TableBody>
  </Table>
</TableContainer>
    </Grid>

    <Box sx={{ maxWidth:"90%", mx: 'auto', mt: 4 }}>
      <Paper >
       

        <Box sx={{ my: 2, border: '1px solid orange', p: 2 }}>
          <Typography variant="body1" gutterBottom>
            07
          </Typography>
          <Typography variant="body2" gutterBottom>
          TOP20 commission rankings will be randomly awarded with  a separate bonus          </Typography>
        </Box>

        
      </Paper>
    </Box>

    <Box sx={{ maxWidth:"90%", mx: 'auto', mt: 4 }}>
      <Paper >
       

        <Box sx={{ my: 2, border: '1px solid orange', p: 2,marginBottom:"100px" }}>
          <Typography variant="body1" gutterBottom>
            08
          </Typography>
          <Typography variant="body2" gutterBottom>
          The final interpretation of this activity belongs to          </Typography>
        </Box>

        
      </Paper>
    </Box>
{children}

        </Box>
      </Mobile>
    </div>
  )
}

export default InvitationRulesMain;