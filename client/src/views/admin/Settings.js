import { Box, Grid, Switch, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import BodyLayout from '../../components/BodyLayout'
import MuiList from '../../components/MuiList';
import { FaVoteYea } from 'react-icons/fa';
import { GiTargetPrize } from 'react-icons/gi';
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify';
import { voteResultStatus, voteStatus } from '../../store/actions/privliged';
import { adminSettings as adminSettingsFun } from '../../store/actions/common';


export default function Settings(props) {
  const { userType } = props;
  const [selectedListItem, setSelectedListItem] = useState({ index: 0, label: 'Vote', status: false });
  const dispatch = useDispatch();
  const miscellaneousRed = useSelector(state => state.miscellaneousRed);
  // console.log('Settings :: miscellaneousRed :: ', miscellaneousRed);
  const allSettings = miscellaneousRed.settings;

  useEffect(() => {
    async function asyncFun() {
      const res = await dispatch(adminSettingsFun());
      if (!res.status) {
        toast.error(res.message);
        return;
      }
    }
    asyncFun()
  }, [])

  useEffect(() => {
    // console.log('Settings :: allSettings :: ', allSettings);
    let status;
    if (selectedListItem.index === 0) {
      status = allSettings?.votingPhase;
    } else if (selectedListItem.index === 1) {
      status = allSettings?.results;
    } else {
      // nothing
    }

    setSelectedListItem(prev => {
      return {
        ...prev,
        status
      }
    })
  }, [allSettings])


  const selectedListItemHandler = ({ event, index, label }) => {
    // console.log('Settings :: selectedListItemHandler :: ', event, index);
    if (index === 0) {
      setSelectedListItem({
        index,
        label,
        status: allSettings?.votingPhase
      })
    }
    if (index === 1) {
      setSelectedListItem({
        index,
        label,
        status: allSettings?.results
      })
    }

  }

  return (
    <BodyLayout userType={userType}>
      <Grid container spacing={2} sx={{ height: "100%" }} >
        <Grid item xs={12} sm={4} sx={{ borderRight: '1px solid gray', height: "100%" }} >
          <MuiList
            list={[{ label: 'Vote', icon: <FaVoteYea /> }, { label: 'Result', icon: <GiTargetPrize /> },]}
            selected={selectedListItem} handler={selectedListItemHandler} />
        </Grid>
        <Grid item xs={12} sm={8}>
          <SwitchOption selected={selectedListItem} />
        </Grid>
      </Grid>
    </BodyLayout>
  )
}


const SwitchOption = (props) => {
  const { selected } = props;
  // console.log('SwitchOption :: selected :: ', selected);
  const dispatch = useDispatch();

  const switchHandler = async (e) => {
    const val = e.target.checked;

    let res;
    if (selected.label == 'Vote') {
      res = await dispatch(voteStatus({ status: val }));
    }
    if (selected.label == 'Result') {
      res = await dispatch(voteResultStatus({ status: val }));
    }
    if (!res.status) {
      toast.error(res.message);
      return;
    }

    toast.success('Saved Successfully');

  }

  return (
    <Box sx={{ display: 'flex' }}>
      <Typography variant='body1' sx={{ flexGrow: 1 }} >{selected.label}</Typography>
      <Switch checked={selected.status} onChange={switchHandler} />
    </Box>
  )
}