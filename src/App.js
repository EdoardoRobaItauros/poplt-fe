import './App.css';
import { paths } from './config/config';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AdminPanel from "./pages/AdminPanel"
import UserFeed from './pages/UserFeed';
import Challenges from './pages/Challenges';
import TopBar from './components/TopBar';

function App() {
  return (
    <>
    <Router>
      <TopBar/>
      <Routes>
        <Route exact path="/" element={<Navigate to={paths.AdminPanel.url} />} />
        <Route exact path={paths.AdminPanel.url} element={< AdminPanel />}></Route>
        <Route exact path={paths.UserFeed.url} element={< UserFeed />}></Route>
        <Route exact path={paths.Challenges.url} element={< Challenges />}></Route>
      </Routes>
    </Router>
    </>
  );
}

export default App;
