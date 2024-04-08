import React, { useEffect} from 'react'
import Mobile from '../Components/Mobile';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import Divider from '@mui/material/Divider';
import RefreshIcon from '@mui/icons-material/Refresh';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { MenuList,MenuItem,ListItemText } from '@mui/material';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useNavigate } from 'react-router-dom';
import { getAuth, signOut } from "firebase/auth";
import { doc, onSnapshot } from 'firebase/firestore';
import { db,auth } from '../firebase/config'; 
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { getFirestore, getDoc, updateDoc,collection,addDoc } from 'firebase/firestore';
import AutorenewIcon from '@mui/icons-material/Autorenew';

const ImageSubtitleGrid = ({ imageSrc, subtitle1, subtitle2,fontSize }) => (
  <Grid container spacing={1} sx={{ backgroundColor: 'rgb(247,248,254)', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '8px', marginBottom: '10px' , width:"80%",paddingBottom:"3px" }}>
    <Grid item xs={3} sx={{ display: 'flex', alignItems: 'center' }}  >
      <img src={imageSrc} alt="placeholder" style={{ width: '130%', borderRadius: '8px' }} />
    </Grid>
    <Grid item xs={9} align="left" sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <Typography variant="caption"  sx={{ display: 'flex', alignItems: 'center', height: '100%',fontWeight:"bold",opacity:0.6,color:"black" }} >{subtitle1}</Typography>
      <Typography variant=""  sx={{ display: 'flex', alignItems: 'center', height: '100%',color:"black",fontSize:"15px" }}>{subtitle2}</Typography>
    </Grid>
  </Grid>
);

const images = [
  { url: 'assets/images/download (21).png', caption: 'Settings' },
  { url: 'assets/images/download (22).png', caption: 'Feedback' },
  { url: 'assets/images/download (23).png', caption: 'Notifications' },
  { url: 'assets/images/serviceCenter-ed250156.png', caption: '27/7 Custumer service' },
  { url: 'assets/images/download (24).png', caption: 'Beginners,s Guide' },
  { url: 'assets/images/download (25).png', caption: 'About Us' },
];

const AccountMain = ({ children }) => {
  const profilePhotoUrl = 'assets/images/15-80f41fc6.png';
  const heading = 'Profile Name';
  const subtitle = 'UID: 1234567890';
  const lastLogin = 'Last Login: 2024-02-24';
  const captionText = 'Daily intrest rate 0.1% + VIP extra incocme safe, calculated every 1 minute '
  const [userData, setUserData] = React.useState(null);

const uid = auth.currentUser.uid; // Get the current user's UID

useEffect(() => {
  const unsubscribe = onSnapshot(doc(db, 'users', uid), (doc) => {
    const data = doc.data();
    data.lastLogin = data.lastLogin.toDate(); // Convert Firestore Timestamp to JavaScript Date
    setUserData(data);
  });

  return () => unsubscribe();
}, [uid]);

  const handleCopy = () => {
    navigator.clipboard.writeText(subtitle);
  };

  useEffect(() => {
    const setVh = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    window.addEventListener('resize', setVh);
    setVh();

    return () => window.removeEventListener('resize', setVh);
  }, []);

  const totalBalance = 0;

  const handleRefresh = () => {
    // Handle refresh logic
  };

  const handleButtonClick = (action) => {
    // Handle button click logic
  };

  const options = [
    { label: 'Notifications', icon: 'assets/images/download22.png', subLabel: null, onClick: () => navigate('/messages') },
    { label: 'Gifts', icon: 'assets/images/download (19).png', subLabel: null, onClick: () => navigate('/coupen-user') },
    { label: 'Game Statistics', icon: 'assets/images/download (20).png', subLabel: null, },
    { label: 'Language', icon: 'assets/images/languageIcon-4c117d4d.png', subLabel: 'English', onClick: () => navigate('/language') },
  ];





  const navigate = useNavigate();

  const handleLogout = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      // User is signed out
      console.log("signing outs sussfully ");
      // Here you can also clear any user data from your application state if needed
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  const handleDeposit = async (depositAmount) => {
    const db = getFirestore();
    const userRef = doc(db, 'users', uid);
    const userDoc = await getDoc(userRef);
    const userData = userDoc.data();
  
    // Add the deposit amount to the user's wallet
    await updateDoc(userRef, {
      wallet: userData.wallet + depositAmount,
    });
  
    // If the user has a referrer and this is the first deposit, calculate the referral bonus
    if (userData.referral && !userData.hasMadeDeposit) {
      handleReferralBonus(userData.referral, depositAmount, 1, uid); // Pass the uid of the user who is making the deposit
    }
  
    // Set hasMadeDeposit to true
    await updateDoc(userRef, {
      hasMadeDeposit: true,
    });
  };
  const handleReferralBonus = async (uid, depositAmount, level, fromUid) => {
    const db = getFirestore();
    const userRef = doc(db, 'users', uid);
    const userDoc = await getDoc(userRef);
    const userData = userDoc.data();
  
    // Calculate the referral bonus based on the level
    let bonusPercentage;
    switch (level) {
      case 1: bonusPercentage = 0.5; break;
      case 2: bonusPercentage = 0.3; break;
      case 3: bonusPercentage = 0.2; break;
      case 4: bonusPercentage = 0.1; break;
      default: bonusPercentage = 0; break;
    }
    const bonusAmount = depositAmount * bonusPercentage;
  
    // Add the referral bonus to the user's wallet
    await updateDoc(userRef, {
      wallet: userData.wallet + bonusAmount,
    });
  
    // Add the referral bonus to the user's commissionWallet
    await updateDoc(userRef, {
      commissionWallet: userData.commissionWallet ? userData.commissionWallet + bonusAmount : bonusAmount,
    });
  
    // Add the user who gave the commission to the commissionFrom subcollection
    const commissionFromRef = collection(userRef, 'commissionFrom');
    await addDoc(commissionFromRef, {
      uid: fromUid,
      commission: bonusAmount,
      date: new Date(),
    });
  
    // If the user has a referrer and the level is less than 5, calculate the next level's bonus
    if (userData.referral && level < 5) {
      handleReferralBonus(userData.referral, depositAmount, level + 1, uid);
    }
  };


  const [depositDialogOpen, setDepositDialogOpen] = React.useState(false);
  const [depositAmount, setDepositAmount] = React.useState(0);

  const handleOpenDepositDialog = () => {
    setDepositDialogOpen(true);
  };

  const handleCloseDepositDialog = () => {
    setDepositDialogOpen(false);
  };

  const handleConfirmDeposit = () => {
    handleDeposit(depositAmount);
    handleCloseDepositDialog();
  };

  const handleSelectDepositAmount = (amount) => {
    setDepositAmount(amount);
  };

  const handleInputChange = (event) => {
    setDepositAmount(event.target.value);
  };

  const handleImageClick = (index) => {
    switch (index) {
      case 0: // Settings
        navigate('/settings');
        break;
      case 2: // Notifications
        navigate('/messages');
        break;
      default:
        console.log(`Clicked Image ${index+1}`);
        break;
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
            sx={{
              backgroundColor: 'rgb(247,248,254)', // Base background color
              overflowY: 'scroll',
              overflowX: 'hidden',
              '&::-webkit-scrollbar': {
                width: '1px',
              },
              '&::-webkit-scrollbar-track': {
                backgroundColor: 'rgb(247,248,254)',
              },
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: 'rgb(247,248,254)',
              },
            }}
       
          
          
        >
          <Box flexGrow={1} >
            <Grid
              container
              sx={{
                backgroundImage: 'linear-gradient(90deg, rgb(250,93,92) 0%, rgb(254,148,137) 100%)', // Base grid background color
                borderRadius: '0 0 20px 20px', // Border radius in the lower corners of both sides
                padding: '20px',
              }}
            >
              <Grid item xs={4} align="center">
                <Avatar src="https://91club.bet/assets/png/1-a6662edb.png" sx={{ width: 80, height: 80 }} />
              </Grid>
              <Grid item xs={8} container direction="column" justifyContent="space-between">
  <Grid item align="left">
    <Typography variant="caption" align="center" color="white" sx={{ fontWeight: "bold" }}>{userData?.username || "Loading.."}</Typography>
  </Grid>
  <Grid item container alignItems="center" justifyContent="center" sx={{ borderRadius: '50px',height:"30px",backgroundColor: 'rgb(254,148,149)',width:"200px" }}>
  <Grid item xs={6} container alignItems="center" direction="row">
  <Typography variant="caption" align="left" color="white">{`UID`}</Typography>
  <Box sx={{ height: '15px', borderLeft: '1px solid white', mx: 1 }} />
  <Typography variant="caption" align="left" color="white">{`${userData?.UID || 0}`}</Typography>
</Grid>
    <Grid item xs={4} container alignItems="center">
      <IconButton onClick={handleCopy}>
        <FileCopyIcon sx={{ color: "white",width:"15px",height:"15px" }} />
      </IconButton>
    </Grid>
  </Grid>

                <Grid item align="left">
                  <Typography variant="caption" align="left" color="white">{`Last Login: ${userData?.lastLogin.toLocaleString() || "Loading.."}`}</Typography>
                </Grid>
              </Grid>
              <Grid item xs={12} sx={{
                height: '100px',
              }}>



              </Grid>
            </Grid>

            <div style={{ position: 'relative', marginTop: '-20%', zIndex: 1 }}>
              <Grid container sx={{
                backgroundColor: 'white',
                padding: '20px',
                borderRadius: '12px',
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                marginLeft: 'auto',
                marginRight: 'auto',
                maxWidth: '95%', // Decreased width

              }}>
                <Grid item xs={12}>
                  <Typography variant="h6" align="left" sx={{color:"#666",fontSize:"14px"}}>Total Balance</Typography>
                </Grid>

                <Grid item xs={12} align="Left">
                  <Typography variant="caption" align="center" sx={{color:"#151515",fontWeight:"bold",fontSize:"20px"}}>{`\u20B9${userData?.wallet || 0}`}<IconButton onClick={handleRefresh}>
                    <AutorenewIcon style={{color:"white",width:"20",height:"20"}} />
                  </IconButton></Typography>
                </Grid>

                <Grid item xs={12}>
                  <Divider sx={{opacity:0.3}} />
                </Grid>
                <Grid item xs={12}>
  <Grid container spacing={3}>
    <Grid item xs={3}>
      <IconButton onClick={() => navigate('/wallet')}>
        <img src="assets/images/download.png" alt="Wallet" width="30" height="30"  />
      </IconButton>
      <Typography variant="subtitle2" align="center" sx={{color:"#151515"}}>Wallet</Typography>
    </Grid>
    <Grid item xs={3}>
      <IconButton onClick={() => navigate('/recharge')}>
        <img src="assets/images/download (1).png" width="30" height="30" alt="Deposit" />
      </IconButton>
      <Typography variant="subtitle2" align="center" sx={{color:"#151515"}}>Deposit</Typography>
    </Grid>
    <Grid item xs={3}>
      <IconButton onClick={() => navigate('/withdraw')}>
        <img src="assets/images/download (2).png" width="30" height="30" alt="Withdraw" />
      </IconButton>
      <Typography variant="subtitle2" align="center" sx={{color:"#151515"}}>Withdraw</Typography>
    </Grid>
    <Grid item xs={3}>
      <IconButton onClick={() => handleButtonClick('vip')}>
        <img src="assets/images/VipIcon-3c72b1cc.png" width="30" height="30" alt="VIP" />
      </IconButton>
      <Typography variant="subtitle2" align="center" sx={{color:"#151515"}}>VIP</Typography>
    </Grid>
  </Grid>
</Grid>
              </Grid>
            </div>

           



            <Grid container spacing={0} mt={2} >
      <Grid item xs={6}>
        <Grid container direction="column" spacing={2} sx={{ margin: '10px' }}>
          <Grid item onClick={() => navigate('/bet-history')}>
            <ImageSubtitleGrid imageSrc="/assets/images/download (3).png" subtitle1="Bet" subtitle2="My betting history" fontSize="10px"/>
          </Grid>
          <Grid item onClick={() => navigate('/transaction')}>
            <ImageSubtitleGrid imageSrc="/assets/images/download (4).png" subtitle1="Transaction" subtitle2="My transaction history" />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={6}>
        <Grid container direction="column" spacing={2} sx={{ margin: '10px' }}>
          <Grid item  onClick={() => navigate('/deposit-history')}>
            <ImageSubtitleGrid imageSrc="/assets/images/download (1).png" subtitle1="Deposit" subtitle2="My deposit history" />
          </Grid>
          <Grid item onClick={() => navigate('/withdraw-history')}> 
            <ImageSubtitleGrid imageSrc="/assets/images/download (5).png" subtitle1="Withdraw" subtitle2="My withdraw  history" />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
    
    <MenuList sx={{ backgroundColor: 'rgb(247,248,254)', borderRadius: '8px' ,   marginLeft: 'auto', marginRight: 'auto', width:"90%", boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', }}>
  {options.map((option, index) => (
    <React.Fragment key={index}>
      <MenuItem sx={{ display: 'flex', alignItems: 'center' }} onClick={option.onClick}>
        <img src={option.icon} alt={option.label} style={{ width: '24px', marginRight: '8px' }} />
        <ListItemText primary={option.label} sx={{ textAlign: 'left' ,color:"black"}} />
        {option.subLabel && <ListItemText secondary={option.subLabel} secondaryTypographyProps={{ style: { color: 'white' } }} />}
        <ArrowForwardIcon style={{color:"white"}} />
      </MenuItem>
      {index < options.length - 1 && <Divider />}
    </React.Fragment>
  ))}
</MenuList>


    <Grid container spacing={2} mt={2} sx={{ backgroundColor: 'rgb(247,248,254)', borderRadius: '8px', padding: '10px',  marginLeft: 'auto',
                marginRight: 'auto', width:"90%", boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', }}>
  {images.map((image, index) => (
    <Grid item xs={4} key={index} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div
        onClick={() => handleImageClick(index)}
        style={{ cursor: 'pointer', width: '100%', marginBottom: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        <img src={image.url} alt={` ${index+1}`} style={{ width: '30%', borderRadius: '8px' }} />
        <Typography variant="caption" align="center" sx={{ marginTop: '8px',color:"black" }}>{image.caption}</Typography>
      </div>
    </Grid>
  ))}
</Grid>


<IconButton
  onClick={handleLogout}
  sx={{ width: '80%', border: '1px solid white', borderRadius: '50px' ,marginTop:"10px",marginBottom:"150px"}}
>
  <Grid container alignItems="center">
    <Grid item>
      <ExitToAppIcon style={{color:"white"}} />
    </Grid>
    <Grid item xs={10}>
      <Typography variant="body1" sx={{ marginLeft: '8px',color:"white" }}>Log Out</Typography>
    </Grid>
  </Grid>
</IconButton>


<Dialog open={depositDialogOpen} onClose={handleCloseDepositDialog}>
      <DialogTitle>Deposit</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Select a deposit amount or enter a custom amount.
        </DialogContentText>
        <Button onClick={() => handleSelectDepositAmount(100)}>100</Button>
        <Button onClick={() => handleSelectDepositAmount(200)}>200</Button>
        <Button onClick={() => handleSelectDepositAmount(500)}>500</Button>
        <Button onClick={() => handleSelectDepositAmount(1000)}>1000</Button>
        <Button onClick={() => handleSelectDepositAmount(1500)}>1500</Button>
        <Button onClick={() => handleSelectDepositAmount(2000)}>2000</Button>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Custom Amount"
          type="number"
          fullWidth
          variant="standard"
          value={depositAmount}
          onChange={handleInputChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseDepositDialog}>Cancel</Button>
        <Button onClick={handleConfirmDeposit}>Confirm</Button>
      </DialogActions>
    </Dialog>
            {/* content end */}
          </Box>



          {children}

        </Box>
      </Mobile>
    </div>
  )
}

export default AccountMain;