import { Box, Button, Container, Divider, TextareaAutosize, TextField } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import BodyLayout from '../../components/BodyLayout'
import ContainerLabel from '../../components/ContainerLabel'
import MuiAccordion from '../../components/MuiAccordion'
import AddDonation from '../common/AddDonation'

export default function Donate(props) {
  const { userType } = props;
  const miscellaneousRed = useSelector(state => state.miscellaneousRed);
  const allDonations = miscellaneousRed.donations;

  return (
    <BodyLayout userType={userType} >
      <Container className='flex alignCenter' >
        <Container sx={{ width: "90%" }} >
          <Box sx={{ my: 3 }} >
            <ContainerLabel label="Add Donation" />
            <AddDonation />
          </Box>
          <Divider />
          <Box sx={{ my: 3 }} >
            <ContainerLabel label="All Donations" />
            <Container>
              <MuiAccordion list={[1, 2, 3]} />
            </Container>
          </Box>
        </Container>
      </Container>
    </BodyLayout>
  )
}
