import { useEffect, useState } from 'react';

import { useLazyGetTokenQuery } from '../api/auth.api';
import { setCredentials } from '../store/user';
import { Toast } from '../components/Toast/Toast';
import { useAppDispatch } from '../hooks';

export default function useAuthPopup() {
  const dispatch = useAppDispatch();

  const [externalPopup, setExternalPopup] = useState<Window | null>(null);
  const [verifyToken] = useLazyGetTokenQuery();

  const handleAuthPopup = () => {
    const width = 500;
    const height = 900;
    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2.5;
    const title = ``;
    const url = import.meta.env.VITE_DISCORD_GET_USER_CODE;
    const popup = window.open(
      url,
      title,
      `width=${width},height=${height},left=${left},top=${top}`,
    );
    setExternalPopup(popup);
  };

  useEffect(() => {
    if (!externalPopup) {
      return;
    }

    const timer = setInterval(() => {
      if (!externalPopup) {
        timer && clearInterval(timer);
        return;
      }
      const currentUrl = externalPopup.location.href;
      if (!currentUrl) {
        return;
      }
      const searchParams = new URL(currentUrl).searchParams;
      const code = searchParams.get('code');
      if (code) {
        externalPopup.close();
        verifyToken(code)
          .unwrap()
          .then((r) => {
            dispatch(setCredentials(r.data));
            Toast.show({
              title: 'Success !!',
              message: 'Logged in',
              type: 'success',
            });
          })
          .catch(() => {
            Toast.show({
              title: 'Error !!',
              message: 'Failed logging in',
              type: 'error',
            });
          });
      }
    }, 500);
  }, [externalPopup, dispatch, verifyToken]);

  return [handleAuthPopup];
}
