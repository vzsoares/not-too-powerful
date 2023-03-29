import ImageIcon from '@mui/icons-material/Image';
import {
  Box,
  Button,
  CircularProgress,
  OutlinedInput,
  Typography,
} from '@mui/material';
import { useRef, useState } from 'react';

import compressImage from '../../../../utils/compressImage';
import { Toast } from '../../../../components/Toast/Toast';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { setModalOpen, setStep } from '../../../../store/upload';

function FileSelectorStep() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((x) => x.user);
  const guild = useAppSelector((x) => x.upload);

  const handleClose = () => dispatch(setModalOpen(false));
  const resetStep = () => dispatch(setStep(1));

  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState('');
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files?.[0]);
    }
  };

  const handleClear = () => {
    handleClose();
    setFile(null);
    setMessage('');
    resetStep();
  };

  const inputRef = useRef<HTMLInputElement>(null);
  const handleClick = () => inputRef.current?.click();

  const handleSendFile = async () => {
    if (!file) return;
    const processedFile = await compressImage(file);
    if (processedFile instanceof Error) return;
    setLoading(true);
    const msg = message;
    const formData = new FormData();
    formData.append('content', msg);
    formData.append('attachments', processedFile);
    formData.append('userId', user.user?.id ?? '');
    formData.append('channelId', guild.selectedGuildChannel?.id ?? '');

    const response = await fetch(
      `${import.meta.env.VITE_API_BASE ?? ''}/api/v1/guilds/sendMessage`,
      {
        body: formData,
        method: 'POST',
      },
    );
    if (response.status !== 200) {
      Toast.show({
        title: 'Error !!',
        message: 'Failed',
        type: 'error',
      });
      setLoading(false);
      handleClear();
      return;
    }

    Toast.show({
      title: 'Success !!',
      message: 'Message sent',
      type: 'success',
    });
    setLoading(false);
    handleClear();
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
      <OutlinedInput
        // inputProps={{ style: { padding: '6px' } }}
        sx={{ minWidth: '232px', minHeight: '42px', p: '8px 10px' }}
        placeholder='Message?'
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        multiline
      />
      {loading ? (
        <CircularProgress sx={{ marginLeft: 'auto' }} />
      ) : (
        <Button
          variant='contained'
          sx={{ ml: 'auto', mt: 2, py: 1.5, px: 3.5 }}
          disabled={!file}
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onClick={handleSendFile}
        >
          SEND
        </Button>
      )}
    </Box>
  );
}

export default FileSelectorStep;
