import useAuth from '../../hooks/useAuth.hook';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';

const Layout = () => {
  const { isAuthenticated } = useAuth();
  const { pathname } = useLocation();

  const sideBarRenderer = () => {
    if (isAuthenticated && pathname.toLowerCase().startsWith('/dashboard')) {
      return <Sidebar />;
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a1b3d] via-[#0c254f] to-[#0a1b3d] p-6">
      {!isAuthenticated}

      <div className="flex">
        {sideBarRenderer()}
        <div className="flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
