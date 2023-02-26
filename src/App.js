import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import About from './pages/About';
import Team from './pages/Team';
import MovieDetails from './pages/MovieDetails';
import Footer from './components/Footer';
import Header from './components/Header';
import Error from './pages/Error';

function App() {
  return (
    <main className='container'>
      <Router>
        <Header />
        <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/team" element={<Team />} />
            <Route path="/movie-details/:MovieID" element={<MovieDetails />} />
            <Route path="*" element={<Error />} />
        </Routes>
      </Router>
      <Footer />
    </main>
  );
}

export default App;
