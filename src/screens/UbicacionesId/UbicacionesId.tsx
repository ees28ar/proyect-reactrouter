import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Audio } from 'react-loader-spinner';
import './Styles-Ubi.css';
import fetchData from '../../componentes/apiUtils/apiUtils';
import ErrorPeticion from '../error/ErrorPeticion';

type Character = {
  name: string;
  type: string;
  dimension: string;
  id: number;
  created: string;
};

type UbicacionProps = {
  theme: string;
};

const UbicacionesId = ({ theme }: UbicacionProps) => {
  const [character, setCharacter] = useState<Character | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchCharacterData = async () => {
      try {
        if (id) {
          const data = await fetchData<Character>(`https://rickandmortyapi.com/api/location/${id}`);
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
      <div className={`ubicacionesId-container ${theme}`}>
        {character ? (
          <div>
            <h1>Detalle Origen</h1>
            <div className="character-card3">
              <div className="character-info3">
                <p><strong>Id: "{character.id}"</strong></p>
                <p><strong>Name: "{character.name}"</strong></p>
                <p><strong>Type: "{character.type}"</strong></p>
                <p><strong>Dimension: "{character.dimension}"</strong></p>
                <p><strong>created: "{character.created}"</strong></p>
              </div>
            </div>
          </div>
        ) : (
          <div className="loading-container">
            <Audio height={80} width={80} color="green" />
            <h1>Cargando....</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default UbicacionesId;


