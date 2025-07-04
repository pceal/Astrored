import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register, reset } from "../../features/auth/authSlice";
import { notification } from "antd";
import { useNavigate } from "react-router-dom";
import './Register.scss';

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
  });

  const { username, email, password, password2 } = formData;
  const { isSuccess, isError, message, } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isSuccess) {
      notification.success({
        message: "Registrado con exito!",
      });
      navigate("/login");
    }
    if (isError) {
      notification.error({
        message: message,
      });
    }
    dispatch(reset());
  }, [isSuccess, isError, message]);

  const onChange = (e) => {
     console.log(`DEBUG: Input '${e.target.name}' changed to: '${e.target.value}'`);
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      return notification.error({
        message: "Error",
        description: "Password do not match",
      });
    } else {
      // console.log("formData", formData);
      // console.log("DEBUG: formData antes de dispatch:", formData);
      dispatch(register(formData));
    }
  };

  return (
    <div className="register-container">
   
      <form onSubmit={onSubmit}>
        <input
          type="text"
          name="username"
          value={username}
          placeholder="nickname"
          onChange={onChange}
        />
        <input
          type="email"
          name="email"
          value={email}
          placeholder="email"
          onChange={onChange}
        />
        <input
          type="password"
          name="password"
          value={password}
          placeholder="password"
          onChange={onChange}
        />
        <input
          type="password"
          name="password2"
          value={password2}
          placeholder="password2"
          onChange={onChange}
        />
        {/* Enlace para añadir foto de perfil */}
        <a href="#" className="add-photo-link">
          + Add a profile photo
        </a>

      
    
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;