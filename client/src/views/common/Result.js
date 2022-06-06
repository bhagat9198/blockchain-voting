import { Box, Button, Container, Divider, FormControl, Grid, InputLabel, MenuItem, Select } from '@mui/material'
import React, { useEffect, useState } from 'react'
import CardStats from '../../components/CardStats'
import ContainerLabel from '../../components/ContainerLabel'
import MuiTableAdvance from '../../components/MuiTableAdvance'
import { BsCaretRight } from 'react-icons/bs';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useNavigate, Navigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { adminSettings as adminSettingsFun } from './../../store/actions/common'

export default function Result(props) {
  const { userType } = props;
  const [state, setState] = useState('');
  const [district, setDistrict] = useState('');
  const configRedData = useSelector(state => state.configRed);
  const miscellaneousRed = useSelector(state => state.miscellaneousRed);
  const adminSettings = miscellaneousRed.settings;
  // const navigate = useNavigate();
  const location = useLocation()
  // console.log('Result :: location :: ', location);
  const { search: queryParams } = useLocation()
  const dispatch = useDispatch();

  useEffect(() => {
    if (adminSettings.updated) return;

    async function asyncFun() {
      const res = await dispatch(adminSettingsFun());
      if (!res.status) {
        toast.error(res.message);
        return;
      }
    }
    asyncFun()
  }, [])

  // const stateHandler = e => {

  // }

  // const districtHandler = e => {

  // }

  if (!adminSettings.results && adminSettings.updated) {
    toast.warning('You cant see results at moment. Kindly wait. ');
    return <Navigate replace to={`/${location.pathname.split('/')[1]}${queryParams}`} />
  }

  return (
    <Grid container style={{ height: '100%' }} >
      <Grid item xs={12} sm={3} style={{ minWidth: '250px', borderRight: '1px solid #DDD', }} >
        <Container>
          <ContainerLabel label="Top Leading Parties" />
          <CardStats heading1={'Party A'} heading2={'Ajiith'} iconName={'RiNumber1'} style={{ m: 2 }} />
          <CardStats heading1={'Party B'} heading2={'Akhil'} iconName={'RiNumber2'} style={{ m: 2 }} />
          <CardStats heading1={'Party c'} heading2={'Govindha'} iconName={'RiNumber3'} style={{ m: 2 }} />
        </Container>
      </Grid>
      <Grid item xs={12} sm={9} >
        <Container>
          <ContainerLabel label="All Top Parties" />
          <Box sx={{ py: 3 }}>
            <MuiTableAdvance />
          </Box>
        </Container>
        {/*  <Divider />
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
                    {configRedData.states.map((state, index) =>
                      <MenuItem value={state} key={`menu_item_${index}`} >{state}</MenuItem>)}
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
              <MuiTableAdvance isCkeckboxReq={false} />
            </Box>
          </Box>
        </Container> */}
      </Grid>
    </Grid>
  )
}
