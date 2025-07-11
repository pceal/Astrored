
import { Link } from 'react-router-dom';
import './FooterDeskop.scss'; 

const FooterDeskop = () => {
  return (
    <footer className="footer-deskop">
      
     
      <svg className="footer-icon icon-aries" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L12 22M2 12H22M17 7L7 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
      <svg className="footer-icon icon-taurus" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C7.58 2 4 5.58 4 10V22M20 10V22M2 17H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
      <svg className="footer-icon icon-gemini" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2V22M2 7H22M2 17H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
      <svg className="footer-icon icon-cancer" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C7.58 2 4 5.58 4 10C4 14.42 7.58 18 12 18C16.42 18 20 14.42 20 10C20 5.58 16.42 2 12 2ZM12 18V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
      <svg className="footer-icon icon-leo" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C7.58 2 4 5.58 4 10C4 14.42 7.58 18 12 18C16.42 18 20 14.42 20 10C20 5.58 16.42 2 12 2ZM12 18V22M12 22L17 17M7 17L12 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
      <svg className="footer-icon icon-virgo" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2V22M2 7H22M2 17H22M17 7L7 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
      <svg className="footer-icon icon-libra" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 12H22M7 7H17M7 17H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
      <svg className="footer-icon icon-scorpio" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2V22M2 7H22M2 17H22M17 7L7 17M7 7L17 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
      <svg className="footer-icon icon-sagittarius" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2V22M2 7H22M2 17H22M17 7L7 17M7 17L17 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
      <svg className="footer-icon icon-capricorn" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C7.58 2 4 5.58 4 10V22M20 10V22M2 17H22M17 7L7 17M7 17L17 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
      <svg className="footer-icon icon-aquarius" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2V22M2 7H22M2 17H22M17 7L7 17M7 17L17 7M12 22L17 17M7 17L12 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
      <svg className="footer-icon icon-pisces" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2V22M2 7H22M2 17H22M17 7L7 17M7 17L17 7M12 22L17 17M7 17L12 22M12 2L17 7M7 7L12 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>


      <div className="footer-content">
        <p className="copyright-text">
          © {new Date().getFullYear()} AstroRed - Conectando almas bajo las estrellas
        </p>
        <div className="footer-links">
          <Link to="/about" className="footer-link-us">Sobre nosotros</Link>
          <Link to="/terms" className="footer-link-terms">Términos y condiciones</Link>
        </div>
      </div>
    </footer>
  );
};

export default FooterDeskop;