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

export default function AllBlogs() {
  const [readBlog, setReadBlog] = useState({ status: false, data: { heading: '', p1: '', p2: '', p3: '' } });
  const [deleteBlog, setDeleteBlog] = useState(false);
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

  return (
    <>
      {
        allBlogs.map(b => <Grid item xs={12} sm={4} >
          <CardStats2
            cardActions={[{ label: 'read_more', fun: setReadBlog }, { label: 'delete', fun: setDeleteBlog }]}
            heading={b.heading}
            subject={b.p1}
            allData={b}
            img={`${BASE_URL}/${b.imgPath}/${b.imgName}`}
          />
        </Grid>)
      }
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
    </>
  )
}
