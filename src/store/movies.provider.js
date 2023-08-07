import { useEffect, useReducer } from "react";
import MoviesContext from "./movies-context";
import useHttp from "../hooks/use-http";
import { database } from "../firebase";
import {ref, remove, } from "firebase/database";

import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth"

import { app } from "../firebase";

const intialValue = {
  movies: [],
};

const reducerFunction = (state, action) => {
  if (action.type === "ADD") {
    return {
      movies: [...state.movies, action.item],
    };
  }
  if (action.type === "REMOVE") {
    return {
      movies: state.movies.filter((item) => item.id !== action.id),
    };
  }
  if (action.type === "FETCHING") {
    console.log(action.movies);
    return {
      movies: action.movies,
    };
  }
  return state;
};

const MoviesProvider = (props) => {
  const [moviesState, dispachMoviesState] = useReducer(
    reducerFunction,
    intialValue
  );
  const { isLoading, error, sendRequest: fetchMovie } = useHttp();

  const addMovieHandler = async (movie) => {
    const fetching = await fetchMovie({
      url: "https://react-http-1474c-default-rtdb.firebaseio.com/movies.json",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(movie),
    });

    if (error) {
      return;
    }

    movie.id = fetching.name;

    dispachMoviesState({ type: "ADD", item: movie });
  };
  const removeMovieHandler = async (id) => {


    // remove(ref(database, "movies/" + id)).then(()=> console.log('deleted successfully'));

    const auth = getAuth(app);

    signInWithEmailAndPassword(auth, 'mohamed@gmail.com', '123456')
    .then((userCred) => {
        console.log(userCred);
    })
    //  await fetchMovie({


    //    url: `https://react-http-1474c-default-rtdb.firebaseio.com/movies/${id}`,
    //    method: "DELETE",
    //    headers: {'Authorization':"Bearer JRwFbxO1u2dyYvtrcX3xbUpj5cu1"}
    //  });

    if (error) {
      return;
    }

    dispachMoviesState({ type: "REMOVE", id: id });
  };
  const moviesContext = {
    movies: moviesState.movies,
    addMovie: addMovieHandler,
    removeMovie: removeMovieHandler,
  };

  useEffect(() => {
    const transformedData = (moviesObj) => {
      console.log(moviesObj);
      const loadedMovies = [];
      for (const key in moviesObj) {
        loadedMovies.push({
          id: key,
          title: moviesObj[key].title,
          openingText: moviesObj[key].openingText,
          releaseDate: moviesObj[key].releaseDate,
        });
      }

      dispachMoviesState({ type: "FETCHING", movies: loadedMovies });
    };

    fetchMovie(
      {
        url: `https://react-http-1474c-default-rtdb.firebaseio.com/movies.json`,
      },
      transformedData
    );
  }, []);
  return (
    <MoviesContext.Provider value={moviesContext}>
      {props.children}
    </MoviesContext.Provider>
  );
};

export default MoviesProvider;
