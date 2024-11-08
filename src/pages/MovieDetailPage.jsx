import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { addToWatched, addToWatchLater, removeFromWatched, removeFromWatchLater } from "../Utils/localStorage.js";

export default function MovieDetailPage() {
  const { id } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const [trailer, setTrailer] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=be1cd654ab3efabd5bf7efa1a9b3170a&language=pt-BR`
        );
        const data = await response.json();
        setMovieDetails(data);
      } catch (error) {
        console.error("Erro ao buscar detalhes do filme:", error);
      }
    };

    const fetchMovieTrailer = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/videos?api_key=be1cd654ab3efabd5bf7efa1a9b3170a&language=pt-BR`
        );
        const data = await response.json();
        const trailerData = data.results.find(
          (video) => video.type === "Trailer" && video.site === "YouTube"
        );
        setTrailer(trailerData ? trailerData.key : null);
      } catch (error) {
        console.error("Erro ao buscar trailer do filme:", error);
      }
    };

    fetchMovieDetails();
    fetchMovieTrailer();
  }, [id]);

  const handleAddToWatched = () => {
    addToWatched(id);
    alert("Filme adicionado à lista de Assistidos!");
  };

  const handleAddToWatchLater = () => {
    addToWatchLater(id);
    alert("Filme adicionado à lista Ver Depois!");
  };

  const handleRemoveFromWatched = () => {
    removeFromWatched(id);
    alert("Filme removido da lista de Assistidos!");
  };

  const handleRemoveFromWatchLater = () => {
    removeFromWatchLater(id);
    alert("Filme removido da lista Ver Depois!");
  };

  if (!movieDetails) {
    return <p>Carregando detalhes do filme...</p>;
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col items-center justify-center text-white font-poppins"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${movieDetails.backdrop_path})`,
        backdropFilter: "blur(10px)",
        fontFamily: "'Poppins', sans-serif",
        backgroundColor: "#1a1a1a",
      }}
    >
      <div className="bg-gray-900 bg-opacity-80 p-8 rounded-lg shadow-2xl max-w-4xl w-full transition-transform transform hover:scale-105 flex">
        <div className="flex-1">
          <h1 className="text-4xl font-bold mb-6 text-center text-green-400">{movieDetails.title}</h1>

          {/* Sinopse Section */}
          <div className="mt-8 text-lg leading-relaxed text-gray-300">
            <h2 className="text-3xl font-semibold mb-4 text-green-400">Sinopse</h2>
            <p>{movieDetails.overview}</p>
          </div>
        </div>

        {/* Trailer Section */}
        <div className="flex-1 flex flex-col items-center">
          {trailer ? (
            <iframe
              width="320"
              height="180"
              src={`https://www.youtube.com/embed/${trailer}`}
              title="Trailer"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="rounded-lg mb-4"
            ></iframe>
          ) : (
            <p className="text-center text-lg">Trailer não disponível.</p>
          )}

          {/* Botões de Ação */}
          <div className="flex flex-col space-y-4">
            <button
              onClick={handleAddToWatched}
              className="bg-gray-700 text-lg py-2 px-6 rounded-lg hover:bg-gray-800 transition-all font-semibold tracking-wide"
            >
              Assistido
            </button>

            <button
              onClick={handleAddToWatchLater}
              className="bg-gray-700 text-lg py-2 px-6 rounded-lg hover:bg-gray-800 transition-all font-semibold tracking-wide"
            >
              Ver Depois
            </button>

            <button
              onClick={handleRemoveFromWatched}
              className="bg-gray-700 text-lg py-2 px-6 rounded-lg hover:bg-gray-800 transition-all font-semibold tracking-wide"
            >
              Remover de Assistidos
            </button>

            <button
              onClick={handleRemoveFromWatchLater}
              className="bg-gray-700 text-lg py-2 px-6 rounded-lg hover:bg-gray-800 transition-all font-semibold tracking-wide"
            >
              Remover de Ver Depois
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}