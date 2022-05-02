import { Box, Button, Container, Divider, FormControl, Grid, InputLabel, MenuItem, Select } from '@mui/material'
import React, {useState} from 'react'
import CardStats from '../../components/CardStats'
import ContainerLabel from '../../components/ContainerLabel'
import MuiTableAdvance from '../../components/MuiTableAdvance'
import { BsCaretRight } from 'react-icons/bs';
import { useSelector, useDispatch } from 'react-redux';


export default function Result() {
  const [state, setState] = useState('');
  const [district, setDistrict] = useState('');
  const configRedData = useSelector(state => state.configRed);
  const dispatch = useDispatch();

  const stateHandler = e => {

  }

  const districtHandler = e => {

  }

  return (
    <Grid container style={{ height: '100%' }} >
      <Grid item sx={12} sm={3} style={{ minWidth: '250px', borderRight: '1px solid #DDD', }} >
        <Container>
          <ContainerLabel label="Top Leading Parties" />
          <CardStats heading1={'Party 1'} heading2={'Name 1'} iconName={'RiNumber1'} style={{ m: 2 }} />
          <CardStats heading1={'Party 1'} heading2={'Name 1'} iconName={'RiNumber2'} style={{ m: 2 }} />
          <CardStats heading1={'Party 1'} heading2={'Name 1'} iconName={'RiNumber3'} style={{ m: 2 }} />
        </Container>
      </Grid>
      <Grid item sx={12} sm={9} >
        <Container>
          <ContainerLabel label="All Top Parties" />
          <Box sx={{ py: 3 }}>
            <MuiTableAdvance />
          </Box>
        </Container>
        <Divider />
        <Container>
          <ContainerLabel label="Search Specific Party Result" />
          <Box>
            <Grid container spacing={1}>
              <Grid item sm={5}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">State</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={state}
                    label="State"
                    onChange={stateHandler}
                  >
                    {configRedData.states.map(state => <MenuItem value={state}>{state}</MenuItem>)}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item sm={5}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">District</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={district}
                    label="District"
                    onChange={districtHandler}
                  >
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item sm={2}>
                <Button fullWidth variant='contained' sx={{ px: 5 }}><BsCaretRight style={{ fontSize: '300%' }} /></Button>
              </Grid>
            </Grid>
            <Box sx={{ py: 5 }} >
              <MuiTableAdvance />
            </Box>
          </Box>
        </Container>
      </Grid>
    </Grid>
  )
}
