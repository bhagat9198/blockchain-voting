import { Box, Button, Container, Divider, TextareaAutosize, TextField } from '@mui/material'
import React from 'react'
import ContainerLabel from '../../components/ContainerLabel'
import MuiAccordion from '../../components/MuiAccordion'
import BodyLayout from '../common/BodyLayout'

export default function Donate() {
  return (
    <BodyLayout>
      <Container className='flex alignCenter' >
        <Container sx={{ width: "70%" }} >
          <Box sx={{ my: 3 }} >
            <ContainerLabel label="Add Donation" />
            <Container >
              <Box sx={{ my: 2 }} >
                <TextField fullWidth id="outlined-basic" label="Heading" variant="outlined" />
              </Box>
              <Box>
                <TextareaAutosize
                  aria-label="empty textarea"
                  placeholder="Why people should donate you? Any Social Cause?"
                  minRows={3}
                  style={{ width: "93%", marginBottom: '20px', padding: "20px" }}
                />
              </Box>
              <Box>
                <Button fullWidth variant='contained'>Add Your Donation</Button>
              </Box>
            </Container>
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
