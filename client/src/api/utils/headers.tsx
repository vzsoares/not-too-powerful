import { RootState } from '../../store';

export const authenticationHeader = (
  headers: Headers,
  { getState }: { getState: () => unknown },
) => {
  const { token } = (getState() as RootState).user;
  if (token) {
    headers.set('authorization', `Bearer ${token}`);
  }

  headers.set('profile', 'realtor');

  if (!headers.has('Content-type')) {
    headers.set('Content-Type', 'application/json');
  }

  return headers;
};
