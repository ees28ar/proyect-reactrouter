import { useState } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import NotFound from './screens/NoutFound/NotFound';
import Layout from './componentes/Layout/Layout';
import UbicacionesId from './screens/UbicacionesId/UbicacionesId';
import Ubicacion from './screens/Ubicacion/Ubicacion';
import Episodios from './screens/Episodios/Episodios';
import EpisodiosId from './screens/EpisodiosId/EpisodiosId';
import Personajes from './screens/home/Personajes';
import PersonajesId from './screens/Details/PersonajesId';


function App() {
  const [theme, setTheme] = useState('light');

  function toggleTheme() {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  }
  
  return (
    <BrowserRouter>
      <Routes>
        <Route
          element={
            <div>
              <hr />
              <Layout theme={theme} toggleTheme={toggleTheme} />
            </div>
          }
        >
          <Route path="/" element={<Personajes theme={theme} toggleTheme={toggleTheme} />} />
          <Route path="/Ubicacion" element={<Ubicacion theme={theme} toggleTheme={toggleTheme} />} />
          <Route path="/Episodios" element={<Episodios theme={theme} toggleTheme={toggleTheme} />} />
          <Route path="/EpisodiosId/:id" element={<EpisodiosId theme={theme} toggleTheme={toggleTheme} />} />
          <Route path="/PersonajesId/:id" element={<PersonajesId theme={theme} toggleTheme={toggleTheme} />} />
          <Route path="/UbicacionesId/:id" element={<UbicacionesId theme={theme} toggleTheme={toggleTheme} />} />
        </Route>
        <Route path='*' element={<NotFound/>}/>
      </Routes>

    </BrowserRouter>
  );
}

export default App;