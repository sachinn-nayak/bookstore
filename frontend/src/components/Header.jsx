import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Header = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <header className="bg-gray-800 p-4 text-white">
      <nav className="flex justify-between items-center">
        <div className="flex space-x-4">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "text-lg font-semibold text-gray-300" : "text-lg font-semibold hover:text-gray-300"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/cart"
            className={({ isActive }) =>
              isActive ? "text-lg font-semibold text-gray-300" : "text-lg font-semibold hover:text-gray-300"
            }
          >
            Cart
          </NavLink>
        </div>
        <div>
          {user ? (
            <>
              <span className="mr-4">{user.email}</span>
              <button onClick={logout} className="text-lg font-semibold hover:text-gray-300">
                Logout
              </button>
            </>
          ) : (
            <div className="flex space-x-4">
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive ? "text-lg font-semibold text-gray-300" : "text-lg font-semibold hover:text-gray-300"
                }
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                className={({ isActive }) =>
                  isActive ? "text-lg font-semibold text-gray-300" : "text-lg font-semibold hover:text-gray-300"
                }
              >
                Register
              </NavLink>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
