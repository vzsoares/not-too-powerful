import { keyframes } from '@emotion/react';
import { Box, styled, SvgIcon } from '@mui/material';

import { ReactComponent as DiscordLogo } from '../../../assets/discord-icon.svg';

function SplashLoading() {
  const pump = keyframes`
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.25);
    }
    100% {
      transform: scale(1);
    }
    `;
  const PumpBox = styled('div')({
    animation: `${pump} 1.5s infinite ease-in-out`,
  });
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
      }}
    >
      <PumpBox>
        <SvgIcon
          component={DiscordLogo}
          inheritViewBox
          sx={{ width: '200px', height: '200px', color: '#2c2c2c' }}
        />
      </PumpBox>
    </Box>
  );
}

export default SplashLoading;
