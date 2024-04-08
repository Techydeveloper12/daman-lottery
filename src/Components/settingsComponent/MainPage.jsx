import React, { useState, useEffect } from 'react';

import './MainPage.css'
import uidimg from '../../assets/uidimg.png'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import SettingBottomBox from './settingBottom';
import lockimg from '../../assets/lock.png'
import mailBox from '../../assets/mail.png'
import googleVerification from '../../assets/googleValidation.png'
import update from '../../assets/versionUpdate.png'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import modalimg from '../../assets/person.png'
import { doc, onSnapshot } from 'firebase/firestore';
import { db,auth } from '../../firebase/config'; // replace with your Firebase config file 
import { getAuth, sendPasswordResetEmail } from "firebase/auth";




function MainPage() {

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [openResetPassword, setOpenResetPassword] = useState(false);

    const [userData, setUserData] = useState(null);
    const uid = auth.currentUser.uid;
  
    useEffect(() => {
      const unsubscribe = onSnapshot(doc(db, 'users', uid), (doc) => {
        const data = doc.data();
        setUserData(data);
      });
  
      return () => unsubscribe();
    }, [uid]);


    const handleOpenResetPassword = () => {
        setOpenResetPassword(true);
      };
    
      const handleCloseResetPassword = () => {
        setOpenResetPassword(false);
      };
    const handleResetPassword = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const formJson = Object.fromEntries(formData.entries());
        const email = formJson.email;
    
        try {
          await sendPasswordResetEmail(auth, email);
          alert('Password reset email sent. Please check your email.');
          handleCloseResetPassword();
        } catch (error) {
          console.error(error);
          alert('An error occurred while trying to send the password reset email. Please try again.');
        }
      };
    
    return (
        <div className="settingpage-main-container">
            <div className="settingpage-top">
                <div className="settingpage-info">
                    <div className="avatar">
                        <div className="avatar-image">
                            <img src={uidimg} alt="" />
                        </div>
                        <div className="change-avatar">
                            <span>Change Avatar</span>
                            <KeyboardArrowRightIcon />
                        </div>
                    </div>
                    <div className="settingpage-name">
                        <h3>Nickname</h3>
                        <div className='name'>
                            <Button sx={{ color: 'rgb(99, 99, 99)' }} onClick={handleClickOpen}>
                            <span>{userData ? userData.username : 'Loading...'}</span>
                                <KeyboardArrowRightIcon />
                            </Button>
                        </div>
                        <Dialog
                            sx={{
                                width: '400px',
                                height: '500px',
                                margin: 'auto',
                                '& form': {
                                    height: '100%',
                                    width: '100%',
                                    backgroundColor: '#f0f0f0',
                                    borderRadius: '20px',
                                },
                                '& input': {
                                    width: '100%',
                                    padding: '10px',
                                    marginBottom: '10px',

                                    // Add more input styles as needed
                                },
                                '& button': {
                                    width: '100%',
                                    padding: '10px',
                                    backgroundColor: 'orange',
                                    color: '#fff',
                                    border: 'none',
                                    borderRadius: '4px',
                                    cursor: 'pointer',
                                    // Add more button styles as needed
                                },
                            }}
                            open={open}
                            onClose={handleClose}
                            PaperProps={{
                                component: 'form',
                                onSubmit: (event) => {
                                    event.preventDefault();
                                    const formData = new FormData(event.currentTarget);
                                    const formJson = Object.fromEntries(formData.entries());
                                    const email = formJson.email;
                                    console.log(email);
                                    handleClose();
                                },
                            }}
                        >
                            <DialogTitle sx={{
                                background: 'linear-gradient(90deg, #e57201 0%, #ff9901 100%)', color: 'white',
                                display: 'flex', justifyContent: 'center',
                            }}><b>Subscribe</b>
                            </DialogTitle>
                            <DialogContent>
                                <DialogContentText sx={{ margin: '50px 0',
                            fontSize:'1.5em',
                            display: 'flex',
                            alignItems:'center', 
                            gap: '20px' }}>
                                <div className="in-modal-img">
                                    <img src={modalimg} alt="" />
                                </div>
                                    Nickname
                                </DialogContentText>
                                <TextField
                                    autoFocus
                                    required
                                    margin="dense"
                                    id="name"
                                    name="email"
                                    label="Email Address"
                                    type="email"
                                    fullWidth
                                    sx={{color: 'yellow'}}
                                />
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose}>Cancel</Button>
                                <Button type="submit">Change</Button>
                            </DialogActions>
                        </Dialog>

                    </div>
                    <div className="settingpage-uid">
                        <h3>UID</h3>
                        <div className='uid'>
                        <span>{userData ? userData.UID : 'Loading...'}</span>
                            <ContentCopyIcon sx={{ color: 'orange' }} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="bottom-page">
            <div className="bottom-heading" style={{ textAlign: 'left' }}>
  <h3>Security Information</h3>
</div>
                <div className="bottom-box-container">
                <SettingBottomBox
          settingBottomImage={lockimg}
          bottomBoxName='Login Password'
          bottomGoto='Edit'
          onClick={handleOpenResetPassword}
        />

                    <SettingBottomBox
                        settingBottomImage={mailBox}
                        bottomBoxName='Bind Mailbox'
                        bottomGoto='Edit' />

                    <SettingBottomBox
                        settingBottomImage={googleVerification}
                        bottomBoxName='Google Verification'
                        bottomGoto='Edit' />

                    <SettingBottomBox
                        settingBottomImage={update}
                        bottomBoxName='Updated Version'
                        bottomGoto='1.0.1' />

<Dialog
        open={openResetPassword}
        onClose={handleCloseResetPassword}
        PaperProps={{
          component: 'form',
          onSubmit: handleResetPassword,
        }}
      >
        <DialogTitle>Reset Password</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter your email to receive a password reset link.
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="email"
            name="email"
            label="Email Address"
            type="email"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseResetPassword}>Cancel</Button>
          <Button type="submit">Send Email</Button>
        </DialogActions>
      </Dialog>
                </div>

            </div>
        </div>
        

    )
}

export default MainPage