// import { AppBar, Box, Button, IconButton, Toolbar, Typography } from '@mui/material'
// import React from 'react'



// export default function Header(props) {
//   const { open, handleDrawerOpen } = props;

//   return (
//     <AppBar sx={{ position: 'sticky' }}>
//       <Toolbar>
//         <IconButton
//           size="large"
//           edge="start"
//           color="inherit"
//           aria-label="menu"
//           // sx={{ mr: 2 }}
//           onClick={handleDrawerOpen}
//           sx={{ mr: 2, ...(open && { display: 'none' }) }}
//         >
//           <MenuIcon />
//         </IconButton>
//         <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
//           Blockchain Voting
//         </Typography>
//         <Button color="inherit">Login</Button>
//       </Toolbar>
//     </AppBar>
//   )
// }



import { AppBar, Button, IconButton, Toolbar, Typography } from '@mui/material'
import React from 'react'
import MenuIcon from '@mui/icons-material/Menu';

let drawerWidth = 240;

export default function Header(props) {
  const { handleDrawerToggle, hideDrawer} = props;

  if(hideDrawer) {
    drawerWidth = 0;
  }
  
  return (
    <AppBar
      position="fixed"
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { sm: 'none' } }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
          Blockchain Voting
        </Typography>
        <Button color="inherit">Login</Button>
      </Toolbar>
    </AppBar>
  )
}
