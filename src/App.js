import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './component/Navbar';
import Home from './component/Home';
import About from './component/About';
import Login from './component/Login'
import SignUp from './component/SignUp'
import NoteState from './context/notes/noteState';
import Alert from './component/Alert';

function App() {
  return (
    <>
    <NoteState>
            <Router>
        <Navbar />
        {/* <Alert/> */}
        <div className='container'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path='/login' element={<Login />}/>
          <Route path='/signup' element={<SignUp/>}/>
        </Routes>
        </div>
      </Router>
      </NoteState>

    </>
  );
}

export default App;


