import { useState, useEffect } from 'react';
import * as movieAPI from '../movieAPI/movieAPI';
import { useParams } from 'react-router-dom';
import s from './Reviews.module.css';

export default function Reviews() {
  const [reviews, setReviews] = useState('');
  const { movieId } = useParams();

  useEffect(() => {
    movieAPI.getReviewsMovie(movieId).then(({ results }) => {
      setReviews(results);
      console.log(results.map(author => console.log(author)));
    });
  }, [movieId]);

  return (
    <>
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
