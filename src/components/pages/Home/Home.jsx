import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import css from './Home.module.css'
import fetchData from '../../fetchData';

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('idle');
  const location = useLocation()

  const getMoviesInFetch = async () => {
    setStatus('pending');
    try {
      const response = await fetchData(
        ' https://api.themoviedb.org/3/trending/movie/day?api_key=28eab61abc52e723036000843cb9a33c&language=en-US'
      );
      setMovies(response.results);
      setError(false);
      setStatus('resolved');
    } catch (error) {
      setError(error.message);
      setStatus('rejected');
    }
  };

  useEffect(() => {
    getMoviesInFetch();
  }, []);

  if (status === 'pending') {
    return <p>Loading...</p>;
  }

  if (status === 'resolved') {
    return (
      <div className={css.container}>
        <h1>Trending today</h1>
        <ul className={css.list_styles}>
          {movies.map(movie => (
            <li key={movie.id} className={css.item_styles}>
              <NavLink to={`movies/${movie.id}`} state = {{ from: location }} className={css.links}>
                {movie.title || movie.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  if (status === 'rejected') {
    return <p>{error}</p>;
  }
}