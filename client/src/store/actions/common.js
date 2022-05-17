import axios from 'axios';
import { BASE_URL } from '../../util';

export const POLL_RESULTS = 'POLL_RESULTS';
export const VOTE_STATUS = 'VOTE_STATUS';
export const VOTE_RESULTS_STATUS = 'VOTE_RESULTS_STATUS';
export const ALL_ADMINS = 'ALL_ADMINS';


export const pollResults = (data) => {
  return async (dispatch, getState) => {
    try {
      const res = await axios.get(`${BASE_URL}/common/poll-results`);
      console.log('pollResults :: res :: ', res);
      if (res.status === 200) {

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

    try {
      const res = await axios.post(`${BASE_URL}/common/admin-settings`);
      console.log('adminSettings :: res :: ', res);
      if (res.status === 200) {

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

export const allAnnouncements = (data) => {
  return async (dispatch, getState) => {

    try {
      const res = await axios.get(`${BASE_URL}/common/announcements`);
      console.log('allAnnouncements :: res :: ', res);
      if (res.status === 200) {

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

    try {
      const res = await axios.get(`${BASE_URL}/common/blogs`);
      console.log('allBlogs :: res :: ', res);
      if (res.status === 200) {

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

    try {
      const res = await axios.get(`${BASE_URL}/common/donations`);
      console.log('allDonations :: res :: ', res);
      if (res.status === 200) {

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

export const latestContent = (data) => {
  return async (dispatch, getState) => {

    try {
      const res = await axios.get(`${BASE_URL}/common/latest-content`);
      console.log('latestContent :: res :: ', res);
      if (res.status === 200) {

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

