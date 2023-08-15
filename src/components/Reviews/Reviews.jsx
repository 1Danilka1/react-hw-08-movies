import { useEffect, useState } from 'react';
import fetchUsers from '../fetchData';
import css from './Rewievs.module.css'
import { useParams } from 'react-router-dom';


export default function Cast() {
  const [reviews, setReviews] = useState([]);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);
  const { movieId } = useParams();

  const getReviewsFromFetch = async id => {
    setStatus('pending');
    try {
      const response = await fetchUsers(
        `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=28eab61abc52e723036000843cb9a33c`
      );
      setError('false');
      setReviews(response.results);
      setStatus('resolved');
    } catch (error) {
      setError(error.message);
      setStatus('rejected');
    }
  };
  useEffect(() => {
    getReviewsFromFetch(movieId);
  }, [movieId]);

  if (status === 'pending') {
    return <p>Loading...</p>;
  }
  if (status === 'rejected') {
    return <p>{error}</p>;
  }
  if (status === 'resolved') {
    if (reviews === null) {
      <p>We don't have any reviews for this movie</p>
    } 
    return (
      <ul>
        {reviews.map(review => (
          <li key={review.id} className={css.items}>
            <h2 className={css.title}>{review.author}</h2>
            <p className={css.text}>{review.content}</p>
          </li>
        ))}
      </ul>
    );
  }
}