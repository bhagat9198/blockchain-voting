import { Breadcrumbs, Card, CardActions, Container, Divider, Grid, Link, Paper, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system'
import React from 'react'
import { MdHowToVote } from 'react-icons/md'
import Chart from "react-apexcharts";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import ContainerLabel from '../../components/ContainerLabel';
import CardStats from '../../components/CardStats';
import BodyLayout from '../../components/BodyLayout';


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
      <Container sx={{ mb: 4,  }}>
        <ContainerLabel label="Top Trending" />
        <Grid container spacing={2} >
          <Grid item xs={6} sm={3} >
            <CardStats heading1="400k" heading2="Total Voters" />
          </Grid>
          <Grid item xs={6} sm={3}>
            <CardStats heading1="400k" heading2="Total Voters" />
          </Grid>
          <Grid item xs={6} sm={3}>
            <CardStats heading1="400k" heading2="Total Voters" />
          </Grid>
          <Grid item xs={6} sm={3}>
            <CardStats heading1="400k" heading2="Total Voters" />
          </Grid>
        </Grid>
      </Container>
      <Divider />

      <Container>
        <ContainerLabel label="Voting Per Day" />
        <StatsChart />
      </Container>

    </BodyLayout>
  )
}
