import './App.css';
import Navbar from './components/Navbar';
import Swapbox from './components/Swapbox';
import Loading from './components/Loading';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'

function App() {
  return (
    <>
    <Router>
        <div className='container'>
        <Navbar />
          <Routes>
            <Route path='/' element={<Swapbox />} />
            <Route path='/loading' element={<Loading />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;