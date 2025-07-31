import { Routes, Route, useLocation } from 'react-router-dom';
import CareerNavbar from './Components/NavBar';
import AuthPage from './Components/AuthPage/AuthPage';
import ParticlesBackground from './Components/ParticlesBackground';
import CareerRedditFeed from './Components/CareerRedditFeed';
import BottomNav from './Components/BottomNav';
import './App.css';

function App() {
  const location = useLocation();
  const isAuthRoute = location.pathname === "/login" || location.pathname === "/signup";

  return (
    <div style={{ position: "relative", minHeight: "100vh", overflow: "hidden" }}>
      <ParticlesBackground />

      {/* ✅ Foreground content */}
      <div style={{ position: 'relative', zIndex: 10 }}>
        <CareerNavbar />

        <Routes>
          <Route path="/login" element={<AuthPage />} />
          <Route path="/signup" element={<AuthPage />} />
          <Route path="/" element={<CareerRedditFeed />} />
        </Routes>
      </div>

      {!isAuthRoute && <BottomNav />}
    </div>
  );
}

export default App;
