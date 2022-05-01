import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Header from './Header';
import { MdOutlineDashboard, MdOutlineSpeakerPhone } from 'react-icons/md';
import { FaBloggerB, FaDonate } from 'react-icons/fa';
import { GiPodiumWinner } from 'react-icons/gi';
import { GoVerified } from 'react-icons/go';


const drawerWidth = 240;

function BodyLayout(props) {
  const { window, children, userType } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  let navs = [];

  if (userType === 'admin') {
    navs = [
      { label: 'Dashboard', icon: <MdOutlineDashboard /> },
      { label: 'Announcement', icon: <MdOutlineSpeakerPhone /> },
      { label: 'Blog', icon: <FaBloggerB /> },
      { label: 'Donate', icon: <FaDonate /> },
      { label: 'Result', icon: <GiPodiumWinner /> },
      { label: 'Verify', icon: <GoVerified /> }
    ]

  } else if (userType === 'voter') {
    navs = [
      { label: 'Dashboard', icon: <MdOutlineDashboard /> },
      { label: 'Announcement', icon: <MdOutlineSpeakerPhone /> },
      { label: 'Blog', icon: <FaBloggerB /> },
      { label: 'Donate', icon: <FaDonate /> },
      { label: 'Result', icon: <GiPodiumWinner /> },
      { label: 'Verify', icon: <GoVerified /> }
    ]
  } else {
    navs = [
      { label: 'Dashboard', icon: <MdOutlineDashboard /> },
      { label: 'Announcement', icon: <MdOutlineSpeakerPhone /> },
      { label: 'Blog', icon: <FaBloggerB /> },
      { label: 'Donate', icon: <FaDonate /> },
      { label: 'Result', icon: <GiPodiumWinner /> },
      { label: 'Verify', icon: <GoVerified /> }
    ]
  }

  const drawer = <Box>
    <Toolbar />
    <Divider />
    <List>
      {navs.map((nav) => (
        <ListItem button key={nav.label}>
          <ListItemIcon>
            {nav.icon}
          </ListItemIcon>
          <ListItemText primary={nav.label} />
        </ListItem>
      ))}
    </List>
  </Box>

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      {props?.hideNav ? <></> : <Header hideDrawer={props?.hideDrawer ? true : false} handleDrawerToggle={handleDrawerToggle} />}
      {!props?.hideDrawer && <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>}
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        <Box>
          {children}
        </Box>

      </Box>
    </Box>
  );
}

BodyLayout.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default BodyLayout;
