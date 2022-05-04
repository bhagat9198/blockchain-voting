import axios from 'axios';
import { BASE_URL } from '../../util';

export const SIGNUP = 'SIGNUP';


export const signup = ({ name, email, password, voteCardId, userType }) => {
  return async (dispatch, getState) => {

    try {
      const res = await axios.post(`${BASE_URL}/auth/signup`, { name, email, password, voteCardId, userType });
      console.log('signup :: res :: ', res);
      if (res.data.status) {
        await dispatch({
          type: SIGNUP,
          userData: {
            name,
            email,
            voteCardId,
            userType,
            // something
          },
          isVoter: userType === 'voter' ? true : false,
          isElectionParty: userType === 'electionParty' ? true : false,
        })
        return {
          status: res.data.status,
          message: res.data.message,
          data: {
            userType: userType === 'voter' ? 'voter' : 'election-party'
          }
        }
      } else {
        return {
          status: res.data.status,
          message: res.data.message
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

export const signin = (data) => {
  return async (dispatch, getState) => {
    const email = data.email;
    const password = data.password;

    try {
      const res = await axios.post(`${BASE_URL}/auth/signin`, { email, password });
      console.log('signin :: res :: ', res);
      if (res.status === 200) {

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

export const resetPassword = (data) => {
  return async (dispatch, getState) => {
    const password = data.password;

    try {
      const res = await axios.post(`${BASE_URL}/auth/reset-password`, { password });
      console.log('resetPassword :: res :: ', res);
      if (res.status === 200) {

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

export const refreshToken = (data) => {
  return (dispatch, getState) => {

  }
}