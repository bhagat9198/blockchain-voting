import { ALL_ADMINS } from "../actions/common";

const initialState = {
  admins: [],
  blogs: [],
  announcement: [],
  donations: []
}

const miscellaneousRed = (state = initialState, action) => {
  switch (action.type) {
    case ALL_ADMINS:
      return {
        ...state,
        admins: action.admins
      }
    default:
      return state;
  }
}

export default miscellaneousRed;