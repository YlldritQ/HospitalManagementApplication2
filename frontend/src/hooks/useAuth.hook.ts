import { useContext } from 'react';
import { AuthContext } from '../auth/auth.context';

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuthContext context is not inside of AuthProvider Tag');
  return context;
};