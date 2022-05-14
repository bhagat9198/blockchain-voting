import { Box, Typography } from '@mui/material';
import React from 'react'
import { RiNumber1, RiNumber2, RiNumber3 } from 'react-icons/ri'

function randNum({ min, max }) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}


export default function CardStats(props) {
  const { heading1, heading2, iconName, style } = props;

  let Icon;
  if (iconName === 'RiNumber1') {
    Icon = <RiNumber1 style={{ fontSize: '250%' }} />
  } else if (iconName === 'RiNumber2') {
    Icon = <RiNumber2 style={{ fontSize: '250%' }} />
  } else if (iconName === 'RiNumber3') {
    Icon = <RiNumber3 style={{ fontSize: '250%' }} />
  } else if (iconName === 'RiNumber1') {
    Icon = <RiNumber1 style={{ fontSize: '250%' }} />
  } else if (iconName === 'RiNumber1') {
    Icon = <RiNumber1 style={{ fontSize: '250%' }} />
  } else {
    Icon = <></>
  }

  let styles = {
    justifyContent: 'space-between',
    borderRadius: '10px',
    p: 2,
    background: `rgb(${randNum({ max: 255, min: 0 })},${randNum({ max: 255, min: 100 })},${randNum({ max: 255, min: 0 })})`
  }

  if (style) {
    styles = { ...styles, ...style }
  }

  return (
    <Box className="flex" sx={styles}>
      <Box>
        <Typography variant='h6' >{heading1}</Typography>
        <Typography variant='subtitle1' sx={{ color: 'gray', fontWeight: 'bold' }}>{heading2}</Typography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {Icon}
      </Box>
    </Box>
  )
}
