import { Box, Button, Card, Container, Grid, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import ContainerLabel from './ContainerLabel'
import userImg from './../assets/images/user.png';
import { useDispatch } from 'react-redux';

export default function BasicProfileInfo() {
  const [oldPwd, setOldPwd] = useState('');
  const [newPwd, setNewPwd] = useState('');
  const [newCPwd, setNewCPwd] = useState('');
  const dispatch = useDispatch();

  const pwdResetHandler = () => {

  }

  return (
    <>
      <Grid container spacing={2} >
        <Grid item xs={12} sm={4} className="flex justifyCenter " >
          <Box sx={{ width: '60%', height: '400px', mt: 5 }}>
            <img alt="user img" src={userImg} className="img" />
            <Button variant="contained" fullWidth>Update Image</Button>
          </Box>
        </Grid>
        <Grid item xs={12} sm={8}>
          <Container>
            <ContainerLabel label="Basic Info" />
            <Box sx={{ m: 1 }}>
              <Typography fontWeight='bold' color='gray' variant='subtitle1'>Name</Typography>
              <Typography variant='h6'>Vijay Vikas</Typography>
            </Box>
            <Box sx={{ m: 1 }}>
              <Typography fontWeight='bold' color='gray' variant='subtitle1'>Email</Typography>
              <Typography variant='h6'>vijay@gmail.com</Typography>
            </Box>
            <Box sx={{ m: 1 }}>
              <Typography fontWeight='bold' color='gray' variant='subtitle1'>Voting Id Number</Typography>
              <Typography variant='h6'>1324 7896 8521 6547</Typography>
            </Box>
          </Container>

          <Container>
            <ContainerLabel label="Basic Info" />
            <Card>
              <form>
                <Box sx={{ m: 1 }}>
                  <TextField fullWidth label="Current Password" variant="filled"
                    onChange={e => setOldPwd(e.target.name)}
                  />
                </Box>
                <Box sx={{ m: 1 }}>
                  <TextField fullWidth label="New Password" variant="filled"
                    onChange={e => setNewPwd(e.target.name)}
                  />
                </Box>
                <Box sx={{ m: 1 }}>
                  <TextField fullWidth label="Confirm New Password" variant="filled"
                    onChange={e => setNewCPwd(e.target.name)}
                  />
                </Box>
                <Box sx={{ m: 1 }}>
                  <Button variant="contained" fullWidth
                    onClick={pwdResetHandler}
                  >Update Password</Button>
                </Box>
              </form>
            </Card>
          </Container>
        </Grid >
      </Grid >
    </>
  )
}
