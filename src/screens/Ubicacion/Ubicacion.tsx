import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Audio } from 'react-loader-spinner';
import './Style.css';
import ErrorPeticion from '../error/ErrorPeticion';

type Location = {
  id: number;
  name: string;
  type: string;
  dimension: string;
};

type UbicacionProps = {
  theme: string;
};

const Ubicacion = ({ theme }: UbicacionProps) => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`https://rickandmortyapi.com/api/location?page=${page}`);
        const data = await response.json();

        const updatedLocations = data.results.map((location: Location) => ({
          id: location.id,
          name: location.name,
          type: location.type,
          dimension: location.dimension,
        }));

        setLocations(updatedLocations);
        setIsLoading(false);
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchData();
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
    <div className={`personajes-container ${theme}`}>
      <h1>Lista de Ubicaciones</h1>
      <div className="location-list">
        {locations.map(location => (
          <Link key={location.id} to={`/UbicacionesId/${location.id}`} className="location-card-link">
            <div className="location-card">
              <div className="location-info">
                <h3 className="title">{location.name}</h3>
                <p className="status-species">{location.type}</p>
                <p className="status-species">{location.dimension}</p>
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

export default Ubicacion;
