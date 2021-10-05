import { useEffect, useState } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
// import s from './HomePage.module.css';
import * as movieAPI from '../movieAPI/movieAPI';

export default function HomePage() {
  const { url } = useRouteMatch();

  const [popularMovie, setPopularMovie] = useState(null);

  useEffect(() => {
    movieAPI.getPopularMovies().then(({ results }) => {
      setPopularMovie(results);
    });
  }, []);

  return (
    <ul>
      {popularMovie &&
        popularMovie.map(movie => (
          <li key={movie.id}>
            <Link to={`${url}movies/${movie.id}`}>{movie.title}</Link>
          </li>
        ))}
    </ul>
  );
}
