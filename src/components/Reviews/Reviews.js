import { useState, useEffect } from 'react';
import * as movieAPI from '../movieAPI/movieAPI';
import { useParams } from 'react-router-dom';
import s from './Reviews.module.css';

export default function Reviews() {
  const [reviews, setReviews] = useState(null);
  const { movieId } = useParams();

  useEffect(() => {
    movieAPI.getReviewsMovie(movieId).then(({ results }) => {
      setReviews(results);
    });
  }, [movieId]);

  return (
    <>
      {reviews?.length === 0 && <h2>No reviews for this movie</h2>}
      {reviews &&
        reviews.map(review => {
          return (
            <ul>
              <li>
                <h3>{review.author}</h3>
                <p>{review.content}</p>
              </li>
            </ul>
          );
        })}
    </>
  );
}
