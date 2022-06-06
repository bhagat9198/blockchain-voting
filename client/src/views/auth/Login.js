import { Box, Button, Card, Container, InputAdornment, TextField } from '@mui/material'
import React, { useState } from 'react'
import { AiOutlineLogin } from 'react-icons/ai';
import { MdAlternateEmail, MdPassword } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import BodyLayout from '../../components/BodyLayout';
import loginImg from './../../assets/images/login1.jpg';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const userRed = useSelector(state => state.userRed);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    if (!email || !password) {
      toast.error('Please enter both email and password');
      return;
    }

    try {
      const res = await (dispatch({ email, password }))
      if (!res.status) {
        toast.error('Unable to login. Try Again');
        return;
      }
      toast.success('LoggedIn successfully');
      return navigate(`/${res.data.userType}/`)
    } catch (error) {
      console.log('Login :: error :: ', error);
      toast.error(error.message);
    }
  }

  if (userRed.status) {
    toast.error('You are already loggedIn. Logout to login from different account');
    return navigate(`/${userRed?.userData?.userType}/`);
  }

  return (
    <BodyLayout hideDrawer={true}>
      <Box style={{ display: 'flex' }} >
        <Container sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <Card sx={{ width: '90%', m: 2, p: 2 }}>
            <TextField
              onChange={e => setEmail(e.target.value)}
              required
              label="Email"
              placeholder="abc@xyz.com"
              value={email}
              sx={{ width: '100%' }}
              InputProps={{ startAdornment: <InputAdornment position="start"><MdAlternateEmail /></InputAdornment> }}
            />
          </Card>
          <Card sx={{ width: '90%', m: 2, p: 2 }}>
            <TextField
              onChange={e => setPassword(e.target.value)}
              type='password'
              required
              label="Password"
              placeholder="*******"
              value={password}
              sx={{ width: '100%' }}
              InputProps={{ startAdornment: <InputAdornment position="start"><MdPassword /></InputAdornment> }}
            />
          </Card>
          <Card sx={{ width: '90%', m: 2, p: 2 }}>
            <Button
              onClick={submitHandler}
              variant='contained'
              startIcon={<AiOutlineLogin />} fullWidth > Login</Button>
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
