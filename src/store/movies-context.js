import { createContext } from "react";

const MoviesContext=createContext({
    movies:[],
    addMovie:(movie)=>{},
    removeMovie:(id)=>{},
})

export default MoviesContext