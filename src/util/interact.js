require('dotenv').config();
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY;
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(alchemyKey);

const contractABI = require("../mumbai-contract-abi.json");
const contractAddress = "0x1b1beBcbD279bB7782a13b9F33558022F4Aac5b7";

export const molochDAOContract = new web3.eth.Contract(
  contractABI,
  contractAddress
);

export const loadPeriodDuration = async () => { 
  return await molochDAOContract.methods.periodDuration().call(); 
};

export const loadVotingPeriodLength = async () => { 
  return await molochDAOContract.methods.votingPeriodLength().call();
};

export const loadGracePeriodLength = async () => { 
  return await molochDAOContract.methods.gracePeriodLength().call();
};

export const loadProposalDeposit = async () => { 
  return await molochDAOContract.methods.proposalDeposit().call();
};

export const loadDilutionBound = async () => { 
  return await molochDAOContract.methods.dilutionBound().call();
};

export const loadProcessingReward = async () => { 
  return await molochDAOContract.methods.processingReward().call();
};

export const fetchMember = async (index) => { 
  return await molochDAOContract.methods.members(index).call();
};

export const loadTokenWhitelist = async (address) => { 
  return await molochDAOContract.methods.tokenWhitelist(address).call();
};

export const connectWallet = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const obj = {
        status: "👆🏽 Write a message in the text-field above.",
        address: addressArray[0],
      };
      return obj;
    } catch (err) {
      return {
        address: "",
        status: "😥 " + err.message,
      };
    }
  } else {
    return {
      address: "",
      status: (
        <span>
          <p>
            {" "}
            🦊{" "}
            <a target="_blank" href={`https://metamask.io/download`} rel="noreferrer">
              You must install Metamask, a virtual Ethereum wallet, in your
              browser.
            </a>
          </p>
        </span>
      ),
    };
  }
};

export const getCurrentWalletConnected = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_accounts",
      });
      if (addressArray.length > 0) {
        return {
          address: addressArray[0],
          status: "👆🏽 Write a message in the text-field above.",
        };
      } else {
        return {
          address: "",
          status: "🦊 Connect to Metamask using the top right button.",
        };
      }
    } catch (err) {
      return {
        address: "",
        status: "😥 " + err.message,
      };
    }
  } else {
    return {
      address: "",
      status: (
        <span>
          <p>
            {" "}
            🦊{" "}
            <a target="_blank" href={`https://metamask.io/download`} rel="noreferrer">
              You must install Metamask, a virtual Ethereum wallet, in your
              browser.
            </a>
          </p>
        </span>
      ),
    };
  }
};
