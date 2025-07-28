import { Strategy as BearerStrategy } from "passport-http-bearer";
import { findUserByToken } from "../services/user";
import passport from "passport";
import { User } from "../generated/prisma";
import { RequestHandler } from "express";

export const bearerStrategy = new BearerStrategy(
    async (token, done) => {
        console.log('Bearer token received:', token);
        const user = await findUserByToken(token);
        if (user) {
            return done(null, user);
        }
        return done(null, false,);
    });

export const bearerStrategyAuth:RequestHandler = (req, res, next) => {
    const authRequest = passport.authenticate('bearer', 
         (err:any, user: User| false) => {
        if (user) {
            req.user = user;
            return next();
        }
            return res.status(401).json({ message: "acesso negado" });
        }
    );
    authRequest(req, res, next);
};
