import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Gallery from './pages/Gallery';
import About from './pages/About';
import Booking from './pages/Booking';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white flex flex-col">
        <Navbar />
        <main className="flex-grow pt-24">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/about" element={<About />} />
            <Route path="/booking" element={<Booking />} />
          </Routes>
        </main>
        {/* Minimal Footer */}
        <footer className="py-12 text-center text-xs tracking-widest text-slate-400 uppercase">
          &copy; {new Date().getFullYear()} Starling Photography. All Rights Reserved.
        </footer>
      </div>
    </Router>
  );
}

export default App;
