import { Box, Button, Card, Container, Grid, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import ContainerLabel from './ContainerLabel'
import userImg from './../assets/images/user.png';
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword } from './../store/actions/auth';
import { toast } from 'react-toastify';
export default function BasicProfileInfo() {
  const [oldPwd, setOldPwd] = useState('');
  const [newPwd, setNewPwd] = useState('');
  const [newCPwd, setNewCPwd] = useState('');
  const userRed = useSelector(state => state.userRed);
  const dispatch = useDispatch();

  const pwdResetHandler = async (e) => {
    if (oldPwd !== newCPwd) {
      toast.error('Mismatch in new password. Try again')
      return;
    }

    const res = await dispatch(
      resetPassword({
        oldPwd,
        newPwd,
        email: userRed?.userData?.email,
      }))
    if (!res.status) {
      toast.error(res.message)
      return;
    }
    toast.success('Password updated')
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
              <Typography variant='h6'>{userRed?.userData?.name}</Typography>
            </Box>
            <Box sx={{ m: 1 }}>
              <Typography fontWeight='bold' color='gray' variant='subtitle1'>Email</Typography>
              <Typography variant='h6'>{userRed?.userData?.email}</Typography>
            </Box>
            <Box sx={{ m: 1 }}>
              <Typography fontWeight='bold' color='gray' variant='subtitle1'>Voting Id Number</Typography>
              <Typography variant='h6'>{userRed?.userData?.voteCardId}</Typography>
            </Box>
          </Container>

          <Container>
            <ContainerLabel label="Basic Info" />
            <Card>
              <form>
                <Box sx={{ m: 1 }}>
                  <TextField fullWidth label="Current Password" variant="filled"
                    onChange={e => setOldPwd(e.target.value)}
                  />
                </Box>
                <Box sx={{ m: 1 }}>
                  <TextField fullWidth label="New Password" variant="filled"
                    onChange={e => setNewPwd(e.target.value)}
                  />
                </Box>
                <Box sx={{ m: 1 }}>
                  <TextField fullWidth label="Confirm New Password" variant="filled"
                    onChange={e => setNewCPwd(e.target.value)}
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
