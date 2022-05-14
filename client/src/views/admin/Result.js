import { Button, Container, Divider, FormControl, Grid, InputLabel, MenuItem, Select, Typography } from '@mui/material'
import { Box } from '@mui/system'

import React, { useState } from 'react'
import CardStats from '../../components/CardStats'
import ContainerLabel from '../../components/ContainerLabel'
import BodyLayout from '../../components/BodyLayout'
import MuiTableAdvance from '../../components/MuiTableAdvance'
import ResultCommon from './../common/Result'

export default function Result(props) {
  const { userType } = props;

  return (
    <BodyLayout userType={userType} >
      <ResultCommon />
    </BodyLayout>
  )
}
