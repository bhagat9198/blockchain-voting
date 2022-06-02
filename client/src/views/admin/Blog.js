import { Box, Button, Container, Grid, TextareaAutosize, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { IoMdAdd } from 'react-icons/io';
import ContainerLabel from '../../components/ContainerLabel';
import CardStats2 from '../../components/CardStats2';
import MuiModal from '../../components/MuiModal';
import postImg from './../../assets/images/post.jpeg';
import BodyLayout from '../../components/BodyLayout';
import { addBlog as addBlogFun } from './../../store/actions/privliged';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { allBlogs as allBlogsFun } from './../../store/actions/common'
import { BASE_URL } from '../../util';
export default function Blog(props) {
  const { userType } = props;
  const [addBlog, setAddBlog] = useState(false);
  const [readBlog, setReadBlog] = useState({ status: false, data: { heading: '', p1: '', p2: '', p3: '' } });
  const [deleteBlog, setDeleteBlog] = useState(false);
  const [heading, setHeading] = useState('');
  const [p1, setP1] = useState('');
  const [p2, setP2] = useState('');
  const [p3, setP3] = useState('');
  const [img, setImg] = useState('');
  const miscellaneousRed = useSelector(state => state.miscellaneousRed);
  const allBlogs = miscellaneousRed.blogs;
  const dispatch = useDispatch();

  useEffect(() => {
    async function asyncFun() {
      const res = await dispatch(allBlogsFun());
      if (!res.status) {
        toast.error(res.message);
        return;
      }
    }
    asyncFun()
  }, [])

  const addBlogHandler = async (e) => {
    const data = {
      heading, p1, p2, p3, img
    };
    console.log('addBlogHandler :: data :: ', data);
    const res = await dispatch(addBlogFun(data));
    if (!res.status) {
      toast.error(res.message);
      return;
    }

    toast.success('Blog added successfully');
  }

  const blogFileHandler = e => {
    if (!e.target.files || e.target.files.length === 0) return;
    setImg(e.target.files[0]);
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
          <Grid container spacing={2}>
            {allBlogs.map(b => <Grid item xs={12} sm={4} >
              <CardStats2
                cardActions={[{ label: 'read_more', fun: setReadBlog }, { label: 'delete', fun: setDeleteBlog }]}
                heading={b.heading}
                subject={b.p1}
                allData={b}
                img={`${BASE_URL}/${b.imgPath}/${b.imgName}`}
              />
            </Grid>)}
          </Grid>
        </Box>
      </Container>
      <Container id="aaa">
        <MuiModal open={addBlog} setOpen={setAddBlog} title={'Add Blog'} cardActions={[{ label: 'submit', fun: addBlogHandler }]}  >
          <Box sx={{ my: 3 }} >
            <TextField
              fullWidth
              id="outlined-basic" label="Heading" variant="outlined"
              onChange={e => setHeading(e.target.value)}
            />
          </Box>
          <Box>
            <TextareaAutosize
              aria-label="empty textarea"
              placeholder="Paragraph 1"
              minRows={3}
              style={{ width: "100%", marginBottom: '20px', padding: "20px" }}
              onChange={e => setP1(e.target.value)}
            />
          </Box>
          <Box>
            <TextareaAutosize
              aria-label="empty textarea"
              placeholder="Paragraph 2"
              minRows={3}
              onChange={e => setP2(e.target.value)}
              style={{ width: "100%", marginBottom: '20px', padding: "20px" }}
            />
          </Box>
          <Box>
            <TextareaAutosize
              aria-label="empty textarea"
              placeholder="Paragraph 3 (Optional)"
              minRows={3}
              onChange={e => setP3(e.target.value)}
              style={{ width: "100%", marginBottom: '20px', padding: "20px" }}
            />
          </Box>
          <Box>
            <TextField type="file" onChange={blogFileHandler} />
          </Box>
        </MuiModal>
      </Container>

      <MuiModal open={readBlog.status} setOpen={val => setReadBlog({ status: false, data: { heading: '', p1: '', p2: '', p3: '' } })} title={readBlog.data.heading} style={{ width: '80%' }} >
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <Box sx={{ height: "200px", width: "520px", p: 1 }} className="flex justifyCenter alignCenter" >
            <img alt='blog img' src={`${BASE_URL}/${readBlog.data.imgPath}/${readBlog.data.imgName}`} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </Box>
          <Box>
            <Typography variant='body1' sx={{ py: 1 }} >
              {readBlog.data.p1}
            </Typography>
            <Typography variant='body1' sx={{ py: 1 }} >
              {readBlog.data.p2}
            </Typography>
            <Typography variant='body1' sx={{ py: 1 }} >
              {readBlog.data.p3}
            </Typography>
          </Box>
        </Box>
      </MuiModal>
    </BodyLayout>
  )
}
