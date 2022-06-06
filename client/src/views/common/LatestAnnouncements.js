import { Container, Grid } from '@mui/material';
import { format } from 'date-fns';
import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import CardStats1 from '../../components/CardStats1';
import ContainerLabel from '../../components/ContainerLabel';
import { latestAnnouncements as latestAnnouncementsFun } from './../../store/actions/common';


export default function LatestAnnouncements() {
  const miscellaneousRed = useSelector(state => state.miscellaneousRed);
  const latestAnnouncements = miscellaneousRed.latestAnnouncements;
  const dispatch = useDispatch();


  useEffect(() => {
    async function asyncFun() {
      const res = await dispatch(latestAnnouncementsFun());
      if (!res.status) {
        toast.error(res.message);
        return;
      }
    }
    asyncFun()
  }, [])
  
  return (
    <Container sx={{ pb: 3 }} >
      <ContainerLabel label="Top Annocemnets" />
      <Grid container spacing={0}>
        {latestAnnouncements.map((announcement, index) => {
          const d = new Date(Number(announcement.createdAt));
          const date = format(d, 'dd-MMM');
          return (<Grid item xs={12} sm={6} key={`annocement_${index}`}>
            <CardStats1 iconName={`RiNumber${index + 1}`} heading1={announcement.heading} heading2={announcement.body} date={date} />
          </Grid>)
        })}
      </Grid>
    </Container>
  )
}
