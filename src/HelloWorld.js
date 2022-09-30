import React from "react";
import { useEffect, useState } from "react";
import {
  connectWallet,
  getCurrentWalletConnected,
  loadPeriodDuration,
  loadVotingPeriodLength,
  loadGracePeriodLength,
  loadDilutionBound,
  fetchMember,
  loadTokenWhitelist,
  loadProposalDeposit,
  loadProcessingReward
} from "./util/interact.js";

import alchemylogo from "./alchemylogo.svg";
import { async } from "q";

const HelloWorld = () => {
  //state variables
  const [walletAddress, setWallet] = useState("");
  const [status, setStatus] = useState("");
  const [periodDuration, setPeriodDuration] = useState("");
  const [votingPeriod, setVotingPeriod] = useState("");
  const [gracePeriod, setGracePeriod] = useState("");
  const [proposalDeposit, setProposalDeposit] = useState("");
  const [dilutionBound, setDilutionBound] = useState("");
  const [reward, setReward] = useState("");
  const [inputTextValue, setInputTextValue] = useState("");
  const [inputValue, setInputValue] = useState(null);
  const [member, setMember] = useState({});
  const [isWhitelist, setIsWhitelist] = useState(null);

  //called only once
  useEffect(() => {
    async function fetchInitialParameters() {
      setPeriodDuration(await loadPeriodDuration());
      setVotingPeriod(await loadVotingPeriodLength());
      setGracePeriod(await loadGracePeriodLength());
      setProposalDeposit(await loadProposalDeposit());
      setDilutionBound(await loadDilutionBound());
      setReward(await loadProcessingReward());
    }
    fetchInitialParameters();

    async function fetchWallet() {
      const {address, status} = await getCurrentWalletConnected();
      setWallet(address);
      setStatus(status); 
    }
    fetchWallet();
    addWalletListener();
  }, []);

  async function onFetchMember(index) {
    const memberData = await fetchMember(index);
    setMember(memberData);
  }

  async function onCheckWhitelist(text) {
    const isValid = await loadTokenWhitelist(text);
    setIsWhitelist(isValid);
  }

  function addWalletListener() {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
          setWallet(accounts[0]);
          setStatus("👆🏽 Write a message in the text-field above.");
        } else {
          setWallet("");
          setStatus("🦊 Connect to Metamask using the top right button.");
        }
      });
    } else {
      setStatus(
        <p>
          {" "}
          🦊{" "}
          <a target="_blank" href={`https://metamask.io/download`} rel="noreferrer">
            You must install Metamask, a virtual Ethereum wallet, in your
            browser.
          </a>
        </p>
      );
    }
  }

  const connectWalletPressed = async () => {
    const walletResponse = await connectWallet();
    setStatus(walletResponse.status);
    setWallet(walletResponse.address);
  };

  //the UI of our component
  return (
    <div id="container">
      <img id="logo" src={alchemylogo}></img>
      <button id="walletButton" onClick={connectWalletPressed}>
        {walletAddress.length > 0 ? (
          "Connected: " +
          String(walletAddress).substring(0, 5) +
          "..." +
          String(walletAddress).substring(walletAddress.length - 5)
        ) : (
          <span>Connect Wallet</span>
        )}
      </button>

      <h2 style={{ paddingTop: "18px" }}>Period Duration: {periodDuration}</h2>

      <h2>Voting Period Length: {votingPeriod}</h2>
      <h2>Grace Period Length: {gracePeriod}</h2>
      <h2>Proposal Deposit: {proposalDeposit}</h2>
      <h2>Dilution Bound: {dilutionBound}</h2>
      <h2>Processing Reward: {reward}</h2>

      {/* <div>
        <h2 style={{ paddingTop: "18px" }}>Token Whitelist: {isWhitelist}</h2>
        <input
          id="fetchAddress"
          type="text"
          placeholder="Insert the address"
          onChange={(e) => setInputTextValue(e.target.value)}
          // onChange= {(e) => onCheckWhitelist(e.value.target)}
        />
        <button id="fetchAddress" onClick={onCheckWhitelist(inputTextValue)}>
          Fetch
        </button>
      </div>

      <div>
        <h2 style={{ paddingTop: "18px" }}>Member: {member}</h2>
        <input
          id="fetchMember"
          type="text"
          placeholder="Insert the index"
          onChange={(e) => setInputValue(e.target.value)}
          // onChange= {(e) => onCheckWhitelist(e.value.target)}
        />
        <button id="fetchMember" onClick={onFetchMember(inputValue)}>
          Fetch
        </button>
      </div> */}
    </div>
  );
};

export default HelloWorld;
