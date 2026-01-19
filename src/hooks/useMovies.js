import { useState, useEffect } from "react";

export const useMovies = (query) => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_KEY = import.meta.env.VITE_API_KEY;
  const BASE_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchMovies = async () => {
      setIsLoading(true);
      setError(null);

      try {
        let url;
        if (query) {
          url = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`;
        } else {
          url = `${BASE_URL}/movie/popular?api_key=${API_KEY}`;
        }
        const response = await fetch(url);

        if (!response.ok) throw new Error("Failed to fetch movies");

        const data = await response.json();
        setMovies(data.results);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, [query]);
  return { movies, isLoading, error };
};
