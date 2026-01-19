import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./MovieCard.module.css";

export const MovieCard = ({ name, year, rating, url, id }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <div className={styles.filmCard}>
      <Link to={`/movie/${id}`}>
        <img src={url} alt={name} className={styles.poster} />
      </Link>
      <div className={styles.movieInfo}>
        <div className={styles.header}>
          <h3>{name}</h3>
          <span className={styles.rating}>⭐ {rating}</span>
        </div>
        <div className={styles.meta}>
          <span>{year}</span>
          <button
            onClick={() => setIsFavorite(!isFavorite)}
            className={isFavorite ? styles.btnLiked : styles.btn}
          >
            {isFavorite ? "❤️ Liked" : "♡ Like"}
          </button>
        </div>
      </div>
    </div>
  );
};
