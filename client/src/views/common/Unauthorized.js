import React from 'react'
import Error from '../Error'

export default function Unauthorized() {
  return (
    <Error errorCode="401" message="Wait for Admin to verify your details. Visit again after some time." />
  )
}
