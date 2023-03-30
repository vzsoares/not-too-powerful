import { Box, Typography, lighten, Button, SvgIcon } from '@mui/material';
import TagIcon from '@mui/icons-material/Tag';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';

import { ReactComponent as DiscordLogo } from '../../../../assets/discord-icon.svg';
import {
  useGetGuildMatchesQuery,
  useGetGuildChannelsQuery,
} from '../../../../api/discord.api';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import useEnhancedTheme from '../../../../hooks/useEnhancedTheme';
import {
  setSelectedGuild,
  setSelectedGuildChannel,
  setStep,
} from '../../../../store/upload';

function GuildSelector() {
  const user = useAppSelector((x) => x.user);
  const upload = useAppSelector((x) => x.upload);
  const dispatch = useAppDispatch();

  const { data: guild_matches } = useGetGuildMatchesQuery(undefined, {
    skip: !user.auth?.access_token,
  });
  const { data: guild_channels } = useGetGuildChannelsQuery(
    upload.selectedGuild?.id ?? '',
    {
      skip: !upload.selectedGuild?.id,
    },
  );

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flex: 1,
          flexDirection: { xs: 'column', md: 'row' },
          gap: { xs: 3, md: 0 },
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
          <Typography>Server:</Typography>
          {guild_matches?.data.map((el, i) => {
            const isOdd = !!(i % 2);
            return (
              <ListItem
                key={i}
                evenOdd={isOdd}
                icon={
                  <SvgIcon
                    component={DiscordLogo}
                    inheritViewBox
                    sx={{
                      fontSize: '2.5rem',
                      color: 'gray.900',
                    }}
                  />
                }
                name={el?.name}
                selected={upload.selectedGuild?.id === el?.id}
                onClick={() => {
                  if (upload.selectedGuild?.id === el?.id)
                    dispatch(setSelectedGuild(null));
                  else dispatch(setSelectedGuild(el));
                }}
              />
            );
          })}
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
          <Typography>Channel:</Typography>
          {guild_channels?.data.map((el, i) => {
            if (![0, 2].includes(el.type)) return;
            const isEven = !(i % 2);
            return (
              <ListItem
                key={i}
                evenOdd={isEven}
                icon={
                  el.type === 0 ? (
                    <SvgIcon
                      component={TagIcon}
                      sx={{
                        fontSize: '2.5rem',
                        color: 'gray.900',
                      }}
                    />
                  ) : (
                    <SvgIcon
                      component={VolumeUpIcon}
                      sx={{
                        fontSize: '2.5rem',
                        color: 'gray.900',
                      }}
                    />
                  )
                }
                name={el?.name}
                selected={upload.selectedGuildChannel?.id === el?.id}
                onClick={() => {
                  if (upload.selectedGuildChannel?.id === el?.id)
                    dispatch(setSelectedGuildChannel(null));
                  else dispatch(setSelectedGuildChannel(el));
                }}
              />
            );
          })}
        </Box>
      </Box>
      <Button
        variant='contained'
        sx={{ ml: 'auto', mt: 2, py: 1.5, px: 3.5 }}
        disabled={!upload.selectedGuildChannel || !upload.selectedGuild}
        onClick={() => dispatch(setStep(3))}
      >
        Next
      </Button>
    </>
  );
}
export default GuildSelector;

function ListItem({
  evenOdd,
  name,
  selected,
  onClick,
  icon,
}: {
  evenOdd: boolean;
  name: string;
  selected: boolean;
  onClick: () => void;
  icon: React.ReactNode;
}) {
  const { theme } = useEnhancedTheme();
  const secondary600 = lighten(theme.palette.secondary.main, 0.7);
  return (
    <Box
      onClick={onClick}
      sx={{
        display: 'inline-flex',
        gap: '1rem',
        alignItems: 'center',
        bgcolor: selected
          ? 'primary.main'
          : evenOdd
          ? secondary600
          : 'gray.100',
        p: 2,
        cursor: 'pointer',
        '&:hover': {
          filter: 'brightness(110%)',
        },
        '&:active': {
          filter: 'brightness(90%)',
        },
      }}
    >
      {icon}
      <Typography
        sx={{
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
      >
        {name}
      </Typography>
    </Box>
  );
}
