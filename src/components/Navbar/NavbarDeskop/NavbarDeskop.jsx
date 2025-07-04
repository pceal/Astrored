import  { useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { logout, reset } from "../../../features/auth/authSlice"; 
import { notification } from 'antd'; // Importa notification de antd

import "./NavbarDeskop.scss";
import logoMorado from '../../../assets/Icons/logo morado.JPG';

const NavbarDeskop = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
const { user, isSuccess, isError, message } = useSelector((state) => state.auth);

  // DEBUG: Log para ver el estado del usuario en el Navbar
  useEffect(() => {
   console.log("NavbarDeskop - Estado del usuario:", user);
  }, [user]);

  // Si tienes variables como isSuccess, isError, message, reset, notification, asegúrate de importarlas y definirlas correctamente.
  // El siguiente useEffect debe estar dentro del componente y no fuera de ningún hook.
  useEffect(() => {
    if (isSuccess && message === "Sesión cerrada correctamente") {
      notification.success({
        message: 'Sesión Cerrada',
        description: message,
      });
      navigate('/'); // Redirige a la página de login después de un logout exitoso
      dispatch(reset()); // Resetea el estado de Redux
    } else if (isError && message) { // Muestra error solo si isError es true Y hay un mensaje
      notification.error({
        message: 'Error al cerrar sesión',
        description: message,
      });
      dispatch(reset()); // Resetea el estado también en caso de error
    }
  }, [isSuccess, isError, message, navigate, dispatch]); // Dependencias del useEffect
  
  
  
  
  
  const logoutRedirect = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <nav className="navbar">
      {/* Logo y Nombre de la Aplicación */}
      <Link to="/" className="navbar-brand" title="Ir a la página de inicio">
        <img src={logoMorado} alt="Logo AstroRed" className="logo-icon" />
        AstroRed
      </Link>

      {/* Saludo del usuario centrado (cuando logueado) */}
      {user && (
       
          <NavLink
            to="/profile"
            title="Ver tu perfil"
            className={({ isActive }) => (isActive ? 'navbar-link active' : 'navbar-link')}
          >
            Hola {user.username}!
          </NavLink>
       
      )}

      {/* Enlaces de Navegación (Home, Login/Logout) */}
      <ul className="nav-links">
        <li>
          <NavLink
            to="/"
            title="Ir a la página de inicio"
            className={({ isActive }) => (isActive ? 'navbar-link active' : 'navbar-link')}
          >
            Home
          </NavLink>
        </li>
        {user ? ( // Si el usuario está logueado
          <li>
            <div  className="click-logout"
              onClick={logoutRedirect}
             
              title="Cerrar sesión"
      
            >
              Logout
            </div>
          </li>
          
        ) : ( // Si el usuario NO está logueado
          <li>
            <NavLink
              to="/login" // Enlace a la ruta donde tienes Login y Register juntos
              title="Iniciar sesión"
              className={({ isActive }) => (isActive ? 'navbar-link active' : 'navbar-link')}
            >
              Login
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default NavbarDeskop;


