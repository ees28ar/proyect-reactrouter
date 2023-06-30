import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Audio } from 'react-loader-spinner';
import './Style.css';
import fetchData from '../../componentes/apiUtils/apiUtils';

type Character = {
  id: number;
  name: string;
  image: string;
  species: string;
  status: string;
  gender: string;
  origin: { name: string };
  type: string;
};

interface PersonajesProps {
  theme: string;
  toggleTheme: () => void;
}

const Personajes = ({ theme, toggleTheme }: PersonajesProps) => {
  const [page, setPage] = useState(1);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getCharacters = async (page: number) => {
      try {
        setIsLoading(true);
        const data = await fetchData<{ results: Character[] }>(
          `https://rickandmortyapi.com/api/character?page=${page}`
        );
        setCharacters(data.results);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    getCharacters(page);
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

  return (
    <div className={`personajes-container ${theme}`}>
      <h1>Lista de Personajes</h1>
      <div className="character-list">
        {characters.map(character => (
          <Link key={character.id} to={`/PersonajesId/${character.id}`} className="character-card-link">
            <div className="character-card">
              <img className="character-image" src={character.image} alt={character.name} />
              <div className="character-info">
                <h3 className="title">{character.name}</h3>
                <p className="status-species">{character.species}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div className="pagination">
        <button onClick={previousPage} disabled={page === 1}>
          Previous
        </button>
        <p>Página {page}</p>
        <button onClick={nextPage}>Next</button>
      </div>
    </div>
  );
};

export default Personajes;
