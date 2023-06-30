import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Audio } from 'react-loader-spinner';
import './Detail-Style.css';
import fetchData from '../../componentes/apiUtils/apiUtils';
import ErrorPeticion from '../error/ErrorPeticion';

type Character = {
  image: string | undefined;
  origin: { name: string };
  gender: string;
  type: string;
  status: string;
  id: number;
  name: string;
  species: string;
};

interface PersonajesIdProps {
  theme: string;
  toggleTheme: (darkMode: boolean) => void;
}

const PersonajesId = ({ theme, toggleTheme }: PersonajesIdProps) => {
  const [character, setCharacter] = useState<Character | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchCharacterData = async () => {
      try {
        if (id) {
          const data = await fetchData<Character>(`https://rickandmortyapi.com/api/character/${id}`);
          setCharacter(data);
        }
      } catch (error) {
        setError(error.message);
      }
    };

    fetchCharacterData();
  }, [id]);

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
       {character ? (
        <>
        <div className={`personajesId-container ${theme}`}>
          <h1>Detalle del Personaje</h1>
          <div className="character-card4">
            <img className="character-image2" src={character.image} alt="Character4" />
            <div className="character-info4 ">
              <p><strong>Id: "{character.id}"</strong></p>
              <p><strong>Name: "{character.name}"</strong></p>
              <p><strong>Status: "{character.status}"</strong></p>
              <p><strong>Species: "{character.species}"</strong></p>
              <p><strong>Type: "{character.type}"</strong></p>
              <p><strong>Gender: "{character.gender}"</strong></p>
              <p>
                <strong>
                  Origin:{' '}
                  <Link to={`/UbicacionesId/${character.id}`} className="link-info4">
                    "{character.origin?.name}"
                  </Link>
                </strong>
              </p>
            </div>
          </div>
          </div>
        </>
              ) : (
        <div className="loading-container4">
          <Audio height={80} width={80} color="green" />
          <h1>Cargando....</h1>
        </div>
      )}
    </div>
  );
}

export default PersonajesId;
