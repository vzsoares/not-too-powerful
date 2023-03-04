import { Box, Typography } from '@mui/material';

function Home() {
  return (
    <Box>
      <Typography
        textAlign='center'
        sx={{ fontSize: { xs: '2rem', md: '4rem', xl: '5rem' } }}
      >
        <Typography
          component='span'
          display='block'
          variant='h1'
          fontSize='inherit'
        >
          NOT&nbsp;TOO
        </Typography>
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

export default Home;
