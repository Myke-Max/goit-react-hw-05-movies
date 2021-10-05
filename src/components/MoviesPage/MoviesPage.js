import { useState, useEffect } from 'react';
import SearchBar from '../SearchBar';
// import s from './MoviesPage.module.css';
import * as movieAPI from '../movieAPI/movieAPI';

export default function MoviesPage() {
  const [queryValue, setQueryValue] = useState(null);
  const [movies, setMovies] = useState('');

  function handleQuerySubmit(inputValue) {
    setQueryValue(inputValue);
  }

  useEffect(() => {
    if (queryValue) {
      movieAPI.getMoviesByQuery(queryValue).then(({ results }) => {
        setMovies(results);
      });
    }
  }, [queryValue]);
  console.log(movies);
  return (
    <>
      <SearchBar onSubmit={handleQuerySubmit} />
    </>
  );
}
