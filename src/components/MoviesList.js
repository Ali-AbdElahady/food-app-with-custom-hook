import React, { useContext, useEffect } from 'react';

import Movie from './Movie';
import classes from './MoviesList.module.css';
import MoviesContext from '../store/movies-context';

const MovieList = (props) => {
  // console.log(props);
  const moviesCtx = useContext(MoviesContext)
  useEffect(() => {
    console.log(moviesCtx.movies);
  }, [moviesCtx]);
  return (
    <ul className={classes['movies-list']}>
      {moviesCtx.movies.map((movie) => (
        <Movie
          key={movie.id}
          id={movie.id}
          title={movie.title}
          releaseDate={movie.releaseDate}
          openingText={movie.openingText}
        />
      ))}
    </ul>
  );
};

export default MovieList;
