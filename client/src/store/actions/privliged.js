import axios from 'axios';

import { BASE_URL, getUrlConfig } from '../../util';
import { addElectionParty,  } from './w3Transactions';

export const VERIFY = 'VERIFY';
export const ADD_ADMIN = 'ADD_ADMIN';
export const ALL_ADMINS = 'ALL_ADMINS';
export const DELETE_ADMIN = 'DELETE_ADMIN';
export const VOTE_STATUS = 'VOTE_STATUS';
export const VOTE_RESULTS_STATUS = 'VOTE_RESULTS_STATUS';
export const SETTINGS = 'SETTINGS';
export const UPDATE_SETTING_VOTE = 'UPDATE_SETTING_VOTE';
export const UPDATE_SETTING_RESULT = 'UPDATE_SETTING_RESULT';
export const UPDATE_USER_DATA = 'UPDATE_USER_DATA';
export const UPDATE_PARTY = 'UPDATE_PARTY';

// *************************************************** Admin & Election Party *************************************************** //

export const addBlog = (data) => {
  return async (dispatch, getState) => {
    const allStates = await getState(state => state);
    const userRed = allStates.userRed;
    const _id = userRed.userData._id;
    const isAdmin = userRed.isAdmin;
    const isElectionParty = userRed.isElectionParty;
    const userType = userRed.userData.userType;
    const token = userRed.token;
    const heading = data.heading;
    const p1 = data.p1;
    const p2 = data.p2;
    const p3 = data.p3;
    const img = data.img;

    const formData = await new FormData();
    await formData.append('heading', heading);
    await formData.append('p1', p1);
    await formData.append('p2', p2);
    await formData.append('p3', p3);
    await formData.append('photo', img);
    await formData.append('userId', _id);
    await formData.append('userType', userType);

    // formData.forEach(v => console.log(v))
    const configRes = await getUrlConfig({ tokenName: token.label });
    if (!configRes?.status) {
      return {
        status: false,
        message: configRes?.message
      }
    }
    let updatedConfig = configRes;
    updatedConfig.config.headers['content-type'] = 'multipart/form-data'
    // console.log('priliged :: addBlog :: updatedConfig :: ', updatedConfig);
    try {
      let res;
      let updatedUserRes;

      if (isAdmin) {
        res = await axios.post(`${BASE_URL}/admin/add-blog`, formData, updatedConfig.config);
        updatedConfig.config.headers['content-type'] = 'application/json';
        updatedUserRes = await axios.patch(`${BASE_URL}/auth/admin-details/${userRed.userData._id}`,
          { blogId: res.data.data._id },
          updatedConfig.config);
      } else if (isElectionParty) {
        res = await axios.post(`${BASE_URL}/election-party/add-blog`, formData, updatedConfig.config);
        updatedConfig.config.headers['content-type'] = 'application/json';
        updatedUserRes = await axios.patch(`${BASE_URL}/auth/election-party-details/${userRed.userData._id}`,
          { blogId: res.data.data._id },
          updatedConfig.config);
      } else {
        return {
          status: false,
          message: 'Unautherized action'
        }
      }

      console.log('updateElectionParty :: updatedUserRes :: ', updatedUserRes);

      // console.log('addBlog :: res :: ', res);
      if (res.status === 201) {
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

export const addAnnouncement = (data) => {
  return async (dispatch, getState) => {
    const allStates = await getState(state => state);
    const userRed = allStates.userRed;
    const isAdmin = userRed.isAdmin;
    const isElectionParty = userRed.isElectionParty;
    const userId = userRed.userData._id;
    const userType = userRed.userData.userType;
    const token = userRed.token;
    const heading = data.heading;
    const body = data.body;

    const configRes = await getUrlConfig({ tokenName: token.label });
    if (!configRes?.status) {
      return {
        status: false,
        message: configRes?.message
      }
    }

    const bodyaData = {
      heading, body, userId, userType
    }

    try {
      let res, updatedUserRes;
      if (isAdmin) {
        res = await axios.post(`${BASE_URL}/admin/add-announcement`, bodyaData, configRes.config);
        updatedUserRes = await axios.patch(`${BASE_URL}/auth/admin-details/${userRed.userData._id}`,
          { announcementId: res.data.data._id },
          configRes.config);
      } else {
        return {
          status: false,
          message: 'Unautherized action'
        }
      }
      console.log('addAnnouncement :: res :: ', res);

      return {
        status: true,
        message: res.message
      }
    } catch (error) {
      console.log('addAnnouncement :: ', error);
      return {
        status: false,
        message: `Error :: ${error.message}`
      }
    }

  }
}

export const addDonation = data => {
  return async (dispatch, getState) => {
    const allStates = await getState(state => state);
    const userRed = allStates.userRed;
    const isAdmin = userRed.isAdmin;
    const isElectionParty = userRed.isElectionParty;
    const userId = userRed.userData._id;
    const userType = userRed.userData.userType;
    const token = userRed.token;
    const heading = data.heading;
    const cause = data.cause;

    const configRes = await getUrlConfig({ tokenName: token.label });
    if (!configRes?.status) {
      return {
        status: false,
        message: configRes?.message
      }
    }

    const bodyaData = {
      heading, cause, userId, userType
    }
    try {
      let res, updatedUserRes;
      if (isAdmin) {
        res = await axios.post(`${BASE_URL}/admin/add-donation`, bodyaData, configRes.config);
        updatedUserRes = await axios.patch(`${BASE_URL}/auth/admin-details/${userRed.userData._id}`,
          { donationId: res.data.data._id },
          configRes.config);
      } else if (isElectionParty) {
        res = await axios.post(`${BASE_URL}/election-party/add-donation`, bodyaData, configRes.config);
        updatedUserRes = await axios.patch(`${BASE_URL}/auth/election-party-details/${userRed.userData._id}`,
          { donationId: res.data.data._id },
          configRes.config);
      } else {
        return {
          status: false,
          message: 'Unautherized action'
        }
      }
      console.log('addDonation :: res :: ', res);
      return {
        status: true,
        message: res.message
      }

    } catch (error) {
      console.log('addAnnouncement :: ', error);
      return {
        status: false,
        message: `Error :: ${error.message}`
      }
    }

  }
}



// *************************************************** Admin *******************************************************************  //

export const verify = (data) => {
  return async (dispatch, getState) => {
    const allStates = await getState(state => state);
    const userRed = allStates.userRed;
    const userId = userRed.userData._id;
    const token = userRed.token;
    const docId = data.docId;
    const status = data.status;

    const configRes = await getUrlConfig({ tokenName: token.label });
    if (!configRes?.status) {
      return {
        status: false,
        message: configRes?.message
      }
    }

    try {
      const res = await axios.post(`${BASE_URL}/admin/verify`, { docId, status, userId }, configRes.config);
      console.log('verify :: res :: ', res);
      if (res.status === 201) {

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

export const addAdmin = (data) => {
  return async (dispatch, getState) => {
    // console.log('addAdmin :: data :: ', data);
    const allStates = await getState(state => state);
    const userRed = allStates.userRed;
    const _id = userRed.userData._id;
    const createdByName = userRed.userData.name;
    const token = userRed.token;
    const name = data.name;
    const email = data.email;
    const password = data.password;

    const configRes = await getUrlConfig({ tokenName: token.label });
    if (!configRes?.status) {
      return {
        status: false,
        message: configRes?.message
      }
    }

    try {
      const res = await axios.post(`${BASE_URL}/admin/add-admin`,
        { name, email, password, _id, createdByName },
        configRes.config);
      // console.log('addAdmin :: res :: ', res);
      if (res.status === 201) {
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

export const deleteAdmin = (data) => {
  return async (dispatch, getState) => {
    const allStates = await getState(state => state);
    const userRed = allStates.userRed;
    const userId = userRed.userData._id;
    const userName = userRed.userData.name;
    const token = userRed.token;
    const docId = data.docId;

    const configRes = await getUrlConfig({ tokenName: token.label });
    if (!configRes?.status) {
      return {
        status: false,
        message: configRes?.message
      }
    }

    try {
      const res = await axios.delete(`${BASE_URL}/admin/delete-admin`, { docId, userId, userName }, configRes.config);
      // console.log('addAdmin :: res :: ', res);
      if (res.status === 204) {
        return {
          status: false,
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

export const getAllAdmins = (data) => {
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
      const res = await axios.get(`${BASE_URL}/admin/all-admins`, configRes.config);
      // console.log('getAllAdmins :: res :: ', res);
      if (res.status === 200) {
        dispatch({
          type: ALL_ADMINS,
          admins: res.data.data.admins
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

export const voteStatus = (data) => {
  return async (dispatch, getState) => {
    const allStates = await getState(state => state);
    const userRed = allStates.userRed;
    const token = userRed.token;
    const status = data.status;

    const configRes = await getUrlConfig({ tokenName: token.label });
    if (!configRes?.status) {
      return {
        status: false,
        message: configRes?.message
      }
    }

    try {
      const res = await axios.get(`${BASE_URL}/admin/vote-status?status=${status}`, configRes.config);
      // console.log('voteStatus :: res :: ', res);
      if (res.status === 201) {
        dispatch({
          type: UPDATE_SETTING_VOTE,
          status
        })
        return {
          status: true,
          message: res.data.message
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

export const voteResultStatus = (data) => {
  return async (dispatch, getState) => {
    const allStates = await getState(state => state);
    const userRed = allStates.userRed;
    const token = userRed.token;
    const status = data.status;

    const configRes = await getUrlConfig({ tokenName: token.label });
    if (!configRes?.status) {
      return {
        status: false,
        message: configRes?.message
      }
    }

    try {
      const res = await axios.get(`${BASE_URL}/admin/election-result-status?status=${status}`, configRes.config);
      // console.log('voteResultStatus :: res :: ', res);
      if (res.status === 201) {
        dispatch({
          type: UPDATE_SETTING_RESULT,
          status
        })
        return {
          status: true,
          message: res.data.message
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

// *************************************************** Election Party *********************************************************** //

export const updateElectionParty = (data) => {
  return async (dispatch, getState) => {
    // console.log('updateElectionParty :: data :: ', data);
    const allStates = await getState(state => state);
    const userRed = allStates.userRed;
    const token = userRed.token;
    const account = userRed.w3Account;
    console.log('updateElectionParty :: userRed :: ', userRed);
    const isElectionParty = userRed.isElectionParty;
    const configRes = await getUrlConfig({ tokenName: token.label });
    if (!configRes?.status) {
      return {
        status: false,
        message: configRes?.message
      }
    }

    console.log('updateElectionParty :: account :: ', account);
    if (!account) {
      return {
        status: false,
        message: 'web3 account is not set'
      }
    }

    const updatedConfig = configRes;
    updatedConfig.config.headers['content-type'] = 'multipart/form-data';

    
    const formData = new FormData();
    formData.append('photo', data.photo);
    formData.append('partyName', data.name);
    formData.append('candidateName', data.candidateName);
    formData.append('symbolName', data.symbolName);
    formData.append('moto', data.moto);
    formData.append('vision', data.vision);
    formData.append('state', data.state);
    formData.append('district', data.district);
    formData.append('userType', userRed.userData.userType);
    formData.append('_id', userRed.userData._id);
    formData.append('account', account);

    // formData.forEach(v => console.log(v))

    try {
      const res = await axios.post(`${BASE_URL}/election-party/update-party`, formData, updatedConfig.config);
      // console.log('updateElectionParty :: res :: ', res);
      updatedConfig.config.headers['content-type'] = 'application/json';
      const body = {
        partyId: res.data.data._id
      }
      const updatedUserRes = await axios.patch(`${BASE_URL}/auth/election-party-details/${userRed.userData._id}`, body, updatedConfig.config);
      // console.log('updateElectionParty :: updatedUserRes :: ', updatedUserRes);

      if (res.status === 201) {
        await addElectionParty({ id: res.data.data._id })
        dispatch({
          type: UPDATE_PARTY,
          party: res.data.data
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
