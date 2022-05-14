import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';


export default function MuiList(props) {
  const { list, selected, handler } = props;
  return (
    <List
      sx={{ width: '100%', bgcolor: 'background.paper' }}
      aria-label="contacts"
    >
      {list && list.map((l, i) => <ListItem disablePadding>
        <ListItemButton
          selected={selected.index === i}
          onClick={(event) => handler({ event: event, index: i, label: l.label })}
        >
          <ListItemIcon>
            {l.icon ? l.icon : <></>}
          </ListItemIcon>
          <ListItemText primary={l.label} />
        </ListItemButton>
      </ListItem>)}

    </List>
  );
}
