/* eslint-disable react/display-name */
import { SnackbarOrigin } from '@mui/material';
import {
  createRef,
  forwardRef,
  useCallback,
  useImperativeHandle,
  useState,
} from 'react';

import { BaseToast } from './components/BaseToast';

interface ToastShowParams {
  position?: SnackbarOrigin;
  type: 'success' | 'warn' | 'error';
  title: string;
  message: string;
  duration?: number;
}

const DEFAULT_TOAST_PROPS: ToastShowParams = {
  message: '',
  position: {
    vertical: 'bottom',
    horizontal: 'right',
  },
  title: '',
  type: 'success',
  duration: 6000,
};

const ToastRoot = forwardRef((props: ToastShowParams, ref) => {
  const { ...defaultOptions } = props;

  const [toastOptions, setToastOptions] =
    useState<ToastShowParams>(defaultOptions);
  const [toastOpen, setToastOpen] = useState(false);

  const show = useCallback((params: ToastShowParams) => {
    setToastOptions(params);
    setToastOpen(true);
  }, []);

  const hide = useCallback(() => {
    setToastOpen(false);
  }, []);

  useImperativeHandle(ref, () => ({
    show,
    hide,
  }));

  return <BaseToast open={toastOpen} {...toastOptions} hide={hide} />;
});

interface ToastRef {
  show: (params: ToastShowParams) => void;
  hide: () => void;
}

const toastRef = createRef<ToastRef>();

export function Toast(props?: ToastShowParams) {
  const hasDefault = props ?? DEFAULT_TOAST_PROPS;
  return <ToastRoot ref={toastRef} {...hasDefault} />;
}

Toast.show = (params: ToastShowParams) => {
  toastRef.current?.show(params);
};

Toast.hide = () => {
  toastRef.current?.hide();
};
