import { useEffect, useState } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import s from './HomePage.module.scss';
import * as movieAPI from '../movieAPI/movieAPI';

export default function HomePage() {
  const { url } = useRouteMatch();

  const [popularMovie, setPopularMovie] = useState(null);

  const IMG_URL = 'https://image.tmdb.org/t/p/w500';

  useEffect(() => {
    movieAPI.getPopularMovies().then(({ results }) => {
      setPopularMovie(results);
    });
  }, []);

  return (
    <ul className={`${s.card__list} ${s.list}`}>
      {popularMovie &&
        popularMovie.map(movie => (
          <li className={s.result__item} key={movie.id}>
            <Link to={`${url}movies/${movie.id}`}>
              <div className={s.card}>
                <div className={s.card__image__box}>
                  <img
                    className={s.card__image}
                    src={`${IMG_URL}${movie.poster_path}`}
                    alt={movie.title}
                    width="300"
                  />
                </div>
                <div className={s.card__info__box}>
                  <h2 className={s.card__name}>{movie.title}</h2>
                  <div className={s.result__wrapper}>
                    <div className={s.card__details}></div>
                    <p className={s.card__text}>{movie.release_date}</p>
                  </div>
                </div>
              </div>
            </Link>
          </li>
        ))}
    </ul>
  );
}
