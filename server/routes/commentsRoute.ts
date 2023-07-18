import { Prisma, PrismaClient } from '@prisma/client';
import { Router } from 'express';

const prisma = new PrismaClient();
const commentsRouter = Router();

commentsRouter.get('/', async (req, res) => {
  try {
    const comments = await prisma.comment.findMany({
      include: {
        user: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

commentsRouter.post('/', async (req, res) => {
  const { content, userId } = req.body;

  try {
    const createdComment = await prisma.comment.create({
      data: {
        content,
        userId,
      },
    });
    res.status(201).json(createdComment);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

commentsRouter.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.comment.delete({
      where: {
        id,
      },
    });
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

commentsRouter.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;

  try {
    const existingComment = await prisma.comment.findUnique({
      where: {
        id,
      },
    });

    if (!existingComment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    const updatedComment = await prisma.comment.update({
      where: {
        id,
      },
      data: {
        ...existingComment,
        content,
      },
    });

    console.log(updatedComment);
    res.status(200).json(updatedComment);
  } catch (error) {
    console.log('erro');
    res.status(500).json({ message: error });
  }
});

export default commentsRouter;
