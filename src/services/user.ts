import { Prisma } from '../generated/prisma';
import { prisma } from '../libs/prisma1';

export const createUser = async (data: Prisma.UserCreateInput)=> {
    try {
        return await prisma.user.create({data});
    } catch (error) {
        return false;
    }
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