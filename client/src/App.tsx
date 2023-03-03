import { Box } from '@mui/system';
import { Provider } from 'react-redux';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';

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

function Layout() {
  return (
    <>
      <Box sx={{ minHeight: '60px' }}>
        <Box
          sx={{
            maxWidth: '1240px',
            margin: '0 auto',
            px: { xs: '1rem', md: '2rem' },
            mt: '1rem',
            mb: '1rem',
          }}
        >
          <Box>navbar</Box>
        </Box>
      </Box>
      <Box sx={{ flex: '1' }}>
        <Box
          sx={{
            maxWidth: '1240px',
            margin: '0 auto',
            mt: '2rem',
            mb: '5rem',
            px: { xs: '1rem', md: '2rem' },
          }}
        >
          <Outlet />
        </Box>
      </Box>
      <Box sx={{ minHeight: '60px' }}>
        <Box
          sx={{
            maxWidth: '1240px',
            margin: '0 auto',
            px: { xs: '1rem', md: '2rem' },
            mt: '1rem',
            mb: '1rem',
          }}
        >
          <Box>footer</Box>
        </Box>
      </Box>
    </>
  );
}
