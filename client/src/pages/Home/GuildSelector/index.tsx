import { Dialog, Typography, Box, Button, lighten } from '@mui/material';

import {
  setModalOpen,
  setSelectedGuild,
  setSelectedGuildChannel,
} from '../../../store/upload';
import useEnhancedTheme from '../../../hooks/useEnhancedTheme';
import {
  useGetGuildMatchesQuery,
  useGetGuildChannelsQuery,
} from '../../../api/discord.api';
import { useAppDispatch, useAppSelector } from '../../../hooks';

function GuildSelectorModal() {
  const user = useAppSelector((x) => x.user);
  const upload = useAppSelector((x) => x.upload);
  const dispatch = useAppDispatch();

  const modalOpen = upload.modalOpen;
  const handleClose = () => dispatch(setModalOpen(false));

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
    <Dialog
      open={modalOpen}
      onClose={handleClose}
      PaperProps={{
        sx: {
          minHeight: '155px',
          maxWidth: '700px',
          p: '1rem',
          width: '100%',
          bgcolor: 'gray.100',
        },
      }}
    >
      <Typography variant='h3' fontSize='2rem'>
        Guild Selector
      </Typography>
      <Box sx={{ display: 'flex', my: 2 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
          <Typography>Server:</Typography>
          {guild_matches?.data.map((el, i) => {
            const isOdd = !!(i % 2);
            return (
              <ListItem
                key={i}
                evenOdd={isOdd}
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
            const isEven = !(i % 2);
            return (
              <ListItem
                key={i}
                evenOdd={isEven}
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
        sx={{ marginLeft: 'auto', py: 1.5, px: 3.5 }}
        disabled={!upload.selectedGuildChannel || !upload.selectedGuild}
      >
        Send
      </Button>
    </Dialog>
  );
}

export default GuildSelectorModal;

function ListItem({
  evenOdd,
  name,
  selected,
  onClick,
}: {
  evenOdd: boolean;
  name: string;
  selected: boolean;
  onClick: () => void;
}) {
  const { theme } = useEnhancedTheme();
  const secondary600 = lighten(theme.palette.secondary.main, 0.7);
  return (
    <Box
      onClick={onClick}
      sx={{
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
      <Typography>{name}</Typography>
    </Box>
  );
}
