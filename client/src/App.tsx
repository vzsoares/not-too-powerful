import { Box, Typography } from '@mui/material';
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
  return (
    <Box>
      <Typography
        textAlign='center'
        sx={{ fontSize: { xs: '2rem', md: '3rem', xl: '4rem' } }}
      >
        <Typography
          component='span'
          display='block'
          variant='h1'
          fontSize='inherit'
        >
          NOT&nbsp;TOO
        </Typography>
        {/* <Typography
          component='span'
          // display='block'
          variant='h1'
          fontSize='inherit'
        >
          TOO
        </Typography> */}
        <Typography
          component='span'
          display='block'
          variant='h1'
          fontSize='inherit'
        >
          POWERFUL
        </Typography>
      </Typography>
    </Box>
  );
}
function Error() {
  return <p>Error</p>;
}
