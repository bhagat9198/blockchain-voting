import { Box, Button, Container, Divider, TextareaAutosize, TextField } from '@mui/material'
import React, { useEffect } from 'react'
import BodyLayout from '../../components/BodyLayout'
import ContainerLabel from '../../components/ContainerLabel'
import MuiAccordion from '../../components/MuiAccordion'
import AddDonation from '../common/AddDonation'
import { format } from 'date-fns';
import { allDonations as allDonationsFun } from '../../store/actions/common'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify';

export default function Donate(props) {
  const { userType } = props;
  const miscellaneousRed = useSelector(state => state.miscellaneousRed);
  const allDonations = miscellaneousRed.donations;
  const dispatch = useDispatch();
  // console.log('Donate :: allDonations :: ', allDonations);

  useEffect(() => {
    async function asyncFun() {
      const res = await dispatch(allDonationsFun());
      if (!res.status) {
        toast.error(res.message);
        return;
      }
    }
    asyncFun()
  }, [])

  const updatedDonations = allDonations.map(donation => {
    const d = new Date(Number(donation.createdAt));
    const date = format(d, 'dd-MMM-yyyy');
    return {
      heading: donation.heading,
      body: donation.cause,
      subheading: date
    }
  })

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
              <MuiAccordion list={updatedDonations} />
            </Container>
          </Box>
        </Container>
      </Container>
    </BodyLayout>
  )
}
