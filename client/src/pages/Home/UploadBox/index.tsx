import { Box, lighten, Dialog, Typography } from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';
import { useRef, useState } from 'react';

import useEnhancedTheme from '../../../hooks/useEnhancedTheme';
import { useGetGuildMatchesQuery } from '../../../api/discord.api';
import { useAppSelector } from '../../../hooks';

function UploadBox() {
  const user = useAppSelector((x) => x.user);
  const { data } = useGetGuildMatchesQuery(undefined, {
    skip: !user.auth?.access_token,
  });
  // const data = data2?.data;
  // console.log(data);
  // console.log(data2);
  // console.log(user);

  const [selectGuidOpen, setSelectGuidOpen] = useState(true);
  const handleClose = () => setSelectGuidOpen(false);

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
        <Typography>choose your server</Typography>
        {/* <RadioSelector data={data?.data} /> */}
        <Box sx={{ display: 'flex' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
            {data?.data.map((el, i) => {
              const isOdd = !!(i % 2);
              return (
                <ListItem
                  key={i}
                  evenOdd={isOdd}
                  name={el?.name}
                  selected={Array.isArray([]) === !!el?.id}
                />
              );
            })}
          </Box>
          {/* <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
            {[...Array(5)].map((_, i) => {
              const isEven = !(i % 2);
              return <ListItem key={i} evenOdd={isEven} />;
            })}
          </Box> */}
        </Box>
      </Dialog>
    </Box>
  );
}

function ListItem({
  evenOdd,
  name,
  selected,
}: {
  evenOdd: boolean;
  name: string;
  selected: boolean;
}) {
  const { theme } = useEnhancedTheme();
  const secondary600 = lighten(theme.palette.secondary.main, 0.7);
  return (
    <Box
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
