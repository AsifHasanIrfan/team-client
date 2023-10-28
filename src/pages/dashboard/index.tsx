import { IRootState } from '@config/types';
import { useAppSelector } from '@hooks/useRedux';
import { useAuth } from '@state/index';
import Dashboard from '@views/Dashboard';
import { useEffect } from 'react';

const DashboardPage = () => {
  const { auth } = useAppSelector((state: IRootState) => state);
  const { setAuth } = useAuth();

  useEffect(() => {
    if (auth.user?.role === 'employee') {
      return setAuth({ isAdmin: false, isAuthenticated: true });
    }
  }, []);

  return (
    <section>
      <Dashboard />
    </section>
  );
};

export default DashboardPage
