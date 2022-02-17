import '../App.css';

function Info(props) {
  return (
    <div className="Info">
      <p style={{ marginBottom: 10 }}>Begin your journey of discovery</p>
      <p style={{ fontSize: '1.8rem', marginBottom: 10 }}>
        <b>Claim a star system</b>
      </p>
      <p className="TextBlock">
        10,000 star systems, each with a story to tell. Who inhabits these
        strange and varied environments? What riches and mysteries do they hold?
        Who, if any, are these worlds beholden to? Why have some worlds been
        abandoned?
      </p>
    </div>
  );
}

export default Info;
