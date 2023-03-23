import { Button, IconButton, Popover, Typography } from '@mui/material';
import { Box, darken } from '@mui/system';
import PersonIcon from '@mui/icons-material/Person';
import { useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../../hooks';
import useAuthPopup from '../../../hooks/useAuthPopup';

function Navbar() {
  return (
    <NavContainer>
      <Button
        onClick={() => {
          window.open(
            import.meta.env.VITE_DISCORD_ADD_BOT_TO_SERVER,
            '_blank',
            '',
          );
        }}
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
      <UserPopOver>
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
      </UserPopOver>
    </NavContainer>
  );
}

export default Navbar;

function UserPopOver({ children }: { children: React.ReactElement }) {
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);
  const user = useAppSelector((s) => s.user);
  const dispatch = useAppDispatch();

  const handleInputClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const [handleAuthPopup] = useAuthPopup();

  return (
    <Box>
      <Box onClick={handleInputClick}>{children}</Box>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        PaperProps={{
          sx: {
            borderRadius: '8px',
            p: 2,
            backgroundColor: (x) => darken(x.palette.secondary.main, 0.2),
            minHeight: '50px',
            minWidth: '150px',
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
          },
        }}
      >
        {user.auth?.access_token ? (
          <Typography
            sx={{
              fontSize: { xs: '1rem', md: '1rem' },
              cursor: 'pointer',
              '&:hover': {
                filter: 'opacity(0.85)',
              },
              '&:active': {
                filter: 'opacity(0.55)',
              },
            }}
            onClick={() => {
              dispatch({ type: 'LOGOUT' });
              handleClose();
            }}
          >
            Logout
          </Typography>
        ) : (
          <Typography
            onClick={() => {
              handleAuthPopup();
              handleClose();
            }}
            sx={{
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
            Login
          </Typography>
        )}
      </Popover>
    </Box>
  );
}

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
