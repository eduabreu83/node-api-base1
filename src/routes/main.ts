import { Router } from 'express';
import { createUser, createUsers } from '../services/user';
import { count } from 'console';

export const mainRouter = Router();

mainRouter.get('/ping', (req, res) => {
    res.json({ pong: true });
});

mainRouter.post('/user', async (req, res) => {
    const user = await createUser({
        name: 'testador 2',
        email:'teste2@example.com',
        Post: {
            create: {
                title: 'Meu primeiro post',
                subtitle: 'Meu primeiro post',
                body: 'Este é o corpo do meu primeiro post'
            }
        }
    });

    if (!user) {
        return res.status(500).json({ error: 'Erro ao criar o usuario' });
    }
    res.status(201).json(user);
});

mainRouter.post('/users', async (req, res) => {
    const result = await createUsers([
        { name: 'joao', email: 'joao@example.com' },
        { name: 'Joao2', email: 'joao2@example.com' },
        { name: 'Fulano', email: 'fulano@example.com' },
        { name: 'Ciclano', email: 'ciclano@example.com' }
    ]);
res.json({result});
});