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
import { GrInfo } from 'react-icons/gr';
import { GoVerified } from 'react-icons/go';
import { AiOutlineUsergroupAdd } from 'react-icons/ai';
import { BsNewspaper } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { CgProfile } from 'react-icons/cg';
import Footer from './Footer';


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
      { label: 'Dashboard', to: "/", icon: <MdOutlineDashboard /> },
      { label: 'Announcement', to: "/announcements", icon: <MdOutlineSpeakerPhone /> },
      { label: 'Blog', to: "/blogs", icon: <FaBloggerB /> },
      { label: 'Donate', to: "/donations", icon: <FaDonate /> },
      { label: 'Result', to: "/results", icon: <GiPodiumWinner /> },
      { label: 'Verify', to: "/verify", icon: <GoVerified /> },
      { label: 'Settings', to: "/settings", icon: <CgProfile /> },
      { label: 'Profile', to: "/profile", icon: <CgProfile /> },
    ]

  } else if (userType === 'voter') {
    navs = [
      { label: 'Dashboard', to: "/", icon: <MdOutlineDashboard /> },
      { label: 'Result', to: "/results", icon: <GiPodiumWinner /> },
      { label: 'Latest Updates', to: "/latest-updates", icon: <BsNewspaper /> },
      { label: 'Profile', to: "/profile", icon: <CgProfile /> },
    ]
  } else {
    navs = [
      { label: 'Dashboard', to: "/", icon: <MdOutlineDashboard /> },
      { label: 'Announcement', to: "/announcements", icon: <MdOutlineSpeakerPhone /> },
      { label: 'Blog', to: "/blogs", icon: <FaBloggerB /> },
      { label: 'Donate', to: "/donations", icon: <FaDonate /> },
      { label: 'Result', to: "/results", icon: <GiPodiumWinner /> },
      { label: 'Add Party', to: "/add-party", icon: <AiOutlineUsergroupAdd /> },
      { label: 'Profile', to: "/profile", icon: <CgProfile /> },
    ]
  }

  const drawer = <Box>
    <Toolbar />
    <Divider />
    <List>
      {navs.map((nav) => (
        <Link to={`${userType}/${nav.to}`}>
          <ListItem button key={nav.label}>
            <ListItemIcon>
              {nav.icon}
            </ListItemIcon>
            <ListItemText primary={nav.label} />
          </ListItem>
        </Link>
      ))}
    </List>
  </Box>

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }} >
      <Box sx={{ display: 'flex', flexGrow: 1 }}>
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
          <Box sx={{ flexGrow: 1, height: "100%" }} >
            {children}
          </Box>
        </Box>
      </Box>
      <Footer hideDrawer={props?.hideDrawer ? true : false} />
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
