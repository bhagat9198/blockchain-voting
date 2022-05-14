import { Box } from '@mui/material'
import React from 'react'
import BasicProfileInfo from '../../components/BasicProfileInfo'
import BodyLayout from '../../components/BodyLayout'

export default function Profile(props) {
  const { userType } = props;

  return (
    <BodyLayout userType={userType} >
      <Box>
        <BasicProfileInfo />
      </Box>
    </BodyLayout>
  )
}
