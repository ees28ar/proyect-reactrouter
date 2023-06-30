import { useEffect } from 'react';
import Nav from '../Nav/Nav';
import { Outlet } from 'react-router-dom';

interface LayoutProps {
  theme: string;
  toggleTheme: () => void;
}

function Layout({ theme, toggleTheme }: LayoutProps) {
  useEffect(() => {
    document.title = `Tema ${theme === 'light' ? 'Claro' : 'Oscuro'}`;
  }, [theme]);

  return (
    <>
      <div className={`app ${theme}`}>
        <Nav theme={theme} toggleTheme={toggleTheme} />
        <Outlet />
      </div>
    </>
  );
}

export default Layout;