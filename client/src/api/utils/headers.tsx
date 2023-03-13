import { RootState } from '../../store';

export const authenticationHeader = (
  headers: Headers,
  { getState }: { getState: () => unknown },
) => {
  const { auth } = (getState() as RootState).user;

  if (auth) {
    headers.set('authorization', `${auth.access_token}`);
  }

  if (!headers.has('Content-type')) {
    headers.set('Content-Type', 'application/json');
  }

  return headers;
};
