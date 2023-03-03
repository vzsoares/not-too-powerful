import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';

import Layout from './components/Layout';
import { AppCtxProvider } from './context/appCtx';
import SplashLoading from './SplashLoading';
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

function Home() {
  return <p>Home</p>;
}
function Error() {
  return <p>Error</p>;
}
