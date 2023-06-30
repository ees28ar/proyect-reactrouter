import { Link } from 'react-router-dom';
import "./Styles.css";

const imageURL = 'https://i.postimg.cc/xd0nY1M3/error404.png';

function NotFound() {
  return (
    <div className="notfound-avatar-container">
      <img className="avatar2" src={imageURL} alt="Logo" />
      <p>
        <Link to="/">Volver al Home</Link>    
      </p>     
    </div>
  );
}

export default NotFound;
