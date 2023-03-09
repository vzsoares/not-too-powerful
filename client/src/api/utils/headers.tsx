import { RootState } from '../../store';

export const authenticationHeader = (
  headers: Headers,
  { getState }: { getState: () => unknown },
) => {
  const { auth } = (getState() as RootState).user;
  if (auth) {
    headers.set('authorization', `Bearer ${auth.access_token}`);
  }

  headers.set('profile', 'realtor');

  if (!headers.has('Content-type')) {
    headers.set('Content-Type', 'application/json');
  }

  return headers;
};
