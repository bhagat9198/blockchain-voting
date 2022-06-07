import { ADMIN_SETTINGS, ALL_ADMINS, ALL_ANNOUNCEMENTS, ALL_BLOGS, ALL_DONATIONS, LATEST_ANNOUNCEMENTS, LATEST_BLOGS, LATEST_DONATIONS, UPDATE_PARTY } from "../actions/common";
import { SETTINGS, UPDATE_SETTING_RESULT, UPDATE_SETTING_VOTE } from "../actions/privliged";

const initialState = {
  admins: [],
  blogs: [],
  latestBlogs: [],
  announcements: [],
  latestAnnouncements: [],
  donations: [],
  latestDonations: [],
  settings: {
    updated: false,
  },
  // party: {
  //   status: false,
  //   data: {}
  // }
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
    case LATEST_ANNOUNCEMENTS: {
      return {
        ...state,
        latestAnnouncements: action.latestAnnouncements
      }
    }
    case ALL_BLOGS: {
      return {
        ...state,
        blogs: action.blogs
      }
    }
    case LATEST_BLOGS: {
      return {
        ...state,
        latestBlogs: action.latestBlogs
      }
    }
    case ALL_DONATIONS: {
      return {
        ...state,
        donations: action.donations
      }
    }
    case LATEST_DONATIONS: {
      return {
        ...state,
        latestDonations: action.latestDonations
      }
    }
    case ADMIN_SETTINGS: {
      return {
        ...state,
        settings: {...action.settings, updated: true}
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
    case UPDATE_PARTY: {
      return {
        ...state,
        party: action.party
      }
    }
    default:
      return state;
  }
}

export default miscellaneousRed;