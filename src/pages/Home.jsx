import { useState } from "react";
import { MovieCard } from "../components/MovieCard/MovieCard";
import { useMovies } from "../hooks/useMovies";
import "../App.css";

export const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [page, setPage] = useState(1);

  const GENRES = [
    { id: null, name: "All" },
    { id: 28, name: "Action" },
    { id: 35, name: "Comedy" },
    { id: 27, name: "Horror" },
    { id: 18, name: "Drama" },
  ];

  const { movies, isLoading, error } = useMovies({
    query: searchQuery,
    genreId: selectedGenre,
    page: page,
  });

  const handleSearch = () => {
    setSearchQuery(searchTerm);
    setSelectedGenre(null);
    setPage(1);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleGenreClick = (genreId) => {
    setSelectedGenre(genreId);
    setSearchQuery("");
    setSearchTerm("");
    setPage(1);
  };

  return (
    <>
      <header className="header">
        <p className="logo">CineVault</p>
        <div className="search-box">
          <input
            type="text"
            placeholder="Search movies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button onClick={handleSearch}>Search</button>
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
          <div className="hero-content">
            <h1>Avatar: The Way of Water</h1>
            <p>
              Jake Sully lives with his newfound family formed on the extrasolar
              moon Pandora. Once a familiar threat returns to finish what was
              previously started, Jake must work with Neytiri and the army of
              the Na'vi race to protect their home.
            </p>
            <button className="hero-btn">Watch Trailer</button>
          </div>
        </section>

        <section className="trending">
          <h2>
            {searchQuery ? `Results for "${searchQuery}"` : "Trending Now"}
          </h2>

          <div className="genres-filter">
            {GENRES.map((genre) => (
              <button
                key={genre.name}
                className={`genre-btn ${selectedGenre === genre.id ? "active" : ""}`}
                onClick={() => handleGenreClick(genre.id)}
              >
                {genre.name}
              </button>
            ))}
          </div>

          {/* 2. Обробка станів завантаження та помилки */}
          {isLoading && <div className="loading">Loading movies...</div>}

          {error && <div className="error">Error: {error}</div>}

          {!isLoading && !error && (
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
                <div className="empty">No movies found</div>
              )}
            </div>
          )}
          {!isLoading && !error && movies.length > 0 && (
            <div className="pagination">
              <button
                className="page-btn"
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
              >
                Prev
              </button>

              <span className="page-number">Page {page}</span>

              <button className="page-btn" onClick={() => setPage(page + 1)}>
                Next
              </button>
            </div>
          )}
        </section>
      </main>
      <footer></footer>
    </>
  );
};
