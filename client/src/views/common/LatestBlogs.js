import { Container, Grid } from '@mui/material';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import CardStats2 from '../../components/CardStats2';
import ContainerLabel from '../../components/ContainerLabel';
import { BASE_URL } from '../../util';
import { latestBlogs as latestBlogsFun } from './../../store/actions/common';

export default function LatestBlogs() {
  const miscellaneousRed = useSelector(state => state.miscellaneousRed);
  const latestBlogs = miscellaneousRed.latestBlogs;
  const dispatch = useDispatch();

  useEffect(() => {
    async function asyncFun() {
      const res = await dispatch(latestBlogsFun());
      if (!res.status) {
        toast.error(res.message);
        return;
      }
    }
    asyncFun()
  }, [])


  return (
    <Container sx={{ py: 3 }}>
      <ContainerLabel label="Top Blogs" />
      <Grid container spacing={2}>
        {latestBlogs.map((blog, i) => {
          return (
            <Grid item sx={12} sm={3} key={`blog_${i}`}>
              <CardStats2 
                heading={blog.heading}
                subject={blog.p1} 
                img={`${BASE_URL}/${blog.imgPath}/${blog.imgName}`} />
            </Grid>
          );
        })}
      </Grid>
    </Container>
  )
}
