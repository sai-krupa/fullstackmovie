import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import PopularMoviesPage from './pages/PopularMoviesPage';
import Header from './components/Header';
import Footer from './components/Footer';
import MovieDetailPage from './pages/MovieDetailPage';
// import AboutPage from './pages/AboutPage1';
import WatchMoviesPage from './pages/WatchMoviesPage';
import { fetchMovies } from './features/movies/moviesSlice';
import './App.css';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  return (
    <div className='App'>
      <Header />
      <Routes>
        <Route path='/' element={<PopularMoviesPage />} />
        {/* <Route path='about' element={<AboutPage />} /> */}
        <Route path='/watchMovies' element={<WatchMoviesPage />} />
        <Route path='/:movieId' element={<MovieDetailPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
