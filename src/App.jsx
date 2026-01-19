import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { MovieDetails } from "./pages/MovieDetails";
import "./App.css";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/movie/:id" element={<MovieDetails />} />
    </Routes>
  );
}
