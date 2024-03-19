
import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from './Auth';


export const ProtectedRoute = ({children}: {children: any}) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};

