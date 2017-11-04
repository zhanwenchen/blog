import React, { PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';
import Auth from '../modules/Auth';

const Base = ({ children }) => (
  <div>
    <div className="top-bar">
      <div className="top-bar-left">
        <IndexLink to="/">React Blog</IndexLink>
      </div>

      {Auth.isTokenExist()
        ? (
          <div className="top-bar-right">
            <Link to="/logout">Log out</Link>
          </div>
        )
        : (
          <div className="top-bar-right">
            <Link to="/login">Log in</Link>
            <Link to="/signup">Sign up</Link>
          </div>
        )
      }

    </div>

    {children}

  </div>
);

Base.propTypes = {
  children: PropTypes.object.isRequired,
};

export default Base;
