import React from 'react';
import PropTypes from 'prop-types';
import { Link, NavLink } from 'react-router-dom';
import Auth from '../modules/Auth';

const Base = ({ children }) => (
  <div>
    <div className="top-bar">
      <div className="top-bar-left">
        <NavLink to="/">React Blog</NavLink>
      </div>

      {Auth.isTokenExist()
        ? (
          <div className="top-bar-right">
            <Link to="/posts/new">Create Post</Link>
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
