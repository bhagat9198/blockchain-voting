import axios from 'axios';
import { BASE_URL } from '../../util';

// *************************************************** Admin & Election Party *************************************************** //
// *************************************************** Admin *******************************************************************  //

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

export const addElectionParty = (data) => {
  return async (dispatch, getState) => {

    try {
      const res = await axios.get(`${BASE_URL}/election-party/add`,);
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


