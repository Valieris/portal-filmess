import { NavLink } from 'react-router-dom';
import Login from './Login';
import { useState } from 'react';

export default function Header() {
  const [isLogged, setIsLogged] = useState(false);
  const handleLogin = () => {
    setIsLogged(!isLogged);
  };

  return (
    <header className="bg-gradient-to-r from-green-900 via-teal-800 to-blue-900 text-white py-5 px-8 shadow-lg sticky top-0 z-50">
      <nav className="container mx-auto flex justify-between items-center">
        <h1 className="text-5xl font-extrabold tracking-wider text-lime-400 font-mono relative inline-block" 
            style={{ 
              textShadow: `-2px -2px 0 #ffffff, 2px -2px 0 #ffffff, -2px 2px 0 #ffffff, 2px 2px 0 #ffffff, 0 0 10px #ffffff, 0 0 15px #ffffff` 
            }}>
          Portal Filmes
        </h1>
        <ul className="flex space-x-8 text-lg">
          <li>
            <NavLink 
              to="/" 
              className="hover:text-lime-300 transition-colors duration-300 px-3 py-2 rounded-lg hover:bg-blue-700"
              activeClassName="text-lime-300 bg-blue-700"
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/listaFilme" 
              className="hover:text-lime-300 transition-colors duration-300 px-3 py-2 rounded-lg hover:bg-blue-700"
              activeClassName="text-lime-300 bg-blue-700"
            >
              Lista de Filmes
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/generos" 
              className="hover:text-lime-300 transition-colors duration-300 px-3 py-2 rounded-lg hover:bg-blue-700"
              activeClassName="text-lime-300 bg-blue-700"
            >
              Gêneros
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/watched" 
              className="hover:text-lime-300 transition-colors duration-300 px-3 py-2 rounded-lg hover:bg-blue-700"
              activeClassName="text-lime-300 bg-blue-700"
            >
              Filmes Assistidos
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/watch-later" 
              className="hover:text-lime-300 transition-colors duration-300 px-3 py-2 rounded-lg hover:bg-blue-700"
              activeClassName="text-lime-300 bg-blue-700"
            >
              Ver Depois
            </NavLink>
          </li>
        </ul>
        <Login isLogged={isLogged} handleLogin={handleLogin} />
      </nav>
    </header>
  );
}
