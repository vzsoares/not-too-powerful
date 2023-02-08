import type { Request, Response } from 'express';

const apiNotFound = (req: Request, res: Response) =>
  res.status(404).send('Route does not exist');

export default apiNotFound;
