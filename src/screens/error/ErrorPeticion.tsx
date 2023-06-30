import { Link } from 'react-router-dom';
import "./Styles.css";

const imageURL = 'https://i.postimg.cc/PrZ0zB2N/error.png';

function ErrorPeticion() {
  return (
    <div className="error-avatar-container">
      <img className="avatar3" src={imageURL} alt="Logo" />
      <p>
        <Link to="/">Volver al Home</Link>    
      </p>     
    </div>
  );
}

export default ErrorPeticion;

