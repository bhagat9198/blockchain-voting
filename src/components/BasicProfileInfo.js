import { Box, Button, Card, Container, Grid, TextField, Typography } from '@mui/material'
import React from 'react'
import ContainerLabel from './ContainerLabel'
import userImg from './../assets/images/u2.jpg';

export default function BasicProfileInfo() {
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
              <Typography variant='h6'>Dark Alex</Typography>
            </Box>
            <Box sx={{ m: 1 }}>
              <Typography fontWeight='bold' color='gray' variant='subtitle1'>Email</Typography>
              <Typography variant='h6'>abc@xyz.com</Typography>
            </Box>
            <Box sx={{ m: 1 }}>
              <Typography fontWeight='bold' color='gray' variant='subtitle1'>Aadhar Number</Typography>
              <Typography variant='h6'>1324 7896 8521 6547</Typography>
            </Box>
          </Container>

          <Container>
            <ContainerLabel label="Basic Info" />
            <Card>
              <form>
                <Box sx={{ m: 1 }}>
                  <TextField fullWidth label="Current Password" variant="filled" />
                </Box>
                <Box sx={{ m: 1 }}>
                  <TextField fullWidth label="New Password" variant="filled" />
                </Box>
                <Box sx={{ m: 1 }}>
                  <TextField fullWidth label="Confirm New Password" variant="filled" />
                </Box>
                <Box sx={{ m: 1 }}>
                  <Button variant="contained" fullWidth>Update Password</Button>
                </Box>
              </form>
            </Card>
          </Container>
        </Grid >
      </Grid >
    </>
  )
}
