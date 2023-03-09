import {
  Box,
  Button,
  Grow,
  GrowProps,
  Snackbar,
  SnackbarOrigin,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import InfoIcon from '@mui/icons-material/Info';

interface ToastProps {
  position?: SnackbarOrigin;
  type: 'success' | 'warn' | 'error';
  title: string;
  message: string;
  duration?: number;
  open: boolean;
  hide: () => void;
}

function GrowTransition(props: GrowProps) {
  return <Grow {...props} />;
}

const TOAST_COLORS = {
  success: '#289900',
  info: '#627689',
  warn: '#C27605',
  error: '#F30C0C',
};

const TOAST_TYPE = {
  success: {
    icon: (
      <CheckCircleIcon
        width={24}
        height={24}
        sx={{
          color: TOAST_COLORS.success,
        }}
      />
    ),
  },
  info: {
    icon: (
      <InfoIcon
        width={24}
        height={24}
        sx={{
          color: TOAST_COLORS.info,
        }}
      />
    ),
  },
  warn: {
    icon: (
      <ErrorIcon
        width={24}
        height={24}
        sx={{
          color: TOAST_COLORS.warn,
        }}
      />
    ),
  },
  error: {
    icon: (
      <CancelIcon
        width={24}
        height={24}
        sx={{
          color: TOAST_COLORS.error,
        }}
      />
    ),
  },
};

export function BaseToast({
  type = 'success',
  title,
  message,
  position,
  hide,
  open,
  duration = 3000,
}: ToastProps) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={duration}
      anchorOrigin={{
        vertical: position?.vertical ?? 'bottom',
        horizontal: position?.horizontal ?? 'right',
      }}
      TransitionComponent={GrowTransition}
      onClose={hide}
    >
      <Box
        sx={{
          display: 'flex',
          backgroundColor: 'white.main',
          minHeight: 62,
          boxShadow: 3,
          borderRadius: 1.5,
          p: '12px',
        }}
      >
        <Box
          sx={{
            flex: '0 2',
            marginRight: 1.5,
          }}
        >
          {TOAST_TYPE[type].icon}
        </Box>
        <Box
          sx={{
            height: '100%',
            width: '228px',
            marginRight: 1.5,
            color: 'secondary.main',
          }}
        >
          <Typography
            fontWeight={700}
            fontSize={16}
            marginBottom={1}
            color='inherit'
          >
            {title || ''}
          </Typography>
          <Typography
            fontWeight={400}
            fontSize={15}
            color='inherit'
            sx={{
              opacity: 0.9,
              lineHeight: 1,
            }}
          >
            {message || ''}
          </Typography>
        </Box>
        <Box
          sx={{
            flex: '0 2',
          }}
        >
          <Button
            onClick={hide}
            sx={{
              minWidth: '1px',
            }}
          >
            <CloseIcon
              sx={{
                cursor: 'pointer',
                opacity: 0.5,
                color: '#819CA2',
              }}
              fontSize='small'
            />
          </Button>
        </Box>
      </Box>
    </Snackbar>
  );
}
