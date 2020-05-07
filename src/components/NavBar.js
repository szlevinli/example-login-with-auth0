import React from 'react';
import { useAuth0 } from '../react-auth0-spa';
import { Link } from 'react-router-dom';

const NavBar = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
  return (
    <>
      {!isAuthenticated && (
        <button onClick={() => loginWithRedirect({})}>Log in</button>
      )}

      {isAuthenticated && <button onClick={() => logout()}>Log in</button>}

      {isAuthenticated && (
        <span>
          <Link to='/'>Home</Link>
          <Link to='/profile'>Profile</Link>
        </span>
      )}
    </>
  );
};

export default NavBar;
