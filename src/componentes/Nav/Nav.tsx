import { Link } from 'react-router-dom';
import "./Styles.css";

const imageURL = 'https://i.postimg.cc/mkpmVLyN/logo.png';

interface NavProps {
  theme: string;
  toggleTheme: () => void;
}

function Nav({ theme, toggleTheme }: NavProps)  {
  return (
    <div>
      <div>
      <button onClick={toggleTheme}>
        {theme === 'light' ? 'Tema Oscuro' : 'Tema Claro'}
      </button>
      </div>
    
    <div className={`nav-container nav `}>
      <img className="avatar2" src={imageURL} alt="Logo" />
      <hr className="nav-divider" />
      <ul className="nav-links">
        <li><Link to="/">Personajes</Link></li>
        <li><Link to="/Ubicacion/">Ubicación</Link></li>
        <li><Link to="/Episodios/">Episodios</Link></li>
      </ul>
    </div>
    </div>

  );
}

export default Nav;