import React, { Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './views/auth/Login'
import './assets/css/global.css';
import Signup from './views/auth/Signup';
import DashboardAdmin from './views/admin/Dashboard';
import DashboardVoter from './views/voter/Dashbord';
import DashboardElectionParty from './views/electionParty/Dashboard';
import Error from './views/Error';
import Verify from './views/admin/Verify';
import Profile from './views/admin/Profile';
import Result from './views/admin/Result';


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
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/admin/verify' element={<Verify />} />
          <Route path='/admin/profile' element={<Profile />} />
          <Route path='/admin/result' element={<Result />} />
          <Route path='/admin' element={<DashboardAdmin />} />
          <Route path='/voter' element={<DashboardVoter />} />
          <Route path='/election-party' element={<DashboardElectionParty />} />
          <Route path='/404' element={<Error errorCode="404" />} />
          <Route path='/500' element={<Error errorCode="500" />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
