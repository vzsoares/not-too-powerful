import { createContext, useContext } from 'react';

const AppCtx = createContext({});

export const AppCtxProvider = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  return <AppCtx.Provider value={{}}>{children}</AppCtx.Provider>;
};

export default AppCtx;

export function useAppCtx() {
  return useContext(AppCtx);
}
