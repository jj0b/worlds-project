import './App.css';
import Header from './components/Header';
import Nav from './components/Nav';
import Definition from './components/Definition';
import Info from './components/Info';
import WorldsPreview from './components/WorldsPreview';
import Quotes from './components/Quotes';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Header />
      <Nav />
      <Definition />
      <Info />
      <WorldsPreview />
      <Quotes />
      <Footer />
    </div>
  );
}

export default App;
