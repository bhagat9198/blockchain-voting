import { Box, Button, Container, Divider, Grid, TextareaAutosize, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import BodyLayout from '../../components/BodyLayout'
import ContainerLabel from '../../components/ContainerLabel'
import MuiAccordion from '../../components/MuiAccordion'
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux'
import { addAnnouncement } from '../../store/actions/privliged'
import { allAnnouncements as allAnnouncementsFun } from '../../store/actions/common'
import { format } from 'date-fns';

export default function Announcement(props) {
  const { userType } = props;
  const [heading, setHeading] = useState('');
  const [body, setBody] = useState('');
  const miscellaneousRed = useSelector(state => state.miscellaneousRed);
  const dispatch = useDispatch();
  const allAnnouncements = miscellaneousRed.announcements;

  let updatedAnnouncements = allAnnouncements.map(annocemnet => {
    // console.log('annocemnet.createdAt :: ', annocemnet.createdAt);
    const d = new Date(Number(annocemnet.createdAt));
    const date = format(d, 'dd-MMM-yyyy');
    return {
      _id: annocemnet._id,
      heading: annocemnet.heading,
      subheading: date,
      body: annocemnet.body
    }
  })

  useEffect(() => {
    async function asyncFun() {
      const res = await dispatch(allAnnouncementsFun());
      if (!res.status) {
        toast.error(res.message);
        return;
      }
    }
    asyncFun()
  }, [])

  const addAnnouncementHandler = async (e) => {
    if (!heading || !body) {
      toast.error('Please fill up all the fields');
      return;
    }

    const res = await dispatch(addAnnouncement({ heading, body }));
    // console.log('addAnnouncementHandler :: res ::', res);
    if (!res.status) {
      toast.error(res.message);
      return;
    }
    toast.success('Announcement added successfully');

  }

  return (
    <BodyLayout userType={userType} >
      <Container className='flex alignCenter' >
        <Container sx={{ width: "90%" }} >
          <Box sx={{ my: 3 }} >
            <ContainerLabel label="Add Announcement" />
            <Container >
              <Box sx={{ my: 2 }} >
                <TextField
                  fullWidth id="outlined-basic" label="Heading"
                  variant="outlined"
                  onChange={e => setHeading(e.target.value)}
                />
              </Box>
              <Box>
                <TextareaAutosize
                  aria-label="empty textarea"
                  placeholder="Your Message"
                  minRows={3}
                  style={{ width: "93%", marginBottom: '20px', padding: "20px" }}
                  onChange={e => setBody(e.target.value)}
                />
              </Box>
              <Box>
                <Button
                  fullWidth variant='contained'
                  onClick={addAnnouncementHandler}
                >Add Your Announcement</Button>
              </Box>
            </Container>
          </Box>
          <Divider />
          <Box sx={{ my: 3 }} >
            <ContainerLabel label="All Announcements" />
            <Container>
              <MuiAccordion list={updatedAnnouncements} />
            </Container>
          </Box>
        </Container>
      </Container>
    </BodyLayout>
  )
}
