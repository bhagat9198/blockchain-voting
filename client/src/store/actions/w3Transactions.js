import Web3 from 'web3';

import VotingContractRaw from './../../contracts/Voting.json';
import EtherSenderContractRaw from './../../contracts/EtherSender.json'
import EtherReceiverContractRaw from './../../contracts/EtherReceiver.json';
import getWeb3 from './../../getWeb3';

const web3 = new Web3();

let account;
let electionContract;
let etherSenderContract;
let etherReceiverContract;
let counter = 0;

export const addElectionParty = async ({ id }) => {
  const addPartyRes = await electionContract.methods.addParty(`${id}`).send({
    from: account,
    value: web3.utils.toWei('0.0000001', "ether"),
  })
  // console.log('addElectionParty :: addPartyRes :: ', addPartyRes);
  return addPartyRes;
}

export const getAccount = async () => {
  const accounts = await new getWeb3.eth.getAccounts();
  // console.log('extractAccounts :: accounts :: ', accounts);
  account = accounts[counter];
  if (accounts.length === counter) {
    counter = 0;
  } else {
    counter = counter + 1;
  }
}

export const initVotingContract = () => {
  // local network
  electionContract = new getWeb3.eth.Contract(
    VotingContractRaw.abi,
    account
  );
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

export const initEthReceiverContract = () => {
  etherReceiverContract = new getWeb3.eth.Contract(
    EtherReceiverContractRaw.abi,
    account
  );
  // console.log('initEthReceiverContract :: etherReceiverContract :: ', etherReceiverContract);
}

export const initEtherSenderContract = () => {
  etherSenderContract = new getWeb3.eth.Contract(
    EtherSenderContractRaw.abi,
    account
  );
  // console.log('initEtherSenderContract :: etherSenderContract :: ', etherSenderContract);
}

export const getBalance = async () => {
  const balance = await getWeb3.eth.getBalance(electionContract.options.address);
  // console.log('getBalance :: balance :: ', balance);
  return balance;
}

