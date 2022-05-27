import { ALL_ADMINS, ALL_ANNOUNCEMENTS, ALL_BLOGS, ALL_DONATIONS } from "../actions/common";

const initialState = {
  admins: [],
  blogs: [],
  announcements: [],
  donations: []
}

const miscellaneousRed = (state = initialState, action) => {
  switch (action.type) {
    case ALL_ADMINS:
      return {
        ...state,
        admins: action.admins
      }
    case ALL_ANNOUNCEMENTS: {
      return {
        ...state,
        announcements: action.announcements
      }
    }
    case ALL_BLOGS: {
      return {
        ...state,
        blogs: action.blogs
      }
    }
    case ALL_DONATIONS: {
      return {
        ...state,
        donations: action.donations
      }
    }
    default:
      return state;
  }
}

export default miscellaneousRed;