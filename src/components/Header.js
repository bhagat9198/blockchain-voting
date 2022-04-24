import { AppBar, Box, Button, IconButton, Toolbar, Typography } from '@mui/material'
import React from 'react'
import MenuIcon from '@mui/icons-material/Menu';



export default function Header(props) {
  const { open, handleDrawerOpen } = props;

  return (

    <AppBar sx={{ position: 'sticky' }}>
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          // sx={{ mr: 2 }}
          onClick={handleDrawerOpen}
          sx={{ mr: 2, ...(open && { display: 'none' }) }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Blockchain Voting
        </Typography>
        <Button color="inherit">Login</Button>
      </Toolbar>
    </AppBar>

  )
}
