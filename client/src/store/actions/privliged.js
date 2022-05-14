import axios from 'axios';
import { BASE_URL } from '../../util';

// *************************************************** Admin & Election Party *************************************************** //
// *************************************************** Admin *******************************************************************  //

export const VERIFY = 'VERIFY';
export const ADD_ADMIN = 'ADD_ADMIN';
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
      const res = await axios.get(`${BASE_URL}/admin/signup`,);
      console.log('getAllAdmins :: res :: ', res);
      if (res.status === 201) {

      } else {

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
    const partyName = data.partyName;
    const candidateName = data.candidateName;
    const symbolName = data.symbolName;
    const symbolImg = data.symbolImg;
    const moto = data.moto;
    const vision = data.vision;
    const state = data.state;
    const district = data.district;

    try {
      const res = await axios.post(`${BASE_URL}/election-party/update-party`, { partyName, candidateName, symbolName, symbolImg, moto, vision, state, district });
      console.log('updateElectionParty :: res :: ', res);
      if (res.status === 201) {

      } else {

      }
    } catch (error) {
      return {
        status: false,
        message: error.message
      }
    }
  }
}


