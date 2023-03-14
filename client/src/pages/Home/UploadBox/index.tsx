import { Box, lighten, Dialog, Typography, Button } from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';
import { useRef, useState } from 'react';

import useEnhancedTheme from '../../../hooks/useEnhancedTheme';
import {
  GuildSummary,
  useGetGuildMatchesQuery,
  useGetGuildChannelsQuery,
  GuildChannelSummary,
} from '../../../api/discord.api';
import { useAppSelector } from '../../../hooks';

function UploadBox() {
  const user = useAppSelector((x) => x.user);
  const { data: guild_matches } = useGetGuildMatchesQuery(undefined, {
    skip: !user.auth?.access_token,
  });

  const [selectGuidOpen, setSelectGuidOpen] = useState(true);
  const handleClose = () => setSelectGuidOpen(false);
  const [selectedGuild, setSelectedGuild] = useState<GuildSummary | null>();
  const { data: guild_channels } = useGetGuildChannelsQuery(
    selectedGuild?.id ?? '',
    {
      skip: !selectedGuild?.id,
    },
  );
  const [selectedGuildChannel, setSelectedGuildChannel] =
    useState<GuildChannelSummary | null>();

  return (
    <Box
      sx={{
        flex: 1,
        my: '3rem',
        position: 'relative',
        border: '1px dashed',
        borderColor: 'white.main',
        borderRadius: '4px',
        minHeight: '200px',
        maxHeight: '300px',
        minWidth: '200px',
        maxWidth: '500px',
        alignSelf: 'center',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <ImageIcon color='primary' sx={{ fontSize: '5rem' }} />
      <Typography mb='10%' mt='1rem' sx={{ userSelect: 'none' }}>
        Paste, drag or&nbsp;
        <ImportBtn />
      </Typography>
      <Dialog
        open={selectGuidOpen}
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
        {/* <RadioSelector data={data?.data} /> */}
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
                  selected={selectedGuild?.id === el?.id}
                  onClick={() => {
                    if (selectedGuild?.id === el?.id) setSelectedGuild(null);
                    else setSelectedGuild(el);
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
                  selected={selectedGuildChannel?.id === el?.id}
                  onClick={() => {
                    if (selectedGuildChannel?.id === el?.id)
                      setSelectedGuildChannel(null);
                    else setSelectedGuildChannel(el);
                  }}
                />
              );
            })}
          </Box>
        </Box>
        <Button
          variant='contained'
          sx={{ marginLeft: 'auto' }}
          disabled={!selectedGuildChannel || !selectedGuild}
        >
          Send
        </Button>
      </Dialog>
    </Box>
  );
}

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

// function RadioSelector({ data }: { data: any }) {
//   const [selectedValue, setSelectedValue] = useState('a');

//   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setSelectedValue(event.target.value);
//   };

//   const controlProps = (item: string) => ({
//     checked: selectedValue === item,
//     onChange: handleChange,
//     value: item,
//     name: 'color-radio-button-demo',
//     inputProps: { 'aria-label': item },
//   });

//   return (
//     <Box sx={{ display: 'flex', flexDirection: 'column' }}>
//       {data?.map((d, i) => (
//         <CustomRadio
//           key={i}
//           controlProps={() => controlProps('a')}
//           name={d.name}
//         />
//       ))}
//     </Box>
//   );
// }

// function CustomRadio({
//   controlProps,
//   name,
// }: {
//   controlProps: () => {
//     checked: boolean;
//     onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
//     value: string;
//     name: string;
//     inputProps: {
//       'aria-label': string;
//     };
//   };
//   name: string;
// }) {
//   return (
//     <Box sx={{ display: 'flex', alignItems: 'center' }}>
//       <Radio {...controlProps()} />
//       <Typography>{name}</Typography>
//     </Box>
//   );
// }

export default UploadBox;

function ImportBtn() {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      // console.log(e.target.files?.[0]);
    }
  };
  const inputRef = useRef<HTMLInputElement>(null);
  const handleClick = () => inputRef.current?.click();
  return (
    <>
      <Typography
        onClick={handleClick}
        textAlign='center'
        component='span'
        color='primary'
        sx={{
          textDecoration: 'underline',
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
        click
      </Typography>
      <input
        ref={inputRef}
        type='file'
        id='upload-file'
        style={{ display: 'none' }}
        // accept='.pgn,.jpg,.jpeg'
        onChange={handleChange}
      />
    </>
  );
}
