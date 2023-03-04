import { Button, IconButton, Typography } from '@mui/material';
import { Box } from '@mui/system';
import PersonIcon from '@mui/icons-material/Person';

function Navbar() {
  return (
    <NavContainer>
      <Button
        variant='contained'
        sx={{ py: { xs: '1rem', md: '1.5rem' }, height: 'fit-content' }}
      >
        <Typography
          variant='h3'
          sx={{ fontSize: { xs: '1rem', md: '1.5rem' } }}
        >
          Add To Your Server
        </Typography>
      </Button>
      <IconButton>
        <Box
          sx={{
            bgcolor: 'primary.main',
            borderRadius: '50%',
            p: '10px',
            display: 'flex',
          }}
        >
          <PersonIcon sx={{ color: 'white.main', fontSize: '3rem' }} />
        </Box>
      </IconButton>
    </NavContainer>
  );
}

export default Navbar;

function NavContainer({ children }: { children: React.ReactNode }) {
  return (
    <Box
      sx={{
        minHeight: '60px',
        bgcolor: 'secondary.main',
      }}
    >
      <Box
        sx={{
          maxWidth: '1240px',
          margin: '0 auto',
          px: { xs: '1rem', md: '2rem' },
          mt: '2rem',
          mb: '1rem',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            gap: '0.5rem',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
}
