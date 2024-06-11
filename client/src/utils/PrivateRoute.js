import React, { useContext, useState, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const PrivateRoute = () => {
  const { authState } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, [authState]);

  if (loading) {
    // Render a loading spinner or message while checking authentication state
    return <div>Loading...</div>;
  }

  return authState.isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
