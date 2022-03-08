import './App.css';
import Navbar from './components/Navbar';
import Swapbox from './components/Swapbox';
// import TokenList from './components/getTokens';

function App() {
  return (
    <div className='container'>
      <Navbar />
      <Swapbox />
      {/* <TokenList /> */}
    </div>
  );
}

export default App;