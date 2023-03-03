import { Typography } from '@mui/material';
import { Box } from '@mui/system';

function Footer() {
  return (
    <Box sx={{ minHeight: '60px', bgcolor: 'secondary.main' }}>
      <Box
        sx={{
          maxWidth: '1240px',
          margin: '0 auto',
          px: { xs: '1rem', md: '2rem' },
          mt: '1rem',
          mb: '1rem',
        }}
      >
        <Box>
          <Typography>footer</Typography>
        </Box>
      </Box>
    </Box>
  );
}
export default Footer;
