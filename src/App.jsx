
import { BrowserRouter, Routes, Route } from 'react-router-dom';


import NavbarDeskop from './components/Navbar/NavbarDeskop/NavbarDeskop'; 
import './App.css'; 
import FooterDeskop from './components/Footer/FooterDeskop/FooterDeskop'; 
import Home from './components/Home/Home'; 
import Login from './components/Login/Login'; 
import Profile from './components/Profile/Profile'; 
import Register from './components/Register/Register';
import PostDetail from './components/PostDetail/PostDetail';
import Admin from './components/Admin/Admin';
import PrivateZone from './components/Guards/PrivateZone';
import AdminZone from './components/Guards/AdminZone';

function App() {
  return (
    <BrowserRouter>
      {/*style={{ display: 'flex', justifyContent: 'center', gap: '2rem', padding: '2rem', flexWrap: 'wrap' }}>*/}
      <>
        <div className="app-container"> 
        <NavbarDeskop />
        <div className="app-content-wrapper"> 
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
              <Register /> 
            </div>
          } />
          <Route path="/profile" element={<PrivateZone><Profile /></PrivateZone>} />
           <Route path="/posts/id/:_id" element={<PostDetail />} />
          <Route path="/admin" element={<AdminZone><Admin /></AdminZone>} />
        </Routes>
        </div>
        <FooterDeskop />
         </div>
      </>
    </BrowserRouter>
  );
}

export default App;