import React, { useContext } from 'react';

import classes from './Movie.module.css';
import MoviesContext from '../store/movies-context';

const Movie = (props) => {
  const moviesCtx = useContext(MoviesContext)
  const deleteMovieHandler = ()=>{
    console.log(props.id);
    moviesCtx.removeMovie(props.id)
  }
  return (
    <li className={classes.movie}>
      <h2>{props.title}</h2>
      <h3>{props.releaseDate}</h3>
      <p>{props.openingText}</p>
      <button className={classes.delete} onClick={deleteMovieHandler}>Delete</button>
    </li>
  );
};

export default Movie;
