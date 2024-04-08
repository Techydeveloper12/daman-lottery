import React, { useState, useEffect,useRef } from 'react';
import IconButton from '@mui/material/IconButton';
import Mobile from '../Components/Mobile';
import { Typography, Grid, Box } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import { Button } from '@mui/material';
import { Refresh, AccountBalanceWallet, VolumeUp } from '@mui/icons-material';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import NoteIcon from '@mui/icons-material/Note';
import { Tabs, Tab, Divider, Pagination, Card, CardHeader, CardContent } from '@mui/material';
import { Drawer } from '@mui/material';
import { doc, updateDoc, collection, addDoc, onSnapshot, serverTimestamp, getDoc, getDocs } from 'firebase/firestore';
import { auth, db } from '../firebase/config'; // replace with your Firebase config file
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import { CSSTransition } from 'react-transition-group';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import './style.css';
import CheckIcon from '@mui/icons-material/Check';
import io from 'socket.io-client';
import useSound from 'use-sound';
import {
  Paper,
  ButtonBase,
} from '@mui/material';
const countdownSound = new Audio('/assets/sound.mp3');
countdownSound.loop = true;

const images = [
  { id: 1, src: 'games/assets/time-5d4e96a3.png', altSrc: 'games/assets/time_a-afd768a9.png', subtitle: '1Min' },
  { id: 2, src: 'games/assets/time-5d4e96a3.png', altSrc: 'games/assets/time_a-afd768a9.png', subtitle: '3Min' },
  { id: 3, src: 'games/assets/time-5d4e96a3.png', altSrc: 'games/assets/time_a-afd768a9.png', subtitle: '5Min' },
  { id: 4, src: 'games/assets/time-5d4e96a3.png', altSrc: 'games/assets/time_a-afd768a9.png', subtitle: '10Min' },
];

const columns = [
    { id: 'period', label: 'Period' },
    { id: 'sum', label: 'Sum' },
    { id: 'size', label: 'Size' },
    { id: 'parity', label: 'Parity' },
    { id: 'diceOutcome', label: 'Dice Outcome' },
  ];





const TabPanel = ({ children, value, index }) => {
  return (
    <div hidden={value !== index}>
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
};

const CustomTable = ({ data }) => {
    const pageSize = 10;
    const [page, setPage] = useState(0);
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
    const paginatedData = data.slice(page * pageSize, (page + 1) * pageSize);
  
    return (
      <Grid container direction="column" alignItems="center" justifyContent="center">
        <Grid container item direction="row" alignItems="center" justifyContent="center">
          {columns.map((column) => (
            <Grid item xs={column.id === 'diceOutcome' ? 4 : 2} key={column.id} sx={{ backgroundColor: ' RGB(71,129,255)', color: 'white', padding: '3px', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', width: "100%", fontSize: '0.8rem' }}>
              {column.label}
            </Grid>
          ))}
        </Grid>
        <Divider />
        {paginatedData.map((row) => (
          <Grid container item direction="row" alignItems="center" justifyContent="center" key={row.id}>
         <Grid item xs={2}>
  {'**' + row.period.slice(-7, -2)}
</Grid>
            <Grid item xs={2}>
              {row.sum}
            </Grid>
            <Grid item xs={2}>
              {row.size}
            </Grid>
            <Grid item xs={2}>
              {row.parity}
            </Grid>
            <Grid item xs={4}>
              <Grid container direction="row" alignItems="center" justifyContent="center">
              {row.diceOutcome.map((outcome, index) => {
  const src = `games/assets/num${outcome}.png`;
  console.log(src);
  return <img key={index} src={src} alt={`Dice ${outcome}`} width="20" height="20" style={{ margin: '3px' }} />;
})}
              </Grid>
            </Grid>
          </Grid>
        ))}
        <Grid item xs={12}>
          <Pagination count={Math.ceil(data.length / pageSize)} page={page} onChange={handleChangePage} />
        </Grid>
      </Grid>
    );
  };
  const RowVisualization = ({ data }) => {
    const getOutcomeDescription = (outcome) => {
      const uniqueNumbers = [...new Set(outcome)];
      if (uniqueNumbers.length === 1) {
        return '3 same numbers';
      } else if (uniqueNumbers.length === 2) {
        return '2 same numbers';
      } else if (uniqueNumbers.length === 3) {
        const sortedOutcome = [...outcome].sort();
        if (sortedOutcome[2] - sortedOutcome[1] === 1 && sortedOutcome[1] - sortedOutcome[0] === 1) {
          return '3 consecutive numbers';
        } else {
          return '3 different numbers';
        }
      }
    };
    const [rowsToShow, setRowsToShow] = useState(15);
    const loadMore = () => {
      setRowsToShow(rowsToShow + 15);
    };
  
    return (
      <div>
     <div style={{ display: 'flex', flexDirection: 'row', margin: '20px 0', fontWeight: 'bold', backgroundColor: ' RGB(71,129,255)',color:"white",height:"25px",alignItems:"center" }}>
  <div style={{ width: '100px', fontSize: "13px" }}>Period</div>
  <div style={{ width: '200px', fontSize: "13px" }}>Dice Outcome</div>
  <div style={{ width: '200px', fontSize: "13px" }}>Description</div>
</div>
{data.slice(0, rowsToShow).map((row) => (

          <div key={row.id} style={{ display: 'flex', flexDirection: 'row', margin: '20px 0' }}>
           <div style={{ width: '100px', fontSize: "13px" }}>
  {row.period.slice(0, -2)}
</div>
            <div style={{ width: '200px', fontSize: "13px" }}>
              {row.diceOutcome.map((outcome, index) => {
                const src = `games/assets/num${outcome}.png`;
                return <img key={index} src={src} alt={`Dice ${outcome}`} width="20" height="20" style={{ marginRight: '5px' }} />;
              })}
            </div>
            <div style={{ width: '200px', fontSize: "13px" }}>{getOutcomeDescription(row.diceOutcome)}</div>
          </div>
        ))}
              <Button variant="contained" onClick={loadMore}>Load More</Button>

      </div>
    );
  };



const LotteryAppk = () => {

  const [activeId, setActiveId] = useState(images[0].id);
  const [selectedTimer, setSelectedTimer] = useState('1Min');
  const [selectedTab, setSelectedTab] = useState(0);
  const [timer, setTimer] = useState(60); // 60 seconds = 1 minute
  const [rows, setRows] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [winner, setWinner] = useState(null);

  const [periodId, setPeriodId] = useState(null);
  const [remainingTime, setRemainingTime] = useState(null);

  useEffect(() => {
    const socket = io('https://bannerfr5.online'); // Connect to WebSocket server

    socket.on('connect', () => {
      console.log('Connected to WebSocket server');
    });

    socket.on('timers', (data) => {
      setTimer(data);
      if (data && data[selectedTimer]) {
        setTimer(data[selectedTimer].remainingTime);
        setPeriodId(data[selectedTimer].periodId); // Set the periodId
        setRemainingTime(data[selectedTimer].remainingTime); // Set the remainingTime
      } else {
        console.error('Unexpected data structure', data);
      }
    });

    return () => socket.disconnect(); // Cleanup WebSocket connection
  }, [selectedTimer]);
  const handleClick = (id) => {
    let timerKey;
    switch (id) {
      case 1:
        timerKey = '1min';
        break;
      case 2:
        timerKey = '3min';
        break;
      case 3:
        timerKey = '5min';
        break;
      case 4:
        timerKey = '10min';
        break;
      default:
        timerKey = '1min';
    }

    setSelectedTimer(timerKey);
    setActiveId(id);
  };


  const textArray = [
    "ATTENTION TC ! Live chats are available on our apps/website",
    "Second message",
    "Third message"
  ];
  
  const [index, setIndex] = React.useState(0);
  const [inProp, setInProp] = React.useState(false);
  
  React.useEffect(() => {
    const timer = setInterval(() => {
      setInProp(false);
  
      setTimeout(() => {
        setIndex((oldIndex) => {
          return (oldIndex + 1) % textArray.length;
        });
        setInProp(true);
      }, 500); // This should be equal to the exit duration below
  
    }, 3000); // Duration between changing texts
  
    return () => clearInterval(timer);
  }, []);
  


  //   table 
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState('');
  const [betAmount, setBetAmount] = useState(0);
  const [multiplier, setMultiplier] = useState(1);
  const [totalBet, setTotalBet] = useState(0);
  const [betPlaced, setBetPlaced] = useState(false);
  const [betPeriodId, setBetPeriodId] = useState(null);


  const [open, setOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState('');
  const [gameResult, setGameResult] = useState('');
  
  
  // ...



  const handleOpenDrawer = (item) => {
    setSelectedItem(item);
    setDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
  };

  const handleBetAmount = (amount) => {
    setBetAmount(amount);
  };

  const handleMultiplier = (multiplier) => {
    setMultiplier(multiplier);
  };

  const handleTotalBet = () => {
    setTotalBet(betAmount * multiplier);
  };

  const uid = auth.currentUser.uid;

  const [userData, setUserData] = useState(null);
  useEffect(() => {
    const userRef = doc(db, 'users', uid);
    const unsubscribe = onSnapshot(userRef, (doc) => {
      setUserData(doc.data());
    });

    return () => unsubscribe();
  }, [uid]);
  const handlePlaceBet = async () => {
    const totalBet = betAmount * multiplier;

    // Check if user's wallet balance is less than the total bet amount
    if (userData.wallet < totalBet) {
      alert("You don't have enough balance to place this bet.");
      return;
    }

    const betData = {
      selectedItem: selectedItem,
      betAmount: betAmount,
      multiplier: multiplier,
      totalBet: totalBet,
      selectedTimer: selectedTimer,
      periodId: periodId,
      userUid: uid,
      selectedTab: selectedTab,
      timestamp: serverTimestamp(),
    };
    setBetPlaced(true);
    setBetPeriodId(periodId);
    const userRef = doc(db, 'users', uid);
    await updateDoc(userRef, {
      wallet: (userData.wallet - totalBet) // decrement the wallet value
    });

    // Add the bet data to the betHistory subcollection
    const timerRef = doc(db, 'timerk3', selectedTimer);
    const periodRef = collection(timerRef, 'periods');
    const periodDocRef = doc(periodRef, periodId);
    const betsRef = collection(periodDocRef, 'bets');
    await addDoc(betsRef, betData)

    // Add the bet data to the betHistory subcollection of the user's document
    const betHistoryRef = collection(userRef, 'betHistoryk');
    await addDoc(betHistoryRef, betData);

    const transactionsRef = collection(userRef, 'transactions');
    await addDoc(transactionsRef, {
      amount: totalBet,
      type: 'bet',
      timestamp: serverTimestamp() // Import this from Firebase
    });

    // Calculate and distribute commission
    if (userData.referral) {
      let currentUser = userData;
      let level = 1;
      while (currentUser.referral && level <= 5) {
        const referrerRef = doc(db, 'users', currentUser.referral);
        const referrerSnap = await getDoc(referrerRef);
        const referrer = referrerSnap.data();

        // Calculate commission
        const commission = totalBet * 0.02; // 2% commission

        // Update referrer's wallet and commission for the current level
        await updateDoc(referrerRef, {
          wallet: Number(referrer.wallet || 0) + commission,
          [`commissionLevel${level}`]: Number(referrer[`commissionLevel${level}`] || 0) + commission
        });

        // Update totalBetAmount and totalCommissionReceived for the referrer
        const referralIndex = referrer.referrals.findIndex(referral => referral.userId === currentUser.UID);
        if (referralIndex !== -1) {
          const dailyDepositIndex = referrer.referrals[referralIndex].dailyDeposit.length - 1;
          referrer.referrals[referralIndex].dailyDeposit[dailyDepositIndex].totalBetAmount = Number(referrer.referrals[referralIndex].dailyDeposit[dailyDepositIndex].totalBetAmount || 0) + betAmount;
          referrer.referrals[referralIndex].dailyDeposit[dailyDepositIndex].totalCommissionReceived = Number(referrer.referrals[referralIndex].dailyDeposit[dailyDepositIndex].totalCommissionReceived || 0) + commission;
        } else {
          referrer.referrals.push({
            userId: currentUser.UID,
            dailyDeposit: [{
              totalBetAmount: betAmount,
              totalCommissionReceived: commission,
            }],
          });
        }
        await updateDoc(referrerRef, {
          referrals: referrer.referrals
        });

        // Create a transaction document for the commission
        const referrerTransactionsRef = collection(referrerRef, 'transactions');
        await addDoc(referrerTransactionsRef, {
          amount: commission,
          type: 'commission',
          commissionType: `level${level}`,
          timestamp: serverTimestamp() // Import this from Firebase
        });

        // Move to next level
        currentUser = referrer;
        level++;
      }
    }

    handleCloseDrawer();
  };

  const handleCancelBet = () => {
    setSelectedItem('');
    setBetAmount(0);
    setMultiplier(1);
    setTotalBet(0);
    handleCloseDrawer();
  };

  useEffect(() => {
    handleClick(images[0].id);
  }, []);
  // Inside your Head component...


  useEffect(() => {
    const socket = io('https://bannerfr5.online'); // Connect to WebSocket server

    socket.on('connect', () => {
        console.log('Connected to WebSocket server');
        socket.emit('selectK3Timer', selectedTimer); // Send selected timer to server
      });
    
      socket.on('resultsK3', (data) => {
        setRows(data.map(item => ({
          id: item.periodId,
          period: ` ${item.periodId}`,
          sum: ` ${item.totalSum}`,
          size: item.size,
          parity: item.parity,
          diceOutcome: item.diceOutcome,
        })));
        rollDice(data[0].diceOutcome);
      });
 // Roll the dice with the dice outcomes from the results


    //   // Find the result for the bet period
    //   const result = data.find(item => String(item.periodId) === String(betPeriodId));

    //   if (betPlaced && result) {
    //     // Check if the user's prediction matches the results
    //     if (selectedItem === result.numberOutcome || selectedItem === result.sizeOutcome || result.colorOutcome.map(color => color.toLowerCase()).includes(selectedItem.toLowerCase())) {
        
    //       console.log('You won!');
    //       // Calculate the winnings
    //       let winnings = 0;
    //       switch (selectedItem.toLowerCase()) {
    //         case String(result.numberOutcome):
    //           winnings = betAmount * 9;
    //           break;
    //         case 'red':
    //         case 'green':
    //         case String(result.sizeOutcome):
    //           winnings = betAmount * 2;
    //           break;
    //         case 'violet':
    //           winnings = betAmount;
    //           break;
    //         default:
    //           console.log('Invalid bet');
    //       }
    //       setDialogContent(`You won! Your bet of ${betAmount} has resulted in winnings of ${winnings}. Your new wallet balance is ${userData.wallet + winnings}.`);
    //       setGameResult('won');
    //       setOpen(true);
    //       // Update the user's wallet balance in the Firestore database
    //       const userRef = doc(db, 'users', uid);
    //       updateDoc(userRef, {
    //         wallet: userData.wallet + winnings
    //       });

    //       // Add a transaction for the winnings
    //       const transactionRef = collection(db, 'users', uid, 'transactions');
    //       addDoc(transactionRef, {
    //         amount: winnings,
    //         type: 'wingo',
    //         timestamp: serverTimestamp()
    //       });
    //     } else {
    //       console.log('You lost!');
    //       setDialogContent(`You lost! Your bet of ${betAmount} has been deducted from your wallet. Your new wallet balance is ${userData.wallet - betAmount}.`);
    //       setGameResult('lost');
    //       setOpen(true);
    //     }

    //     setBetPlaced(false); // Reset the betPlaced flag
    //     setBetPeriodId(null); // Reset the betPeriodId
    //   }
    // });

    return () => socket.disconnect(); // Cleanup WebSocket connection

    return () => socket.disconnect(); // Cleanup WebSocket connection
  }, [selectedTimer]);

  useEffect(() => {
    if (remainingTime === "00:03") {
      setOpenDialog(true);
      countdownSound.play();
    } else if (remainingTime === "00:00") {
      setOpenDialog(false);
      countdownSound.pause();
      countdownSound.currentTime = 0;
    }
  }, [remainingTime]);

  const [selectedColor, setSelectedColor] = useState(' RGB(71,129,255)');
  const handleEventSelection = (event) => {
    // ... your existing code ...

    switch (event) {
      case 'violet':
        setSelectedColor('RGB(182,89,254)');
        break;
      case 'green':
        setSelectedColor('RGB(64,173,114)');
        break;
      case 'red':
        setSelectedColor('RGB(253,86,92)');
        break;
      case 'yellow':
        setSelectedColor(' RGB(71,129,255)');
        break;
      case 'blue':
        setSelectedColor('RGB(253,86,92)');
        break;
      default:
        setSelectedColor(' RGB(71,129,255)');
    }
  };
  const [activeButton, setActiveButton] = useState(1);
  const [activeBetAmount, setActiveBetAmount] = useState(1);


  async function getUserBets(uid) {
    const userRef = doc(db, 'users', uid);
    const betHistoryRef = collection(userRef, 'betHistoryk');
    const betHistorySnapshot = await getDocs(betHistoryRef);
    const bets = betHistorySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return bets;
  }

  const [bets, setBets] = useState([]);

  useEffect(() => {
    const fetchBets = async () => {
      const userBets = await getUserBets(auth.currentUser.uid);
      setBets(userBets);
    };

    fetchBets();
  }, []);



  const [values, setValues] = useState(0);
  const handleChanges = (event, newValue) => {
    setValues(newValue);
  };
  const navigate = useNavigate();

  const navigateToPage = () => {
    navigate('/'); // Replace '/path-to-page' with the actual path
  };
  
  const navigateToPage1 = () => {
    navigate('/recharge'); // Replace '/path-to-page' with the actual path
  };
  
  
  const navigateToPage2 = () => {
    navigate('/withdraw'); // Replace '/path-to-page' with the actual path
  };
  

  const renderTab1Content = () => {
  
    const redImage = 'games/assets/redBall-fd34b99e.png';
const greenImage = 'games/assets/greenBall-b7685130.png';
    const images = [
      { src: greenImage, label: '3', factor: '207.36X', color: 'green' },
      { src: redImage, label: '4', factor: '69.12X', color: 'red' },
      { src: greenImage, label: '5', factor: '34.56X', color: 'green' },
      { src: redImage, label: '6', factor: '23.04X', color: 'red' },
      { src: greenImage, label: '7', factor: '17.28X', color: 'green' },
      { src: redImage, label: '8', factor: '13.824X', color: 'red' },
      { src: greenImage, label: '9', factor: '11.52X', color: 'green' },
      { src: redImage, label: '10', factor: '9.6X', color: 'red' },
      { src: greenImage, label: '11', factor: '8.192X', color: 'green' },
      { src: redImage, label: '12', factor: '6.912X', color: 'red' },
      { src: greenImage, label: '13', factor: '5.76X', color: 'green' },
      { src: redImage, label: '14', factor: '4.608X', color: 'red' },
      { src: greenImage, label: '15', factor: '3.84X', color: 'green' },
      { src: redImage, label: '16', factor: '3.072X', color: 'red' },
      { src: greenImage, label: '17', factor: '2.304X', color: 'green' },
      { src: redImage, label: '18', factor: '1.92X', color: 'red' },
      // ...
    ];
    
    return (
        <Grid container spacing={4} sx={{ justifyContent: 'center', alignItems: 'center' }}>
        {images.map((image, index) => (
          <Grid item key={index}>
            <Box
              position="relative"
              sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 50 }}
              onClick={() => { handleOpenDrawer(image.label); handleEventSelection("green"); setSelectedTab("total"); }}
            >
              <Box
                component="img"
                src={image.color === 'green' ? greenImage : redImage}
                alt={`Image ${index + 1}`}
                width={50}
                height={50}
              />
              <Box
                sx={{
                  position: 'absolute',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  color: image.color,
                  fontSize: '1.2rem',
                  fontWeight: 'bold',
                }}
              >
                {image.label}
              </Box>
            </Box>
            <Typography variant="body2" align="center">
              {image.factor}
            </Typography>
          </Grid>
        ))}
     
     <Grid 
  container 
  style={{ justifyContent: 'center'}} 
>
    <Grid item
        onClick={() => { handleOpenDrawer('Big'); handleEventSelection("green");setSelectedTab("total"); }}
        style={{
            width: 70,
            height: 50,
            backgroundColor: " RGB(71,129,255)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            color: "white",
            marginRight: 8,
            marginLeft: 35,
            borderRadius: "5px"
        }}
    >
        <Typography variant="body1">
          Big
        </Typography>
        <Typography variant="body2" style={{marginTop: 4}}>
          1.92X
        </Typography>
    </Grid>

    <Grid item
        onClick={() => { handleOpenDrawer('Small'); handleEventSelection("green");setSelectedTab("total"); }}
        style={{
            width: 70,
            height: 50,
            backgroundColor: "RGB(113,168,241)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            color: "white",
            marginRight: 8,
            borderRadius: "5px"
        }}
    >
        <Typography variant="body1">
          Small
        </Typography>
        <Typography variant="body2" style={{marginTop: 4}}>
          1.92X
        </Typography>
    </Grid>

    <Grid item
        onClick={() => { handleOpenDrawer('Odd'); handleEventSelection("green");setSelectedTab("total"); }}
        style={{
            width: 70,
            height: 50,
            backgroundColor: "RGB(246,89,76)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            color: "white",
            marginRight: 8,
            borderRadius: "5px"
        }}
    >
        <Typography variant="body1">
          Odd
        </Typography>
        <Typography variant="body2" style={{marginTop: 4}}>
          1.92X
        </Typography>
    </Grid>

    <Grid item
        onClick={() => { handleOpenDrawer('Even'); handleEventSelection("green");setSelectedTab("total"); }}
        style={{
            width: 70,
            height: 50,
            backgroundColor: "RGB(71,172,118)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            color: "white",
            borderRadius: "5px"
        }}
    >
        <Typography variant="body1">
          Even
        </Typography>
        <Typography variant="body2" style={{marginTop: 4}}>
          1.92X
        </Typography>
    </Grid>
</Grid>

    </Grid>
    );
  };

  const renderTab2Content = () => {
    const data = [
      { label: '2 matching numbers: odds(13.83)', values: [11, 22, 33, 44, 55, 66] },
      { label: 'A pair of unique numbers: odds(69.12)', values: [11, 22, 33, 44, 55, 66] },
      { label: '', values: [1, 2, 3, 4, 5, 6] },
    ];
    return (
      <>
        {data.map((item, index) => (
          <div key={index} sx={{ marginTop:"5px"}}>
            <Typography variant="body1" color="text.secondary" align="left">
              {item.label}
            </Typography>
            <Grid container spacing={1} justifyContent="center">
              {item.values.map((value, valueIndex) => (
                <Grid item key={valueIndex}>
                  <Paper
                    elevation={3}
                    sx={{
                      bgcolor: index === 0 ? 'RGB(218,174,252)' : index === 1 ? 'RGB(248,149,148)' : 'RGB(163,213,186)',
                      p: 1,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      minWidth: 30,
                      minHeight: 30,
                      color:"white",
                      marginTop:"5px"
                    }}
                    onClick={() => { handleOpenDrawer(value); handleEventSelection("green"); setSelectedTab("2 same"); }}
                  >
                    <Typography variant="body1">{value}</Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </div>
        ))}
      </>
    );
  };

  const renderTab3Content = () => {
    const data = [
      { label: '3 of the same number: odds(207.36)', values: [111, 222, 333, 444, 555, 666] },
      { label: 'Any 3 of the same number: odds(34.56)', value: 'Any 3 of the same number: odds' },
    ];
    return (
      <>
        {data.map((item, index) => (
          <div key={index} sx={{ mt: 2 }}>
            <Typography variant="body1" color="text.secondary" align="left">
              {item.label}
            </Typography>
            {Array.isArray(item.values) ? (
              <Grid container spacing={1} justifyContent="center">
                {item.values.map((value, valueIndex) => (
                  <Grid item key={valueIndex}>
                    <Paper
                      elevation={3}
                      sx={{
                        bgcolor: 'RGB(218,174,252)',
                        p: 1,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        minWidth: 30,
                        minHeight: 30,
                        color:"white",
                        marginTop:"5px"
                      }}
                      onClick={() => { handleOpenDrawer(value); handleEventSelection("green");setSelectedTab("3 same"); }}
                    >
                      <Typography variant="body1">{value}</Typography>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Paper
                elevation={3}
                sx={{
                  bgcolor: 'RGB(248,149,148)',
                  p: 1,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  color:"white",
                  marginTop:"5px"
                }}
                onClick={() => { handleOpenDrawer(item.value); handleEventSelection("green"); setSelectedTab("3 same");}}
              >
                <Typography variant="body1">{item.value}</Typography>
              </Paper>
            )}
          </div>
        ))}
      </>
    );
  };

  
  const renderTab4Content = () => {
    const values = [1, 2, 3, 4, 5, 6];
    return (
      <>
        <Typography variant="body1" align="left" gutterBottom>
          3 different numbers: odds(34.56) 
        </Typography>
        <Grid container spacing={1}>
  {values.map((value, index) => (
    <Grid item key={index}>
      <Box
        sx={{
          bgcolor: '#e0b0ff',
          borderRadius: '4px',
          p: 1,
          minWidth: '35px',
          textAlign: 'center',
          position: 'relative',
        }}
        onClick={() => handleNumberClick(value)}
      >
        {value}
        {selectedNumbers1.includes(value) && (
          <CheckIcon
            sx={{
              position: 'absolute',
              top: 0,
              right: 0,
              color: 'green',
            }}
          />
        )}
      </Box>
    </Grid>
  ))}
</Grid>
  
        <Box my={2}>
          <Typography variant="body1" align="left"  gutterBottom>
            3 continuous numbers: odds(8.64) 
          </Typography>
          <Box
            sx={{
              bgcolor: 'RGB(248,149,148)',
              borderRadius: '4px',
              p: 1,
              textAlign: 'center',
            }}
            onClick={() => { handleOpenDrawer('3 continuous numbers'); handleEventSelection("green");setSelectedTab("different"); }}
          >
            3 continuous numbers
          </Box>
        </Box>
  
        <Typography variant="body1" align="left" gutterBottom>
          2 different numbers: odds(6.91) 
        </Typography>
        <Grid container spacing={1}>
  {values.map((value, index) => (
    <Grid item key={index}>
      <Box
        sx={{
          bgcolor: '#e0b0ff',
          borderRadius: '4px',
          p: 1,
          minWidth: '35px',
          textAlign: 'center',
          position: 'relative',
        }}
        onClick={() => handleNumberClick2(value)}
      >
        {value}
        {selectedNumbers2.includes(value) && (
          <CheckIcon
            sx={{
              position: 'absolute',
              top: 2,
              right: 2,
              color: 'green',
            }}
          />
        )}
      </Box>
    </Grid>
  ))}
</Grid>
      </>
    );
  };
  const diceOne = 'games/assets/num1.png';
  const diceTwo = 'games/assets/num2.png';
  const diceThree = 'games/assets/num3.png';
  const diceFour = 'games/assets/num4.png';
  const diceFive = 'games/assets/num5.png';
  const diceSix = 'games/assets/num6.png';
  const [rolling, setRolling] = useState(false); // Rolling state
  const [diceFaces, setDiceFaces] = useState([1, 1, 1]); // Initial dice faces

  // Array of dice face images
  const diceImages = [

      diceOne,
      diceTwo,
      diceThree,
      diceFour,
      diceFive,
      diceSix
  ];

  const rollInterval = useRef(null);

const rollDice = (diceOutcome) => {
  setRolling(true);

  // Clear any existing interval
  if (rollInterval.current) {
    clearInterval(rollInterval.current);
  }

  // Roll the dice with random numbers for 3 seconds
  rollInterval.current = setInterval(() => {
    setDiceFaces([Math.ceil(Math.random() * 6), Math.ceil(Math.random() * 6), Math.ceil(Math.random() * 6)]);
  }, 100);

  // After 3 seconds, set the dice faces to the dice outcomes from the results and stop rolling
  setTimeout(() => {
    clearInterval(rollInterval.current);
    if (diceOutcome) {
      setDiceFaces(diceOutcome);
    }
    setRolling(false);
  }, 1000);
};
  const [selectedNumbers1, setSelectedNumbers1] = useState([]);
  const [selectedNumbers2, setSelectedNumbers2] = useState([]);
  
  const handleNumberClick = (value) => {
    if (selectedNumbers1.length < 3) {
      setSelectedNumbers1([...selectedNumbers1, value]);
    } else {
      handleOpenDrawer(selectedNumbers1.join(''));
      handleEventSelection("green");
      setSelectedTab("different");
      setSelectedNumbers1([]);
    }
  };
  
  const handleNumberClick2 = (value) => {
    if (selectedNumbers2.length < 2) {
      setSelectedNumbers2([...selectedNumbers2, value]);
    } else {
      handleOpenDrawer(selectedNumbers2.join(''));
      handleEventSelection("green");
      setSelectedTab("different");
      setSelectedNumbers2([]);
    }
  };
  return (
    <div>
      <Mobile>

        <Grid
          container
          alignItems="center"
          justifyContent="space-between"
          sx={{
            position: 'sticky',
            top: 0,
            zIndex: 1000,
            backgroundColor: ' RGB(71,129,255)',
            padding: '8px 16px',
            color: 'white'
          }}
        >
          <Grid item xs={6} textAlign="left">
            <IconButton color="inherit"  onClick={navigateToPage}>
              <ArrowBackIcon />
            </IconButton>
          </Grid>
          <Grid item xs={6} textAlign="right">
            <IconButton color="inherit">
              <SupportAgentIcon />
            </IconButton>
            <IconButton color="inherit">
              <MusicNoteIcon />
            </IconButton>
          </Grid>
        </Grid>


        <Grid container direction="column" sx={{ height: '300px', backgroundColor: ' RGB(71,129,255)', borderRadius: '0 0 70px 70px', textAlign: 'center', }}>
          <Grid sx={{ backgroundColor: '#FFFFFF', margin: '0 20px 20px 20px', borderRadius: '30px', padding: '10px', marginTop: "10px" }}>
            <Grid sm={12} item sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>{userData ? `\u20B9${userData.wallet}` : 'Loading...'}</Typography>
              <IconButton >
                <Refresh />
              </IconButton>
            </Grid>

            <Grid sm={12} item sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
              <AccountBalanceWallet sx={{ marginRight: '10px', color: " RGB(71,129,255)" }} />
              <Typography variant="subtitle2">Wallet Balance</Typography>
            </Grid>
            <Grid sm={12} mt={3} item sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', }}>

              <Button variant="outlined"  onClick={navigateToPage2} fullWidth sx={{ marginLeft: '10px', color: "RGB(71,129,255)", borderColor: "RGB(71,129,255)", borderRadius: "50px" }}>
                Withdraw
              </Button>
              <Button variant="contained"  onClick={navigateToPage1} fullWidth sx={{ marginLeft: '10px', backgroundColor: "RGB(71,129,255)", borderRadius: "50px" }}>
                Deposit
              </Button>
            </Grid>
          </Grid>

          <Grid item sx={{ backgroundColor: '#FFFBE8', margin: '0 20px 20px 20px', borderRadius: '3px', padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <IconButton>
              <VolumeUp sx={{ color: "RGB(71,129,255)" }} />
            </IconButton>
            <CSSTransition in={inProp} timeout={500} classNames="message" unmountOnExit>
  <Typography variant="caption" sx={{ color: "RGB(71,129,255)", }}>
    {textArray[index]}
  </Typography>
</CSSTransition>

            <Button variant="contained" size='small' sx={{ backgroundColor: "RGB(71,129,255)", borderRadius: "50px", fontSize: "9px", paddingLeft: "12px", paddingRight: "12px" }} startIcon={<WhatshotIcon />}>Details</Button>
          </Grid>
        </Grid>

        <Grid container spacing={1} sx={{
          marginLeft: 'auto',
          marginRight: 'auto',
          maxWidth: '95%',
          boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
          marginTop: '-50px',
          backgroundColor: 'RGB(255,255,255)',
          borderRadius: '30px'
        }}>
          {images.map((image) => (
            <Grid
              item
              xs={3}
              key={image.id}
              onClick={() => handleClick(image.id)}
              style={{
                cursor: 'pointer',
                border: activeId === image.id ? '1px solid RGB(71,129,255)' : 'none',
                backgroundColor: activeId === image.id ? 'RGB(156,215,249)' : 'transparent',
                borderRadius: '10px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center', // Align items horizontally
                justifyContent: 'center', // Align items vertically
              }}
            >
              <img src={activeId === image.id ? image.altSrc : image.src} alt={image.subtitle} style={{ width: '80%' }} />
              <Typography variant="caption">{image.subtitle}</Typography>
            </Grid>
          ))}
        </Grid>

        <Box mt={2} sx={{
     marginLeft: 'auto',
     marginRight: 'auto',
     maxWidth: '90%',
          boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
          p: 2 ,
          backgroundColor: 'RGB(255,255,255)',
          borderRadius: '30px'
        }}>
       <Grid container spacing={0} alignItems="center">
  <Grid item xs={2}>
    <Typography variant="body1">Period</Typography>
  </Grid>
  <Grid item xs={6}>
    <Button
      variant="outlined"
      sx={{
        border: '1px solid RGB(71,129,255)',
        borderRadius: '10px',
        padding: '4px 8px',
        display: 'inline-block',
        color: 'RGB(71,129,255)',
      }}
    >
      How to play
    </Button>
  </Grid>
  <Grid item xs={4}>
    <Typography variant="body1" align="right">Time remaining</Typography>
  </Grid>
</Grid>
<Grid container spacing={1} alignItems="center">
  <Grid item xs={8}>
  <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'RGB(44,62,80)', textAlign: 'left' }}>
  {periodId ? periodId.slice(0, -2) : ''}
</Typography>
  </Grid>
  <Grid item xs={4} >

    <Typography>
      {remainingTime}
    </Typography>

</Grid>
</Grid>
    
        <>
        <div className="fullbox">
        <div id="leftbox"></div>
        <div className='outerbox'>
            
            <div className="diebox">
                <div className="dice-container">
                    {diceFaces.map((face, index) => (
                        <div key={index} className="dice-wrapper">
                            <img src={diceImages[face - 1]} alt={`Dice ${index + 1}`} className={`dice-image ${rolling ? 'rolling' : ''}`} />
                        </div>
                    ))}
                </div>
            </div>
            
        </div>
        <div id="rightbox"></div>
        </div>
       
    
    </>
    <Box mt={2}>
  <Tabs value={values} onChange={handleChanges} TabIndicatorProps={{ style: { display:'none' } }} variant="fullWidth">
    <Tab label="Total" style={{ backgroundColor: values === 0 ? 'RGB(71,129,255)' : 'RGB(246,246,246)', color: values === 0 ? 'white' : 'black', borderBottom: values === 0 ? 'none' : '', borderRadius: values === 0 ? '10px' : '', minWidth: 'auto' }} />
    <Tab label="2 same" style={{ backgroundColor: values === 1 ? 'RGB(71,129,255)' : 'RGB(246,246,246)', color: values === 1 ? 'white' : 'black', borderBottom: values === 1 ? 'none' : '', borderRadius: values === 1 ? '10px' : '', minWidth: 'auto' }} />
    <Tab label="3 same" style={{ backgroundColor: values === 2 ? 'RGB(71,129,255)' : 'RGB(246,246,246)', color: values === 2 ? 'white' : 'black', borderBottom: values === 2 ? 'none' : '', borderRadius: values === 2 ? '10px' : '', minWidth: 'auto' }} />
    <Tab label="Different" style={{ backgroundColor: values === 3 ? 'RGB(71,129,255)' : 'RGB(246,246,246)', color: values === 3 ? 'white' : 'black', borderBottom: values === 3 ? 'none' : '', borderRadius: values === 3 ? '10px' : '', minWidth: 'auto' }} />
  </Tabs>
</Box>
<Box sx={{ mt: 2 }}>
  {values === 0 && renderTab1Content()}
  {values === 1 && renderTab2Content()}
  {values === 2 && renderTab3Content()}
  {values === 3 && renderTab4Content()}
</Box>
</Box>



        



        <Drawer anchor="bottom" open={drawerOpen} onClose={handleCloseDrawer}  >
          <Grid container alignItems="center">
            <Grid item xs={12} align="center" style={{
              position: 'relative',
              marginBottom: "20px",
              height: "100px",
              color: "white",
              backgroundColor: 'transparent'
            }}>
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: selectedColor,
                clipPath: 'polygon(0 0, 100% 0, 100% 75%, 50% 100%, 0 75%)'
              }}></div>
              <div style={{ position: 'relative' }}>
                <Typography variant="h6">{`K3 ${selectedTimer}`}</Typography>
                <Typography variant="body1">{`${selectedItem} is selected`}</Typography>
              </div>
            </Grid>

            <Grid item xs={12}>

              <Grid container justifyContent="space-between">
                <Typography variant="h6">Balance</Typography>
                <Button variant="contained" style={{ borderRadius: 50, backgroundColor: activeBetAmount === 1 ? selectedColor : undefined }} onClick={() => { handleBetAmount(1); setActiveBetAmount(1); }}>{"\u20B9" + "1"}</Button>
                <Button variant="contained" style={{ borderRadius: 50, backgroundColor: activeBetAmount === 10 ? selectedColor : undefined }} onClick={() => { handleBetAmount(10); setActiveBetAmount(10); }}>{"\u20B9" + "10"}</Button>
                <Button variant="contained" style={{ borderRadius: 50, backgroundColor: activeBetAmount === 100 ? selectedColor : undefined }} onClick={() => { handleBetAmount(100); setActiveBetAmount(100); }}>{"\u20B9" + "100"}</Button>
                <Button variant="contained" style={{ borderRadius: 50, backgroundColor: activeBetAmount === 1000 ? selectedColor : undefined }} onClick={() => { handleBetAmount(1000); setActiveBetAmount(1000); }}>{"\u20B9" + "1000"}</Button>
              </Grid>

            </Grid>
            <Grid item xs={12} mt={2}>

              <Grid container  >

                <Grid item container direction="row" justifyContent="space-between" align="center" alignItems="center">
                  <Typography variant="h6">Quantity</Typography>
                  <div className="button1" onClick={() => setMultiplier(multiplier > 1 ? multiplier - 1 : 1)}>-</div>

                  <Typography variant="body1" style={{ border: "1px solid black", width: "50px" }}>{multiplier}</Typography>
                  <div className="button1" onClick={() => setMultiplier(multiplier + 1)}>+</div>

                </Grid>
              </Grid>


            </Grid>
            <Grid item xs={12} mt={2}>
              <Grid container justifyContent="flex-end">
                <div className={`button ${activeButton === 1 ? 'active' : ''}`} onClick={() => { handleMultiplier(1); setActiveButton(1); }} style={activeButton === 1 ? { backgroundColor: selectedColor } : {}}>X1</div>
                <div className={`button ${activeButton === 5 ? 'active' : ''}`} onClick={() => { handleMultiplier(5); setActiveButton(5); }} style={activeButton === 5 ? { backgroundColor: selectedColor } : {}}>X5</div>
                <div className={`button ${activeButton === 10 ? 'active' : ''}`} onClick={() => { handleMultiplier(10); setActiveButton(10); }} style={activeButton === 10 ? { backgroundColor: selectedColor } : {}}>X10</div>
                <div className={`button ${activeButton === 20 ? 'active' : ''}`} onClick={() => { handleMultiplier(20); setActiveButton(20); }} style={activeButton === 20 ? { backgroundColor: selectedColor } : {}}>X20</div>
                <div className={`button ${activeButton === 50 ? 'active' : ''}`} onClick={() => { handleMultiplier(50); setActiveButton(50); }} style={activeButton === 50 ? { backgroundColor: selectedColor } : {}}>X50</div>
                <div className={`button ${activeButton === 100 ? 'active' : ''}`} onClick={() => { handleMultiplier(100); setActiveButton(100); }} style={activeButton === 100 ? { backgroundColor: selectedColor } : {}}>X100</div>
              </Grid>
            </Grid>


            <Grid item xs={12} mt={2}>
              <Grid container justifyContent="space-around" spacing={0}>
                <Grid item xs={3}>
                  <Button onClick={handleCancelBet} fullWidth style={{ backgroundColor: "black" }} variant="contained">Cancel</Button>

                </Grid>
                <Grid item xs={9}>
                  <Button onClick={handlePlaceBet} fullWidth style={{ background: selectedColor }} variant="contained">{`Total Bet: ${betAmount * multiplier}`}</Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Drawer>

        <Dialog
          open={openDialog}

          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          PaperProps={{
            style: {
              width: '400px', // Set this to the desired size of your square
              height: '400px', // Set this to the same value as width
              backgroundColor: 'rgba(0, 0, 0, 0.5)', // This sets the opacity of the dialog box background
              overflow: 'hidden', // This removes the scrollbars
            },
          }}
        >
          <DialogTitle id="alert-dialog-title">{"Countdown"}</DialogTitle>
          <DialogContent>
            <DialogContentText
              id="alert-dialog-description"
              style={{

                textAlign: 'center',
                fontSize: '150px', // Adjust this value to increase or decrease the font size
                fontWeight: 'bold',
                color: "RGB(71,129,255)" // This makes the text bold
              }}
            >
              {remainingTime}
            </DialogContentText>
          </DialogContent>
        </Dialog>

        <Grid mt={2} sx={{ marginBottom: "100px" }} >
          <Tabs value={value} onChange={handleChange} indicatorColor="transparent" style={{
            marginLeft: '20px'
          }}>
            <Tab label="Game History" style={value === 0 ? { backgroundColor: 'RGB(71,129,255)', color: 'white', borderRadius: "20px" } : {}} />
            <Tab label="Chart" style={value === 1 ? { backgroundColor: 'RGB(71,129,255)', color: 'white', borderRadius: "20px" } : {}} />
            <Tab label="My History" style={value === 2 ? { backgroundColor: 'RGB(71,129,255)', color: 'white', borderRadius: "20px" } : {}} />
          </Tabs>
          <TabPanel value={value} index={0}>
            <CustomTable data={rows} />
          </TabPanel>
          <TabPanel value={value} index={1}>

            <RowVisualization data={rows} />
          </TabPanel>
          <TabPanel value={value} index={2}>


            <Grid container spacing={2} sx={{ padding: '16px' }}>
              {bets.slice().reverse().map((bet, index) => ( // Slice and reverse the array
                <Grid item xs={12} key={bet.id}>
                  <Card sx={{ borderRadius: '15px', padding: '10px', backgroundColor: 'RGB(255,255,255)' }}>
                    <CardHeader
                      title={`Bet #${bets.length - index}`}
                      titleTypographyProps={{ align: 'left', variant: 'body2' }}
                      style={{ backgroundColor: 'RGB(71,129,255)', color: 'white', height: '10px', lineHeight: '40px' }}
                    />
                    <CardContent>
                      <Grid container spacing={2}>
                        <Grid item xs={3} style={{ backgroundColor: 'RGB(241,243,255)', marginTop: '10px', padding: "10px" }}>
                          <Typography variant="caption">Period ID:</Typography>
                        </Grid>
                        <Grid item xs={9} style={{ textAlign: 'right', backgroundColor: 'RGB(241,243,255)', marginTop: '10px', padding: "10px" }}>
                          <Typography variant="caption">{bet.periodId}</Typography>
                        </Grid>
                        <Grid item xs={3} style={{ backgroundColor: 'RGB(241,243,255)', marginTop: '10px', padding: "10px" }}>
                          <Typography variant="caption">Time:</Typography>
                        </Grid>
                        <Grid item xs={9} style={{ textAlign: 'right', backgroundColor: 'RGB(241,243,255)', marginTop: '10px', padding: "10px" }}>
                          <Typography variant="caption">{new Date(bet.timestamp.seconds * 1000).toLocaleString()}</Typography>
                        </Grid>
                        <Grid item xs={3} style={{ backgroundColor: 'RGB(241,243,255)', marginTop: '10px', padding: "10px" }}>
                          <Typography variant="caption">Total Bet:</Typography>
                        </Grid>
                        <Grid item xs={9} style={{ textAlign: 'right', backgroundColor: 'RGB(241,243,255)', marginTop: '10px', color: 'red', padding: "10px" }}>
                          <Typography variant="caption">₹{bet.totalBet}</Typography>
                        </Grid>
                        {/* Add more rows as needed */}
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </TabPanel>
        </Grid>
        <>
    {/* ...rest of the code... */}
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
    >
      <DialogTitle style={{ textAlign: 'center' }}>
        {gameResult === 'won' ? 'Congratulations' : 'Sorry'}
      </DialogTitle>
      <DialogContent>
        <Card>
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {dialogContent}
            </Typography>
          </CardContent>
        </Card>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen(false)}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  </>

      </Mobile>

    </div>
  )
}

export default LotteryAppk;