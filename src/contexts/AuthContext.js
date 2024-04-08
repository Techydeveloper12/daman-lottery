import { onAuthStateChanged } from 'firebase/auth';
import {auth } from '../firebase/config';
import { useEffect, useState } from 'react';

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(null);


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
    });

    return () => unsubscribe();
  }, [auth]);

  return isAuthenticated;
}