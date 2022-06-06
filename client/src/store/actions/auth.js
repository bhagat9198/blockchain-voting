import axios from 'axios';
import { BASE_URL, getUrlConfig } from '../../util';

export const SIGNUP = 'SIGNUP';
export const SIGNIN = 'SIGNIN';
export const USER_SETUP = 'USER_SETUP';

let token = {};

export const signup = ({ name, email, password, voteCardId, userType }) => {
  return async (dispatch, getState) => {

    try {
      const res = await axios.post(`${BASE_URL}/auth/signup`, { name, email, password, voteCardId, userType });
      console.log('signup :: res :: ', res);
      if (res.data.status) {
        // add token
        await dispatch({
          type: SIGNUP,
          userData: {
            name,
            email,
            voteCardId,
            userType,
            _id: res.data.data._id,

          },
          isVoter: userType === 'voter' ? true : false,
          isElectionParty: userType === 'electionParty' ? true : false,
          status: true,
          token
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

export const userDataSetup = (data) => {
  return async (dispatch, getState) => {
    console.log('auth ::  data :: ', data);
    const email = data?.email;
    const _id = data?._id;
    const name = data?.name;
    const userType = data?.userType;
    const userNum = data?.userNum;
    const isAdmin = data?.isAdmin;
    const isVoter = data?.isVoter;
    const isElectionParty = data?.isElectionParty;
    const isDev = data?.isDev;

    let configRes;

    try {
      if (isDev) {
        const jwtokenRes = await axios.post(`${BASE_URL}/auth/generate-token`, { _id, userType, email });
        // console.log('userDataSetup :: jwtokenRes :: ', jwtokenRes);
        if (!jwtokenRes.data.status) {
          return {
            status: false,
            message: jwtokenRes.message
          }
        }
        token.label = `t-${userType}-${userNum}`;
        token.value = `${jwtokenRes.data.data.token}`;
        localStorage.setItem(token.label, token.value);
        configRes = await getUrlConfig({ tokenName: token.label });
      }
      // console.log('auth :: userDataSetup:: configRes :: ', configRes);
      if (!configRes?.status) {
        return {
          status: false,
          message: configRes?.message
        }
      } 

      let res;
      if (isAdmin) {
        res = await axios.get(`${BASE_URL}/auth/admin-details/${_id}`, configRes.config);
      } else if (isVoter) {
        res = await axios.get(`${BASE_URL}/auth/voter-details/${_id}`, configRes.config);
      } else if (isElectionParty) {
        res = await axios.get(`${BASE_URL}/auth/election-party-details/${_id}`, configRes.config);
      }

      console.log('auth :: userDataSetup :: res :: ', res);
      if (res.status === 200) {
        dispatch({
          type: USER_SETUP,
          userData: {
            ...res.data.data
          },
          isVoter: res.data.data.userType === 'voter' ? true : false,
          isElectionParty: res.data.data.userType === 'electionParty' ? true : false,
          isAdmin: res.data.data.userType === 'admin' ? true : false,
          status: true,
          token
        })
      }
      return {
        status: true,
        message: 'success'
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
    const newPwd = data.newPwd;
    const oldPwd = data.oldPwd;
    const email = data.email;

    try {
      const res = await axios.post(`${BASE_URL}/auth/reset-password`, { newPwd, oldPwd, email });
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