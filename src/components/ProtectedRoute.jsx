import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children, adminOnly = false }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Poppins, sans-serif', color: '#888' }}>
        Loading...
      </div>
    );
  }

  if (!user) return <Navigate to="/login" replace />;

  if (adminOnly && user.role !== 'admin') {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: 'Poppins, sans-serif' }}>
        <h1 style={{ fontSize: '48px', fontWeight: 800, color: '#ff544a' }}>403</h1>
        <p style={{ color: '#888', fontSize: '18px', marginBottom: '20px' }}>Admin access required.</p>
        <a href="/" style={{ color: '#ff544a', fontWeight: 600, textDecoration: 'none' }}>← Back to Home</a>
      </div>
    );
  }

  return children;
}
