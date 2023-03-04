import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';

import Layout from './components/Layout';
import { AppCtxProvider } from './context/appCtx';
import SplashLoading from './components/Layout/SplashLoading';
import store, { persistor } from './store';
import Home from './pages/Home';
import Error from './pages/Error';

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <PersistGate loading={<SplashLoading />} persistor={persistor}>
        <AppCtxProvider>
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<Layout />}>
                <Route index element={<Home />} />
              </Route>
              <Route path='*' element={<Error />} />
            </Routes>
          </BrowserRouter>
        </AppCtxProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
