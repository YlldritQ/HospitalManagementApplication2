import React, { useEffect } from 'react';
import { useAuth } from '../hooks/useAuth.hook';
import AuthSpinner from '../components/general/AuthSpinner';
import { useRouter } from 'next/navigation';

//interface for props.
// We receive a roles array anddecide the next step based on array
interface IProps {
  roles: string[];
  children: React.ReactNode;
}

const AuthGuard = ({ roles, children }: IProps) => {
  const { isAuthenticated, user, isAuthLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthLoading) {
      const hasAccess = isAuthenticated && user?.roles?.find((q) => roles.includes(q));
      if (!hasAccess) {
        router.push('/unauthorized');
      }
    }
  }, [isAuthenticated, user, roles, isAuthLoading, router]);

  if (isAuthLoading) {
    return <AuthSpinner />;
  }

  const hasAccess = isAuthenticated && user?.roles?.find((q) => roles.includes(q));
  return hasAccess ? <>{children}</> : null;
};

export default AuthGuard;