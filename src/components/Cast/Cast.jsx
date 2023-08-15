import { useEffect, useState } from 'react';
import fetchUsers from '../fetchData';
import { useParams } from 'react-router-dom';
import css from './Cast.module.css'


export default function Cast() {
  const [actors, setActors] = useState([]);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('idle');
  const { movieId } = useParams();

  const getActorsFromFetch = async id => {
    setStatus('pending');
    try {
      const response = await fetchUsers(
        `https://api.themoviedb.org/3/movie/${id}/credits?api_key=28eab61abc52e723036000843cb9a33c`
      );
      setError('false');
      setActors(response.cast);
      setStatus('resolved');
    } catch (error) {
      setError(error.message);
      setStatus('rejected');
    }
  };
  useEffect(() => {
    getActorsFromFetch(movieId);
  }, [movieId]);

  if (status === 'pending') {
    return <p>Loading...</p>;
  }
  if (status === 'rejected') {
    return <p>{error}</p>;
  }
  if (status === 'resolved') {
    return (
      <ul className={css.list_item}>
        {actors.map(actor => (
          <li key={actor.id} className={css.items}>
            {!actor.profile_path ? (
              <p>No image available</p>
            ) : (
              <img
                src={`https://image.tmdb.org/t/p/w500/${actor.profile_path}?api_key=28eab61abc52e723036000843cb9a33c`}
                alt={actor.name}
                className={css.images}
              />
            )}
            <p>{actor.name}</p>
            <p>Character: {actor.character || 'No info available'}</p>
          </li>
        ))}
      </ul>
    );
  }
}