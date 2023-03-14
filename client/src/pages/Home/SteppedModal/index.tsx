import { Fragment } from 'react';
import { Dialog, Typography, Box } from '@mui/material';

import { setModalOpen } from '../../../store/upload';
import { useAppDispatch, useAppSelector } from '../../../hooks';

import GuildSelector from './components/GuildSelector';
// import AuthStep from './components/AuthStep';

// TODO stepped modal, login/server.channel/img/send
function SteppedModal() {
  const upload = useAppSelector((x) => x.upload);
  const dispatch = useAppDispatch();

  const modalOpen = upload.modalOpen;
  const handleClose = () => dispatch(setModalOpen(false));

  return (
    <Dialog
      open={modalOpen}
      onClose={handleClose}
      PaperProps={{
        sx: {
          minHeight: '300px',
          maxWidth: '700px',
          p: '1rem',
          width: '100%',
          bgcolor: 'gray.100',
          m: 0,
        },
      }}
    >
      <Stepper />

      <Box sx={{ display: 'flex', flexDirection: 'column', mt: 4, flex: 1 }}>
        <GuildSelector />
        {/* <AuthStep /> */}
      </Box>
    </Dialog>
  );
}

export default SteppedModal;

function Stepper() {
  const step = 1;
  const steps = ['Log In', 'Select channel', 'Select image'];
  return (
    <Box
      sx={{ display: 'flex', alignItems: 'center', gap: 2, userSelect: 'none' }}
    >
      {steps.map((v, i) => {
        const isOdd = !!(i % 2);
        const completed = i + 1 < step;
        const progressing = i + 2 <= step;
        const completedPrev = i + 1 <= step;
        const selected = i + 1 === step;

        return (
          <Fragment key={i}>
            {isOdd && (
              <Box
                sx={{
                  border: '1px solid',
                  borderColor: completedPrev ? 'success.main' : 'gray.400',
                  height: 0,
                  flex: 1,
                }}
              />
            )}
            <Typography
              sx={{
                color: completed ? 'success.main' : 'white.main',
                textDecoration: selected ? 'underline' : 'none',
              }}
            >
              {v}
            </Typography>
            {isOdd && (
              <Box
                sx={{
                  border: '1px solid',
                  borderColor: progressing ? 'success.main' : 'gray.400',
                  height: 0,
                  flex: 1,
                }}
              />
            )}
          </Fragment>
        );
      })}
    </Box>
  );
}
