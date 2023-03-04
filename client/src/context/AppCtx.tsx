import { createContext, useContext, useMemo } from 'react';

const AppCtx = createContext({});

export const AppCtxProvider = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  const value = useMemo(() => ({}), []);
  return <AppCtx.Provider value={value}>{children}</AppCtx.Provider>;
};

export default AppCtx;

export function useAppCtx() {
  return useContext(AppCtx);
}
