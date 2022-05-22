import axios from 'axios';
import { BASE_URL } from '../../util';
import { addElectionParty } from './w3Transactions';

// *************************************************** Admin & Election Party *************************************************** //
// *************************************************** Admin *******************************************************************  //

export const VERIFY = 'VERIFY';
export const ADD_ADMIN = 'ADD_ADMIN';
export const ALL_ADMINS = 'ALL_ADMINS';
export const DELETE_ADMIN = 'DELETE_ADMIN';
export const VOTE_STATUS = 'VOTE_STATUS';
export const VOTE_RESULTS_STATUS = 'VOTE_RESULTS_STATUS';


export const verify = (data) => {
  return async (dispatch, getState) => {
    const docId = data.docId;
    const status = data.status;

    try {
      const res = await axios.post(`${BASE_URL}/admin/verify`, { docId, status });
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
    const name = data.name;
    const email = data.email;
    const password = data.password;

    try {
      const res = await axios.post(`${BASE_URL}/admin/add-admin`, { name, email, password });
      console.log('addAdmin :: res :: ', res);
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
    const docId = data.docId;

    try {
      const res = await axios.delete(`${BASE_URL}/admin/delete-admin`, { docId });
      console.log('addAdmin :: res :: ', res);
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

export const voteStatus = (data) => {
  return async (dispatch, getState) => {
    const status = data.status;

    try {
      const res = await axios.post(`${BASE_URL}/admin/vote-status`, { status });
      console.log('voteStatus :: res :: ', res);
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

export const voteResultStatus = (data) => {
  return async (dispatch, getState) => {
    const status = data.status;

    try {
      const res = await axios.post(`${BASE_URL}/admin/vote-result-status`, { status });
      console.log('voteResultStatus :: res :: ', res);
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

export const getAllAdmins = (data) => {
  return async (dispatch, getState) => {

    try {
      const res = await axios.get(`${BASE_URL}/admin/all-admins`,);
      console.log('getAllAdmins :: res :: ', res);
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

// *************************************************** Election Party *********************************************************** //

export const ADD_ELECTION_PARTY = 'UPDATE_ELECTION_PARTY';


export const updateElectionParty = (data) => {
  return async (dispatch, getState) => {
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    }
    try {
      const res = await axios.post(`${BASE_URL}/election-party/update-party`, data, config);
      console.log('updateElectionParty :: res :: ', res);
      if (res.status === 201) {
        await addElectionParty({ id: res.data.data._id })
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


