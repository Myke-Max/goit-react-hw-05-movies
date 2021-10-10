import { useState, useEffect } from 'react';
import * as movieAPI from '../../service';
import { useParams } from 'react-router-dom';
import s from './Cast.module.css';

export default function Cast() {
  const [cast, setCast] = useState(null);

  const { movieId } = useParams();

  const IMG_URL = 'https://image.tmdb.org/t/p/w500';

  useEffect(() => {
    movieAPI.getInformationAboutTheCast(movieId).then(({ cast }) => {
      setCast(cast);
    });
  }, [movieId]);

  return (
    <>
      {cast?.length === 0 && <h2>Actors not found,sorry</h2>}
      {cast &&
        cast.map(author => {
          return (
            <ul>
              <li key={author.id}>
                <div>
                  <img
                    src={`${IMG_URL}${author.profile_path}`}
                    alt={author.original_name}
                    width="200"
                  />
                  <h3>{author.original_name}</h3>
                </div>
              </li>
            </ul>
          );
        })}
    </>
  );
}
