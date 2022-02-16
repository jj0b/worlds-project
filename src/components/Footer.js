import '../App.css';
import GitHub from '../img/github.svg';

function Footer(props) {
  return (
    <div className="Footer">
      <div>
        <a href="https://github.com/jj0b">
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
      </div>
    </div>
  );
}

export default Footer;
