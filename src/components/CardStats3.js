import { Box, Button, Card, Typography } from '@mui/material'
import React from 'react'
import partySymbol from './../assets/images/partySymbol.jpeg';

export default function CardStats3(props) {
  const { name, cause } = props;
  return (
    <Card>
      <Box className='flex alignCenter' sx={{ bgcolor: 'black', color: 'white', p: 1 }} >
        <Box sx={{ width: '50px', height: '50px', p: 1 }}>
          <img src={partySymbol} alt="symbol" style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: '50%' }} />
        </Box>
        <Typography sx={{ pl: 2 }} >{name}</Typography>
      </Box>
      <Typography sx={{ p: 2 }} >
        {cause}
      </Typography>
      <Box>
        <Button fullWidth variant='contained'>Donate Us</Button>
      </Box>
    </Card>
  )
}
