

//import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
//import './Navbar/NavbarDeskop/NavbarDeskop.scss'; // Importa los estilos Sass
import "./NavbarDeskop.scss"; 
import logoMorado from '../../../assets/Icons/logo morado.JPG';


// Placeholder para el UserContext (si usas Redux, esto sería diferente)
// const UserContext = React.createContext(null); // Solo para que el ejemplo compile
// Si tienes un UserContext real, impórtalo así:
// import { UserContext } from '../../context/UserContext/UserState'; 


const NavbarDeskop = () => {
  // Ejemplo de cómo usarías el contexto para el logout
  // const { user, logout } = useContext(UserContext); 
  // const isAuthenticated = !!user; // Para mostrar/ocultar enlaces condicionalmente

  // Placeholder para la función de logout
  const handleLogout = () => {
    console.log('Cerrar sesión (lógica de logout aquí)');
    // Aquí llamarías a tu acción de Redux o función de contexto para cerrar sesión
    // logout(); 
  };

  return (
   <nav className="navbar">

      <Link to="/" className="navbar-brand">
      
        <img src={logoMorado} alt="Logo AstroHub" className="logo-icon" />
        AstroRed
      </Link>


      
      <ul className="nav-links">
       <li>
          {/* Usa NavLink para el enlace "Home" */}
          <NavLink 
            to="/" 
            title="Ir a la página de inicio"
            className={({ isActive }) => (isActive ? 'navbar-link active' : 'navbar-link')}
          >
            Home
          </NavLink>
        </li>
        
        {/* Ejemplo de enlace condicional si el usuario está autenticado */}
        {/* {isAuthenticated && ( */}
          <li>
  <NavLink to="/profile" title="Ver tu perfil" className={({ isActive }) => (isActive ? 'navbar-link active' : 'navbar-link')}>Profile</NavLink>
</li>

<li>
  <NavLink to="/login" onClick={handleLogout} title="Iniciar sesión" className={({ isActive }) => (isActive ? 'navbar-link active' : 'navbar-link')}>Login</NavLink>
</li>
      </ul>
    </nav>
  );
};


export default NavbarDeskop