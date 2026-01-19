import { useState, useEffect } from "react";
import { MovieCard } from "../components/MovieCard/MovieCard";

export function Home() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const searchMovies = async (title) => {
    const API_KEY = "b245b5eec30cb3ed84c8a9fc45cbe553";
    const BASE_URL = "https://api.themoviedb.org/3";

    const url = title
      ? `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${title}`
      : `${BASE_URL}/movie/popular?api_key=${API_KEY}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      setMovies(data.results);
    } catch (error) {
      console.error("Помилка:", error);
    }
  };
  useEffect(() => {
    searchMovies("");
  }, []);

  return (
    <>
      <header className="header">
        <p className="logo">CineVault</p>
        <div className="search-box">
          <input
            placeholder="Search for movies"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button onClick={() => searchMovies(searchTerm)}>Search</button>
        </div>

        <nav className="navigation-links">
          <ul>
            <li className="navigation-links-item">Movies</li>
            <li className="navigation-links-item">TV Shows</li>
          </ul>
        </nav>
      </header>

      <main>
        <section className="hero">
          <img
            src="https://image.tmdb.org/t/p/original/8rpDcsfLJypbO6vREc05475qg9.jpg"
            alt="Avatar"
          />
          <h1>Avatar: The Way of Water</h1>
          <button className="hero-btn">Watch Now</button>
        </section>

        <section className="trending">
          <h2>{searchTerm ? "Search Results" : "Trending Now"}</h2>
          <div className="container">
            {movies.length > 0 ? (
              movies.map((movie) => (
                <MovieCard
                  key={movie.id}
                  id={movie.id}
                  name={movie.title}
                  year={
                    movie.release_date
                      ? movie.release_date.split("-")[0]
                      : "N/A"
                  }
                  rating={movie.vote_average}
                  url={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                      : "https://placehold.co/200x300?text=No+Image"
                  }
                />
              ))
            ) : (
              <div className="empty">
                <h2>No movies found</h2>
              </div>
            )}
          </div>
        </section>
      </main>
      <footer></footer>
    </>
  );
}
