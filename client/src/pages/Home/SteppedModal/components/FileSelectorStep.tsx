import ImageIcon from '@mui/icons-material/Image';
import { Box, Button, Typography } from '@mui/material';
import { useRef, useState } from 'react';

function FileSelectorStep() {
  const [file, setFile] = useState<File | null>(null);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files?.[0]);
    }
  };

  const inputRef = useRef<HTMLInputElement>(null);
  const handleClick = () => inputRef.current?.click();

  const handleSendFile = () => {
    // console.log(file);
  };
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        alignItems: 'center',
        gap: '1rem',
      }}
    >
      <ImageIcon color='primary' sx={{ fontSize: '6rem' }} />
      <Box sx={{ display: 'flex' }}>
        <Button
          variant='contained'
          sx={{ borderRadius: 0 }}
          onClick={handleClick}
        >
          Select
        </Button>
        <Box
          sx={{
            border: '1px dashed',
            borderColor: 'white.main',
            display: 'flex',
            alignItems: 'center',
            p: 1,
            minWidth: '150px',
          }}
        >
          <Typography>{file ? file.name : '......'}</Typography>
          <input
            ref={inputRef}
            type='file'
            id='upload-file'
            style={{ display: 'none' }}
            accept='image/*'
            onChange={handleChange}
          />
        </Box>
      </Box>
      <Button
        variant='contained'
        sx={{ ml: 'auto', mt: 2, py: 1.5, px: 3.5 }}
        disabled={!file}
        onClick={() => handleSendFile()}
      >
        SEND
      </Button>
    </Box>
  );
}

export default FileSelectorStep;
