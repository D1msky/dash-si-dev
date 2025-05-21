// src/lib/auth.js - JWT authentication utilities

import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key_here';

/**
 * Decode a JWT token without verification
 * This is similar to your Laravel WebHelp::onlyDecodeJwt method
 * @param {string} token - JWT token
 * @returns {Object|null} Decoded token or null if invalid
 */
export function onlyDecodeJwt(token) {
  try {
    // Use jwt.decode to skip verification, matching Laravel behavior
    const decoded = jwt.decode(token, { complete: true });
    return decoded ? decoded.payload : null;
  } catch (error) {
    console.error('Token decode failed:', error);
    return null;
  }
}

/**
 * Verify a JWT token
 * @param {string} token - JWT token
 * @returns {Object|null} Decoded token or null if invalid
 */
export function verifyToken(token) {
  try {
    // In your Laravel code, you're using onlyDecodeJwt without verification
    // We'll match that behavior here, but this function could be updated
    // to use jwt.verify for actual token verification if needed
    return onlyDecodeJwt(token);
  } catch (error) {
    console.error('Token verification failed:', error);
    return null;
  }
}

/**
 * Generate a JWT token
 * @param {Object} payload - Token payload
 * @returns {string} JWT token
 */
export function generateToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '30d' });
}

/**
 * Get the JWT token from localStorage (client-side only)
 * @returns {string|null} The JWT token or null if not found
 */
export const getToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('auth_token');
  }
  return null;
};

/**
 * Store the JWT token in localStorage (client-side only)
 * @param {string} token - The JWT token to store
 */
export const setToken = (token) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('auth_token', token);
  }
};

/**
 * Remove the JWT token from localStorage (client-side only)
 */
export const removeToken = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('auth_token');
  }
};

/**
 * Check if the user is authenticated (client-side only)
 * @returns {boolean} True if the user is authenticated, false otherwise
 */
export const isAuthenticated = () => {
  return getToken() !== null;
};

// React hook for authentication
import { useEffect } from 'react';
import { useRouter } from 'next/router';

/**
 * Custom hook to protect routes that require authentication
 * @param {boolean} requireAuth - Whether the route requires authentication
 */
export const useAuth = (requireAuth = true) => {
  const router = useRouter();

  useEffect(() => {
    // If we're on the client side
    if (typeof window !== 'undefined') {
      const authenticated = isAuthenticated();
      
      if (requireAuth && !authenticated) {
        // Redirect to login if not authenticated
        router.push('/login');
      } else if (!requireAuth && authenticated) {
        // Redirect to dashboard if already authenticated
        router.push('/dashboard');
      }
    }
  }, [requireAuth, router]);

  return { isAuthenticated: isAuthenticated() };
};