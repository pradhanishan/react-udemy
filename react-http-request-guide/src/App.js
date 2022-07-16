import React,{useState} from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {

  const [movies,setMovies] = useState([]);
  const [isLoading,setIsLoading] = useState(false);
  const [error,setError] = useState(null)

  const fetchMovieHandler = async () =>{
    setIsLoading(true);
    setError(null);
    try{const response = await fetch("https://swapi.dev/api/film");
    // const response = await fetch("https://swapi.dev/api/films");
    const data = await response.json();
    const transformedMovies = data.results.map((movieData)=>{
          return {
            id:movieData.episode_id,
            title:movieData.title,
            openingText:movieData.opening_crawl,
            releaseDate:movieData.releaseDate,
  
          }})
          setMovies(transformedMovies);
          setIsLoading(false);}
          catch(error){
            
          }
  
 
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMovieHandler}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading && movies.length>0 && <MoviesList movies={movies} />}
        {!isLoading && movies.length ===0 && <p>Found no movies</p>}
        {isLoading && <p>Loading</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
