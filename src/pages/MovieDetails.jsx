import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./MovieDetails.css";

export const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  const API_KEY = "b245b5eec30cb3ed84c8a9fc45cbe553";

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`,
        );
        const data = await response.json();
        setMovie(data);
      } catch (error) {
        console.error("Помилка:", error);
      }
    };
    fetchMovieDetails();
  }, [id]);

  if (!movie) return <div className="loading">Loading...</div>;

  return (
    <div className="movie-details-container">
      <Link to="/" className="back-btn">
        Back to Home
      </Link>
      <div className="movie-content">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="detail-poster"
        />
        <div className="detail-info">
          <h1>{movie.title}</h1>
          <p className="tagline">{movie.tagline}</p>
          <div className="meta-row">
            <span>{movie.release_date}</span>
            <span>{movie.vote_average.toFixed(1)}</span>
            <span>{movie.runtime}</span>
          </div>
          <div className="genres">
            {movie.genres.map((genre) => (
              <span key={genre.id} className="genre-tag">
                {genre.name}
              </span>
            ))}
          </div>
          <h3>Overview</h3>
          <p className="overview">{movie.overview}</p>
        </div>
      </div>
    </div>
  );
};
