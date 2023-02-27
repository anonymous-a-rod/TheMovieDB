import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import About from './pages/About';
import Team from './pages/Team';
import Footer from './components/Footer';
import Header from './components/Header';
import Error from './pages/Error';
import FAQ from './pages/FAQ';
import Movies from './pages/Movies';
import TvShows from './pages/TvShows';
import MovieDetails from './pages/Movie';

function App() {
  return (
    <main>
      <Router>
        <Header />
        <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/movies" exact element={<Movies />} />
            <Route path="/tv-shows" exact element={<TvShows />} />
            <Route path="/about" element={<About />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/team" element={<Team />} />
            <Route path="/movie-details/:id" element={<MovieDetails />} />
            <Route path="*" element={<Error />} />
        </Routes>
        <Footer />
      </Router>
      
    </main>
  );
}

export default App;
