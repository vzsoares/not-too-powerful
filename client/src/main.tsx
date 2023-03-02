import { ThemeProvider } from '@mui/material';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import theme from './theme';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </StrictMode>,
);
