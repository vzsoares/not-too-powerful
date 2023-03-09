import { createContext, useContext, useMemo } from 'react';

// import { useAppSelector } from '../hooks';

const AppCtx = createContext({});

export const AppCtxProvider = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  // const state = useAppSelector((x) => x);
  // console.log(state);

  const value = useMemo(() => ({}), []);
  return <AppCtx.Provider value={value}>{children}</AppCtx.Provider>;
};

export default AppCtx;

export function useAppCtx() {
  return useContext(AppCtx);
}
