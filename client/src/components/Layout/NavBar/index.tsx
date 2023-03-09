import { Button, IconButton, Typography } from '@mui/material';
import { Box } from '@mui/system';
import PersonIcon from '@mui/icons-material/Person';
import { useEffect, useState } from 'react';

import { discordGetUserCode } from '../../../../env';
import { useLazyGetTokenQuery } from '../../../api/auth.api';
import { useAppDispatch } from '../../../hooks';
import { setAuth } from '../../../store/user';

function Navbar() {
  const [externalPopup, setExternalPopup] = useState<Window | null>(null);
  const dispatch = useAppDispatch();

  const handlePopup = () => {
    const width = 500;
    const height = 900;
    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2.5;
    const title = ``;
    const url = discordGetUserCode;
    const popup = window.open(
      url,
      title,
      `width=${width},height=${height},left=${left},top=${top}`,
    );
    setExternalPopup(popup);
  };

  const [verifyToken] = useLazyGetTokenQuery();

  useEffect(() => {
    if (!externalPopup) {
      return;
    }

    const timer = setInterval(() => {
      if (!externalPopup) {
        timer && clearInterval(timer);
        return;
      }
      const currentUrl = externalPopup.location.href;
      if (!currentUrl) {
        return;
      }
      const searchParams = new URL(currentUrl).searchParams;
      const code = searchParams.get('code');
      if (code) {
        externalPopup.close();
        verifyToken(code)
          .unwrap()
          .then((r) => {
            dispatch(setAuth(r.data));
          })
          .catch((e) => {
            // TODO
            console.error('error login in', e);
          });
        console.warn(`The popup URL has URL code param = ${code}`);
      }
    }, 500);
  }, [externalPopup, dispatch, verifyToken]);

  return (
    <NavContainer>
      <Button
        onClick={handlePopup}
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
