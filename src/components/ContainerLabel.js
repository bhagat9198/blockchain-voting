import { Box, Typography } from '@mui/material';
import React from 'react'

export default function ContainerLabel(props) {
  const { label, style } = props;

  let styles = {
    borderRadius: '10px',
    border: '1px solid gray', p: 1, my: 3
  }

  if (style) {
    styles = { ...styles, ...style }
  }

  return (
    <Box className='flex alignCenter justifyCenter' sx={styles}>
      <Typography fontWeight='bold' >{label}</Typography>
    </Box>
  )
}
