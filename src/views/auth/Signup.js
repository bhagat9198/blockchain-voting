import React, { useState } from 'react'
import { Box, Button, Card, Container, InputAdornment, TextField } from '@mui/material'
import { AiOutlineLogin } from 'react-icons/ai';
import { CgRename } from 'react-icons/cg';
import { MdAlternateEmail, MdPassword } from 'react-icons/md';
import BodyLayout from '../common/BodyLayout';
import signupImg from './../../assets/images/signup.png';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cpassword, setCPassword] = useState('');

  return (
    <BodyLayout hideDrawer={true} >
      <Box style={{ display: 'flex' }} >
        <Container sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <Card sx={{ width: '90%', m: 2, p: 2 }}>
            <TextField
              required
              id="outlined-required"
              label="Name"
              defaultValue="abc@xyz.com"
              value={name}
              sx={{ width: '90%', p: 2 }}
              InputProps={{ startAdornment: <InputAdornment position="start"><CgRename /></InputAdornment> }}
            />
            <TextField
              required
              id="outlined-required"
              label="Email"
              defaultValue="abc@xyz.com"
              value={email}
              sx={{ width: '90%', p: 2 }}
              InputProps={{ startAdornment: <InputAdornment position="start"><MdAlternateEmail /></InputAdornment> }}
            />
            <TextField
              required
              id="outlined-required"
              label="Password"
              defaultValue="*******"
              value={password}
              sx={{ width: '90%', p: 2 }}
              InputProps={{ startAdornment: <InputAdornment position="start"><MdPassword /></InputAdornment> }}
            />
            <TextField
              required
              id="outlined-required"
              label="Confirm Password"
              defaultValue="*******"
              value={cpassword}
              sx={{ width: '90%', p: 2 }}
              InputProps={{ startAdornment: <InputAdornment position="start"><MdPassword /></InputAdornment> }}
            />
          </Card>
          <Card sx={{ width: '90%', m: 2, p: 2 }}>
            <Button variant='contained' startIcon={<AiOutlineLogin />} fullWidth > Signup</Button>
          </Card>
        </Container>
        <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Box sx={{ width: '60%', minHeight: '400px', }}>
            <img style={{ width: '100%', minWidth: '300px', minHeight: '400px', height: '100%', objectFit: 'cover' }} src={signupImg} alt="img" />
          </Box>
        </Container>
      </Box>
    </BodyLayout>
  )
}
