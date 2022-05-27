import { Box, Button, Container, TextareaAutosize, TextField } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { addDonation } from '../../store/actions/privliged';

export default function AddDonation(props) {
  const [heading, setHeading] = useState('');
  const [cause, setCause] = useState('');
  const dispatch = useDispatch();

  const addDonationHandler = async (e) => {
    const data = {
      heading, cause
    }

    const res = await dispatch(addDonation(data));
    if (!res.status) {
      toast.error(res.message);
      return
    }

    toast.success('Donation added successfully');
  }

  return (
    <Container >
      <Box sx={{ my: 2 }} >
        <TextField fullWidth id="outlined-basic"
          label="Heading"
          variant="outlined"
          onChange={e => setHeading(e.target.value)}
        />
      </Box>
      <Box>
        <TextareaAutosize
          aria-label="empty textarea"
          placeholder="Why people should donate you? Any Social Cause?"
          minRows={3}
          style={{ width: "93%", marginBottom: '20px', padding: "20px" }}
          onChange={e => setCause(e.target.value)}
        />
      </Box>
      <Box>
        <Button
          fullWidth variant='contained'
          onClick={addDonationHandler}
        >Add Your Donation</Button>
      </Box>
    </Container>
  )
}
