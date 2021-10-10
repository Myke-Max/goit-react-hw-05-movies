import { useState, useEffect } from 'react';
import SearchBar from '../../components/SearchBar';
import { Link, useRouteMatch, useLocation, useHistory } from 'react-router-dom';
import s from './MoviesPage.module.scss';
import * as movieAPI from '../../service';

export default function MoviesPage() {
  const [queryValue, setQueryValue] = useState(null);
  const [movies, setMovies] = useState(null);
  const { url } = useRouteMatch();
  const history = useHistory();
  const location = useLocation();
  const IMG_URL = 'https://image.tmdb.org/t/p/w500';

  useEffect(() => {
    setQueryValue(new URLSearchParams(location.search).get('query'));
  }, [location.search]);

  useEffect(() => {
    if (queryValue) {
      movieAPI.getMoviesByQuery(queryValue).then(({ results }) => {
        setMovies(results);
      });
    }
  }, [queryValue]);

  function handleQuerySubmit(inputValue) {
    setQueryValue(inputValue);
    history.push({
      ...location,
      search: `query=${inputValue}`,
    });
  }
  return (
    <>
      <SearchBar onSubmit={handleQuerySubmit} />
      <ul className={`${s.card__list} ${s.list}`}>
        {movies &&
          movies.map(movie => (
            <li className={s.result__item} key={movie.id}>
              <Link
                to={{
                  pathname: `${url}/${movie.id}`,
                  state: {
                    from: location,
                  },
                }}
              >
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
        {movies?.length === 0 && <p>Oops your film is not found</p>}
      </ul>
    </>
  );
}
