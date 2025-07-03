import { Router } from 'express';
import { prisma } from '../libs/Prisma';

export const mainRouter = Router();

mainRouter.get('/ping', (req, res) => {
    res.json({ pong: true });
});

mainRouter.get('/test', (req, res) => {
    prisma.user
})