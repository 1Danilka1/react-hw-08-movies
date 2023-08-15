import React, { useEffect, useState } from 'react'
import fetchData from 'components/fetchData';
import { NavLink, useLocation } from 'react-router-dom';

export default function MovieList({ data }) {
    const [status, setStatus] = useState('idle');
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const location = useLocation();

 const searchMovieList = async q => {
    setStatus('pending');
    try {
        const response = await fetchData(`https://api.themoviedb.org/3/search/movie?query=${q}&api_key=28eab61abc52e723036000843cb9a33c`);
        setMovies(response.results);
        setStatus('resolved');
        setError(false)
    } catch (error) {
        setError(error.message);
        setMovies('rejected');
    }
 };

  useEffect(() => {
    searchMovieList(data);
  }, [data]);

  if (status === 'pending') {
    return <p>Loading...</p>
  }

  if (status === 'rejected') {
    return <p>{error}</p>
  }

  if (status === 'resolved') {
    return (
        <ul>
          {movies.map(movie => (
            <li key={movie.id}>
              <NavLink
                to={`${movie.id}`}
                state={{ from: location }}
              >
               {movie.title || movie.name}
              </NavLink>
            </li>
          ))}
        </ul>
    );
  }
}
