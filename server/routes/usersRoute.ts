import { PrismaClient } from '@prisma/client';
import { Router } from 'express';

const usersRouter = Router();
const prisma = new PrismaClient();

usersRouter.get('/', async (req, res) => {
  try {
    const allUsers = await prisma.user.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
    res.status(200).json(allUsers);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

usersRouter.get('/getOnlineUsers', async (req, res) => {
  try {
    const onlineUsers = await prisma.user.findMany({
      where: {
        status: 'Online',
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    res.status(200).json(onlineUsers);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

export default usersRouter;
