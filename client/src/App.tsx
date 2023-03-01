import { Provider } from 'react-redux';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';

import store, { persistor } from './store';

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <PersistGate loading={<SplashLoading />} persistor={persistor}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Layout />}>
              <Route index element={<Home />} />
              <Route path='*' element={<Error />} />
            </Route>
          </Routes>
        </BrowserRouter>
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
