import React from 'react'
import BodyLayout from '../../components/BodyLayout'
import VoteCommon from './../common/Vote';

export default function Vote(props) {
  const { userType } = props;

  return (
    <BodyLayout userType={userType} >
      <VoteCommon userType={userType} />
    </BodyLayout>
  )
}
