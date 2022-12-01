import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Profile from './pages/Profile'
import Homepage from './pages/Homepage'
import useToken from './pages/useToken'
import Navbar from './components/Navbar'
import './styles/App.css'
import { ViewAgenda } from '@mui/icons-material'
import ViewProfile from './pages/ViewProfile';
import Restaurant from './pages/RestaurantRecommendation';
import LanguageHelp from './pages/LanguageHelp';
import EventsRecommendation from './pages/EventsRecommendation.lazy'

function App() {
  const { token, removeToken, setToken } = useToken();

  return (
    <BrowserRouter>
      <div className="App">
            <Routes>
              <Route path="/" element={<Login setToken={setToken}/>}></Route>
              <Route path="/profile" element={<Profile token={token} setToken={setToken}/>}></Route>
              <Route path="/signup"  element={<Signup />}></Route>
              <Route path="/homepage"  element={<Homepage />}></Route>
              <Route path="/userprofile"  element={<ViewProfile />}></Route>
              <Route path="/restaurant"  element={<Restaurant />}></Route>
              <Route path="/events"  element={<EventsRecommendation />}></Route>
              <Route path="/language_help"  element={<LanguageHelp />}></Route>

            </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
