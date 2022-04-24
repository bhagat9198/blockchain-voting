import { Breadcrumbs, Card, CardActions, Divider, Grid, Link, Paper, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system'
import React from 'react'
import BodyLayout from '../common/BodyLayout'
import { MdHowToVote } from 'react-icons/md'
import Chart from "react-apexcharts";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

const StatsCard = (props) => {
  const { number, title, color } = props;
  return <>
    <Paper sx={{ background: `${color}`, p: 2, borderRadius: '10px', display: 'flex', justifyContent: 'space-between' }}>
      <Box>
        <Typography variant='h4'>{number}</Typography>
        <Typography variant='subtitle1' sx={{ color: 'gray', fontWeight: 'bold' }} >{title}</Typography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
        <MdHowToVote style={{ fontSize: '250%' }} />
      </Box>
    </Paper>
  </>
}


const StatsChart = (props) => {
  let state = {
    options: {
      chart: {
        id: "basic-bar"
      },
      xaxis: {
        categories: ['15 april', '16 april', '17 april', '18 april', '19 april', '20 april', '21 april']
      }
    },
    series: [
      {
        name: "series-1",
        data: [30, 40, 45, 50, 49, 60, 70, 91]
      }
    ]
  };

  return (<div >
    <div >
      <div >
        <Chart
          options={state.options}
          series={state.series}
          type="bar"
          height='400px'
        />
      </div>
    </div>
  </div>)

}

export default function Dashboard() {
  return (
    <BodyLayout>
      <Box sx={{ mx: 2, mb: 4, mt: 10 }}>
        <StatsHeading label="Top Trending" />
        <Grid container spacing={2} >
          <Grid item xs={6} sm={3} >
            <StatsCard number="400k" title="Total Voters" color="salmon" />
          </Grid>
          <Grid item xs={6} sm={3}>
            <StatsCard number="400k" title="Total Voters" color="yellow" />
          </Grid>
          <Grid item xs={6} sm={3}>
            <StatsCard number="400k" title="Total Voters" color="light-blue" />
          </Grid>
          <Grid item xs={6} sm={3}>
            <StatsCard number="400k" title="Total Voters" color="orange" />
          </Grid>
        </Grid>
      </Box>
      <Divider />

      <Box>
        <StatsHeading label="All Votings" />

        <StatsChart />
      </Box>

    </BodyLayout>
  )
}


const StatsHeading = (props) => {
  const { label } = props;

  return (
    <Box sx={{ borderRadius: '10px', border: '1px solid gray', p: 3, m: 3, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Typography fontWeight='bold' >{label}</Typography>
    </Box>
  )
}


// const MyBreadcrumb = () => {

//   const breadcrumbs = [
//     <Typography key="3" color="text.primary">
//       Breadcrumb
//     </Typography>
//   ];
//   return (<Stack spacing={2}>
//     <Breadcrumbs
//       separator={<NavigateNextIcon fontSize="small" />}
//       aria-label="breadcrumb"
//     >
//       {breadcrumbs}
//     </Breadcrumbs>
//   </Stack>)
// }