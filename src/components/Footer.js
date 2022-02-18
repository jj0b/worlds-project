import '../App.scss';
import GitHub from '../img/github.svg';
import Etherscan from '../img/etherscan-logo-circle.svg';

function Footer(props) {
  return (
    <div className="Footer">
      <div>
        <a href="https://github.com/jj0b/worlds-project">
          <img
            alt="GitHub Logo"
            src={GitHub}
            style={{
              width: 36,
              margin: '20px 10px',
              display: 'inline-block',
            }}
          />
        </a>
        <a href="https://etherscan.io/address/0x1Fc3e820AA7368f9Dde7B84758Dd208123159Ad6">
          <img
            alt="Etherscan Logo"
            src={Etherscan}
            style={{
              width: 36,
              margin: '20px 10px',
              display: 'inline-block',
            }}
          />
        </a>
      </div>
    </div>
  );
}

export default Footer;
