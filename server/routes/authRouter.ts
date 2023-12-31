import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Router } from 'express';
import * as dotenv from 'dotenv';

const authRouter = Router();
const prisma = new PrismaClient();
const secret = process.env.JWT_SECRET;
dotenv.config();

authRouter.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { email: email },
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const updateUser = await prisma.user.update({
      where: { email: email },
      data: {
        status: 'Online',
      },
    });

    jwt.sign(
      { userId: user.id },
      String(secret),
      { expiresIn: '1h' },
      (err, token) => {
        if (err) {
          console.log(err);
        }
        const { password, ...userResponseDTO } = user || {};

        res.status(200).json({ token, userResponseDTO });
      },
    );
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

authRouter.post('/logout', async (req, res) => {
  const { email } = req.body;

  console.log("email", email);

  try {
    const user = await prisma.user.findUnique({
      where: { email: email },
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const updateUser = await prisma.user.update({
      where: { email: email },
      data: {
        status: 'Offline',
      },
    });

    res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

authRouter.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  const isEmailAvailable = await prisma.user.findUnique({
    where: { email: email },
  });

  if (isEmailAvailable) {
    return res.status(400).json({ message: 'Email already in use' });
  }

  const cryptPassword = await bcrypt.hash(password, 10);

  try {
    const createdUser = await prisma.user.create({
      data: {
        username,
        email,
        password: cryptPassword,
      },
    });
    res.status(201).json(createdUser);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

export default authRouter;
