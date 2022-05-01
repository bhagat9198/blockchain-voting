import { Box, Button, Container, Grid, TextareaAutosize, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { IoMdAdd } from 'react-icons/io';
import ContainerLabel from '../../components/ContainerLabel';
import CardStats2 from '../../components/CardStats2';
import MuiModal from '../../components/MuiModal';
import postImg from './../../assets/images/post.jpeg';
import BodyLayout from '../../components/BodyLayout';

export default function Blog() {
  const [readBlog, setReadBlog] = useState(false);

  return (
    <BodyLayout>
      <Container sx={{ my: 5 }} >
        <Box>
          <ContainerLabel label="All Blogs" />
          <Grid container spacing={3}>
            <Grid item xs={12} sm={3} >
              <CardStats2
                cardActions={[{ label: 'read_more', fun: setReadBlog }]}
                heading={'haeding lol'}
                subject={'skjdnfj sodjfohs iosdhfoh '}
              />
            </Grid>
            <Grid item xs={12} sm={3} >
              <CardStats2
                cardActions={[{ label: 'read_more', fun: setReadBlog }]}
                heading={'haeding lol'}
                subject={'skjdnfj sodjfohs iosdhfoh '}
              />
            </Grid>
            <Grid item xs={12} sm={3} >
              <CardStats2
                cardActions={[{ label: 'read_more', fun: setReadBlog }]}
                heading={'haeding lol'}
                subject={'skjdnfj sodjfohs iosdhfoh '}
              />
            </Grid>
          </Grid>
        </Box>
      </Container>
      <MuiModal open={readBlog} setOpen={setReadBlog} title={'Blog Title'} >
        <Box sx={{ maxHeight: "200px", maxWidth: "320px", p: 1 }} className="flex justifyCenter alignCenter" >
          <img alt='blog img' src={postImg} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </Box>
        <Typography variant='body1' sx={{ py: 1 }} >
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has
        </Typography>
        <Typography variant='body1' sx={{ py: 1 }} >
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has
        </Typography>
        <Typography variant='body1' sx={{ py: 1 }} >
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has
        </Typography>
      </MuiModal>
    </BodyLayout>
  )
}
