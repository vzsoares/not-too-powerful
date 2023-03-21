import { Fragment } from 'react';
import { DoubleArrow } from '@mui/icons-material';
import { Dialog, Typography, Box, SvgIcon } from '@mui/material';

import { setModalOpen, setStep } from '../../../store/upload';
import { useAppDispatch, useAppSelector } from '../../../hooks';

import GuildSelector from './components/GuildSelector';
import AuthStep from './components/AuthStep';
import FileSelectorStep from './components/FileSelectorStep';

function SteppedModal() {
  const upload = useAppSelector((x) => x.upload);
  const dispatch = useAppDispatch();

  const modalOpen = upload.modalOpen;
  const resetStep = () => dispatch(setStep(1));
  const handleClose = () => {
    dispatch(setModalOpen(false));
    resetStep();
  };

  const step = upload.step;

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
      <SvgIcon
        component={DoubleArrow}
        onClick={resetStep}
        color='primary'
        sx={{
          fontSize: '2.5rem',
          mt: 1,
          cursor: 'pointer',
          transform: 'rotate(180deg)',
          '&:hover': {
            transform: 'scale(1.2) rotate(180deg)',
          },
        }}
      />
      <Box sx={{ display: 'flex', flexDirection: 'column', mt: 1, flex: 1 }}>
        {step === 1 ? (
          <AuthStep />
        ) : step === 2 ? (
          <GuildSelector />
        ) : (
          <FileSelectorStep />
        )}
      </Box>
    </Dialog>
  );
}

export default SteppedModal;

function Stepper() {
  const step = useAppSelector((x) => x.upload.step);
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
                  borderColor: completedPrev ? 'success.main' : 'white.main',
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
                  borderColor: progressing ? 'success.main' : 'white.main',
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
