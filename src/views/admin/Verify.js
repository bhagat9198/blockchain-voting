import { Avatar, Button, Card, CardActionArea, CardActions, CardContent, CardHeader, CardMedia, Grid, Modal, Paper, Tab, Tabs, Typography } from '@mui/material'
import { Box, display } from '@mui/system'
import React, { useState } from 'react'
import PropTypes from 'prop-types';
import userImg from './../../assets/images/u1.png';
import MuiModal from '../../components/MuiModal';
import BodyLayout from '../../components/BodyLayout';
import MuiTabs from '../../components/MuiTabs';

export default function Verify(props) {
  const { userType } = props;

  return (
    <BodyLayout userType={userType} >
      <MuiTabs tabs={[{ label: 'Voters', comp: <AllCards /> }, { label: 'Electorl Party', comp: <AllCards /> }]} />
    </BodyLayout>
  )
}

const EachCard = () => {
  const [open, setOpen] = useState(false);
  const data = {};

  return (<>
    <Card sx={{ maxWidth: 345 }}>
      {data?.img && <CardMedia
        component="img"
        height="140"
        image={data?.img}
        alt="green iguana"
      >
      </CardMedia>}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', my: 2 }} >
        {!data?.img && <Avatar alt="Lemy Sharp" src="/static/images/avatar/1.jpg" />}
      </Box>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Alex Dark
        </Typography>
        <Typography variant="body2" color="text.secondary">
          alex@gmail.com
        </Typography>
        <Typography variant="body2" color="text.secondary">
          9514 6547 9632 7563
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Accept</Button>
        <Button size="small">Rejected</Button>
        <Button size="small" onClick={() => setOpen(true)}>Learn More</Button>
      </CardActions>
    </Card>
    <MuiModal open={open} setOpen={setOpen} title={'Modal Title'} >
      <Grid container spacing={4}>
        <Grid item xs={12} sm={4} >
          <img style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: '50%' }} src={userImg} alt='user img' />
        </Grid>
        <Grid item xs={12} sm={8} >
          <Typography>alex@gmail.com</Typography>
          <Typography>9514 6547 9632 7563 </Typography>
          <Typography>20 March, 2022</Typography>
        </Grid>
      </Grid>
    </MuiModal>
  </>);
}

const AllCards = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={3}>
        <EachCard />
      </Grid>
      <Grid item xs={3}>
        <EachCard />
      </Grid>
      <Grid item xs={3}>
        <EachCard />
      </Grid>
      <Grid item xs={3}>
        <EachCard />
      </Grid>
    </Grid>
  )
}

