import { Container, Divider, Grid, Typography } from '@mui/material'
import React from 'react'
import BodyLayout from '../../components/BodyLayout'
import projectScope from './../../assets/images/projectScope.jpeg'

const moto = [
  "An authority must conduct the elections, who should be free of political interference",
  "A set of laws is required to govern the elections. The authority in charge of conducting the elections will hold these laws",
  "A redressal mechanism for the resolution of doubts and disputes that arise out of the elections "
]

export default function Docs() {

  return (
    <BodyLayout>
      <Container sx={{ py: 3 }}>
        <GridRightImg />
        <Divider />
        <GridLeftImg />
        <Divider />
        <GridRightImg />
        <Divider />
        <GridLeftImg />
        <Divider />
      </Container>
    </BodyLayout>
  )
}


const GridRightImg = () => {
  return <Grid container spacing={3} sx={{ py: 2, my: 2 }} >
    <Grid item xs={12} sm={8}>
      <Container>
        <Typography gutterBottom variant='h4'>About The Project</Typography>
        <Typography>
          We are trying to make a shift from <i>paper-ballot </i>voting to <i>dApp</i><b>( Decentralized Applications)</b> voting system with the help of blockchain technology. Thus our focus to move away from centerlized(elecrctoral office main head)  and single source of truth (elecrctoral machines) to Decentralized (everyone on same ground) and multiple source of truth (blockchain nodes).<br />
          Hence, keeping this as main idea, this project is built. <br />
          Aparrt from voting, we want to keep the user(voter) engage by other activities and updating user with all the latestest political info which is happeneing by articales(blogs), important annocemnets and also donations.<br />
          <ul>
            <li><b>Donations : </b>
              From time to time government ask for help from citizen of India for some donation (Eg: as happnened in covid time). Thus, for this also we have implemented blockchain so 100% transparency in donations made by user and there will be no reason to suspect.
            </li>
            <li><b>Blogs/Annocemnets : </b>
              From time to time elecrctoral parties can write blogs on what they are doing ahead (Eg: quaterly planning, work done, etc) and all this can be imformed to users by blogs which they can read it just like newspaper.
            </li>
          </ul>
        </Typography>
      </Container>
    </Grid>
    <Grid item xs={12} sm={4}>
      <Container>
        <img src={projectScope} alt="projectScope" style={{ objectFit: 'contain', height: '100%', width: '100%' }} />
      </Container>
    </Grid>
  </Grid>
}

const GridLeftImg = () => {
  return <Grid container spacing={3} sx={{ py: 2, my: 2 }} >
    <Grid item xs={12} sm={4}>
      <Container>
        <img src={projectScope} alt="projectScope" style={{ objectFit: 'contain', height: '100%', width: '100%' }} />
      </Container>
    </Grid>
    <Grid item xs={12} sm={8}>
      <Container>
        <Typography gutterBottom variant='h4'>Technologies Into Project </Typography>
        <Typography>
          Our proect is manily divived into 3 parts :-
          <ul>
            <li>
              <b>Frontend </b>
              We have build our frontend with help of <i>React library</i> and with other sub third party packages to make the development process hussel free. To make the elegant UI with screen responsive i.e, differnt ui for laptop/pc (bigger screens), tablets (medium screen) and lastr not the least mobiles (smalles screen) we are making use of <i>Material UI</i>.
            </li>
            <li>
              <b>Backend </b>
              Our backend is build on NodeJS (a single threaded JavaScript runtime built on Chrome's V8 JavaScript engine). It is required so as to store the other info apart from voting in DB as storing on blockchain can coast alot. Thus, from authentication to autherization, sending data (to user) to reciving data (from user) all is managed by our node server with help of <i>ExpressJs</i>
            </li>
            <li>
              <b>Blockchian </b>
              It is the most critical/haert of the application. It will be interacting with user Web3 space to etherium bloackchain technology were millions of nodes are already connected and forming in network in itself. Thus, it help us to do voting and donation(sending money) feature of the project. Bloackchain comprises of many other tehnologies itself such as Truffle, Gnagghe, Metamask, Web3, Etherium, etc.
            </li>
          </ul>
        </Typography>
      </Container>
    </Grid>

  </Grid>
}