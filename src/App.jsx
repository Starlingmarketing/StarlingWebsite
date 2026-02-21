import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ReactLenis, useLenis } from 'lenis/react';
import { useEffect, Suspense, lazy } from 'react';
import Navbar from './components/Navbar';

const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Booking = lazy(() => import('./pages/Booking'));

function ScrollToTop() {
  const { pathname } = useLocation();
  const lenis = useLenis();

  useEffect(() => {
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    }
  }, [pathname, lenis]);

  return null;
}

function App() {
  return (
    <ReactLenis root options={{ lerp: 0.16, smoothWheel: true }}>
      <Router>
        <ScrollToTop />
        <div className="min-h-screen bg-white flex flex-col">
          <Navbar />
          <main className="flex-grow pt-24">
            <Suspense fallback={<div className="w-full min-h-[50vh]" />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/booking" element={<Booking />} />
              </Routes>
            </Suspense>
          </main>
          <footer className="py-12 text-center text-xs tracking-widest text-slate-400 uppercase">
            &copy; {new Date().getFullYear()} Starling Photography. All Rights Reserved.
          </footer>
        </div>
      </Router>
    </ReactLenis>
  );
}

export default App;
