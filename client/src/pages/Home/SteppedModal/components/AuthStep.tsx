import { Button, Typography } from '@mui/material';
import { Box } from '@mui/system';

function AuthStep() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        textAlign: 'center',
        gap: 4,
        alignItems: 'center',
        justifyContent: 'space-evenly',
      }}
    >
      <Typography variant='h3' sx={{ fontSize: '1.5rem' }}>
        Who are you ?
      </Typography>
      <Button variant='contained' sx={{ py: 2, px: 4 }}>
        Log In
      </Button>
    </Box>
  );
}
export default AuthStep;
