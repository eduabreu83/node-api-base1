import { ExtractJwt, Strategy as JWTStrategey } from 'passport-jwt';
import { findUserById } from '../services/user';
import passport from 'passport';
import { RequestHandler } from 'express';
import { User } from '../types/user';

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_KEY as string
};

export const jwtStrategy = new JWTStrategey(options, async (payload, done) => {
    console.log('JWT Payload:', payload);
    const { id } = payload;

    const user = await findUserById(id);
    if (user) {
        return done(null, user);
    } else {
        return done(null, false);
    }   
});

export const jwtStrategyAuth: RequestHandler = (req, res, next) => {
    const authRequest = passport.authenticate('jwt',
        (err:any, user: User | false) => {
            if (user) {
                req.user = user;
                return next();
            }
               return res.status(401).json({ message: 'Unauthorized' });
        }
    );
    authRequest(req, res, next);
}
