import { useMediaQuery, useTheme } from '@mui/material';

export default function useEnhancedTheme() {
  const theme = useTheme();
  // @ts-expect-error what if it is unknown
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('md'));

  const MAX_CONTENT_WIDTH = theme.breakpoints.values.xl;
  const X_PADDING = { xs: '1rem', md: '2rem' };
  const Y_PADDING = { xs: '1rem', md: '1.25rem' };

  return {
    MAX_CONTENT_WIDTH,
    X_PADDING,
    Y_PADDING,
    isMobile,
    theme,
  };
}
