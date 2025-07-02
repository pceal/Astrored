
import { BrowserRouter, Routes, Route } from 'react-router-dom';


import NavbarDeskop from './components/Navbar/NavbarDeskop/NavbarDeskop'; 
import './App.css'; 
import FooterDeskop from './components/Footer/FooterDeskop/FooterDeskop'; 
import Home from './components/Home/Home'; 
import Login from './components/Login/Login'; 
import Profile from './components/Profile/Profile'; 

function App() {
  return (
     <BrowserRouter>
   
      
      <NavbarDeskop /> 
       <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/profile" element={<Profile />} />
     </Routes>
      <FooterDeskop /> 
    
    </BrowserRouter>
  );
}

export default App;