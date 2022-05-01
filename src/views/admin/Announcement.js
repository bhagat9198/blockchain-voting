import { Box, Button, Container, Divider, Grid, TextareaAutosize, TextField } from '@mui/material'
import React from 'react'
import BodyLayout from '../../components/BodyLayout'
import ContainerLabel from '../../components/ContainerLabel'
import MuiAccordion from '../../components/MuiAccordion'

export default function Announcement() {
  return (
    <BodyLayout>
      <Container className='flex alignCenter' >
        <Container sx={{ width: "90%" }} >
          <Box sx={{ my: 3 }} >
            <ContainerLabel label="Add Announcement" />
            <Container >
              <Box sx={{ my: 2 }} >
                <TextField fullWidth id="outlined-basic" label="Heading" variant="outlined" />
              </Box>
              <Box>
                <TextareaAutosize
                  aria-label="empty textarea"
                  placeholder="Your Message"
                  minRows={3}
                  style={{ width: "93%", marginBottom: '20px', padding: "20px" }}
                />
              </Box>
              <Box>
                <Button fullWidth variant='contained'>Add Your Announcement</Button>
              </Box>
            </Container>
          </Box>
          <Divider />
          <Box sx={{ my: 3 }} >
            <ContainerLabel label="All Announcements" />
            <Container>
              <MuiAccordion list={[1, 2, 3]} />
            </Container>
          </Box>
        </Container>
      </Container>
    </BodyLayout>
  )
}
