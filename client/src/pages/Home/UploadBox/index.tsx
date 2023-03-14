import { Box, Typography } from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';

function UploadBox() {
  return (
    <Box
      sx={{
        flex: 1,
        my: '3rem',
        position: 'relative',
        border: '1px dashed',
        borderColor: 'white.main',
        borderRadius: '4px',
        minHeight: '200px',
        maxHeight: '300px',
        minWidth: '200px',
        maxWidth: '500px',
        alignSelf: 'center',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <ImageIcon color='primary' sx={{ fontSize: '5rem' }} />
      <Typography mb='10%' mt='1rem' sx={{ userSelect: 'none' }}>
        Paste, drag or&nbsp;
        <Typography
          textAlign='center'
          component='span'
          color='primary'
          sx={{
            textDecoration: 'underline',
            fontSize: { xs: '1rem', md: '1rem' },
            cursor: 'pointer',
            '&:hover': {
              filter: 'opacity(0.85)',
            },
            '&:active': {
              filter: 'opacity(0.55)',
            },
          }}
        >
          click
        </Typography>
      </Typography>
    </Box>
  );
}

// TODO you must log in first
export default UploadBox;
