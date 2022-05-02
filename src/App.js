import React, { Suspense } from 'react'
import { BrowserRouter, Route, Routes, useLocation, useParams } from 'react-router-dom'
import Login from './views/auth/Login'
import './assets/css/global.css';
import Signup from './views/auth/Signup';
import DashboardAdmin from './views/admin/Dashboard';
import DashboardVoter from './views/voter/Dashbord';
import DashboardElectionParty from './views/electionParty/Dashboard';
import ProfileVoter from "./views/voter/Profile";

import Error from './views/Error';
import VerifyAdmin from './views/admin/Verify';
import ProfileAdmin from './views/admin/Profile';
import ResultAdmin from './views/admin/Result';
import Docs from './views/common/Docs';
import AboutUs from './views/common/AboutUs';
import AnnouncementAdmin from './views/admin/Announcement';
import DonateAdmin from './views/admin/Donate';
import BlogAdmin from './views/admin/Blog';
import BlogElectionParty from './views/electionParty/Blog';
import BlogVoter from './views/voter/Blog';
import ResultVoter from './views/voter/Result';
import VoteVoter from './views/voter/Vote';
import VoteElectionParty from './views/electionParty/Vote';
import ResultElectionParty from './views/electionParty/Result';


const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

export default function App() {
  const location = useLocation();
  console.log('App :: location :: ', location);

  const path = location.pathname;
  const userType = (path.split('/')[1]).toLowerCase();
  // console.log('App :: userType :: ', userType);

  return (
      <Suspense fallback={loading} >
        <Routes  >
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/about-us' element={<AboutUs />} />
          <Route exact path='/docs' element={<Docs />} />
          <Route exact path='/signup' element={<Signup />} />
          <Route exact path='/admin/verify' element={<VerifyAdmin userType={userType} />} />
          <Route exact path='/admin/profile' element={<ProfileAdmin userType={userType} />} />
          <Route exact path='/admin/result' element={<ResultAdmin userType={userType} />} />
          <Route exact path='/admin/announcement' element={<AnnouncementAdmin userType={userType} />} />
          <Route exact path='/admin/donate' element={<DonateAdmin userType={userType} />} />
          <Route exact path='/admin/blog' element={<BlogAdmin userType={userType} />} />
          <Route exact path='/admin' element={<DashboardAdmin userType={userType} />} />
          <Route exact path='/voter/result' element={<ResultVoter userType={userType} />} />
          <Route exact path='/voter/vote' element={<VoteVoter userType={userType} />} />
          <Route exact path='/voter/blog' element={<BlogVoter userType={userType} />} />
          <Route exact path='/voter/profile' element={<ProfileVoter userType={userType} />} />
          <Route exact path='/voter' element={<DashboardVoter userType={userType} />} />
          <Route exact path='/election-party/result' element={<ResultElectionParty userType={userType} />} />
          <Route exact path='/election-party/vote' element={<VoteElectionParty userType={userType} />} />
          <Route exact path='/election-party/blog' element={<BlogElectionParty userType={userType} />} />
          <Route exact path='/election-party' element={<DashboardElectionParty userType={userType} />} />
          <Route exact path='/404' element={<Error errorCode="404" />} />
          <Route exact path='/500' element={<Error errorCode="500" />} />
          <Route path='*' element={<Error errorCode="404" />} />
        </Routes>
      </Suspense>
  )
}
