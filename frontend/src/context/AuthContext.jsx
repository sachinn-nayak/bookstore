import React, { createContext, useState, useEffect } from 'react';
import * as jwt_decode from 'jwt-decode';
 // Adjust based on the import statement needed
import axios from 'axios';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authToken, setAuthToken] = useState(localStorage.getItem('authToken'));

  useEffect(() => {
    if (authToken) {
      const decoded = jwtDecode(authToken);
      setUser(decoded);
    }
  }, [authToken]);

  const login = async (email, password) => {
    try {
      const response = await axios.post('http://localhost:3002/api/auth/login', { email, password });
      localStorage.setItem('authToken', response.data.token);
      setAuthToken(response.data.token);
      setUser(jwtDecode(response.data.token));
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  const register = async (userData) => {
    try {
      await axios.post('http://localhost:3002/api/auth/register', userData);
      await login(userData.email, userData.password);
    } catch (error) {
      console.error('Error registering:', error);
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setAuthToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, authToken, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
