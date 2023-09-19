import { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import { User } from '../generated/client';

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  // Use o método `passport.authenticate` para verificar a autenticação do usuário
  passport.authenticate('local', { session: true }, (err: Error, user: User) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      // Se a autenticação falhar
      return res.status(401).json({ error: 'Falha na autenticação' });
    }

    // Se a autenticação for bem-sucedida
    return next();  
  })(req, res, next);
};
