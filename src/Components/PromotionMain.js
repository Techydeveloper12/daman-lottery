import React, { useEffect,useState} from 'react'
import Mobile from '../Components/Mobile';
import IconButton from '@mui/material/IconButton';
import SmsIcon from '@mui/icons-material/Sms';
import DownloadIcon from '@mui/icons-material/Download';
import { Box, Typography, Button,Grid} from '@mui/material';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import PeopleIcon from '@mui/icons-material/People';
import { doc, onSnapshot, collection, query, getDocs ,getDoc} from 'firebase/firestore';
import { db, auth } from '../firebase/config'; // Make sure the path is correct
import { useNavigate } from 'react-router-dom';



const options = [
  { label: 'Copy invitiation code', image: 'assets/images/download (12).png' },
  { label: 'Subordinate data', image: 'assets/images/team_port-b79e3d75.png' },
  { label: 'Commision details', image: 'assets/images/commission-4abb55b3.png' },
  { label: 'Invitiation rules', image: 'assets/images/rechargeHistory-195824c7.png' },
  { label: 'Agent line custumer service', image: 'assets/images/server-a789bbfb.png' },
];

const PromotionMain = ({ children }) => {

  const [user, setUser] = useState(null);
  useEffect(() => {
    const setVh = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    window.addEventListener('resize', setVh);
    setVh();

    return () => window.removeEventListener('resize', setVh);
  }, []);

  const navigate = useNavigate();
  


  const [commissionWallet, setCommissionWallet] = useState(0);
  const [referralCount, setReferralCount] = useState(0);

  const uid = auth.currentUser.uid; 

  useEffect(() => {
    const userRef = doc(db, 'users', uid);
    const unsubscribe = onSnapshot(userRef, (doc) => {
      const data = doc.data();
      setCommissionWallet(data.commissionWallet);
    });

    const fetchReferralCount = async () => {
      const commissionFromRef = collection(userRef, 'commissionFrom');
      const commissionFromQuery = query(commissionFromRef);
      const commissionFromSnapshot = await getDocs(commissionFromQuery);
      setReferralCount(commissionFromSnapshot.size);
    };

    fetchReferralCount();

    return () => unsubscribe();
  }, [uid]);

  const [inviteLink, setInviteLink] = useState('');



  useEffect(() => {
    const userRef = doc(db, 'users', uid);
    const unsubscribe = onSnapshot(userRef, (doc) => {
      const data = doc.data();
      setInviteLink(data.referralLink);
    });

    return () => unsubscribe();
  }, [uid]);

  const handleCopyLink = async () => {
    navigate('/invite');
  };
  useEffect(() => {
    const userDoc = doc(db, 'users', auth.currentUser.uid);
    const unsubscribe = onSnapshot(userDoc, (doc) => {
      setUser(doc.data());
    });

    // Clean up the subscription on unmount
    return () => unsubscribe();
  }, []);

 

  const dataItems = [
    { heading: 'Number of Registers', value: user?.directSubordinates || 0 },
    { heading: 'Deposit Number', value: user?.firstDepositsDirect || 0 },
    { heading: 'Total Deposit', value: `\u20B9${user?.totalCommissionDirect || 0}`},
    { heading: 'Number of Registers', value: user?.totalSubordinates || 0 },
    { heading: 'Deposit Number', value: user?.firstDepositsTeam || 0 },
    { heading: 'Total Deposit', value: `\u20B9${user?.totalCommissionTeam || 0}` },
    { heading: 'Number of People Making First Deposit', value: user?.firstDepositsDirect || 0 },
    { heading: 'Number of People Making First Deposit', value: user?.firstDepositsTeam || 0 },
  ];
  
  const data = [
    { heading: 'This week', value: user?.thisWeekCommission || 0 },
    { heading: 'Total commission', value: user?.totalCommission || 0 },
    { heading: 'Direct subordinate', value: user?.directSubordinates || 0 },
    { heading: 'Total subordinates', value: (user?.directSubordinates || 0) + (user?.teamSubordinates || 0) },
    { heading: 'First Deposits Direct', value: user?.firstDepositsDirect || 0 },
    { heading: 'First Deposits Team', value: user?.firstDepositsTeam || 0 },
  ];
  
  const handleOptionClick = async (option) => {
    switch (option.label) {
      case 'Copy invitiation code':
        try {
          // Fetch the invitation code from Firestore
          const userRef = doc(db, 'users', uid);
          const userDoc = await getDoc(userRef);
          const invitationCode = userDoc.data().invitationCode;
          console.log('Invitation code: ', invitationCode);
  
          // Copy the invitation code to the clipboard
          await navigator.clipboard.writeText(invitationCode);
  
          // Show an alert dialog
          alert('Invitation code copied to clipboard');
        } catch (err) {
          console.error('Failed to copy invitation code: ', err);
        }
        break;
      case 'Subordinate data':
        navigate('/subordinate-data');
        break;
      case 'Commision details':
        navigate('/commision-details');
        break;
      case 'Invitiation rules':
        navigate('/invitation-rules');
        break;
      case 'Agent line custumer service':
          window.open('https://t.me/TClotteryDemo', '_blank');
          break;
      // Add more cases for other options
      default:
        console.log(`Clicked on option: ${option.label}`);
    }
  };


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
                backgroundImage: 'linear-gradient(90deg, rgb(250,93,92) 0%, rgb(254,148,137) 100%)',
                padding: '8px 16px',
                color: 'white'
              }}
            >
              <Grid item xs={6} textAlign="left">
                <span style={{ fontWeight: "bold" }}>Agency </span>
              </Grid>
              <Grid item xs={6} textAlign="right">
              <IconButton color="inherit" onClick={() => navigate('/messages')}>
  <SmsIcon />
</IconButton>
                <IconButton color="inherit">
                  <DownloadIcon />
                </IconButton>
              </Grid>
            </Grid>

            <Grid container spacing={2} mt={2} sx={{  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                marginLeft: 'auto',
                marginRight: 'auto',
                maxWidth: '95%',
                borderRadius:"10px"}}>
      {/* First Grid */}
      
      <Grid item xs={12} sx={{borderRadius: '10px 10px 0 0',   backgroundColor: 'rgb(249,94,93)', padding: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <Typography variant="caption" color={"white"} align="center">{`\u20B9${user?.totalCommission || 0}`}</Typography>
        <Typography variant="caption" color={'white'} align="center">Total commission</Typography>
        <Typography variant="caption" color={'white'} align="center">Upgrade the level to increase commission income</Typography>
      </Grid>

      {/* Second Grid */}
      <Grid item xs={12} sx={{borderRadius: '8px 8px 0 0', borderTopLeftRadius: '8px', backgroundColor:"#F6F6F6", borderTopRightRadius: '8px', borderBottom: '1px solid #ccc', padding: '10px' }}>
        <Grid container justifyContent="space-evenly">
          <Grid item >
            <Box display="flex" alignItems="center">
              <PeopleIcon style={{ color: 'rgb(249,94,93)' }}/>
              <Typography variant="body1" align="center">Direct subordinates</Typography>
            </Box>
          </Grid>
          <Grid item>
            <Box display="flex" alignItems="right">
              <PeopleIcon style={{ color: 'rgb(249,94,93)' }}  />
              <Typography variant="body1" align="center">Team subordinates</Typography>
            </Box>
          </Grid>
        </Grid>
      </Grid>
      {/* Third Grid */}
      <Grid item container xs={12} spacing={0} sx={{ padding: '10px' }}>
      <React.Fragment>
  <Grid item xs={6}>
    <Typography variant="caption" align="center">{dataItems[0].heading}</Typography>
    <Typography variant="h6" align="center">{dataItems[0].value}</Typography>
  </Grid>
  
  <Grid item xs={6}>
    <Typography variant="caption" align="center">{dataItems[3].heading}</Typography>
    <Typography variant="h6" align="center">{dataItems[3].value}</Typography>
  </Grid>
</React.Fragment>

<React.Fragment>
  <Grid item xs={6}>
    <Typography variant="caption" align="center">{dataItems[1].heading}</Typography>
    <Typography variant="h6" align="center">{dataItems[1].value}</Typography>
  </Grid>
  
  <Grid item xs={6}>
    <Typography variant="caption" align="center">{dataItems[1].heading}</Typography>
    <Typography variant="h6" align="center">{dataItems[1].value}</Typography>
  </Grid>
</React.Fragment>

<React.Fragment>
  <Grid item xs={6}>
    <Typography variant="caption" align="center">{dataItems[2].heading}</Typography>
    <Typography variant="h6" align="center">{dataItems[2].value}</Typography>
  </Grid>
  
  <Grid item xs={6}>
    <Typography variant="caption" align="center">{dataItems[5].heading}</Typography>
    <Typography variant="h6" align="center">{dataItems[5].value}</Typography>
  </Grid>
</React.Fragment>

<React.Fragment>
  <Grid item xs={6}>
    <Typography variant="caption" align="center">{dataItems[6].heading}</Typography>
    <Typography variant="h6" align="center">{dataItems[6].value}</Typography>
  </Grid>
  
  <Grid item xs={6}>
    <Typography variant="caption" align="center">{dataItems[7].heading}</Typography>
    <Typography variant="h6" align="center">{dataItems[7].value}</Typography>
  </Grid>
</React.Fragment>
      </Grid>
    </Grid>


    <Button
    onClick={handleCopyLink}
      variant="contained"
      color="primary"
      sx={{
        width: '90%',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: '20px', // Adjust as needed
        marginBottom: '20px', 
        backgroundColor: 'rgb(249,94,93)',
        borderRadius:"20px"// Adjust as needed
      }}
    >
      Invite Link
    </Button>
    <div>
      {options.map((option, index) => (
        <MenuItem key={index} onClick={() => handleOptionClick(option)}>
          <ListItemIcon>
            <img src={option.image} alt="icon" style={{ width: 24, height: 24, marginRight: 8 }} />
          </ListItemIcon>
          <Typography variant="inherit">{option.label}</Typography>
          <ListItemIcon style={{ marginLeft: 'auto' }}>
            <ArrowForwardIcon />
          </ListItemIcon>
        </MenuItem>
      ))}
    </div>


    <Grid mt={4} sx={{ backgroundColor: '#FFFFFF', borderRadius: '8px' ,   marginLeft: 'auto',
                marginRight: 'auto', width:"95%", boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', marginBottom:"150px"  }}>
                   {/* New Grid */}
  <Grid container spacing={2}>
    <Grid item xs={12}>
      <Typography variant="subtitle1" sx={{marginLeft:"5px",fontWeight:"bold"}} align="left">Promotion data</Typography>
    </Grid>
  </Grid>
      {/* First Grid */}
      <Grid container spacing={2}>
        <Grid item xs={6}>
        <Typography variant="caption" color={"#666666"}>{data[0].value}</Typography>
          <Typography variant="subtitle1">{data[0].heading}</Typography>
         
        </Grid>
        <Grid item xs={6}>
        <Typography variant="caption" color={"#666666"}>{data[1].value}</Typography>
          <Typography variant="subtitle1">{data[1].heading}</Typography>
        
        </Grid>
      </Grid>
      {/* Second Grid */}
      <Grid container spacing={2}>
        <Grid item xs={6}>
        <Typography variant="caption" color={"#666666"}>{data[2].value}</Typography>
          <Typography variant="subtitle1">{data[2].heading}</Typography>
         
        </Grid>
        <Grid item xs={6}>
        <Typography variant="caption" color={"#666666"}>{data[3].value}</Typography>
          <Typography variant="subtitle1">{data[3].heading}</Typography>
         
        </Grid>
      </Grid>
    </Grid>
          
  {/* content end */}
          </Box>


          
{children}

        </Box>
      </Mobile>
    </div>
  )
}

export default PromotionMain;