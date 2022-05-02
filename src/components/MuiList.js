import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import StarIcon from '@mui/icons-material/Star';

export default function MuiList(props) {
  const { list } = props;
  return (
    <List
      sx={{ width: '100%', bgcolor: 'background.paper' }}
      aria-label="contacts"
    >
      {list && list.map(l => <ListItem disablePadding>
        <ListItemButton>
          <ListItemIcon>
            <StarIcon sx={{ color: 'goldenrod' }} />
          </ListItemIcon>
          <ListItemText primary={l} />
        </ListItemButton>
      </ListItem>)}

    </List>
  );
}
