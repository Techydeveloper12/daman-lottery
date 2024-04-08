import { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from '@mui/material';

const PasswordProtectedRoute = ({ children }) => {
  const [password, setPassword] = useState('');
  const [open, setOpen] = useState(true);
  const correctPassword = '21522525'; // Replace with your static password

  const handleClose = () => {
    if (password === correctPassword) {
      setOpen(false);
    } else {
      alert('Incorrect password');
    }
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Enter Password</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Password"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Submit</Button>
        </DialogActions>
      </Dialog>
      {!open && children}
    </>
  );
};

export default PasswordProtectedRoute;