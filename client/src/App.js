import React, { Suspense, Component, useEffect, useState } from "react";
// import SimpleStorageContract from "./contracts/SimpleStorage.json";
import getWeb3 from "./getWeb3";


import { toast, ToastContainer } from 'react-toastify';
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
import ResultVoter from './views/voter/Result';
import VoteVoter from './views/voter/Vote';
import VoteElectionParty from './views/electionParty/Vote';
import ResultElectionParty from './views/electionParty/Result';
import LatestUpdatesVoter from './views/voter/LatestUpdates';
import AboutPartyElectionParty from './views/electionParty/AboutParty';
import DonationElectionParty from './views/electionParty/Donation';
import ProfileElectionParty from './views/electionParty/Profile';
import Unauthorized from './views/common/Unauthorized';
import SettingsAdmin from './views/admin/Settings';
import { getAccount, initVotingContract, getBalance } from './store/actions/w3Transactions';
import { useDispatch, useSelector } from "react-redux";
import {
  admin0Data, admin1Data,
  electionParty2Data, electionParty3Data, electionParty4Data,
  voter5Data, voter6Data, voter7Data, voter8Data, voter9Data
} from './staticData';
import { userDataSetup } from "./store/actions/auth";
import { updateW3Account } from "./store/actions/common";

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)


function getParams({ location }) {
  let queryParams = (location.search.split('?')[1])
  // console.log('App :: getParams :: queryParams :: ', queryParams);
  if (!queryParams) {
    return {
      status: false,
      message: 'Url doesnt have params'
    }
  }
  queryParams = queryParams.split('&');
  for (let i = 0; i < queryParams.length; i++) {
    // console.log('App :: getParams :: queryParams[i] :: ', queryParams[i]);
    const query = queryParams[i].split('=');
    if (query[0] === 'user') {
      const userNumber = Number(query[1]);
      return {
        status: true,
        message: userNumber
      }
    }
  }
  return {
    status: false,
    message: 'Url params doesnt have user number'
  }
}


function getUserType({ currentPage }) {
  if (currentPage.toLocaleLowerCase() === 'admin') {
    return {
      isAdmin: true,
      isElectionParty: false,
      isVoter: false,
    }
  } else if (currentPage.toLocaleLowerCase() === 'election-party') {
    return {
      isAdmin: false,
      isElectionParty: true,
      isVoter: false,
    }
  } else if (currentPage.toLocaleLowerCase() === 'voter') {
    return {
      isAdmin: false,
      isElectionParty: false,
      isVoter: true,
    }
  } else {
    return {
      isAdmin: false,
      isElectionParty: false,
      isVoter: false,
    }
  }
}

async function getStaticData({ currentPage, userNumber, userStatus }) {
  // console.log('App :: getStaticData :: data :: ', currentPage, userNumber, userStatus);
  if (process.env.NODE_ENV === 'development' && !userStatus) {
    if (currentPage.toLocaleLowerCase() === 'admin') {
      if (Number(userNumber) === 0) {
        return admin0Data;
      }
      if (Number(userNumber) === 1) {
        return admin1Data;
      }
    } else if (currentPage.toLocaleLowerCase() === 'election-party') {
      if (Number(userNumber) === 2) {
        return electionParty2Data;
      }
      if (Number(userNumber) === 3) {
        return electionParty3Data;
      }
      if (Number(userNumber) === 4) {
        return electionParty4Data;
      }
    } else if (currentPage.toLocaleLowerCase() === 'voter') {
      if (Number(userNumber) === 5) {
        return voter5Data;
      }
      if (Number(userNumber) === 6) {
        return voter6Data;
      }
      if (Number(userNumber) === 7) {
        return voter7Data;
      }
      if (Number(userNumber) === 8) {
        return voter8Data;
      }
      if (Number(userNumber) === 9) {
        return voter9Data;
      }
    }
  }
  return {
    devData: false,
  }
}

// let expection = false;
let init = false;
export default function App() {
  const location = useLocation();
  const dispatch = useDispatch();
  const [excp, setExcp] = useState(false);

  const currentPage = location.pathname.split('/')[1];

  const userRed = useSelector(state => state.userRed);

  console.log('App :: userRed :: ', userRed);
  const userType = userRed.userData.userType;


  let userNumber;
  console.log('App :: currentPage :: ', currentPage);
  // if(!init) {
  //   init = true
  if (currentPage != 'login' && currentPage !== 'signup' &&
    currentPage !== 'about-us' && currentPage !== 'docs') {
    console.log('App :: currentPage :: if', currentPage);
    const res = getParams({ location });
    if (!res.status) {
      toast.error(res.message);
      userNumber = 1;
    } else {
      userNumber = res.message;
    }
  } else {
    console.log('App :: currentPage :: else', currentPage);
    // setExcp(true)
  }
  // }

  if (!init) {
    init = true
    if (currentPage == 'auth') {
      setExcp(true)
    }
  }

  useEffect(() => {
    console.log('App :: userNumber :: ', userNumber);
    if (userNumber === undefined || userNumber === null || userNumber === NaN) { return };
    const uType = getUserType({ currentPage });
    console.log('App :: uType :: ', uType);
    if (!uType.isAdmin && !uType.isVoter && !uType.isElectionParty) {
      return;
    }

    getStaticData({ currentPage, userNumber, userStatus: userRed.status }).then(async (resData) => {
      console.log('App :: getStaticData :: resData :: ', resData);
      let data;
      if (resData.devData) {
        data = { ...resData, isDev: true, userNum: userNumber }
      } else {
        data = { isDev: false, isAdmin: uType.isAdmin, isVoter: uType.isVoter, isElectionParty: uType.isElectionParty, userNum: userNumber }
      }
      const res = await dispatch(userDataSetup(data));
      console.log('App :: dispatch :: res :: ', res);
      if (!res.status) {
        toast.error(res.message);
        return;
      }

    }).catch(error => {
      console.log('App :: error :: ', error);
      toast.error(error);
    })

    if (!userRed.status) return;
    // console.log(getWeb3);
    // if (!getWeb3 || !getWeb3.eth) return;

    async function asyncFun() {
      // get account
      const account = await getAccount({ accountNum: userNumber })
      console.log('App :: account :: ', account);

      // initlise contracts
      // await initEthReceiverContract();
      // await initEtherSenderContract();
      await initVotingContract();

      // get balanace
      await getBalance()

      const res = await dispatch(updateW3Account({ account }));
      if (!res.status) {
        toast.error('Web 3 account is not set. Something went wrong');
        toast.error(res.message);
        return;
      }
      toast.success('Web 3 account is enabled');
    }

    asyncFun();


  }, [getWeb3, userNumber, userRed.status])


  console.log('App :: excp :: ', excp, userRed.status);
  if (!excp && !userRed.status) {
    return (
      <Routes >
        <Route exact path='/401' element={<Error errorCode="401" goBackBtn={false} />} />
      </Routes>)
  }


  console.log('App :: userType :: ', userType);
  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        draggable
        pauseOnHover
      />

      <Suspense fallback={loading} >
        <Routes  >
          <Route exact path='/auth/signin' element={<Login />} />
          <Route exact path='/about-us' element={<AboutUs />} />
          <Route exact path='/docs' element={<Docs />} />
          <Route exact path='/auth/signup' element={<Signup />} />
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
          {/* <Route exact path='/voter/blogs' element={<BlogVoter userType={userType} />} /> */}
          <Route exact path='/voter/profile' element={<ProfileVoter userType={userType} />} />
          <Route exact path='/voter/latest-updates' element={<LatestUpdatesVoter userType={userType} />} />
          <Route exact path='/voter/unauthorized' element={<Unauthorized />} />
          <Route exact path='/voter' element={<DashboardVoter userType={userType} />} />
          <Route exact path='/election-party/add-party' element={<AboutPartyElectionParty userType={userType} />} />
          <Route exact path='/election-party/results' element={<ResultElectionParty userType={userType} />} />
          <Route exact path='/election-party/vote' element={<VoteElectionParty userType={userType} />} />
          <Route exact path='/election-party/blogs' element={<BlogElectionParty userType={userType} />} />
          <Route exact path='/election-party/donations' element={<DonationElectionParty userType={userType} />} />
          <Route exact path='/election-party/profile' element={<ProfileElectionParty userType={userType} />} />
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

