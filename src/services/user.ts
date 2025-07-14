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
                            endswith:'@gmail.com'
                        }
                    }
                ]
            },
            select: {
                id: true,
                name: true,
                email: true
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
