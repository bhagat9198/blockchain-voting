import { Box, Grid, Switch, Typography } from '@mui/material';
import React, { useState } from 'react'
import BodyLayout from '../../components/BodyLayout'
import MuiList from '../../components/MuiList';
import { FaVoteYea } from 'react-icons/fa';
import { GiTargetPrize } from 'react-icons/gi';

export default function Settings(props) {
  const { userType } = props;
  const [selectedListItem, setSelectedListItem] = useState({ index: 0, label: '' });

  const selectedListItemHandler = ({ event, index, label }) => {
    console.log('Settings :: selectedListItemHandler :: ', event, index);
    setSelectedListItem({
      index,
      label,
    })
  }

  let label = '';
  let status = false;

  if (selectedListItem.label == 'Vote') {
    label = 'Voting Open';
    status = false;
  } else if (selectedListItem.label == 'Result') {
    label = 'Voting Results Display';
    status = false;
  } else {
    // no choice
  }

  return (
    <BodyLayout userType={userType}>
      <Grid container spacing={2} sx={{ height: "100%" }} >
        <Grid item xs={12} sm={4} sx={{ borderRight: '1px solid gray', height: "100%" }} >
          <MuiList list={[{ label: 'Vote', icon: <FaVoteYea /> }, { label: 'Result', icon: <GiTargetPrize /> },]} selected={selectedListItem} handler={selectedListItemHandler} />
        </Grid>
        <Grid item xs={12} sm={8}>
          <SwitchOption label={label} state={status} />
        </Grid>
      </Grid>
    </BodyLayout>
  )
}


const SwitchOption = (props) => {
  const { label, state } = props;
  return (
    <Box sx={{ display: 'flex' }}>
      <Typography variant='body1' sx={{ flexGrow: 1 }} >{label}</Typography>
      <Switch checked={state} />
    </Box>
  )
}