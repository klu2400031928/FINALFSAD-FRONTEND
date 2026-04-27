import { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Rehydrate user from localStorage
    const savedUser = localStorage.getItem('foodKindUser');
    console.log('AuthProvider: Checking session...', { hasSavedUser: !!savedUser });

    if (savedUser && savedUser !== 'undefined') {
      try {
        const parsed = JSON.parse(savedUser);
        if (parsed?.accessToken) {
          console.log('AuthProvider: Rehydrating user:', parsed.username);
          setUser(parsed);
        } else {
          console.warn('AuthProvider: Saved user missing accessToken');
        }
      } catch (e) {
        console.error('AuthProvider: Error parsing saved user:', e);
        localStorage.removeItem('foodKindUser');
      }
    }
    setLoading(false);

    // Listen to interceptor's unauthorized event
    const handleUnauthorized = () => {
      logout();
    };
    window.addEventListener('auth-unauthorized', handleUnauthorized);
    return () => window.removeEventListener('auth-unauthorized', handleUnauthorized);
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('foodKindUser', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('foodKindUser');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
