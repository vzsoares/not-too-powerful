import { Button, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useEffect } from 'react';

import { setStep } from '../../../../store/upload';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import useAuthPopup from '../../../../hooks/useAuthPopup';

function AuthStep() {
  const user = useAppSelector((x) => x.user);
  const dispatch = useAppDispatch();
  const [handleAuthPopup] = useAuthPopup();

  useEffect(() => {
    if (user.auth?.access_token) dispatch(setStep(2));
  }, [dispatch, user.auth?.access_token]);
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
      <Button
        variant='contained'
        sx={{ py: 2, px: 4 }}
        onClick={() => handleAuthPopup()}
      >
        Log In
      </Button>
    </Box>
  );
}
export default AuthStep;
