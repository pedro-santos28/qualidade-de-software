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

// commentsRouter.put('/comments/:id', requireAuth, async (req, res) => {
//   const { content } = req.body;
//   const { id } = req.params;

//   try {
//     const comment = await prisma.comment.findUnique({
//       where: {
//         id,
//       },
//     });

//     if (!comment) {
//       res.status(404).json({ message: 'Comment not found' });
//       return;
//     }

//     let builtData: buildDataCommentUpdate = {
//       content,
//     };

//     if (hasLiked !== undefined) {
//       builtData = { ...builtData, hasLiked };
//     }

//     if (hasDisliked !== undefined) {
//       builtData = { ...builtData, hasDisliked };
//     }

//     const data: Prisma.CommentUpdateInput = {
//       ...builtData,
//     };

//     if (hasLiked === true && comment.hasLiked === false) {
//       data.like = comment.like + 1;
//     } else if (hasLiked === false && comment.hasLiked === true) {
//       data.like = comment.like - 1;
//     }

//     if (hasDisliked === true && comment.hasDisliked === false) {
//       data.dislike = comment.dislike + 1;
//     } else if (hasDisliked === false && comment.hasDisliked === true) {
//       data.dislike = comment.dislike - 1;
//     }

//     const updatedComment = await prisma.comment.update({
//       where: {
//         id: parsedId,
//       },
//       data,
//     });

//     res.status(200).json(updatedComment);
//   } catch (error) {
//     res.status(500).json({ message: error });
//   }
// });

export default commentsRouter;
