import { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, reset } from "../../features/auth/authSlice";
import { useNavigate } from 'react-router-dom'; 
import { notification } from 'antd';
import './Login.scss';


  

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const dispatch = useDispatch();
  const navigate = useNavigate(); 

  const { user, isSuccess, isError, message } = useSelector((state) => state.auth);

  // You may need to get these from your Redux state or props


  // For now, let's assume they are available in scope

  useEffect(() => {
     console.log("DEBUG useEffect (Login):");
    console.log("  isSuccess:", isSuccess);
    console.log("  isError:", isError);
    console.log("  user:", user);
    console.log("  message:", message);
    if (isSuccess && user) { // Verifica también que el usuario exista
      notification.success({
        message: 'Login Exitoso', // Mensaje de éxito para el usuario
        description: `Bienvenido de nuevo, ${user.username || user.email}!`, // Personaliza el mensaje
      });
      navigate("/"); 
      dispatch(reset()); // Resetea el estado de autenticación después del éxito
    }
    if (isError) {
      notification.error({
        message: 'Error de Login', // Mensaje de error
        description: message, // Descripción del error desde el estado de Redux
      });
      dispatch(reset());
    }
  }, [isSuccess, isError, user, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // console.log("formData", formData);
    dispatch(login(formData));
  };
  /* const scrollToRegister = () => {
    const registerElement = document.querySelector('.register-container'); // Asume que tu Register tiene esta clase
    if (registerElement) {
      registerElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };*/
   const handleRegisterClick = () => {
    //console.log("DEBUG: Botón 'Register' presionado. Intentando navegar a /register.");
    navigate('/register'); // Navega a la ruta '/register'
  };

  return (
       <div className="login-container"> {/* Aplica la clase contenedora aquí */}
      <h2>Login</h2> {/* Título "Login" */}
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="email">Username</label> {/* Etiqueta "Username" como en la imagen */}
          <input
            type="email" // Aunque la etiqueta diga Username, el input es tipo email para el login
            id="email"
            name="email"
            value={email}
            onChange={onChange}
            placeholder="Introduce tu email" // Placeholder genérico
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={onChange}
            placeholder="Introduce tu contraseña"
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      
      {/* Sección "Not registered yet?" y botón Register */}
      <p>Not registered yet?</p>
      <button 
        type="button" // Importante: type="button" para que no envíe el formulario principal
       onClick={handleRegisterClick} 
        className="register-button"
      >
        Register
      </button>
    </div>
  );
};
export default Login;