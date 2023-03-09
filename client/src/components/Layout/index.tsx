import { Box } from '@mui/system';
import { Outlet } from 'react-router-dom';

import { Toast } from '../Toast/Toast';

import Footer from './Footer';
import Navbar from './NavBar';

function Layout() {
  return (
    <>
      <Navbar />
      <BodyContainer>
        <Outlet />
      </BodyContainer>
      {/* @ts-expect-error yeah */}
      <Toast />
      <Footer />
    </>
  );
}

export default Layout;

function BodyContainer({ children }: { children: React.ReactElement }) {
  return (
    <Box sx={{ flex: '1', bgcolor: 'secondary.main', display: 'flex' }}>
      <Box
        sx={{
          maxWidth: '1240px',
          margin: '0 auto',
          mt: '2rem',
          mb: '2rem',
          px: { xs: '1rem', md: '2rem' },
          display: 'flex',
          flex: 1,
          flexDirection: 'column',
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
