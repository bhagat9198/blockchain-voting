import { Box } from '@mui/material'
import React from 'react'
import BasicProfileInfo from '../../components/BasicProfileInfo'
import BodyLayout from '../common/BodyLayout'

export default function Profile() {
  return (
    <BodyLayout>
      <Box>
        <BasicProfileInfo />
      </Box>
    </BodyLayout>
  )
}
