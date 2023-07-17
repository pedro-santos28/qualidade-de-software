import { Router } from 'express';
import usersRouter from './usersRoute';
import authRouter from './authRouter';
import commentsRouter from './commentsRoute';

const routes = Router();

routes.use('/api/users', usersRouter);
routes.use('/api/auth', authRouter);
routes.use('/api/comments', commentsRouter);

export default routes;
