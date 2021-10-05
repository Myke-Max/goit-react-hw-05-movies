import { useState, useEffect } from 'react';
import { useParams, Route, NavLink, useRouteMatch } from 'react-router-dom';
import Cast from '../Cast';
import * as movieAPI from '../movieAPI/movieAPI';

// import s from './MovieDetailsPage.module.css';
export default function MovieDetailPage() {
  const [movieDetails, setMovieDetails] = useState(null);
  const { url } = useRouteMatch();
  const { movieId } = useParams();

  useEffect(() => {
    movieAPI.getMoviesDetail(movieId).then(setMovieDetails);
  }, [movieId]);

  return (
    <>
      {movieDetails && <h2>{movieDetails.title}</h2>}
      <Route path="/movies/:movieId">
        <Cast />
      </Route>
    </>
  );
}
