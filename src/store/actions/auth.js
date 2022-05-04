import axios from 'axios';
import { BASE_URL } from '../../util';



export const signup = (data) => {
  return async (dispatch, getState) => {
    const name = data.name;
    const email = data.email;
    const password = data.password;

    try {
      const res = await axios.post(`${BASE_URL}/auth/signup`, { name, email, password });
      console.log('signup :: res :: ', res);
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

export const signin = (data) => {
  return async (dispatch, getState) => {
    const email = data.email;
    const password = data.password;

    try {
      const res = await axios.post(`${BASE_URL}/auth/signin`, { email, password });
      console.log('signup :: res :: ', res);
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