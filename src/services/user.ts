import { Prisma } from '../generated/prisma';
import { prisma } from '../libs/prisma1';

export const createUser = async (data: Prisma.UserCreateInput)=> {
    try {
        return await prisma.user.create({data});
    } catch (error) {
        return false;
    }
};  

// Funáo para criar  com o upset
export const upsertUser = async (data: Prisma.UserCreateInput) => {
    const result = await prisma.user.upsert({
        where: { 
            email: data.email },
        update: {role: 'ADMIN'},
        create: { ...data }
    });
    return result;
};

export const createUsers = async (users: Prisma.UserCreateInput[]) => {
    try{
        return await prisma.user.createMany({ 
            data: users,
            skipDuplicates: true // Ignora duplicatas});
    });
} catch (error) {
        return false;
    } 
} 

export const getAllUsers = async () => {
    const users = await prisma.user.findMany({
        where:{
            OR:[
                {
                    email:{
                        endsWith: '@hotmail.com'
                    }
                },
                    {
                        email: {
                            endsWith:'@gmail.com'
                        }
                    }
                ]
            },
            select: {
                id: true,
                name: true,
                email: true,
                _count: {
                    select: {
                        Post: true
                    }
                }
            }
    });
        return users;
}

// where: {
 //   post: {
 //       every:{
//            title:{
 //               startsWith:{
//                    'Titulo'
//                }
//            }
//        }
 //   }
//}

//GT- greater the maior que = >
//GTE -  greater then or equal >=
//LT - Lower tehn =<
//LTE - Lower then or equal <=

export const getUserByEmail = async (email: string) => {
    const user = await prisma.user.findUnique({
        where: { email },
    });
    return user;
}


export const updateUser = async() => {
    const updateUser = await prisma.user.update({   
        where: { email: 'user@example.com' },
        data: {
            name: 'Updated Name',
            email: 'updated@example.com'
        }
    });
    return updateUser;
}

//funcao para deletar um usuario
export const deleteUser = async (email: string) => {
    const user = await prisma.user.delete({
        where: {  email: 'updated@example.com' },
    });
    return user;
}

import { User } from '../types/user';
export const findUserByEmailAndPassword = async (email: string, password: string) => {
    if (email === 'admin@example.com' && password === 'admin') {
        const user: User = { id: 2, email: 'admin@example.com', name: 'Admin User' };
        return user;
    }
    return null;
}

export const createUserToken = (user: User) => {
    return '1234';
}

export const finfUserByToken = async (token: string) => {
    if (token === '1234') {
        const user: User = {
            id: 2,
            email: 'admin@example.com',
            name: 'Admin User'
        };
        return user;
    }
    return null;
}


export const findUserByToken = async (token: string) => {
    if (token === '1234') {
        const user: User = {
            id: 2,
            email: 'admin@example.com',
            name: 'Admin User'
        };
        return user;
    }
    return null;
}