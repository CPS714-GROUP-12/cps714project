import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './components/Login'
import Signup from './components/Signup'
import Profile from './components/Profile'
import Header from './components/Header'
import useToken from './components/useToken'
import Navbar from './components/Navbar'
import './App.css'

function App() {
  const { token, removeToken, setToken } = useToken();

  return (
    <BrowserRouter>
      <div className="App">
            <Routes>
              <Route path="/" element={<Login setToken={setToken}/>}></Route>
              <Route path="/profile" element={<Profile token={token} setToken={setToken}/>}></Route>
              <Route path="/signup"  element={<Signup />}></Route>
            </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
