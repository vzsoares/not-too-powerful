import { IconButton, Typography } from '@mui/material';
import { Box } from '@mui/system';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';

function Footer() {
  const hrefs = {
    github: 'https://github.com/vzsoares',
    linkedin: 'https://www.linkedin.com/in/vinicius-zenha/',
  };
  return (
    <FooterContainer>
      <Typography flex={1}>&nbsp;</Typography>
      <Typography fontWeight={400} flex={1} textAlign='center'>
        2023 &#169;
      </Typography>
      <Box
        sx={{
          display: 'inline-flex',
          gap: '0.5rem',
          justifyContent: 'flex-end',
        }}
        flex={1}
      >
        <IconButton href={hrefs.linkedin} target='_blank'>
          <LinkedInIcon sx={{ color: 'white.main', fontSize: '2.25rem' }} />
        </IconButton>
        <IconButton href={hrefs.github} target='_blank'>
          <GitHubIcon sx={{ color: 'white.main', fontSize: '2.25rem' }} />
        </IconButton>
      </Box>
    </FooterContainer>
  );
}
export default Footer;

function FooterContainer({ children }: { children: React.ReactNode }) {
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
