import  { useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { logout, reset } from "../../../features/auth/authSlice"; 
import { notification } from 'antd'; 

import "./NavbarDeskop.scss";
import logoMorado from '../../../assets/Icons/logo morado.JPG';

const NavbarDeskop = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
const { user, isSuccess, isError, message } = useSelector((state) => state.auth);


  useEffect(() => {
   console.log("NavbarDeskop - Estado del usuario:", user);
  }, [user]);

  
  
  useEffect(() => {
    if (isSuccess && message === "Sesión cerrada correctamente") {
      notification.success({
        message: 'Sesión Cerrada',
        description: message,
      });
      navigate('/'); 
      dispatch(reset());
    } else if (isError && message) { 
      notification.error({
        message: 'Error al cerrar sesión',
        description: message,
      });
      dispatch(reset()); 
    }
  }, [isSuccess, isError, message, navigate, dispatch]); 
  
  
  
  
  
  const logoutRedirect = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <nav className="navbar">
   
      <Link to="/" className="navbar-brand" title="Ir a la página de inicio">
        <img src={logoMorado} alt="Logo AstroRed" className="logo-icon" />
        AstroRed
      </Link>

     
      {user && (
       
          <NavLink
            to="/profile"
            title="Ver tu perfil"
            className={({ isActive }) => (isActive ? 'navbar-link active' : 'navbar-link')}
          >
            Hola {user.username}!
          </NavLink>
       
      )}

      
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
        {user ? (
          <li>
            <div  className="click-logout1"
              onClick={logoutRedirect}
             
              title="Cerrar sesión"
      
            >
              Logout
            </div>
          </li>
          
        ) : ( 
          <li>
            <NavLink
              to="/login" 
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


