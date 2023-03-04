import { createContext, useContext, useMemo } from 'react';
import { useLocation } from 'react-router-dom';

const AppCtx = createContext({});

export const AppCtxProvider = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const queryParams = Array.from(searchParams.entries());
  const code = queryParams.filter(([k]) => k === 'code');

  const value = useMemo(() => ({ code }), [code]);

  return <AppCtx.Provider value={value}>{children}</AppCtx.Provider>;
};

export default AppCtx;

export function useAppCtx() {
  return useContext(AppCtx);
}
