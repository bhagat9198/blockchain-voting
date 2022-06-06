import axios from 'axios';
import { BASE_URL, getUrlConfig } from '../../util';

export const POLL_RESULTS = 'POLL_RESULTS';
export const VOTE_STATUS = 'VOTE_STATUS';
export const VOTE_RESULTS_STATUS = 'VOTE_RESULTS_STATUS';
export const ALL_ADMINS = 'ALL_ADMINS';
export const ALL_ANNOUNCEMENTS = 'ALL_ANNOUNCEMENTS';
export const LATEST_ANNOUNCEMENTS = 'LATEST_ANNOUNCEMENTS';
export const ALL_DONATIONS = 'ALL_DONATIONS';
export const LATEST_DONATIONS = 'LATEST_DONATIONS';
export const ALL_BLOGS = 'ALL_BLOGS';
export const LATEST_BLOGS = 'LATEST_BLOGS';
export const ADMIN_SETTINGS = 'ADMIN_SETTINGS';
export const UPDATE_W3_ACCOUNT = 'UPDATE_W3_ACCOUNT';
export const UPDATE_PARTY = 'UPDATE_PARTY';

// let isDev = false;
// let config = {};
// if(process.env.NODE_ENV === 'development') {
//   isDev = true;
//   config = {
//     headers: {
//       isDev
//     }
//   }
// }

export const getParty = (data) => {
  return async (dispatch, getState) => {
    const allStates = await getState(state => state);
    const userRed = allStates.userRed;
    const partyId = userRed?.userData?.partyId;
    const isAdmin = userRed.isAdmin;
    const isElectionParty = userRed.isElectionParty;
    const token = userRed.token;
    const configRes = await getUrlConfig({ tokenName: token.label });
    if (!configRes?.status) {
      return {
        status: false,
        message: configRes?.message
      }
    }

    try {
      let res;
      if (isElectionParty) {
        res = await axios.get(`${BASE_URL}/election-party/${partyId}`, configRes.config);
      } else {
        return {
          status: false,
          message: 'Unauthorized user'
        }
      }
      console.log('getParty :: res :: ', res);

      dispatch({
        type: UPDATE_PARTY,
        party: res.data.data
      })

      return {
        status: true,
      }
    } catch (error) {
      console.log(error);
      return {
        status: false,
        message: error.message
      }
    }

  }
}


export const updateW3Account = (data) => {
  return async (dispatch, getState) => {
    try {
      const account = data.account;

      await dispatch({
        type: UPDATE_W3_ACCOUNT,
        account: account
      })
      return {
        status: true
      }
    } catch (error) {
      return {
        status: false,
        message: error.message
      }
    }
  }
}


export const updateProfilePic = (data) => {
  return async (dispatch, getState) => {
    console.log('updateProfilePic :: data :: ', data);
    const allStates = await getState(state => state);
    const userRed = allStates.userRed;
    const isAdmin = userRed.isAdmin;
    const isElectionParty = userRed.isElectionParty;
    const isVoter = userRed.isVoter;
    const _id = userRed.userData?._id;
    const token = userRed.token;
    const configRes = await getUrlConfig({ tokenName: token.label });
    if (!configRes?.status) {
      return {
        status: false,
        message: configRes?.message
      }
    }

    const formData = new FormData();
    formData.append('photo', data.imgData);
    formData.append('_id', _id);

    // formData.forEach(v => console.log(v))

    try {
      let res;
      if (isAdmin) {
        res = await axios.post(`${BASE_URL}/admin/update-profile-pic`, formData, configRes.config);
      } else if (isElectionParty) {
        res = await axios.post(`${BASE_URL}/election-party/update-profile-pic`, formData, configRes.config);
      } else if (isVoter) {
        res = await axios.post(`${BASE_URL}/voter/update-profile-pic`, formData, configRes.config);
      }
      console.log('updateProfilePic :: res :: ', res);
      if (res.status === 201) {
        return {
          status: true,
        }
      } else {
        return {
          status: false,
          message: res.message
        }
      }
    } catch (error) {
      return {
        status: false,
        message: error.message
      }
    }
  }
}

export const adminSettings = (data) => {
  return async (dispatch, getState) => {
    const allStates = await getState(state => state);
    const userRed = allStates.userRed;
    const token = userRed.token;
    const configRes = await getUrlConfig({ tokenName: token.label });
    if (!configRes?.status) {
      return {
        status: false,
        message: configRes?.message
      }
    }

    try {
      let res;
      if (userRed.isAdmin) {
        res = await axios.get(`${BASE_URL}/admin/admin-settings`, configRes.config);
      } else if (userRed.isElectionParty) {
        res = await axios.get(`${BASE_URL}/election-party/admin-settings`, configRes.config);
      } else if (userRed.isVoter) {
        res = await axios.get(`${BASE_URL}/voter/admin-settings`, configRes.config);
      }
      console.log('adminSettings :: res :: ', res);
      if (res.status === 200) {
        await dispatch({
          type: ADMIN_SETTINGS,
          settings: res.data.data.settings[0]
        })
        return {
          status: true,
        }
      } else {
        return {
          status: false,
          message: res.message
        }
      }
    } catch (error) {
      return {
        status: false,
        message: error.message
      }
    }
  }
}

export const allAnnouncements = () => {
  return async (dispatch, getState) => {
    const allStates = getState(state => state);
    const userRed = allStates.userRed;
    const isAdmin = userRed.isAdmin;
    const isElectionParty = userRed.isElectionParty;
    const isVoter = userRed.isVoter;
    const token = userRed.token;
    const configRes = await getUrlConfig({ tokenName: token.label });
    if (!configRes?.status) {
      return {
        status: false,
        message: configRes?.message
      }
    }

    try {
      let res;
      if (isAdmin) {
        res = await axios.get(`${BASE_URL}/admin/announcements`, configRes.config);
      } else if (isElectionParty) {
        res = await axios.get(`${BASE_URL}/election-party/announcements`, configRes.config);
      } else if (isVoter) {
        res = await axios.get(`${BASE_URL}/voter/announcements`, configRes.config);
      }

      // console.log('allAnnouncements :: res :: ', res);
      if (res.status === 200) {
        dispatch({
          type: ALL_ANNOUNCEMENTS,
          announcements: res.data.data
        })
        return {
          status: true,
          message: res.message
        }
      } else {
        return {
          status: false,
          message: res.message
        }
      }
    } catch (error) {
      return {
        status: false,
        message: error.message
      }
    }
  }
}

export const allBlogs = (data) => {
  return async (dispatch, getState) => {
    const allStates = await getState(state => state);
    const userRed = allStates.userRed;
    const isAdmin = userRed.isAdmin;
    const isElectionParty = userRed.isElectionParty;
    const isVoter = userRed.isVoter;
    const token = userRed.token;
    const configRes = await getUrlConfig({ tokenName: token.label });
    if (!configRes?.status) {
      return {
        status: false,
        message: configRes?.message
      }
    }

    try {
      let res;
      if (isAdmin) {
        res = await axios.get(`${BASE_URL}/admin/blogs`, configRes.config);
      } else if (isElectionParty) {
        res = await axios.get(`${BASE_URL}/election-party/blogs`, configRes.config);
      } else if (isVoter) {
        res = await axios.get(`${BASE_URL}/voter/blogs`, configRes.config);
      }

      // console.log('allBlogs :: res :: ', res);
      if (res.status === 200) {
        dispatch({
          type: ALL_BLOGS,
          blogs: res.data.data
        })
        return {
          status: true,
          message: res.message
        }
      } else {
        return {
          status: false,
          message: res.message
        }
      }
    } catch (error) {
      return {
        status: false,
        message: error.message
      }
    }
  }
}

export const allDonations = (data) => {
  return async (dispatch, getState) => {
    const allStates = await getState(state => state);
    const userRed = allStates.userRed;
    const isAdmin = userRed.isAdmin;
    const isElectionParty = userRed.isElectionParty;
    const isVoter = userRed.isVoter;
    const token = userRed.token;
    const configRes = await getUrlConfig({ tokenName: token.label });
    if (!configRes?.status) {
      return {
        status: false,
        message: configRes?.message
      }
    }

    try {
      let res;
      if (isAdmin) {
        res = await axios.get(`${BASE_URL}/admin/donations`, configRes.config);
      } else if (isElectionParty) {
        res = await axios.get(`${BASE_URL}/election-party/donations`, configRes.config);
      } else if (isVoter) {
        res = await axios.get(`${BASE_URL}/voter/donations`, configRes.config);
      }
      // console.log('allDonations :: res :: ', res);
      if (res.status === 200) {
        dispatch({
          type: ALL_DONATIONS,
          donations: res.data.data
        })
        return {
          status: true,
          message: res.message
        }
      } else {
        return {
          status: false,
          message: res.message
        }
      }
    } catch (error) {
      return {
        status: false,
        message: error.message
      }
    }
  }
}

export const latestAnnouncements = () => {
  return async (dispatch, getState) => {
    const allStates = await getState(state => state);
    const userRed = allStates.userRed;
    console.log('common :: userRed :: ', userRed);
    const token = userRed.token;
    const configRes = await getUrlConfig({ tokenName: token.label });
    if (!configRes?.status) {
      return {
        status: false,
        message: configRes?.message
      }
    }

    try {
      let res;
      if (userRed.isAdmin) {
        res = await axios.get(`${BASE_URL}/admin/announcements?latest=true`, configRes.config);
      } else if (userRed.isVoter) {
        res = await axios.get(`${BASE_URL}/voter/announcements?latest=true`, configRes.config);
      } else if (userRed.isElectionParty) {
        res = await axios.get(`${BASE_URL}/election-party/announcements?latest=true`, configRes.config);
      }

      console.log('latestAnnouncements :: res :: ', res);
      if (res.status === 200) {
        dispatch({
          type: LATEST_ANNOUNCEMENTS,
          latestAnnouncements: res.data.data
        })
        return {
          status: true,
          message: res.message
        }
      } else {
        return {
          status: false,
          message: res.message
        }
      }
    } catch (error) {
      return {
        status: false,
        message: error.message
      }
    }
  }
}

export const latestBlogs = () => {
  return async (dispatch, getState) => {
    const allStates = await getState(state => state);
    const userRed = allStates.userRed;
    // console.log('common :: userRed :: ', userRed);
    const token = userRed.token;
    const configRes = await getUrlConfig({ tokenName: token.label });
    if (!configRes?.status) {
      return {
        status: false,
        message: configRes?.message
      }
    }

    try {
      let res;
      if (userRed.isAdmin) {
        res = await axios.get(`${BASE_URL}/admin/blogs?latest=true`, configRes.config);
      } else if (userRed.isVoter) {
        res = await axios.get(`${BASE_URL}/voter/blogs?latest=true`, configRes.config);
      } else if (userRed.isElectionParty) {
        res = await axios.get(`${BASE_URL}/election-party/blogs?latest=true`, configRes.config);
      }

      console.log('latestBlogs :: res :: ', res);
      if (res.status === 200) {
        dispatch({
          type: LATEST_BLOGS,
          latestBlogs: res.data.data
        })
        return {
          status: true,
          message: res.message
        }
      } else {
        return {
          status: false,
          message: res.message
        }
      }
    } catch (error) {
      return {
        status: false,
        message: error.message
      }
    }
  }
}

export const latestDonations = () => {
  return async (dispatch, getState) => {
    const allStates = await getState(state => state);
    const userRed = allStates.userRed;
    const token = userRed.token;
    const configRes = await getUrlConfig({ tokenName: token.label });
    if (!configRes?.status) {
      return {
        status: false,
        message: configRes?.message
      }
    }

    try {
      let res;
      if (userRed.isAdmin) {
        res = await axios.get(`${BASE_URL}/admin/donations?latest=true`, configRes.config);
      } else if (userRed.isVoter) {
        res = await axios.get(`${BASE_URL}/voter/donations?latest=true`, configRes.config);
      } else if (userRed.isElectionParty) {
        res = await axios.get(`${BASE_URL}/election-party/donations?latest=true`, configRes.config);
      }

      console.log('latestDonations :: res :: ', res);
      if (res.status === 200) {
        dispatch({
          type: LATEST_DONATIONS,
          latestDonations: res.data.data
        })
        return {
          status: true,
          message: res.message
        }
      } else {
        return {
          status: false,
          message: res.message
        }
      }
    } catch (error) {
      return {
        status: false,
        message: error.message
      }
    }
  }
}

// export const latestContent = (data) => {
//   return async (dispatch, getState) => {

//     try {
//       const res = await axios.get(`${BASE_URL}/common/latest-content`);
//       console.log('latestContent :: res :: ', res);
//       if (res.status === 200) {

//       } else {
//         return {
//           status: false,
//           message: res.message
//         }
//       }
//     } catch (error) {
//       return {
//         status: false,
//         message: error.message
//       }
//     }
//   }
// }

// export const pollResults = (data) => {
//   return async (dispatch, getState) => {
//     try {
//       const res = await axios.get(`${BASE_URL}/common/poll-results`);
//       // console.log('pollResults :: res :: ', res);
//       if (res.status === 200) {

//       } else {
//         return {
//           status: false,
//           message: res.message
//         }
//       }
//     } catch (error) {
//       return {
//         status: false,
//         message: error.message
//       }
//     }
//   }
// }