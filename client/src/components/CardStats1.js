import { Box, Grid, Typography } from '@mui/material';
import React from 'react'
import { RiNumber0, RiNumber1, RiNumber2, RiNumber3, RiNumber4, RiNumber5, RiNumber6, RiNumber7, RiNumber8, RiNumber9 } from 'react-icons/ri';
import { colorCombinations } from '../util';

let arrayIndex = Math.floor(Math.random() * colorCombinations.length)

export default function CardStats1(props) {
  const { iconName, heading1, heading2, date } = props;
  if (arrayIndex === colorCombinations.length) {
    arrayIndex = 0;
  } else {
    arrayIndex = arrayIndex + 1;
  }

  let Icon = <></>;
  let color = 'black';
  let c1 = colorCombinations[arrayIndex].c1;
  let c2 = colorCombinations[arrayIndex].c2;
  if (iconName === 'RiNumber1') {
    Icon = <RiNumber1 style={{ fontSize: '250%' }} />
    color = 'red';
  } else if (iconName === 'RiNumber2') {
    color = 'plum'
    Icon = <RiNumber2 style={{ fontSize: '250%' }} />
  } else if (iconName === 'RiNumber3') {
    color = 'orange'
    Icon = <RiNumber3 style={{ fontSize: '250%' }} />
  } else if (iconName === 'RiNumber4') {
    color = 'olive'
    Icon = <RiNumber4 style={{ fontSize: '250%' }} />
  } else if (iconName === 'RiNumber5') {
    color = 'green'
    Icon = <RiNumber5 style={{ fontSize: '250%' }} />
  } else if (iconName === 'RiNumber6') {
    color = 'purple'
    Icon = <RiNumber6 style={{ fontSize: '250%' }} />
  } else if (iconName === 'RiNumber7') {
    color = 'brown'
    Icon = <RiNumber7 style={{ fontSize: '250%' }} />
  } else if (iconName === 'RiNumber8') {
    color = 'gold'
    Icon = <RiNumber8 style={{ fontSize: '250%' }} />
  } else if (iconName === 'RiNumber9') {
    color = 'violet'
    Icon = <RiNumber9 style={{ fontSize: '250%' }} />
  } else if (iconName === 'RiNumber0') {
    color = 'indigo'
    Icon = <RiNumber0 style={{ fontSize: '250%' }} />
  } else {
    Icon = <></>
  }

  return (
    <Box sx={{ borderRadius: '10px', m: 1 }} >
      <Grid container  >
        <Grid item xs={2} sx={{ bgcolor: c1, color: c2, borderTopLeftRadius: '10px', borderBottomLeftRadius: '10px' }} className="flex justifyCenter alignCenter"  >
          {Icon}
        </Grid>
        <Grid item xs={10}>
          <Box sx={{ pl: 2, bgcolor: c2, color: c1 }} >
            <Typography variant='h6'>{heading1}</Typography>
            <Typography variant='body'>{heading2}</Typography>
          </Box>
          <Box className='flex' sx={{ justifyContent: 'flex-end', pr: 2, bgcolor: c2, color: c1 }} >
            <Typography>{date}</Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}
