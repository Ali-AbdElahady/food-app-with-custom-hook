import React, { useCallback, useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";
import Spinner from "./components/Spinner";
import { useEffect } from "react";
import AddMovie from "./components/AddMovie";
import useHttp from "./hooks/use-http";

function App() {
  const [movies, setMovies] = useState([]);
  const { isLoading, error, sendRequest: fetchMovie } = useHttp();

  const fetchMovieHandler = useCallback((url, method, headers, body) => {
    const transformedData =  (moviesObj) => {
      const loadedMovies = [];
      for (const key in moviesObj) {
        loadedMovies.push({
          id: key,
          title: moviesObj[key].title,
          openingText: moviesObj[key].openingText,
          releaseDate: moviesObj[key].releaseDate,
        });
      }
      // setTimeout(()=>{
      //   console.log(movies);
      // },500)
      setMovies(loadedMovies);
      
    };
    fetchMovie(
      {
        url,
        method: method ? method : null,
        headers: headers ? headers : {},
        body: body ? body : null,
      },
      transformedData
    );
  },[])

  useEffect(() => {
    fetchMovieHandler(
      "https://react-http-1474c-default-rtdb.firebaseio.com/movies.json"
    );
  }, []);

  const onfetchMovieHandler = ()=>{
    fetchMovieHandler(
      "https://react-http-1474c-default-rtdb.firebaseio.com/movies.json"
    );
  }

  const addMovieHandler = async (movie) => {
    await fetchMovieHandler(
      "https://react-http-1474c-default-rtdb.firebaseio.com/movies.json",
      "POST",
      { "Content-Type": "application/json" },
      JSON.stringify(movie),
    );
    await fetchMovieHandler(
      "https://react-http-1474c-default-rtdb.firebaseio.com/movies.json"
    );
  };

  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={addMovieHandler} />
      </section>
      <section>
        <button onClick={onfetchMovieHandler}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading && error && <p style={{ color: "red" }}>{error}</p>}
        {isLoading && <Spinner />}
        {!isLoading && !error && movies.length === 0 && <p>no movies found</p>}
        {!isLoading && movies.length > 0 && <MoviesList movies={movies} />}
      </section>
    </React.Fragment>
  );
}

export default App;
