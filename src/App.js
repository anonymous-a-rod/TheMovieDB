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
import MovieDetails from './pages/MovieDetails';
import TvShowDetails from './pages/TvShowDetails';
import Search from './pages/Search';
import SignIn from './pages/SignIn';

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
            <Route path="/signin" element={<SignIn />} />
            <Route path="/movie-details/:id" element={<MovieDetails />} />
            <Route path="/tv-show-details/:id" element={<TvShowDetails />} />
            <Route path="/search/:id" element={<Search />} />
            <Route path="*" element={<Error />} />
        </Routes>
        <Footer />
      </Router>
      
    </main>
  );
}

export default App;
