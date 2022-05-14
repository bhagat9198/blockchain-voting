import { Box, Button, Card, Typography } from '@mui/material'
import React from 'react'
import partySymbol from './../assets/images/partySymbol.jpeg';
import { darkColors } from '../util';

let arrayIndex = Math.floor(Math.random() * darkColors.length)

export default function CardStats3(props) {
  const { name, cause, imgUrl, children, bgColor } = props;

  let color;

  if (!bgColor) {
    color = darkColors[arrayIndex]
  } else {
    color = bgColor;
  }

  return (
    <Card>
      <Box className='flex alignCenter' sx={{ bgcolor: color, color: 'white', p: 1 }} >
        {imgUrl && <Box sx={{ width: '50px', height: '50px', p: 1 }}>
          <img src={partySymbol} alt="symbol" style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: '50%' }} />
        </Box>}
        <Typography sx={{ pl: 2 }} >{name}</Typography>
      </Box>
      <Typography sx={{ p: 2 }} >
        {cause}
      </Typography>
      {children}
    </Card>
  )
}
