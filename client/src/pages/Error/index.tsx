import { Button, Typography } from '@mui/material';
import { Box } from '@mui/system';

function Error() {
  return (
    <Box
      sx={{
        textAlign: 'center',
        flex: 1,
        bgcolor: 'secondary.main',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
      }}
    >
      <Box>
        <Typography variant='h3' lineHeight='100%'>
          404 (;
        </Typography>
        <Typography variant='h3' lineHeight='100%'>
          Not Found
        </Typography>
      </Box>
      <Button
        href='/'
        variant='contained'
        sx={{ py: { xs: '1rem', md: '1.5rem' }, height: 'fit-content' }}
      >
        <Typography
          variant='h3'
          sx={{ fontSize: { xs: '1rem', md: '1.5rem' } }}
        >
          Home
        </Typography>
      </Button>
    </Box>
  );
}
export default Error;
