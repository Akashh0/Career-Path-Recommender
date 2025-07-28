import { Routes, Route } from 'react-router-dom';
import CareerNavbar from './Components/NavBar';
import AuthPage from './Components/AuthPage/AuthPage';
import ParticlesBackground from './Components/ParticlesBackground';
import './App.css';

function App() {
  return (
    <>
    <div style={{ position: "relative", minHeight: "100vh", overflow: "hidden" }}>
      <ParticlesBackground />
      {/* ✅ Foreground content */}
      <div style={{ position: 'relative', zIndex: 10 }}>
        <CareerNavbar />

        <Routes>
          <Route path="/" element={<></>} />
          <Route path="/login" element={<AuthPage />} />
          <Route path="/signup" element={<AuthPage />} />
        </Routes>
      </div>
    </div>
    </>
  );
}

export default App;
