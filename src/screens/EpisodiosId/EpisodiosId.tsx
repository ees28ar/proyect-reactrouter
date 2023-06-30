import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Audio } from 'react-loader-spinner';

import './Style.css';
import ErrorPeticion from '../error/ErrorPeticion';

type Character = {
  id: number;
  name: string;
  species: string;
  image: string;
  origin: { name: string };
};

type Episode = {
  name: string;
  characters: string[];
};

interface PersonajesProps {
  theme: string;
  toggleTheme: () => void;
}

const EpisodiosId = ({ theme, toggleTheme }: PersonajesProps) => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [episode, setEpisode] = useState<Episode | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchEpisodeData = async () => {
      try {
        const response = await fetch(`https://rickandmortyapi.com/api/episode/${id}`);
        const data = await response.json();

        if (data.error) {
          setError(data.error);
        } else {
          setEpisode(data);
          fetchCharacters(data.characters);
        }
      } catch (error) {
        setError(error.message);
      }
    };

    fetchEpisodeData();
  }, [id]);

  const fetchCharacters = async (characterUrls: string[]) => {
    try {
      const characterResponses = await Promise.all(characterUrls.map(url => fetch(url)));
      const characterData = await Promise.all(characterResponses.map(response => response.json()));

      const fetchedCharacters = characterData.map((character: any) => ({
        id: character.id,
        name: character.name,
        species: character.species,
        image: character.image,
        origin: character.origin,
      }));

      setCharacters(fetchedCharacters);
    } catch (error) {
      setError(error.message);
    }
  };

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
      {episode ? (
        <div className={`personajesId-container ${theme}`}>
          <h1>Personajes que participaron en este episodio:</h1>
          <h2>Nombre del episodio: {episode.name}</h2>
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
        </div>
      ) : (
        <div className="loading-container">
          <Audio height={80} width={80} color="green" />
          <h1>Cargando....</h1>
        </div>
      )}
    </div>
  );
};

export default EpisodiosId;
