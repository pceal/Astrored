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

     useEffect(() => {
 
    if (isSuccess && user) { 
      notification.success({
       
        description: `Bienvenido de nuevo, ${user.username || user.email}!`, 
      });
      navigate("/"); 
      dispatch(reset());
    }
    if (isError) {
      notification.error({
        message: 'Error de Login', 
        description: message, 
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
   
    dispatch(login(formData));
  };

   const handleRegisterClick = () => {
    
    navigate('/register'); 
  };

  return (
       <div className="login-container"> 
      <h2>Login</h2> 
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="email">email</label> 
          <input
            type="email" 
            id="email"
            name="email"
            value={email}
            onChange={onChange}
            placeholder="Introduce tu email" 
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
      
      <p>Not registered yet?</p>
    <button 
        type="submit" 
        onClick={handleRegisterClick} 
        style={{ 
          backgroundColor: '#007bff', 
          color: 'white',             
          padding: '10px 20px',       
          border: 'none',             
          borderRadius: '5px',        
          cursor: 'pointer',         
          fontSize: '16px',          
          fontWeight: 'bold',         
          transition: 'background-color 0.3s ease' 
        }}
      >
        Register
      </button>
    </div>
  );
};
export default Login;