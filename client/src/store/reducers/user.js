const initialState = {
  isAdmin: false,
  isVoter:false,
  isElectionParty: false,
  userData: {},
  
}

const authRed = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
}

export default authRed;