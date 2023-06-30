import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Audio } from 'react-loader-spinner';
import './Style.css';
import ErrorPeticion from '../error/ErrorPeticion';

type Character = {
  id: number;
  name: string;
  episode: string;
};

type Episode = {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
  url: string;
  created: string;
};

interface PersonajesProps {
  theme: string;
  toggleTheme: () => void;
}

const Episodios = ({ theme, toggleTheme }: PersonajesProps) => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [error, setError] = useState<string | null>(null);

  async function fetchEpisodes(page: number) {
    try {
      const response = await fetch(`https://rickandmortyapi.com/api/episode?page=${page}`);
      const data = await response.json();
      const updatedCharacters = data.results.map((episode: Episode) => ({
        id: episode.id,
        name: episode.name,
        episode: episode.episode,
      }));
      return updatedCharacters;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  useEffect(() => {
    const fetchEpisodesData = async () => {
      try {
        const updatedCharacters = await fetchEpisodes(page);
        setCharacters(updatedCharacters);
        setIsLoading(false);
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchEpisodesData();
  }, [page]);

  const nextPage = () => {
    setPage(prevPage => prevPage + 1);
  };

  const previousPage = () => {
    if (page > 1) {
      setPage(prevPage => prevPage - 1);
    }
  };

  if (isLoading) {
    return (
      <div className="loading-container">
        <Audio height={80} width={80} color="green" />
      </div>
    );
  }

  if (error) {
    return (
      <>
        <div><ErrorPeticion/></div>
        <h1>{error}</h1>
      </>
    );
  }

  return (
    <div>
      <div className={`personajes-container ${theme}`}>
      <h1>Lista de Capitulos</h1>
      <div className="character-list">
        {characters.map(character => (
          <Link key={character.id} to={`/EpisodiosId/${character.id}`} className="character-card-link">
            <div className="character-card">
              <div className="character-info">
                <h3 className="title">{character.name}</h3>
                <p className="episode">{character.episode}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div className="pagination">
        <div className="pagination-buttons">
          <button onClick={previousPage} disabled={page === 1}>
            Previous
          </button>
          <p>Página {page}</p>
          <button onClick={nextPage}>Next</button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Episodios;



