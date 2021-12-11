import './App.css';
import { useState } from 'react';
import { ethers } from 'ethers'
import Worlds from './artifacts/contracts/Worlds.sol/Worlds.json'

const worldsAddress = "0x4E0247697f70dfF1eA660cBA484A2Aaf333047A5";
const tokenURIHeaderLength = "data:application/json;base64,".length;
const tokenURIStringHeaderLength = "data:text/plain;base64,".length;

function App() {

  const [tokenId, setTokenId] = useState(1);
  const [imageURI, setImageURI] = useState(null);

  async function requestAccount() {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
  }

  async function claim() {
    if (typeof window.ethereum !== 'undefined') {
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(worldsAddress, Worlds.abi, signer);
      console.log(`Attempting to claim tokenId: ${tokenId}`);
      const transaction = await contract.claim(tokenId);
      await transaction.wait();
      console.log(transaction);
    }
  }

  async function ownerClaim() {
    if (typeof window.ethereum !== 'undefined') {
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(worldsAddress, Worlds.abi, signer);
      console.log(`Attempting to owner claim tokenId: ${tokenId}`);
      const transaction = await contract.ownerClaim(tokenId);
      await transaction.wait();
      console.log(transaction);
    }
  }

  async function tokenURI() {
    if (typeof window.ethereum !== 'undefined') {
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(worldsAddress, Worlds.abi, signer);
      const tokenURI = await contract.tokenURI(tokenId);
      const tokenJSON = Buffer.from(tokenURI.substring(tokenURIHeaderLength), 'base64')
      const decodedToken = JSON.parse(tokenJSON);
      setImageURI(decodedToken.image);
    }
  }

  async function tokenURIString() {
    if (typeof window.ethereum !== 'undefined') {
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(worldsAddress, Worlds.abi, signer);
      const tokenURI = await contract.tokenURIString(tokenId);
      console.log(tokenURI);
      const tokenJSON = Buffer.from(tokenURI.substring(tokenURIHeaderLength), 'base64');
      const decodedToken = JSON.parse(tokenJSON);
      console.log(decodedToken.data);
      const data = Buffer.from(decodedToken.data.substring(tokenURIStringHeaderLength), 'base64');
      const decodedData = new TextDecoder().decode(data);
      console.log(decodedData);
    }
  }

  async function waitABit() {
    await new Promise(resolve => setTimeout(resolve, 5000));
    console.log('waited...');
  }

  async function logAllWorlds() {
    if (typeof window.ethereum !== 'undefined') {
      let allWorlds = [];
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(worldsAddress, Worlds.abi, signer);

      for (let i = 0; i < 10001; i++) {
        const tokenURI = await contract.tokenURIString(i);

        waitABit();

        const tokenJSON = Buffer.from(tokenURI.substring(tokenURIHeaderLength), 'base64');
        const decodedToken = JSON.parse(tokenJSON);
        const data = Buffer.from(decodedToken.data.substring(tokenURIStringHeaderLength), 'base64');
        const decodedData = new TextDecoder().decode(data);

        // if (decodedData.includes('Dyson')) {
        //   console.log('Dyson Sphere Found');
        // }
        if (i < 1000) {
          allWorlds[i] = (decodedData + 'LF');
        } else {
          allWorlds[i] = decodedData;
        }
      }

      console.log(allWorlds);
    }
  }

  async function ownerOf() {
    if (typeof window.ethereum !== 'undefined') {
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(worldsAddress, Worlds.abi, signer);
      console.log(`Looking up owner of tokenId: ${tokenId}`);
      const ownerAddress = await contract.ownerOf(tokenId);
      console.log(ownerAddress);
    }
  }

  function renderWorlds() {
    if (imageURI) {
      return (
        <img style={{ width: 420, height: 420, margin: 20 }} alt="Rendered Worlds" src={`${imageURI}`} />
      );
    } else {
      return (
        <div style={{ width: 420, height: 420, margin: 20, backgroundColor: '#000' }} />
      )
    }
  }

  function showNext() {
    if (tokenId < 10000) {
      setTokenId(tokenId + 1);
      tokenURI();
    }
  }

  function showPrevious() {
    if (tokenId > 1) {
      setTokenId(tokenId - 1);
      tokenURI();
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <h2>Worlds Project</h2>
        <p style={{fontSize: 18, width: 1000}}>Worlds is randomly generated, often inhabited, or once inhabited, planetary star systems created and stored on chain. Stats, images, and other functionality are intentionally omitted for others to interpret. Feel free to use Worlds in any way you want.</p>
        <div>
          <button style={{ margin: 10, display: 'inline-block' }} onClick={tokenURI}>Display Worlds with TokenId:</button>
          <input  style={{ margin: 10, display: 'inline-block' }} onChange={e => setTokenId(parseInt(e.target.value))} placeholder="0" />
        </div>
        <button style={{ margin: 10 }} onClick={claim}>Claim Worlds</button>
        <button style={{ margin: 10 }} onClick={ownerClaim}>Owner Claim Worlds</button>

        <div>
          <button style={{ margin: 10, display: 'inline-block' }} onClick={showPrevious}>Prev</button>
          <button style={{ margin: 10, display: 'inline-block' }} onClick={showNext}>Next</button>
        </div>

        {/* <button style={{ margin: 10 }} onClick={tokenURIString}>Console Log TokenURIString</button> */}
        {/* <button style={{ margin: 10 }} onClick={ownerOf}>Console Log Owner of TokenId</button> */}
        {/* <button style={{ margin: 10 }} onClick={logAllWorlds}>Console Log ALL Worlds</button> */}
        { renderWorlds() }
      </header>
    </div>
  );
}

export default App;