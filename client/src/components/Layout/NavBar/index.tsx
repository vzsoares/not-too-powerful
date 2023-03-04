import { Button, Typography } from '@mui/material';
import { Box } from '@mui/system';

function Navbar() {
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
        <Box>
          <Button variant='contained' sx={{ py: '1rem' }}>
            <Typography
              variant='h3'
              sx={{ fontSize: { xs: '1rem', md: '1.5rem' } }}
            >
              Add To Your Server
            </Typography>
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default Navbar;
