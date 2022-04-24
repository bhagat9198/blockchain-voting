import { Box, Button, Card, Container, InputAdornment, TextField } from '@mui/material'
import React, { useState } from 'react'
import { AiOutlineLogin } from 'react-icons/ai';
import { MdAlternateEmail, MdPassword } from 'react-icons/md';
import BodyLayout from '../common/BodyLayout';
import loginImg from './../../assets/images/login1.jpg';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <BodyLayout hideDrawer={true}>
      <Box style={{ display: 'flex' }} >
        <Container sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <Card sx={{ width: '90%', m: 2, p: 2 }}>
            <TextField
              required
              id="outlined-required"
              label="Email"
              defaultValue="abc@xyz.com"
              value={email}
              sx={{ width: '100%' }}
              InputProps={{ startAdornment: <InputAdornment position="start"><MdAlternateEmail /></InputAdornment> }}
            />
          </Card>
          <Card sx={{ width: '90%', m: 2, p: 2 }}>
            <TextField
              required
              id="outlined-required"
              label="Password"
              defaultValue="*******"
              value={password}
              sx={{ width: '100%' }}
              InputProps={{ startAdornment: <InputAdornment position="start"><MdPassword /></InputAdornment> }}
            />
          </Card>
          <Card sx={{ width: '90%', m: 2, p: 2 }}>
            <Button variant='contained' startIcon={<AiOutlineLogin />} fullWidth > Login</Button>
          </Card>
        </Container>
        <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Box sx={{ width: '60%', minHeight: '400px', }}>
            <img style={{ width: '100%', minWidth: '300px', minHeight: '400px', height: '100%', objectFit: 'cover' }} src={loginImg} alt="img" />
          </Box>
        </Container>
      </Box>
    </BodyLayout>
  )
}
