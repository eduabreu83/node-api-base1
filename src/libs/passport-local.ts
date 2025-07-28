import { Strategy as LocalStrategy } from 'passport-local';
import { createUserToken, findUserByEmailAndPassword } from '../services/user';
import { User } from '../generated/prisma';
import { RequestHandler } from 'express';
import passport from 'passport';


type LocalStrategyResponse = {
  auth: {
    token: string;
  };
  user: User
};

export const localStrategy = new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password',
  },
  async(email, password, done) => {

    const user = await findUserByEmailAndPassword(email, password);
    if (user) {
      const token = createUserToken(user);
      const response: LocalStrategyResponse = {
        auth: {token},
        user
      };
      return done(null, response);
    }

    return done(null, false, { message: 'Invalid email or password' });
  }
);

export const localStrategyAuth: RequestHandler = (req, res, next) => {
  const authRequest = passport.authenticate('local', 
    (err: any, response: LocalStrategyResponse | undefined) => {
     if (response) {
        req.user = response.user;
        req.authInfo = response.auth;
        return next();
      }
      return res.status(401).json({
        error: 'Authentication failed',
      });
  });
  authRequest(req,res,next)
}