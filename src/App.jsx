
import { BrowserRouter, Routes, Route } from 'react-router-dom';


import NavbarDeskop from './components/Navbar/NavbarDeskop/NavbarDeskop'; 
import './App.css'; 
import FooterDeskop from './components/Footer/FooterDeskop/FooterDeskop'; 
import Home from './components/Home/Home'; 
import Login from './components/Login/Login'; 
import Profile from './components/Profile/Profile'; 
import Register from './components/Register/Register';

function App() {
  return (
    <BrowserRouter>
      {/*style={{ display: 'flex', justifyContent: 'center', gap: '2rem', padding: '2rem', flexWrap: 'wrap' }}>*/}
      <>
        <NavbarDeskop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={
              <div>
                <Login />
                
              </div>
            }
          />
           <Route path="/register" element={
            <div>
              <Register /> {/* Solo renderiza el componente de Registro aquí */}
            </div>
          } />
          <Route path="/profile" element={<Profile />} />
        </Routes>
        <FooterDeskop />
      </>
    </BrowserRouter>
  );
}

export default App;