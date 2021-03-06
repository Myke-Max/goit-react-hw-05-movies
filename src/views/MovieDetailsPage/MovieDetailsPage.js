import { useState, useEffect, lazy, Suspense } from 'react';
import {
  useParams,
  Route,
  NavLink,
  useRouteMatch,
  useHistory,
  useLocation,
} from 'react-router-dom';
// import Cast from '../Cast';
// import Reviews from '../Reviews';
import * as movieAPI from '../../service';
import s from './MovieDetailsPage.module.scss';
import { BiArrowBack } from 'react-icons/bi';

// import s from './MovieDetailsPage.module.css';
export default function MovieDetailPage() {
  const [movieDetails, setMovieDetails] = useState(null);
  const { url } = useRouteMatch();
  const location = useLocation();
  const { movieId } = useParams();
  const history = useHistory();
  console.log('detail', location.state);
  const IMG_URL = 'https://image.tmdb.org/t/p/w500';

  const Cast = lazy(() => import('../Cast' /*webpackChunkName "Cast" */));
  const Reviews = lazy(() => import('../Reviews' /*webpackChunkName "Reviews" */));

  useEffect(() => {
    movieAPI.getMoviesDetail(movieId).then(setMovieDetails);
  }, [movieId]);

  const goBack = () => history.push(location?.state?.from ?? '/');

  return (
    <>
      {/* Разметка фильма */}
      {
        <button className={s.onBack} onClick={goBack}>
          <BiArrowBack />
        </button>
      }
      {movieDetails && (
        <div className={s.modal__box}>
          <div className={s.modal__box_img}>
            <img
              className={s.modal__poster}
              src={`${IMG_URL}${movieDetails.poster_path}`}
              alt={`${movieDetails.title}`}
            />
          </div>
          <div className={s.description}>
            <h2 className={s.description__title}>{`${movieDetails.title}`}</h2>
            <ul className={`${s.description__list} ${s.list}`}>
              <li className={s.description__item}>
                <p className={s.description__name}>Vote / Votes</p>
                <div className={s.description__votes__wrapper}>
                  <div className={s.description__bg__accent}>
                    <p className={s.description__vote}>{`${movieDetails.vote_average}`}</p>
                  </div>
                  <span className={s.description__divider}>/</span>
                  <div className={s.description__votes__secondary}>
                    <p className={s.description__votes}>{`${movieDetails.vote_count}`}</p>
                  </div>
                </div>
              </li>
              <li className={s.description__item}>
                <p className={s.description__name}>Popularity</p>
                <p className={s.description__content}>{`${movieDetails.popularity}`}</p>
              </li>
              <li className={s.description__item}>
                <p className={s.description__name}>Original Title</p>
                <p className={s.description__content}>{`${movieDetails.original_title}`} </p>
              </li>
              <li className={s.description__item}>
                <p className={s.description__name}>Genre</p>
                <p className={s.description__content}>
                  {movieDetails && `${movieDetails.genres.map(genre => genre.name)}`}
                </p>
              </li>
            </ul>
            <h3 className={s.about__title}>About</h3>
            <p className={s.about__overview}>{`${movieDetails.overview}`}</p>
          </div>
        </div>
      )}
      <div className={s.about__options}>
        <NavLink className={s.about__review} to={`${url}/reviews`}>
          Review
        </NavLink>
        <NavLink to={`${url}/cast`}>Cast</NavLink>
        <Suspense fallback="Loading">
          <Route exact path="/movies/:movieId/reviews">
            <Reviews />
          </Route>
          <Route exact path="/movies/:movieId/cast">
            <Cast />
          </Route>
        </Suspense>
      </div>
    </>
  );
}
