import { useState, useEffect } from 'react';
import * as movieAPI from '../movieAPI/movieAPI';
import { useParams, NavLink } from 'react-router-dom';
import s from './Cast.module.css';

export default function Cast() {
  const [cast, setCast] = useState('');

  const { movieId } = useParams();

  useEffect(() => {
    movieAPI.getInformationAboutTheCast(movieId).then(({ cast }) => {
      setCast(cast);
    });
  }, [movieId]);
  console.log(cast);
  return <></>;
}
