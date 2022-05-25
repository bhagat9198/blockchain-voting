import { Box, Button, Container, Grid, TextareaAutosize, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { IoMdAdd } from 'react-icons/io';
import ContainerLabel from '../../components/ContainerLabel';
import CardStats2 from '../../components/CardStats2';
import MuiModal from '../../components/MuiModal';
import postImg from './../../assets/images/post.jpeg';
import BodyLayout from '../../components/BodyLayout';

export default function Blog(props) {
  const { userType } = props;
  const [addBlog, setAddBlog] = useState(false);
  const [readBlog, setReadBlog] = useState(false);
  const [deleteBlog, setDeleteBlog] = useState(false);
  const [heading, setHeading] = useState('');
  const [p1, setP1] = useState('');
  const [p2, setP2] = useState('');
  const [p3, setP3] = useState('');
  const [img, setImg] = useState('');

  const addBlogHandler = e => {
    const formData = new FormData();
    formData.append('heading', heading);
    formData.append('p1', p1);
    formData.append('p2', p2);
    formData.append('p3', p3);
    formData.append('img', img);
    console.log('Blog :: addBlogHandler :: formData :: ', formData);
  }

  const blogFileHandler = e => {
    if (!e.target.files || e.target.files.length === 0) return;

    // console.log('Blog :: blogFileHandler :: files :: ', e.targets.files);
    // const file = e.targets.files[0];
    setImg(e.targets.files[0]);
  }

  return (
    <BodyLayout userType={userType} >
      <Container sx={{ my: 5 }} >
        <Box className="flex " >
          <Box sx={{ flexGrow: 1 }}></Box>
          <Button onClick={() => setAddBlog(true)} variant='outlined' startIcon={<IoMdAdd />}> Add Blog</Button>
        </Box>
        <Box>
          <ContainerLabel label="All Blogs" />
          <Grid container spacing={3}>
            <Grid item xs={12} sm={3} >
              <CardStats2
                cardActions={[{ label: 'read_more', fun: setReadBlog }, { label: 'delete', fun: setDeleteBlog }]}
                heading={'haeding lol'}
                subject={'skjdnfj sodjfohs iosdhfoh '}
              />
            </Grid>
            <Grid item xs={12} sm={3} >
              <CardStats2
                cardActions={[{ label: 'read_more', fun: setReadBlog }, { label: 'delete', fun: setDeleteBlog }]}
                heading={'haeding lol'}
                subject={'skjdnfj sodjfohs iosdhfoh '}
              />
            </Grid>
            <Grid item xs={12} sm={3} >
              <CardStats2
                cardActions={[{ label: 'read_more', fun: setReadBlog }, { label: 'delete', fun: setDeleteBlog }]}
                heading={'haeding lol'}
                subject={'skjdnfj sodjfohs iosdhfoh '}
              />
            </Grid>
          </Grid>
        </Box>
      </Container>
      <Container id="aaa">
        <MuiModal open={addBlog} setOpen={setAddBlog} title={'Add Blog'} cardActions={[{ label: 'submit', fun: addBlogHandler }]}  >
          <Box sx={{ my: 3 }} >
            <TextField fullWidth id="outlined-basic" label="Heading" variant="outlined" />
          </Box>
          <Box>
            <TextareaAutosize
              aria-label="empty textarea"
              placeholder="Paragraph 1"
              minRows={3}
              style={{ width: "88%", marginBottom: '20px', padding: "20px" }}
            />
          </Box>
          <Box>
            <TextareaAutosize
              aria-label="empty textarea"
              placeholder="Paragraph 2"
              minRows={3}
              style={{ width: "88%", marginBottom: '20px', padding: "20px" }}
            />
          </Box>
          <Box>
            <TextareaAutosize
              aria-label="empty textarea"
              placeholder="Paragraph 3 (Optional)"
              minRows={3}
              style={{ width: "88%", marginBottom: '20px', padding: "20px" }}
            />
          </Box>
          <Box>
            <TextField type="file" />
          </Box>
        </MuiModal>
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
