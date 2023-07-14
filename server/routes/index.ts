import { Router } from 'express';
import usersRouter from './usersRoute';
import authRouter from './authRouter';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/auth', authRouter)
export default routes;

