import { SIGNUP } from './../actions/auth';

const initialState = {
  isAdmin: false,
  isVoter: false,
  isElectionParty: false,
  userData: {},
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
      }
    default:
      return state;
  }
}

export default userRed;