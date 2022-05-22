import React, { useEffect, useState } from 'react'
import BodyLayout from '../../components/BodyLayout'
import ResultCommon from './../common/Result'

export default function Result(props) {
  const { userType } = props;

  return (
    <BodyLayout userType={userType} >
      <ResultCommon />
    </BodyLayout>
  )
}
