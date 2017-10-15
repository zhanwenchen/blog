import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => (
  <div className="col-xs-12 footer">
    <div className="col-xs-4">
      <Link to="/about" className="about">About</Link>
    </div>
    <div className="col-xs-4">
      <Link to="/privacy" className="privacy">Privacy</Link>
    </div>
    <div className="col-xs-4">
      <Link to="/copyright" className="copyright">Copyright</Link>
    </div>
  </div>
);

export default Footer;
