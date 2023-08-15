import { useParams, Outlet, NavLink } from 'react-router-dom';
import { Suspense, useEffect, useState } from 'react';
import fetchData from '../../fetchData';

export default function MovieDetails() {
  const [movie, setMovie] = useState([]);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('idle');
  const { movieId } = useParams();


  const getMovieInFetch = async id => {
    setStatus('pending');
    try {
      const response = await fetchData(
        ` https://api.themoviedb.org/3/movie/${id}?api_key=28eab61abc52e723036000843cb9a33c`
      );
      setMovie(response);
      setError(false);
      setStatus('resolved');
    } catch (error) {
      setError(error.message);
      setStatus('rejected');
    }
  };

  useEffect(() => {
    getMovieInFetch(movieId);
  }, [movieId]);

  if (status === 'rejected') {
    return <p>{error}</p>;
  }

  if (status === 'pending') {
    return <p>Loading...</p>;
  }


  if (status === 'resolved') {
    return (
      <main>
        <div>
          <div>
            <img
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt=""
            />
          </div>
          <div>
            <h2>{movie.title || movie.name}</h2>
            <p>
              User score: {Math.round(movie.vote_average)}/10
            </p>
            <div>
              <h3>Overview</h3>
              <p>{movie.overview}</p>
            </div>
            <div>
              <h3>Genres</h3>
              <p>
                {movie.genres ? (
                  movie.genres.map(genre => (
                    <span key={genre.id}>{genre.name}, </span>
                  ))
                ) : (
                  <span>No genres available</span>
                )}
              </p>
            </div>
          </div>
        </div>
        <div>
        <p>Additional information</p>
          <ul>
            <li>
              <NavLink to="cast">
                Cast
              </NavLink>
            </li>
            <li>
              <NavLink to="reviews">
                Reviews
              </NavLink>
            </li>
          </ul>
        </div>
        <Suspense fallback={<p>Loading...</p>}>
          <Outlet />
        </Suspense>
      </main>
    )
  }
}

