// import { Box, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
// import React from 'react'
// import { BsFillPersonLinesFill } from 'react-icons/bs';

// export default function MuiListItem(props) {
//   const { list, selected } = props;
//   const [selectedIndex, setSelectedIndex] = React.useState(1);

//   const handleListItemClick = (event, index) => {
//     setSelectedIndex(index);
//   };

//   return (
//     <>
//       <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
//         <List component="nav" aria-label="main mailbox folders">
//           {list.map((l, i) => <ListItemButton
//             selected={selected === i}
//             onClick={(event) => handleListItemClick(event, 0)}
//           >
//             {l?.icon ?
//               <ListItemIcon>
//                 <BsFillPersonLinesFill />
//               </ListItemIcon> : <></>
//             }
//             <ListItemText primary={l.label} />
//           </ListItemButton>)}

//         </List>
//       </Box>
//     </>
//   )
// }
