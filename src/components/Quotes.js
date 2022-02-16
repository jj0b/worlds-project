import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import '../App.css';

const quotes = [
  'What mysteries might we uncover in the dark, ruinous depths of an alien civilization on a Hydrocarbon Ocean World?',

  'What do we not yet understand about this universe that could possibly explain a civilization sustained on a Chthonian planet?',

  'What might an advanced alien species inhabiting a Super Massive Type III Gas Giant have to teach us?',

  'What percentage of inhabitants of Ring Worlds take exotic vacations to nearby planets and moons?',

  'What histories might exist in a system where all the moons and planets are abandoned, but civilization flourishes in a Shellworld?',

  'Who built the Abandoned Dyson Sphere? What happened to them? Did they have to empty more than just their own system of planets and moons to have the raw materials to build it?',

  'What led to the ruin of these abandoned worlds? War? Famine? Exponential tech? The promise of a better life elsewhere in the galaxy?',

  'What explains a system of inhabited worlds of fundamentally different environments? Did one species bend the various worlds to their will? Did they adapt their biology? Multiple immigration events? Diverse panspermia and parallel evolution?',

  'Could we, from this Hot Terrestrial paradise, visit friends beneath the frigid surface of an H2O Ice World?',

  'How long did life sustain on the ancient, abandoned Desert World?',
];

function Quotes(props) {
  const [quoteIndex, setQuoteIndex] = useState(
    Math.floor(Math.random() * quotes.length)
  );

  const [fadeProp, setFadeProp] = useState({
    fade: 'fade-in',
  });

  useEffect(() => {
    const timeout = setInterval(
      () => {
        if (fadeProp.fade === 'fade-in') {
          setFadeProp({
            fade: 'fade-out',
          });
        } else {
          setQuoteIndex(Math.floor(Math.random() * quotes.length));
          setFadeProp({
            fade: 'fade-in',
          });
        }
      },
      fadeProp.fade === 'fade-in' ? 10000 : 1000
    );

    return () => clearInterval(timeout);
  }, [fadeProp]);

  function getQuote() {
    return quotes[quoteIndex];
  }

  return (
    <div className="Quotes">
      <p className={fadeProp.fade}>{getQuote()}</p>
    </div>
  );
}

Quotes.propTypes = {
  text: PropTypes.string,
};

export default Quotes;
