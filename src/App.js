import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Upload from './Components/Admin/Upload';
import Home from './Components/User/Home';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <h1 className="bg-blue-500 text-white p-4">
          Hello world!
        </h1>
      </div>
      <Routes>
        <Route path='/admin/upload' element={<Upload />} />
        <Route path='/user/home' element={<Home/>} />
      </Routes>
    </Router>
  );
}

export default App;
