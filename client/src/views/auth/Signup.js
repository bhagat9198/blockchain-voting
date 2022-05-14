import React, { useState } from 'react'
import { Box, Button, Card, Container, FormControl, FormControlLabel, FormLabel, InputAdornment, Radio, RadioGroup, TextField } from '@mui/material'
import { AiOutlineLogin, AiOutlineIdcard } from 'react-icons/ai';
import { CgRename } from 'react-icons/cg';
import { MdAlternateEmail, MdPassword } from 'react-icons/md';
import signupImg from './../../assets/images/signup.png';
import BodyLayout from '../../components/BodyLayout';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { signup } from '../../store/actions/auth';
import { useNavigate } from 'react-router-dom'

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cpassword, setCPassword] = useState('');
  const [voteCardId, setVoteCardId] = useState('');
  const [userType, setUserType] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const signupHandler = async () => {
    if (password !== cpassword) {
      toast.warn('Passwords didnt match');
      return;
    }

    try {
      const res = await dispatch(signup({ name, email, password, voteCardId, userType }));
      console.log('Signup :: res :: ', res);
      if (res.status) {
        return navigate(`/${res.data.userType}`)
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }


  return (
    <BodyLayout hideDrawer={true} >
      <Box style={{ display: 'flex' }} >
        <Container sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <Card sx={{ width: '90%', m: 2, p: 2 }}>
            <TextField
              required
              id="outlined-required"
              label="Name"
              placeholder="Your Full Name"
              value={name}
              sx={{ width: '90%', p: 2 }}
              InputProps={{ startAdornment: <InputAdornment position="start"><CgRename /></InputAdornment> }}
              onChange={e => setName(e.target.value)}
            />
            <TextField
              required
              id="outlined-required"
              label="Email"
              placeholder="abc@xyz.com"
              value={email}
              sx={{ width: '90%', p: 2 }}
              InputProps={{ startAdornment: <InputAdornment position="start"><MdAlternateEmail /></InputAdornment> }}
              onChange={e => setEmail(e.target.value)}
            />
            <TextField
              required
              id="outlined-required"
              label="Password"
              placeholder="*******"
              value={password}
              sx={{ width: '90%', p: 2 }}
              InputProps={{ startAdornment: <InputAdornment position="start"><MdPassword /></InputAdornment> }}
              onChange={e => setPassword(e.target.value)}
            />
            <TextField
              required
              id="outlined-required"
              label="Confirm Password"
              placeholder="*******"
              value={cpassword}
              sx={{ width: '90%', p: 2 }}
              InputProps={{ startAdornment: <InputAdornment position="start"><MdPassword /></InputAdornment> }}
              onChange={e => setCPassword(e.target.value)}
            />
            <TextField
              required
              id="outlined-required"
              label="Your Voter Card Id"
              placeholder="ABCD1234"
              value={voteCardId}
              sx={{ width: '90%', p: 2 }}
              InputProps={{ startAdornment: <InputAdornment position="start"><AiOutlineIdcard /></InputAdornment> }}
              onChange={e => setVoteCardId(e.target.value)}
            />
            <FormControl sx={{ px: 2 }}>
              <FormLabel id="demo-row-radio-buttons-group-label">You best described as : </FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                onChange={e => setUserType(e.target.value)}
              >
                <FormControlLabel value="voter" control={<Radio />} label="Voter" />
                <FormControlLabel value="electionParty" control={<Radio />} label="Election Party Candidate" />
              </RadioGroup>
            </FormControl>
          </Card>
          <Card sx={{ width: '90%', m: 2, p: 2 }}>
            <Button onClick={signupHandler} variant='contained' startIcon={<AiOutlineLogin />} fullWidth > Signup</Button>
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
