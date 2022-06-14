
import { UPDATE_W3_ACCOUNT } from '../actions/common';
import { SIGNUP, USER_SETUP } from './../actions/auth';

const initialState = {
  isAdmin: false,
  isVoter: false,
  isElectionParty: false,
  userData: {},
  status: false,
  token: {
    value: '',
    label: ''
  },
}

const userRed = (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP:
      return {
        ...state,
        userData: action.userData,
        isVoter: action.isVoter,
        isAdmin: action.isAdmin,
        isElectionParty: action.isElectionParty,
        status: action.status,
      }
    case USER_SETUP:
      return {
        ...state,
        userData: action.userData,
        isVoter: action.isVoter,
        isAdmin: action.isAdmin,
        isElectionParty: action.isElectionParty,
        status: action.status,
        token: action.token,
      }
    case UPDATE_W3_ACCOUNT: 
      return {
        ...state,
        w3Account: action.account
      }
    default:
      return state;
  }
}

export default userRed;