import { Provider } from 'react-redux';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';

import { AppCtxProvider } from './context/appCtx';
import store, { persistor } from './store';

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <PersistGate loading={<SplashLoading />} persistor={persistor}>
        <AppCtxProvider>
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<Layout />}>
                <Route index element={<Home />} />
                <Route path='*' element={<Error />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </AppCtxProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;

function SplashLoading() {
  return <p>loading...</p>;
}

function Home() {
  return <p>Home</p>;
}
function Error() {
  return <p>Error</p>;
}

function Layout() {
  return (
    <div>
      <Outlet />
    </div>
  );
}
