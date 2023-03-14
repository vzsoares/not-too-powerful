import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';

import Layout from './components/Layout';
import { AppCtxProvider } from './context/AppCtx';
import SplashLoading from './components/Layout/SplashLoading';
import store, { persistor } from './store';
import Home from './pages/Home';
import Error from './pages/Error';
import GuildSelectorModal from './pages/Home/SteppedModal';

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <PersistGate loading={<SplashLoading />} persistor={persistor}>
        <BrowserRouter>
          <AppCtxProvider>
            <Routes>
              <Route path='/' element={<Layout />}>
                <Route index element={<Home />} />
              </Route>
              <Route path='*' element={<Error />} />
            </Routes>
            <GuildSelectorModal />
          </AppCtxProvider>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;
