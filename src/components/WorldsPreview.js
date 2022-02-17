import '../App.scss';
import { useState, useEffect, useCallback } from 'react';
import { ethers } from 'ethers';
import Worlds from '../artifacts/contracts/Worlds.sol/Worlds.json';

const worldsAddress = '0x1Fc3e820AA7368f9Dde7B84758Dd208123159Ad6';
const tokenURIHeaderLength = 'data:application/json;base64,'.length;

function WorldsPreview(props) {
  const initialTokenId = Math.floor(Math.random() * 10000) + 1;
  const [tokenId, setTokenId] = useState(initialTokenId);
  const [imageURI, setImageURI] = useState(null);
  const [claimed, setClaimed] = useState(false);

  const getTokenURI = useCallback(async () => {
    if (typeof window.ethereum !== 'undefined') {
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(worldsAddress, Worlds.abi, signer);
      const tokenURI = await contract.tokenURI(tokenId);
      const tokenJSON = Buffer.from(
        tokenURI.substring(tokenURIHeaderLength),
        'base64'
      );
      return await JSON.parse(tokenJSON);
    }
  }, [tokenId]);

  const getOwner = useCallback(async () => {
    if (typeof window.ethereum !== 'undefined') {
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(worldsAddress, Worlds.abi, signer);
      console.log(`Looking up owner of tokenId: ${tokenId}`);
      try {
        const ownerAddress = await contract.ownerOf(tokenId);
        return ownerAddress;
      } catch (error) {
        console.log(error);
      }
    }
  }, [tokenId]);

  const displaySystem = useCallback(async () => {
    const tokenURI = await getTokenURI(tokenId);
    const owner = await getOwner();
    setClaimed(owner ? true : false);
    setImageURI(tokenURI.image);
  }, [getOwner, getTokenURI, tokenId]);

  useEffect(() => {
    if (tokenId && tokenId > 0 && tokenId <= 10000) {
      displaySystem();
    }
  }, [displaySystem, tokenId]);

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

  function renderBadge() {
    if (claimed) {
      return <span className="claimedBadge badge-top-right"></span>;
    } else {
      return <span className="unclaimedBadge badge-top-right"></span>;
    }
  }

  function renderWorlds() {
    if (imageURI) {
      return (
        <div style={{ position: 'relative' }}>
          <img
            alt="Rendered Worlds"
            src={`${imageURI}`}
            className="WorldsImage"
          />
          {renderBadge()}
        </div>
      );
    } else {
      return <div className="WorldsImage" />;
    }
  }

  function showNext() {
    if (tokenId < 10000) {
      setTokenId(tokenId + 1);
    }
  }

  function showPrevious() {
    if (tokenId > 1) {
      setTokenId(tokenId - 1);
    }
  }

  return (
    <div className="WorldsPreview">
      {renderWorlds()}
      <div className="Controls">
        <button className="NavButton" onClick={showPrevious}>
          &#x3c;
        </button>
        <input
          className="Input"
          onChange={(e) => setTokenId(parseInt(e.target.value) || '')}
          value={tokenId}
        />
        <button className="NavButton" onClick={showNext}>
          &#x3e;
        </button>
      </div>
      <button className="ClaimButton" onClick={claim}>
        Claim
      </button>
    </div>
  );
}

export default WorldsPreview;
