import React, { Suspense, Component, useEffect } from "react";
// import SimpleStorageContract from "./contracts/SimpleStorage.json";
import getWeb3 from "./getWeb3";


import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
import LatestUpdatesVoter from './views/voter/LatestUpdates';
import AboutPartyElectionParty from './views/electionParty/AboutParty';
import Unauthorized from './views/common/Unauthorized';
import SettingsAdmin from './views/admin/Settings';
import { getAccount, initEthReceiverContract, initEtherSenderContract, initVotingContract, getBalance } from './store/actions/w3Transactions';
const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

export default function App() {
  const location = useLocation();
  const path = location.pathname;
  const userType = (path.split('/')[1]).toLowerCase();
  // console.log('App :: userType :: ', userType);

  useEffect(() => {
    // console.log(getWeb3);
    if (!getWeb3 || !getWeb3.eth) return;

    async function asyncFun() {
      // get account
      await getAccount()

      // initlise contracts
      await initEthReceiverContract();
      await initEtherSenderContract();
      await initVotingContract();

      // get balanace
      await getBalance()

    }
    asyncFun();

  }, [getWeb3])

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <Suspense fallback={loading} >
        <Routes  >
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/about-us' element={<AboutUs />} />
          <Route exact path='/docs' element={<Docs />} />
          <Route exact path='/signup' element={<Signup />} />
          <Route exact path='/admin/verify' element={<VerifyAdmin userType={userType} />} />
          <Route exact path='/admin/settings' element={<SettingsAdmin userType={userType} />} />
          <Route exact path='/admin/profile' element={<ProfileAdmin userType={userType} />} />
          <Route exact path='/admin/results' element={<ResultAdmin userType={userType} />} />
          <Route exact path='/admin/announcements' element={<AnnouncementAdmin userType={userType} />} />
          <Route exact path='/admin/donations' element={<DonateAdmin userType={userType} />} />
          <Route exact path='/admin/blogs' element={<BlogAdmin userType={userType} />} />
          <Route exact path='/admin' element={<DashboardAdmin userType={userType} />} />
          <Route exact path='/voter/results' element={<ResultVoter userType={userType} />} />
          <Route exact path='/voter/vote' element={<VoteVoter userType={userType} />} />
          <Route exact path='/voter/blogs' element={<BlogVoter userType={userType} />} />
          <Route exact path='/voter/profile' element={<ProfileVoter userType={userType} />} />
          <Route exact path='/voter/latest-updates' element={<LatestUpdatesVoter userType={userType} />} />
          <Route exact path='/voter/unauthorized' element={<Unauthorized />} />
          <Route exact path='/voter' element={<DashboardVoter userType={userType} />} />
          <Route exact path='/election-party/add-party' element={<AboutPartyElectionParty userType={userType} />} />
          <Route exact path='/election-party/results' element={<ResultElectionParty userType={userType} />} />
          <Route exact path='/election-party/vote' element={<VoteElectionParty userType={userType} />} />
          <Route exact path='/election-party/blogs' element={<BlogElectionParty userType={userType} />} />
          <Route exact path='/election-party/unauthorized' element={<Unauthorized />} />
          <Route exact path='/election-party' element={<DashboardElectionParty userType={userType} />} />
          <Route exact path='/404' element={<Error errorCode="404" goBackBtn={true} />} />
          <Route exact path='/500' element={<Error errorCode="500" goBackBtn={true} />} />
          <Route path='*' element={<Error errorCode="404" />} />
        </Routes>
      </Suspense>
    </>
  )
}


// class AppWeb3 extends Component {
//   state = { storageValue: 0, web3: null, accounts: null, contract: null };

//   componentDidMount = async () => {
//     try {
//       // Get network provider and web3 instance.
//       const web3 = await getWeb3();

//       // Use web3 to get the user's accounts.
//       const accounts = await web3.eth.getAccounts();

//       // Get the contract instance.
//       const networkId = await web3.eth.net.getId();
//       const deployedNetwork = SimpleStorageContract.networks[networkId];
//       const instance = new web3.eth.Contract(
//         SimpleStorageContract.abi,
//         deployedNetwork && deployedNetwork.address,
//       );

//       // Set web3, accounts, and contract to the state, and then proceed with an
//       // example of interacting with the contract's methods.
//       this.setState({ web3, accounts, contract: instance }, this.runExample);
//     } catch (error) {
//       // Catch any errors for any of the above operations.
//       alert(
//         `Failed to load web3, accounts, or contract. Check console for details.`,
//       );
//       console.error(error);
//     }
//   };

//   runExample = async () => {
//     const { accounts, contract } = this.state;

//     // Stores a given value, 5 by default.
//     await contract.methods.set(5).send({ from: accounts[0] });

//     // Get the value from the contract to prove it worked.
//     const response = await contract.methods.get().call();

//     // Update state with the result.
//     this.setState({ storageValue: response });
//   };

//   render() {
//     if (!this.state.web3) {
//       return <div>Loading Web3, accounts, and contract...</div>;
//     }
//     return (
//       <div className="App">
//         <h1>Good to Go!</h1>
//         <p>Your Truffle Box is installed and ready.</p>
//         <h2>Smart Contract Example</h2>
//         <p>
//           If your contracts compiled and migrated successfully, below will show
//           a stored value of 5 (by default).
//         </p>
//         <p>
//           Try changing the value stored on <strong>line 42</strong> of App.js.
//         </p>
//         <div>The stored value is: {this.state.storageValue}</div>
//       </div>
//     );
//   }
// }

