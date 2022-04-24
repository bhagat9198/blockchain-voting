import { Avatar, Button, Card, CardActionArea, CardActions, CardContent, CardHeader, CardMedia, Grid, Modal, Paper, Tab, Tabs, Typography } from '@mui/material'
import { Box, display } from '@mui/system'
import React, { useState } from 'react'
import PropTypes from 'prop-types';
import BodyLayout from '../common/BodyLayout'
import userImg from './../../assets/images/u1.png';

export default function Verify() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <BodyLayout>
      <Box sx={{ width: '100%', mt: 1 }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Voters" {...a11yProps(0)} />
            <Tab label="Electorl Party" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <AllCards />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <AllCards />
        </TabPanel>
      </Box>
    </BodyLayout>
  )
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'white',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'white',
  boxShadow: 24,
  p: 2,
};


const EachModal = (props) => {
  const { open, setOpen, children } = props;

  return (
    <Box  >
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"

      >
        <Box sx={modalStyle}>
          {children}
        </Box>
      </Modal>
    </Box>
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
    <EachModal open={open} setOpen={setOpen} >
      <Card sx={{ m: 1 }}>
        <CardActionArea sx={{ p: 2 }}>
          <CardHeader
            sx={{ p: 0 }}
            title="Dark Alex"
          />
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

        </CardActionArea>
        <CardActions sx={{ display: 'flex', justifyContent: 'end' }}>
          <Button size="small" onClick={() => setOpen(false)}>Close</Button>
        </CardActions>
      </Card>
    </EachModal >
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

