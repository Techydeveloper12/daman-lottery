import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import HelpIcon from '@mui/icons-material/Help';
import PersonIcon from '@mui/icons-material/Person';
import DashboardIcon from '@mui/icons-material/Dashboard';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import StarIcon from '@mui/icons-material/Star';
import SendIcon from '@mui/icons-material/Send';
import DraftsIcon from '@mui/icons-material/Drafts';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ListItemButton from '@mui/material/ListItemButton';
import Collapse from '@mui/material/Collapse';
import { useNavigate } from 'react-router-dom';


const AdminPanel = ({children}) => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openNested, setOpenNested] = useState(false);
  const navigate = useNavigate();
  const handleDrawerOpen = () => {
    setOpenDrawer(true);
  };

  const handleDrawerClose = () => {
    setOpenDrawer(false);
  };

  const handleNestedClick = () => {
    setOpenNested(!openNested);
  };

  const [currentTab, setCurrentTab] = useState('Games');

  const handleTabClick = (tabName) => {
    setCurrentTab(tabName);
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={handleDrawerOpen}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Admin Panel
          </Typography>
          <IconButton color="inherit">
            <NotificationsIcon />
          </IconButton>
          <IconButton color="inherit">
            <AccountCircleIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={openDrawer} onClose={handleDrawerClose}>
        <div>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <List>
          <ListItem button onClick={handleNestedClick}>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Games" />
            {openNested ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </ListItem>
          <Collapse in={openNested} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 4 }}  onClick={() => navigate('/wingo')}>
                <ListItemIcon>
                  <StarIcon />
                </ListItemIcon>
                <ListItemText primary="Win Go" />
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }} onClick={() => navigate('/k3')}>
                <ListItemIcon>
                  <SendIcon />
                </ListItemIcon>
                <ListItemText primary="K3 Lotre" />
              </ListItemButton>
              <ListItemButton sx={{ pl: 4 }} onClick={() => navigate('/5d')}>
                <ListItemIcon>
                  <DraftsIcon />
                </ListItemIcon>
                <ListItemText primary="5D Lotre" />
              </ListItemButton>
            </List>
          </Collapse>
          <ListItem button onClick={() => navigate('/members')}>
            <ListItemIcon>
              <MailIcon />
            </ListItemIcon>
            <ListItemText primary="Members" />
          </ListItem>
          <ListItem button onClick={() => navigate('/collaborator')}>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Collaborator" />
          </ListItem>
          <ListItem button onClick={() => navigate('/deposit-request')}>
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Recharge" />
          </ListItem>
          <ListItem button onClick={() => navigate('/withdraw-request')}>
            <ListItemIcon>
              <HelpIcon />
            </ListItemIcon>
            <ListItemText primary="Withdrawl" />
          </ListItem>
          <ListItem button onClick={() => navigate('/level')}>
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary="Level Settings" />
          </ListItem>
          <ListItem button onClick={() => navigate('/salary')}>
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary="Created Salary" />
          </ListItem>
         <ListItem button onClick={() => navigate('/coupen')}>
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary="Create Giftcode" />
          </ListItem>

        </List>
      </Drawer>
      <main>
        {children}
      </main>
    </div>
  );
};

export default AdminPanel;
