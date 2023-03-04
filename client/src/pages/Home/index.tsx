import { Box, Typography } from '@mui/material';

import UploadBox from './UploadBox';

function Home() {
  return (
    <>
      <HeroTitle />
      <UploadBox />
      <HelpButton />
    </>
  );
}

export default Home;

function HelpButton() {
  return (
    <Typography
      textAlign='center'
      color='primary'
      sx={{
        textDecoration: 'underline',
        fontSize: { xs: '1rem', md: '1.5rem' },
        cursor: 'pointer',
        '&:hover': {
          filter: 'opacity(0.85)',
        },
        '&:active': {
          filter: 'opacity(0.55)',
        },
      }}
    >
      Help
    </Typography>
  );
}

function HeroTitle() {
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
