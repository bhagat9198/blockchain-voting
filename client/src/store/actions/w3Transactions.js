// import Web3 from 'web3';

import VotingContractRaw from './../../contracts/Voting.json';
// import EtherSenderContractRaw from './../../contracts/EtherSender.json'
// import EtherReceiverContractRaw from './../../contracts/EtherReceiver.json';
import getWeb3 from './../../getWeb3';

// const web3 = new Web3();

let account;
let electionContract;
let etherSenderContract;
let etherReceiverContract;
let counter = 0;
let WEB3 = false;

export const addElectionParty = async ({ id }) => {
  console.log('addElectionParty :: id :: ', id);
  if (!WEB3) {
    const web3 = await getWeb3();
    WEB3 = web3;
  }

  try {
    const addPartyRes = await electionContract.methods.addParty(`${id}`).send({
      from: account,
      value: WEB3.utils.toWei('0.0000001', "ether"),
    })
    console.log('addElectionParty :: addPartyRes :: ', addPartyRes);
    return addPartyRes;
  } catch (err) {
    console.log('err :: ', err);
    return false;
  }
}

export const displayElectionParty = async () => {
  if (!WEB3) {
    const web3 = await getWeb3();
    WEB3 = web3;
  }
  if (!electionContract?.methods) {
    await initVotingContract();
  }
  if(!account) {
    await setTimeout(() => {}, 2000) 
  }

  console.log('electionContract :: ', electionContract);
  // const allPartiesRes = await electionContract.events.ElectionResult()
  // console.log('displayElectionParty :: allPartiesRes :: ', allPartiesRes);
  try {
    // const allPartiesRes1 = await electionContract.methods.end().send({
    //   from: account,
    //   value: WEB3.utils.toWei('1', "ether"),
    // })

    // console.log('displayElectionParty :: allPartiesRes1 :: ', allPartiesRes1);

    // const allPartiesRes2 = await electionContract.methods.end().call()
    // console.log('displayElectionParty :: allPartiesRes2 :: ', allPartiesRes2);

    // const req = await electionContract.methods.set(5).send({ from: account });
    // console.log('displayElectionParty :: req :: ', req);

    // const response = await electionContract.methods.get().call();
    // console.log('displayElectionParty :: response :: ', response);

    // const allPartiesRes3 = await electionContract.methods.getAllData().call()
    // console.log('displayElectionParty :: allPartiesRes3 :: ', allPartiesRes3);

    // const allPartiesRes4 = await electionContract.methods.get10Length().call()
    // console.log('displayElectionParty :: allPartiesRes4 :: ', allPartiesRes4);

    // const allPartiesRes4 = await electionContract.methods.getMemb().call()
    // console.log('displayElectionParty :: allPartiesRes4 :: ', allPartiesRes4);

  } catch (error) {
    console.log('error :: ', error);
  }

  //  electionContract.methods.getAllData().call().then(res => {
  //   console.log('res :: ', res);
  // }).catch(err => {
  //   console.log('err :: ', err);
  // })
  //  electionContract.methods.getMemb().call().then(res => {
  //   console.log('res :: ', res);
  // }).catch(err => {
  //   console.log('err :: ', err);
  // })
  // electionContract.methods.get10Length().call().then(res => {
  //   console.log('displayElectionParty :: res :: ', res);
  // }).catch(err => {
  //   console.log('displayElectionParty :: err :: ', err);
  // })

  // electionContract.once("ElectionResult", (error, event) => {
  //   console.log('error :: ', error);
  //   console.log('event :: ', event);
  // });

  // electionContract.events.ElectionResult().on('data', event => {
  //   console.log('event :: ', event);
  // })

  // electionContract.events.ElectionResult().then(result => {
  //   console.log('result :: ', result);
  // }).catch(err => {
  //   console.log('err :: ', err);
  // })
  //  ('') .then(res => {
  //   console.log('res :: ', res);
  // }).catch(err => {
  //   console.log('err :: ', err);
  // })
  // electionContract.methods.end().call().then(res => {
  //   console.log('res :: ', res);
  // }).catch(err => {
  //   console.log('err :: ', err);
  // })
}

export const getAccount = async ({ accountNum }) => {
  console.log('getAccount :: accountNum :: ', accountNum);
  if (!WEB3) {
    const web3 = await getWeb3();
    WEB3 = web3;
  }
  console.log('getAccount :: WEB3 :: ', WEB3);
  const accounts = await WEB3.eth.getAccounts();
  // console.log('extractAccounts :: accounts :: ', accounts);
  account = accounts[accountNum];
  console.log('getAccount :: account :: ', account);
  // if (accounts.length === counter) {
  //   counter = 0;
  // } else {
  //   counter = counter + 1;
  // }
  return account;
}

export const initVotingContract = async () => {
  console.log('initVotingContract');
  if (!WEB3) {
    const web3 = await getWeb3();
    WEB3 = web3;
  }
  console.log('initVotingContract :: WEB3 :: ', WEB3);
  // local network
  // const netId = await web3.eth.net.getId()
  console.log('initVotingContract :: account :: ', account);
  try {
    electionContract = new WEB3.eth.Contract(
      VotingContractRaw.abi,
      account
    );
    console.log('initVotingContract :: electionContract :: ', electionContract);
  } catch (err) {
    console.log('initVotingContract :: err :: ', err);
  }


  // console.log('initElectionContract :: electionContract :: ', electionContract);


  // metamask network
  // await window.ethereum.request({ method: "eth_requestAccounts" }).then(accounts => {
  //   console.log('accounts :: ', accounts);
  //   setAccount(accounts[0])
  //   acc = accounts[0]
  //   electionContract = new getWeb3.eth.Contract(
  //     electionContractRaw.abi,
  //     accounts[0]
  //   );
  // })
}

// export const initEthReceiverContract = () => {
//   etherReceiverContract = new getWeb3.eth.Contract(
//     EtherReceiverContractRaw.abi,
//     account
//   );
//   // console.log('initEthReceiverContract :: etherReceiverContract :: ', etherReceiverContract);
// }

// export const initEtherSenderContract = () => {
//   etherSenderContract = new getWeb3.eth.Contract(
//     EtherSenderContractRaw.abi,
//     account
//   );
//   // console.log('initEtherSenderContract :: etherSenderContract :: ', etherSenderContract);
// }

export const getBalance = async () => {
  if (!WEB3) {
    const web3 = await getWeb3();
    WEB3 = web3;
  }
  const balance = await WEB3.eth.getBalance(electionContract.options.address);
  // console.log('getBalance :: balance :: ', balance);
  return balance;
}
