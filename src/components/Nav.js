import '../App.scss';
import Twitter from '../img/twitter.svg';
import OpenSea from '../img/opensea.svg';

function Nav(props) {
  return (
    <div className="Nav">
      <div>
        <a href="https://twitter.com/AGalaxyOfLoot">
          <img
            alt="Twitter Logo"
            src={Twitter}
            style={{
              width: 36,
              margin: '20px 10px',
              display: 'inline-block',
            }}
          />
        </a>
        <a href="https://opensea.io/collection/worldsproject">
          <img
            alt="OpenSea Logo"
            src={OpenSea}
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

export default Nav;
