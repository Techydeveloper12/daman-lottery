import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { auth } from '../firebase/config';
import { onAuthStateChanged } from 'firebase/auth';

export default function ProtectedRoute({ element, ...rest }) {
  const [isAuth, setIsAuth] = React.useState(null);


  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuth(!!user);
    });

    return () => unsubscribe();
  }, [auth]);

  if (isAuth === null) {
    return <div>Loading...</div>; // Or a loading spinner
  }

  return isAuth ? <Route {...rest} element={element} /> : <Navigate to="/login" />;
}