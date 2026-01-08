import { use, useEffect, useState } from "react";
const KEY = "d369b54e";

function App() {
  const [query, setQuery] = useState("batman");
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const controller = new AbortController();
    if (!query) return;
    fetch(`https://www.omdbapi.com/?apikey=${KEY}&s=${query}`, { signal: controller.signal })
      .then((res) => res.json())
      .then((data) => {
        if (data.Response === "True") {
          setMovies(data.Search);
      } else {
          setMovies([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
    return () => controller.abort();
  }, [query]);

  return (
    <div>
      <h1>Movies</h1>
      <input 
      type="text" 
      placeholder="Search movies..." 
      value={query}
      onChange={(e) => setQuery(e.target.value)} 
      />

      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Year</th>
          </tr>
        </thead>
        <tbody>
          {movies.map((movie) => (
            <tr key={movie.imdbID}>
              <td>{movie.Title}</td>
              <td>{movie.Year}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {movies.length === 0 && <p>No movies found.</p>}
    </div>
  );
}

export default App;
