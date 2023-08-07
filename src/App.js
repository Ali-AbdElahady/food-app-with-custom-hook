import React, { useCallback, useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";
import Spinner from "./components/Spinner";
import { useEffect } from "react";
import AddMovie from "./components/AddMovie";
import useHttp from "./hooks/use-http";
import MoviesProvider from "./store/movies.provider";

function App() {
  const [movies, setMovies] = useState([]);
  const { isLoading, error, sendRequest: fetchMovie } = useHttp();

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
    setMovies(loadedMovies);
  };

  const fetchMovieHandler = useCallback((url, method, headers, body) => {
    return fetchMovie(
      {
        url,
        method: method ? method : "GET",
        headers: headers ? headers : {},
        body: body ? body : null,
      },
      transformedData
    );
  }, []);

  // useEffect(() => {
  //   onfetchMovieHandler();
  // }, []);

  const onfetchMovieHandler = async () => {
    await fetchMovieHandler(
      "https://react-http-1474c-default-rtdb.firebaseio.com/movies.json"
    );
  };

  const addMovieHandler = async (movie) => {


    const id = await fetchMovieHandler(
      "https://react-http-1474c-default-rtdb.firebaseio.com/movies.json",
      "POST",
      { "Content-Type": "application/json" },
      JSON.stringify(movie),
    );

    movie.id = id;
    setMovies((prev)=> prev.concat(movie))
 
  };

  return (
    <MoviesProvider>
      <section>
        <AddMovie onAddMovie={addMovieHandler} />
      </section>
      <section>
        <button onClick={onfetchMovieHandler}>Fetch Movies</button>
      </section>
      <section>
        {/* {!isLoading && error && <p style={{ color: "red" }}>{error}</p>} */}
        {/* {isLoading && <Spinner />} */}
        {/* {!isLoading && !error && movies.length === 0 && <p>no movies found</p>} */}
        <MoviesList  />
      </section>
    </MoviesProvider>
  );
}

export default App;
