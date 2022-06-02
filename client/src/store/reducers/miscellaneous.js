import { ALL_ADMINS, ALL_ANNOUNCEMENTS, ALL_BLOGS, ALL_DONATIONS } from "../actions/common";
import { SETTINGS, UPDATE_SETTING_RESULT, UPDATE_SETTING_VOTE } from "../actions/privliged";

const initialState = {
  admins: [],
  blogs: [],
  announcements: [],
  donations: [],
  settings: {},
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
    case SETTINGS: {
      return {
        ...state,
        settings: action.settings
      }
    }
    case UPDATE_SETTING_VOTE: {
      return {
        ...state,
        settings: {
          ...state.settings,
          votingPhase: action.status
        }
      }
    }
    case UPDATE_SETTING_RESULT: {
      return {
        ...state,
        settings: {
          ...state.settings,
          results: action.status
        }
      }
    }
    default:
      return state;
  }
}

export default miscellaneousRed;