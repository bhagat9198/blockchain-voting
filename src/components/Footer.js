import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { AiOutlineCopyrightCircle } from 'react-icons/ai'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <Box sx={{ background: '#1976d2', color: 'white', display: 'flex', alignItems: 'center', p: 2, justifyContent: 'space-between' }} >
      <Box>
      <Typography variant='h6'>
        <AiOutlineCopyrightCircle /> 2022 Electrol Office
      </Typography>
      </Box>
      <Box className="flex ">
      <Link to='/docs' style={{ textDecoration: 'none', color: 'white', paddingLeft: '20px' }} >
        <Typography variant='h6'>
          About Project
        </Typography>
      </Link>
      <Link to='/about-us' style={{ textDecoration: 'none', color: 'white', paddingLeft: '20px' }} >
        <Typography variant='h6'>
          About Us
        </Typography>
      </Link>

      </Box>
    </Box>
  )
}
