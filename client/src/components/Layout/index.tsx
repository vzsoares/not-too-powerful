import { Box } from '@mui/system';
import { Outlet } from 'react-router-dom';

import Footer from './Footer';
import Navbar from './NavBar';

function Layout() {
  return (
    <>
      <Navbar />
      <BodyContainer>
        <Outlet />
      </BodyContainer>
      <Footer />
    </>
  );
}

export default Layout;

function BodyContainer({ children }: { children: React.ReactElement }) {
  return (
    <Box sx={{ flex: '1', bgcolor: 'secondary.main' }}>
      <Box
        sx={{
          maxWidth: '1240px',
          margin: '0 auto',
          mt: '2rem',
          mb: '5rem',
          px: { xs: '1rem', md: '2rem' },
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
