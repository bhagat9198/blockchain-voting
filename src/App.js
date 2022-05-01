import React, { Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
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

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={loading} >
        <Routes>
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/about-us' element={<AboutUs />} />
          <Route exact path='/docs' element={<Docs />} />
          <Route exact path='/signup' element={<Signup />} />
          <Route exact path='/admin/verify' element={<VerifyAdmin />} />
          <Route exact path='/admin/profile' element={<ProfileAdmin />} />
          <Route exact path='/admin/result' element={<ResultAdmin />} />
          <Route exact path='/admin/announcement' element={<AnnouncementAdmin />} />
          <Route exact path='/admin/donate' element={<DonateAdmin />} />
          <Route exact path='/admin/blog' element={<BlogAdmin />} />
          <Route exact path='/admin' element={<DashboardAdmin />} />
          <Route exact path='/voter' element={<DashboardVoter />} />
          <Route exact path='/voter/profile' element={<ProfileVoter />} />
          <Route exact path='/election-party/blog' element={<BlogElectionParty />} />
          <Route exact path='/election-party' element={<DashboardElectionParty />} />
          <Route exact path='/404' element={<Error errorCode="404" />} />
          <Route exact path='/500' element={<Error errorCode="500" />} />
          <Route path='*' element={<Error errorCode="404" />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
